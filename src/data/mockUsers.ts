import { UserProfile } from '@/types';

export const CURRENT_USER: UserProfile = {
  id: 'user_current',
  fullName: 'Minh Hoàng',
  age: 24,
  location: 'Quận 1, TP. Hồ Chí Minh',
  distanceKm: 0,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  photos: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
  ],
  bio: 'Thích lượn lờ phố phường, săn lùng quán ăn ngon và chụp ảnh cho người yêu. Cuối tuần thường đi cà phê hoặc làm nồi lẩu ấm cúng! ☕🍲',
  occupation: 'Product Designer & Foodie Enthusiast',
  tasteProfile: {
    spiciness: 4, // Ghiền ăn cay
    sweetness: 3, // Ngọt vừa
    budget: 2, // $$
    favoriteCuisines: ['Lẩu Haidilao', 'BBQ Nướng Hàn Quốc', 'Ramen', 'Trà Sữa Oolong', 'Bánh Tráng Trộn'],
    dietaryNotes: ['Không ăn được hành sống'],
    vibePreferences: ['Lãng mạn & Ấm cúng', 'Chill & Nhạc Acoustic', 'Quán ngắm hoàng hôn'],
  },
};

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user_1',
    fullName: 'Thùy Trang (Chloe)',
    age: 23,
    location: 'Quận 3, TP. Hồ Chí Minh',
    distanceKm: 2.4,
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
    ],
    bio: 'Cuộc sống quá ngắn để ăn những món dở! Tìm một bạn cùng đi thử hết các quán nướng và lẩu quanh Sài Gòn. Biết chụp ảnh là điểm cộng lớn nha ✨',
    occupation: 'Content Creator & Food Reviewer',
    tasteProfile: {
      spiciness: 4,
      sweetness: 4,
      budget: 2,
      favoriteCuisines: ['Lẩu Haidilao', 'BBQ Nướng Hàn Quốc', 'Ramen', 'Bingsu Xoài', 'Trà Sữa Oolong'],
      dietaryNotes: ['Ghiền phô mai'],
      vibePreferences: ['Lãng mạn & Ấm cúng', 'Chill & Nhạc Acoustic', 'Quán ngắm hoàng hôn'],
    },
  },
  {
    id: 'user_2',
    fullName: 'Bảo Ngọc',
    age: 22,
    location: 'Bình Thạnh, TP. Hồ Chí Minh',
    distanceKm: 3.8,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
    ],
    bio: 'Tín đồ đồ Nhật và cà phê sân vườn. Thích những buổi trò chuyện sâu sắc dưới ánh nến và một ly cocktail nhẹ nhàng 🍸',
    occupation: 'UX/UI Specialist',
    tasteProfile: {
      spiciness: 2,
      sweetness: 3,
      budget: 3,
      favoriteCuisines: ['Ramen', 'Sushi & Sashimi', 'Matcha Latte', 'Pasta Ý', 'Cocktail & Tapas'],
      dietaryNotes: ['Ít dầu mỡ'],
      vibePreferences: ['Lãng mạn & Ấm cúng', 'Yên tĩnh & Tinh tế', 'Rooftop Bar View Đẹp'],
    },
  },
  {
    id: 'user_3',
    fullName: 'Khánh Linh',
    age: 24,
    location: 'Quận 7, TP. Hồ Chí Minh',
    distanceKm: 5.1,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800',
    ],
    bio: 'Team mê đồ cay cấp độ vô cực! Thích các quán ốc vỉa hè náo nhiệt, buffet nướng tẹt ga và dạo bờ kè lúc tối muộn 🏍️',
    occupation: 'Marketing Lead',
    tasteProfile: {
      spiciness: 5,
      sweetness: 2,
      budget: 1,
      favoriteCuisines: ['BBQ Nướng Hàn Quốc', 'Ốc Sài Gòn', 'Bánh Tráng Trộn', 'Lẩu Thái Chua Cay', 'Bia Thủ Công'],
      dietaryNotes: ['Thích ăn cay đậm đà'],
      vibePreferences: ['Năng động & Nhộn nhịp', 'Street Food & Vỉa hè', 'Chill & Nhạc Acoustic'],
    },
  },
  {
    id: 'user_4',
    fullName: 'Hải Yến',
    age: 25,
    location: 'Quận 2 (Thủ Đức), TP. HCM',
    distanceKm: 6.2,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    ],
    bio: 'Yêu nghệ thuật, rượu vang đỏ và bữa tối fine dining lãng mạn. Rất trân trọng những người có gu ăn uống tinh tế và biết thưởng thức ẩm thực 🍷✨',
    occupation: 'Art Director',
    tasteProfile: {
      spiciness: 1,
      sweetness: 3,
      budget: 4,
      favoriteCuisines: ['Fine Dining Âu', 'Steak Bò Wagyu', 'Rượu Vang Đỏ', 'Pasta Ý', 'Pastry Pháp'],
      dietaryNotes: ['Gluten-friendly'],
      vibePreferences: ['Lãng mạn & Ấm cúng', 'Yên tĩnh & Tinh tế', 'Rooftop Bar View Đẹp'],
    },
  },
  {
    id: 'user_5',
    fullName: 'Mai Anh',
    age: 21,
    location: 'Quận 10, TP. Hồ Chí Minh',
    distanceKm: 1.8,
    avatarUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800',
    ],
    bio: 'Bé nhỏ mê đồ ngọt, trà đào cam sả và đi dạo các tiệm sách kết hợp cafe. Bạn có muốn đi cà phê cuối tuần này cùng mình không? 🍰📖',
    occupation: 'Literature Student & Barista',
    tasteProfile: {
      spiciness: 2,
      sweetness: 5,
      budget: 2,
      favoriteCuisines: ['Trà Sữa Oolong', 'Bánh Tiramisu', 'Croissant', 'Ramen', 'Lẩu Haidilao'],
      dietaryNotes: ['Hảo ngọt'],
      vibePreferences: ['Lãng mạn & Ấm cúng', 'Chill & Nhạc Acoustic', 'Quán Cafe Sân Vườn'],
    },
  },
];
