import { TasteProfile, CompatibilityBreakdown } from '@/types';

/**
 * Calculates Jaccard similarity coefficient between two string arrays.
 * J(A, B) = |A ∩ B| / |A ∪ B|
 */
export function calculateJaccardSimilarity(arr1: string[], arr2: string[]): number {
  if (!arr1 || !arr2 || (arr1.length === 0 && arr2.length === 0)) return 1;
  if (arr1.length === 0 || arr2.length === 0) return 0;

  const set1 = new Set(arr1.map((item) => item.toLowerCase().trim()));
  const set2 = new Set(arr2.map((item) => item.toLowerCase().trim()));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return union.size === 0 ? 0 : intersection.size / union.size;
}

/**
 * Calculates quantitative taste metric distance (Spiciness, Sweetness, Budget).
 * Returns a score between 0 and 100.
 */
export function calculateTasteMetricScore(p1: TasteProfile, p2: TasteProfile): number {
  // Spiciness: diff max is 4
  const spiceDiff = Math.abs(p1.spiciness - p2.spiciness) / 4;
  // Sweetness: diff max is 4
  const sweetDiff = Math.abs(p1.sweetness - p2.sweetness) / 4;
  // Budget: diff max is 3
  const budgetDiff = Math.abs(p1.budget - p2.budget) / 3;

  // Average distance normalized between 0 and 1
  const avgDistance = (spiceDiff * 0.4 + sweetDiff * 0.3 + budgetDiff * 0.3);
  return Math.round((1 - avgDistance) * 100);
}

/**
 * Main Taste-Skill Matching Engine
 * Metric 1: Taste Profile (Spiciness, Sweetness, Budget) - 30% weight
 * Metric 2: Cuisines overlap (Jaccard similarity on favorite foods) - 40% weight
 * Metric 3: Atmosphere / Vibe matching - 30% weight
 */
export function calculateTasteCompatibility(
  p1: TasteProfile,
  p2: TasteProfile
): CompatibilityBreakdown {
  const tasteScore = calculateTasteMetricScore(p1, p2);

  const cuisineJaccard = calculateJaccardSimilarity(
    p1.favoriteCuisines,
    p2.favoriteCuisines
  );
  const cuisineScore = Math.round(cuisineJaccard * 100);

  const vibeJaccard = calculateJaccardSimilarity(
    p1.vibePreferences,
    p2.vibePreferences
  );
  const vibeScore = Math.round(vibeJaccard * 100);

  // Weighted Total (30% taste, 40% cuisine, 30% vibe)
  const totalScore = Math.min(
    100,
    Math.max(0, Math.round(tasteScore * 0.3 + cuisineScore * 0.4 + vibeScore * 0.3))
  );

  // Shared elements
  const set1Cuisines = new Set(p1.favoriteCuisines.map((c) => c.toLowerCase()));
  const sharedCuisines = p2.favoriteCuisines.filter((c) =>
    set1Cuisines.has(c.toLowerCase())
  );

  const set1Vibes = new Set(p1.vibePreferences.map((v) => v.toLowerCase()));
  const sharedVibes = p2.vibePreferences.filter((v) =>
    set1Vibes.has(v.toLowerCase())
  );

  // Generate highlights
  const highlights: string[] = [];

  if (sharedCuisines.length > 0) {
    highlights.push(`Cùng mê mẩn: ${sharedCuisines.slice(0, 3).join(', ')} 🍲`);
  }

  if (Math.abs(p1.spiciness - p2.spiciness) <= 1) {
    const spiceLabels = ['', 'Ăn thanh đạm', 'Hơi the the', 'Ăn cay vừa', 'Ghiền ăn cay', 'Thánh ăn cay'];
    highlights.push(`Gu ăn cay rất hợp: ${spiceLabels[Math.min(5, Math.max(1, p1.spiciness))]} 🌶️`);
  }

  if (Math.abs(p1.sweetness - p2.sweetness) <= 1 && (p1.sweetness >= 3 || p2.sweetness >= 3)) {
    highlights.push(`Cả hai đều có tâm hồn hảo ngọt và thích cafe/tráng miệng 🍰`);
  }

  if (sharedVibes.length > 0) {
    highlights.push(`Không gian yêu thích: ${sharedVibes.slice(0, 2).join(' & ')} ✨`);
  }

  if (Math.abs(p1.budget - p2.budget) === 0) {
    highlights.push(`Quan điểm chi tiêu buổi hẹn cực kỳ tương đồng 💳`);
  }

  if (highlights.length === 0) {
    highlights.push('Hai phong cách ẩm thực độc đáo để cùng nhau khám phá món mới! 🌟');
  }

  return {
    totalScore,
    tasteScore,
    cuisineScore,
    vibeScore,
    sharedCuisines,
    sharedVibes,
    highlights,
  };
}

export function getCompatibilityLabel(score: number): {
  label: string;
  color: string;
  badgeBg: string;
  description: string;
} {
  if (score >= 90) {
    return {
      label: 'Soulmate Ẩm Thực 💖',
      color: 'text-rose-500',
      badgeBg: 'bg-rose-100 text-rose-700 border-rose-200',
      description: 'Gu ăn uống và năng lượng hòa quyện 99.9%! Một cặp đôi hoàn hảo cho mọi buổi hẹn.',
    };
  }
  if (score >= 75) {
    return {
      label: 'Rất Hợp Gu 🍷',
      color: 'text-pink-500',
      badgeBg: 'bg-pink-100 text-pink-700 border-pink-200',
      description: 'Có rất nhiều sở thích ẩm thực chung và không gian hẹn hò đồng điệu.',
    };
  }
  if (score >= 60) {
    return {
      label: 'Cặp Đôi Tiềm Năng 🍜',
      color: 'text-amber-500',
      badgeBg: 'bg-amber-100 text-amber-700 border-amber-200',
      description: 'Đủ điểm chung để vui vẻ, đủ nét riêng để dẫn nhau đi khám phá quán ruột.',
    };
  }
  return {
    label: 'Khám Phá Mới Mẻ 🌮',
    color: 'text-purple-500',
    badgeBg: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'Khác biệt thú vị để mở rộng thế giới ẩm thực cho nhau!',
  };
}
