export interface MealDetail {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  youtubeUrl?: string;
  ingredients: { ingredient: string; measure: string }[];
}

export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  weatherText: string;
  isRain: boolean;
  windSpeed: number;
  humidity: number;
}

export interface DateActivity {
  id: string;
  title: string;
  category: "chill" | "romantic" | "active" | "entertainment";
  description: string;
  locationSuggest: string;
  image: string;
  estimatedCost: string;
  rating?: number;
}

export interface CoupleMemory {
  id: string;
  title: string;
  date: string;
  location: string;
  note: string;
  photoUrl: string;
  cuisine: string;
  rating: number;
}

export interface BucketListItem {
  id: string;
  title: string;
  category: string;
  isCompleted: boolean;
  targetDate?: string;
  completedAt?: string;
}

// 1. THEMEALDB API - Gợi ý món ăn & công thức nấu nướng tại nhà
export async function getRandomMeal(): Promise<MealDetail | null> {
  try {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch meal");
    const data = await res.json();
    const meal = data.meals?.[0];

    if (!meal) return null;

    // Lọc danh sách nguyên liệu và định lượng
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || "",
        });
      }
    }

    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
      youtubeUrl: meal.strYoutube,
      ingredients,
    };
  } catch (error) {
    console.error("Error fetching random meal:", error);
    return null;
  }
}

// 2. UNSPLASH / STATIC HD IMAGE PROVIDER - Ảnh món ăn & không gian chân thực
const FOOD_IMAGE_MAP: Record<string, string> = {
  "hotpot": "https://images.unsplash.com/photo-1547928576-965be7f5f6a6?q=80&w=1000&auto=format&fit=crop",
  "bbq": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
  "ramen": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop",
  "cafe": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop",
  "rooftop": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
  "sushi": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
  "dessert": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop",
  "cinema": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop",
};

export function getCuratedImage(keyword: string): string {
  const normalizedKey = keyword.toLowerCase().trim();
  for (const [key, url] of Object.entries(FOOD_IMAGE_MAP)) {
    if (normalizedKey.includes(key)) return url;
  }
  return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop";
}

