import { NextResponse } from 'next/server';
import { RecipeModel, RecipeIngredient } from '@/types/couple';

// Simple in-memory cache
const recipesCache = new Map<string, { data: RecipeModel[]; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

interface MealDbItem {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

function parseMealDbRecipe(meal: MealDbItem): RecipeModel {
  const ingredients: RecipeIngredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingName = meal[`strIngredient${i}`];
    const ingMeasure = meal[`strMeasure${i}`];

    if (ingName && ingName.trim()) {
      ingredients.push({
        name: ingName.trim(),
        amount: ingMeasure?.trim() || 'Vừa đủ',
      });
    }
  }

  // Split instructions into readable steps
  const rawInstructions = meal.strInstructions || '';
  const steps = rawInstructions
    .split(/\r?\n|\.\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8);

  let youtubeId: string | undefined = undefined;
  if (meal.strYoutube) {
    const match = meal.strYoutube.match(/(?:v=|\/embed\/|\.be\/)([\w-]{11})/);
    if (match) youtubeId = match[1];
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: steps.length > 0 ? steps : ['Chế biến theo công thức truyền thống.'],
    thumbnail: meal.strMealThumb,
    youtubeUrl: meal.strYoutube || undefined,
    youtubeId,
    ingredients,
    tags: meal.strTags ? meal.strTags.split(',').map((t) => t.trim()) : [],
    sourceUrl: meal.strSource || undefined,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || searchParams.get('area') || 'Vietnamese';
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const recipeId = searchParams.get('id');

    const cacheKey = `${country}_${category}_${search}_${recipeId}`;
    const cached = recipesCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        source: 'cache',
        count: cached.data.length,
        recipes: cached.data,
      });
    }

    let url = '';

    if (recipeId) {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(recipeId)}`;
    } else if (search) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`;
    } else if (category) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
    } else {
      // Map common country query to TheMealDB areas
      const areaMap: Record<string, string> = {
        vietnam: 'Vietnamese',
        vietnamese: 'Vietnamese',
        korea: 'Korean',
        korean: 'Korean',
        japan: 'Japanese',
        japanese: 'Japanese',
        italy: 'Italian',
        italian: 'Italian',
      };
      const targetArea = areaMap[country.toLowerCase()] || country;
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(targetArea)}`;
    }

    const res = await fetch(url, { next: { revalidate: 3600 } });
    const json = await res.json();
    const meals: MealDbItem[] = json.meals || [];

    let fullRecipes: RecipeModel[] = [];

    // If filter returned only basic info (idMeal, strMeal, strMealThumb), fetch details for top 4
    if (meals.length > 0 && !meals[0].strInstructions) {
      const topMeals = meals.slice(0, 6);
      const detailPromises = topMeals.map(async (m) => {
        try {
          const detailRes = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`
          );
          const detailJson = await detailRes.json();
          if (detailJson.meals && detailJson.meals[0]) {
            return parseMealDbRecipe(detailJson.meals[0]);
          }
          return parseMealDbRecipe(m);
        } catch {
          return parseMealDbRecipe(m);
        }
      });
      fullRecipes = await Promise.all(detailPromises);
    } else {
      fullRecipes = meals.map(parseMealDbRecipe);
    }

    recipesCache.set(cacheKey, { data: fullRecipes, timestamp: Date.now() });

    return NextResponse.json({
      success: true,
      source: 'themealdb_api',
      count: fullRecipes.length,
      recipes: fullRecipes,
    });
  } catch (error) {
    console.error('Error fetching recipes from TheMealDB:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải công thức từ TheMealDB lúc này.' },
      { status: 500 }
    );
  }
}