// 3. OPEN-METEO API - Dự báo thời tiết cho buổi hẹn (Mặc định tọa độ TP.HCM)
export async function getWeatherForecast(
  lat: number = 10.8231,
  lon: number = 106.6297
): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FHo_Chi_Minh`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch weather");
    const data = await res.json();
    const current = data.current;

    const weatherCode = current.weather_code;
    let weatherText = "Trời quang đãng, gió mát nhẹ ✨";
    let isRain = false;

    if (weatherCode >= 51 && weatherCode <= 67) {
      weatherText = "Có mưa rào nhẹ 🌧️ (Nên chọn cafe trong nhà hoặc xem phim)";
      isRain = true;
    } else if (weatherCode >= 80 && weatherCode <= 99) {
      weatherText = "Mưa dông lớn ⛈️ (Lý tưởng nhất là ở nhà nấu ăn cùng nhau)";
      isRain = true;
    } else if (weatherCode >= 1 && weatherCode <= 3) {
      weatherText = "Trời nhiều mây, không khí dịu mát ⛅";
    }

    return {
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      weatherCode,
      weatherText,
      isRain,
      windSpeed: current.wind_speed_10m,
      humidity: current.relative_humidity_2m,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {
      temperature: 28,
      apparentTemperature: 30,
      weatherCode: 1,
      weatherText: "Dịu mát, thích hợp đi dạo 🌙",
      isRain: false,
      windSpeed: 8.5,
      humidity: 72,
    };
  }
}

// 4. PRESET DATE ACTIVITIES - Gợi ý hoạt động đi chơi dành riêng cho cặp đôi
export const COUPLE_ACTIVITIES: DateActivity[] = [
  {
    id: "act-1",
    title: "Buổi tối lẩu cay & tâm sự",
    category: "romantic",
    description: "Ngồi bên nồi lẩu nóng hổi, gắp đồ ăn cho nhau và kể chuyện cả tuần qua.",
    locationSuggest: "Haidilao, Manwah hoặc Hotpot Story",
    image: FOOD_IMAGE_MAP["hotpot"],
    estimatedCost: "500k - 800k / 2 người",
    rating: 4.9,
  },
  {
    id: "act-2",
    title: "Cafe ngắm hoàng hôn & chụp ảnh",
    category: "chill",
    description: "Một quán cafe tone ấm, nhiều cây xanh hoặc view bờ sông thoáng đãng để lưu giữ những bức hình đẹp.",
    locationSuggest: "Thảo Điền (TP. Thủ Đức) hoặc Bờ kè Thanh Đa",
    image: FOOD_IMAGE_MAP["cafe"],
    estimatedCost: "150k - 250k / 2 người",
    rating: 4.8,
  },
  {
    id: "act-3",
    title: "Rạp chiếu phim & Bắp rang ngọt",
    category: "entertainment",
    description: "Chọn một bộ phim tình cảm/hài hước mới nhất, cùng chia nhau hộp bắp phô mai béo ngậy.",
    locationSuggest: "CGV / Lotte Cinema (Ghế Sweetbox)",
    image: FOOD_IMAGE_MAP["cinema"],
    estimatedCost: "300k - 450k / 2 người",
    rating: 4.7,
  },
  {
    id: "act-4",
    title: "Thịt nướng BBQ & Ly bia mát lạnh",
    category: "active",
    description: "Tự tay nướng từng miếng dẻ sườn thơm lừng, cuốn xà lách kèm panchan chuẩn Hàn.",
    locationSuggest: "Gogi House, King BBQ hoặc Meat & Meet",
    image: FOOD_IMAGE_MAP["bbq"],
    estimatedCost: "600k - 900k / 2 người",
    rating: 4.9,
  },
  {
    id: "act-5",
    title: "Cocktail Rooftop & Ngắm Sài Gòn Về Đêm",
    category: "romantic",
    description: "Nghe nhạc lo-fi/jazz, thưởng thức ly signature cocktail dưới ánh đèn thành phố lung linh.",
    locationSuggest: "Rooftop Quận 1 hoặc Quận 3",
    image: FOOD_IMAGE_MAP["rooftop"],
    estimatedCost: "400k - 700k / 2 người",
    rating: 5.0,
  },
  {
    id: "act-6",
    title: "Workshop làm gốm & DIY kỷ niệm",
    category: "active",
    description: "Cùng nhau nặn những chiếc ly gốm hay vẽ tranh nhỏ tặng cho đối phương.",
    locationSuggest: "Gốm Sài Gòn hoặc Vườn Tranh",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop",
    estimatedCost: "350k - 600k / 2 người",
    rating: 4.9,
  }
];

// 5. COUPLE MEMORIES & BUCKET LIST PRESETS
export const DEFAULT_MEMORIES: CoupleMemory[] = [
  {
    id: "mem-1",
    title: "Lần đầu đi ăn Haidilao cùng nhau",
    date: "2026-02-14",
    location: "Haidilao Landmark 81",
    note: "Em thích nhất là múa mì và canh lẩu cà chua. Anh gắp thịt cho em ăn no căng bụng ❤️",
    photoUrl: "https://images.unsplash.com/photo-1547928576-965be7f5f6a6?q=80&w=1000&auto=format&fit=crop",
    cuisine: "Lẩu Haidilao",
    rating: 5,
  },
  {
    id: "mem-2",
    title: "Buổi chiều cafe ngắm hoàng hôn Thảo Điền",
    date: "2026-03-08",
    location: "Quán Cafe Bờ Sông Quận 2",
    note: "Anh chụp cho em cả trăm tấm hình sống ảo, tấm nào cũng xinh xỉu!",
    photoUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop",
    cuisine: "Cafe & Bánh ngọt",
    rating: 5,
  },
];

export const DEFAULT_BUCKET_LIST: BucketListItem[] = [
  { id: "b1", title: "Cùng đi ngắm sương mù và săn mây Đà Lạt 🌲", category: "Du Lịch", isCompleted: true, completedAt: "2026-01-20" },
  { id: "b2", title: "Thử hết các quán lẩu ngon nhất Sài Gòn 🍲", category: "Ẩm Thực", isCompleted: false },
  { id: "b3", title: "Cùng làm một món bánh sinh nhật cho nhau 🎂", category: "Kỷ Niệm", isCompleted: false },
  { id: "b4", title: "Đi ăn tối tại nhà hàng Michelin Star ✨", category: "Fine Dining", isCompleted: false },
  { id: "b5", title: "Chụp một bộ ảnh film phong cách hoài niệm 📸", category: "Kỷ Niệm", isCompleted: true, completedAt: "2026-02-14" },
  { id: "b6", title: "Cùng ngắm pháo hoa đêm Giao Thừa 🎆", category: "Kỷ Niệm", isCompleted: false },
];
