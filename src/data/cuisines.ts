export type CountryId = 'vietnam' | 'korea' | 'japan' | 'italy' | 'dessert';

export interface RouletteFood {
  id: string;
  name: string;
  emoji: string;
  tag: string;
  desc: string;
  price: string;
  vibe: string;
}

export interface CookingIngredient {
  name: string;
  amount: string;
}

export interface HomeCookingRecipe {
  id: string;
  title: string;
  emoji: string;
  country: CountryId;
  countryName: string;
  countryFlag: string;
  cookTime: string; // e.g. "30 phút"
  servings: string; // e.g. "2 người"
  difficulty: 'Dễ làm' | 'Trung bình' | 'Cầu kỳ';
  tag: string;
  description: string;
  image: string;
  youtubeUrl: string;
  ingredients: CookingIngredient[];
  steps: string[];
  coupleTip: string;
}

export interface CountryCuisineData {
  id: CountryId;
  label: string;
  flag: string;
  description: string;
  rouletteItems: RouletteFood[];
  homeRecipes: HomeCookingRecipe[];
}

export const CUISINES_DATA: CountryCuisineData[] = [
  // 🇻🇳 1. VIỆT NAM (MẶC ĐỊNH & ƯU TIÊN)
  {
    id: 'vietnam',
    label: 'Việt Nam',
    flag: '🇻🇳',
    description: 'Hương vị quê nhà đậm đà, thân thuộc và ấm áp cho buổi hẹn hò.',
    rouletteItems: [
      { id: 'vn_pho', name: 'Phở Bò Tái Lăn', emoji: '🍜', tag: 'Truyền Thống 🍲', desc: 'Nước dùng hầm xương ngọt thanh 24h, thịt bò xào lăn thơm phức và quẩy giòn.', price: '55k - 95k', vibe: 'Ấm bụng & Thân quen' },
      { id: 'vn_bundau', name: 'Bún Đậu Mắm Tôm', emoji: '🥢', tag: 'Đậm Đà Dân Dã 🍃', desc: 'Chả cốm giòn rụm, thịt bắp giò luộc, đậu rán vàng giòn và mắm tôm chuẩn vị.', price: '45k - 85k', vibe: 'Vui vẻ & Đậm vị' },
      { id: 'vn_bunbo', name: 'Bún Bò Huế', emoji: '🍲', tag: 'Cay Nồng 🌶️', desc: 'Nước dùng sả ớt đậm đà, chả cua thơm béo, giò heo mềm và rau sống tươi rói.', price: '50k - 80k', vibe: 'Nồng ấm & Thơm lừng' },
      { id: 'vn_comtam', name: 'Cơm Tấm Sườn Bì', emoji: '🍛', tag: 'No Bụng 🍖', desc: 'Sườn cốt lết nướng mỡ hành thơm nức mũi, chả trứng béo ngậy và nước mắm kẹo.', price: '45k - 75k', vibe: 'Ngon miệng & Chắc bụng' },
      { id: 'vn_nemnuong', name: 'Nem Nướng Nha Trang', emoji: '🍢', tag: 'Tươi Mát 🥗', desc: 'Nem nướng thơm lừng cuốn bánh tráng, ram giòn, xoài xanh và nước chấm tôm thịt.', price: '60k - 100k', vibe: 'Trò chuyện & Cuốn vui' },
      { id: 'vn_banhmichao', name: 'Bánh Mì Chảo', emoji: '🥖', tag: 'Năng Lượng 🍳', desc: 'Pate béo ngậy, trứng ốp la xèo xèo, xúc xích và sốt cà chua bánh mì giòn tan.', price: '40k - 70k', vibe: 'Trẻ trung & Nhanh gọn' },
      { id: 'vn_lauthai', name: 'Lẩu Thái Hải Sản', emoji: '🥘', tag: 'Ấm Cúng 🥘', desc: 'Nước lẩu chua cay đậm đà, tôm sú tươi, mực giòn, nấm kim châm và rau muống.', price: '250k - 450k', vibe: 'Lãng mạn & Quây quần' },
      { id: 'vn_ocsg', name: 'Ốc Sài Gòn Sốt Bơ Tỏi', emoji: '🦪', tag: 'Ăn Vặt Đêm 🌙', desc: 'Ốc hương sốt bơ tỏi thơm lừng, chấm bánh mì nóng hổi giòn rụm.', price: '120k - 200k', vibe: 'Náo nhiệt & Gần gũi' },
    ],
    homeRecipes: [
      {
        id: 'recipe_suon_xao',
        title: 'Sườn Xào Chua Ngọt Chuẩn Vị',
        emoji: '🍖',
        country: 'vietnam',
        countryName: 'Việt Nam',
        countryFlag: '🇻🇳',
        cookTime: '35 phút',
        servings: '2 người ăn',
        difficulty: 'Dễ làm',
        tag: 'Món Cơm Gia Đình 🍚',
        description: 'Miếng sườn vàng ươm, mềm mọng áo lớp sốt chua chua ngọt ngọt sánh mịn cực kỳ hao cơm.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=kL7r_3eW9YI',
        ingredients: [
          { name: 'Sườn thăn heo tươi non', amount: '500g (chặt miếng vừa ăn)' },
          { name: 'Hành tím & Tỏi băm nhuyễn', amount: '2 củ mỗi loại' },
          { name: 'Nước mắm cá cơm truyền thống', amount: '2 muỗng canh' },
          { name: 'Đường cát vàng hoặc đường thốt nốt', amount: '2 muỗng canh' },
          { name: 'Giấm gạo (hoặc nước cốt chanh tươi)', amount: '2 muỗng canh' },
          { name: 'Tương cà & Tương ớt', amount: 'Mỗi loại 1 muỗng canh' },
          { name: 'Hành lá, ớt sừng cắt lát', amount: '2 nhánh' },
        ],
        steps: [
          'Chần sườn qua nước sôi pha chút muối và gừng đập dập khoảng 3 phút để khử mùi, sau đó vớt ra rửa sạch để ráo.',
          'Chiên sườn ngập dầu nhỏ lửa cho đến khi bề mặt sườn xém vàng đều hai mặt rồi vớt ra giấy thấm dầu.',
          'Pha bát nước sốt thần thánh: 2 thìa mắm + 2 thìa đường + 2 thìa giấm + 1 thìa tương cà + 1 thìa tương ớt + 3 thìa nước lọc, khuấy tan đều.',
          'Phi thơm hành tỏi băm trong chảo, đổ bát nước sốt vào đun sôi lăn tăn rồi trút sườn đã chiên vào đảo đều ở lửa nhỏ.',
          'Đun liu riu khoảng 7-10 phút cho sốt ngấm sâu và sánh lại óng ả bao phủ từng miếng sườn. Rắc thêm hành hoa và thưởng thức cùng cơm nóng.',
        ],
        coupleTip: 'Bạn trai chịu trách nhiệm chặt sườn và chiên vàng, bạn gái pha bát nước sốt chua ngọt và chuẩn bị cơm dẻo nhé! ❤️',
      },
      {
        id: 'recipe_canh_ga_chien_mam',
        title: 'Cánh Gà Chiên Nước Mắm Tỏi Ớt',
        emoji: '🍗',
        country: 'vietnam',
        countryName: 'Việt Nam',
        countryFlag: '🇻🇳',
        cookTime: '30 phút',
        servings: '2 người ăn',
        difficulty: 'Dễ làm',
        tag: 'Món Nhậu & Ăn Vặt 🍻',
        description: 'Lớp da giòn rụm bên ngoài, thịt gà mọng nước bên trong quyện sốt mắm tỏi ớt kẹo dẻo thơm nức mũi.',
        image: 'https://images.unsplash.com/photo-1527477378370-df85764dcf23?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=X8yGZt_r8n4',
        ingredients: [
          { name: 'Cánh gà hoặc đùi gà khúc giữa', amount: '600g' },
          { name: 'Tỏi băm nhiều (khoảng 1 củ lớn)', amount: '4 muỗng canh' },
          { name: 'Ớt hiểm băm nhỏ', amount: '1-2 trái' },
          { name: 'Nước mắm ngon loại 1', amount: '3 muỗng canh' },
          { name: 'Đường cát', amount: '2.5 muỗng canh' },
          { name: 'Bột bắp (tạo độ giòn)', amount: '2 muỗng canh' },
          { name: 'Bơ thực vật Tường An', amount: '1 muỗng cà phê' },
        ],
        steps: [
          'Rửa sạch cánh gà với muối và rượu trắng, khứa nhẹ 2 đường trên cánh để thấm gia vị nhanh hơn.',
          'Áo một lớp mỏng bột bắp lên cánh gà, đem chiên trong chảo dầu nóng ở lửa vừa đến khi da gà vàng giòn ươm.',
          'Phi thơm 3/4 lượng tỏi băm đến khi vàng giòn thì vớt riêng ra làm tỏi phi giòn rắc mặt.',
          'Dùng chảo đó, cho bơ, nước mắm, đường, ớt băm và lượng tỏi còn lại vào nấu sôi cho tan chảy và sủi bọt sánh lại.',
          'Trút toàn bộ cánh gà giòn vào đảo nhanh tay ở lửa lớn trong 2 phút để sốt áo đều. Tắt bếp, rắc tỏi phi giòn lên trên.',
        ],
        coupleTip: 'Cùng nhau thưởng thức kèm một ly trà chanh mát lạnh hoặc bia ướp đá trong lúc xem một bộ phim Netflix lãng mạn.',
      },
      {
        id: 'recipe_bo_sot_vang',
        title: 'Bò Sốt Vang Bánh Mì Kiểu Hà Nội',
        emoji: '🥘',
        country: 'vietnam',
        countryName: 'Việt Nam',
        countryFlag: '🇻🇳',
        cookTime: '50 phút',
        servings: '2 người ăn',
        difficulty: 'Trung bình',
        tag: 'Bữa Tối Ấm Áp 🍷',
        description: 'Thịt bò gân giòn mềm tan, nước sốt sánh đỏ au thơm lừng mùi quế hồi và rượu vang đỏ.',
        image: 'https://images.unsplash.com/photo-1547928576-965be7f5f6a6?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=sW7C_qD1L9U',
        ingredients: [
          { name: 'Thịt nạm bò hoặc bắp bò có gân', amount: '500g' },
          { name: 'Rượu vang đỏ (Red Wine)', amount: '100ml' },
          { name: 'Cà chua chín đỏ (xay nhuyễn)', amount: '3 quả' },
          { name: 'Cà rốt & Khoai tây cắt khối', amount: 'Mỗi loại 1 củ' },
          { name: 'Bột quế, hoa hồi, thảo quả', amount: 'Mỗi loại 1 chút' },
          { name: 'Tương cà chua (Tomato paste)', amount: '2 muỗng canh' },
          { name: 'Bơ lạt & Tỏi băm', amount: '2 muỗng canh' },
        ],
        steps: [
          'Thịt bò thái khối vuông quân cờ, ướp với 50ml rượu vang đỏ, tỏi băm, bột quế hồi, hạt nêm, tiêu trong 30 phút.',
          'Đun nóng bơ lạt, xào thơm cà chua xay và tương cà để lấy màu đỏ tự nhiên đẹp mắt.',
          'Cho thịt bò vào xào săn ở lửa lớn cho ngấm sốt cà chua và thơm phức.',
          'Đổ nước ngập mặt thịt cùng lượng rượu vang còn lại, đậy vung hầm nhỏ lửa trong 35-40 phút cho thịt mềm.',
          'Cho cà rốt, khoai tây vào hầm thêm 10 phút. Pha chút bột năng hòa nước rưới nhẹ vào để sốt sánh mượt.',
        ],
        coupleTip: 'Nướng bánh mì nóng giòn rụm để chấm cùng nước sốt vang béo ngậy trong tiết trời se lạnh.',
      },
    ],
  },

  // 🇰🇷 2. HÀN QUỐC
  {
    id: 'korea',
    label: 'Hàn Quốc',
    flag: '🇰🇷',
    description: 'Hương vị cay nồng quyến rũ, thịt nướng than hoa và panchan phong phú.',
    rouletteItems: [
      { id: 'kr_kbbq', name: 'K-BBQ Nướng Dẻ Sườn', emoji: '🥩', tag: 'Nướng Xèo Xèo 🍖', desc: 'Dẻ sườn bò sốt Galbi nướng than hồng cuốn lá mè kèm tỏi ớt và sốt ssamjang.', price: '350k - 550k', vibe: 'Thơm lừng & Ấm cúng' },
      { id: 'kr_tokbokki', name: 'Tokbokki Phô Mai', emoji: '🥘', tag: 'Cay Ngọt Kéo Sợi 🧀', desc: 'Bánh gạo dẻo quánh, chả cá Busan ngập trong sốt ớt Gochujang phủ đầy phô mai mozzarella.', price: '80k - 150k', vibe: 'Trẻ trung & Thú vị' },
      { id: 'kr_kimchijjigae', name: 'Canh Kim Chi Thịt Bò', emoji: '🍲', tag: 'Nóng Hổi Cay Cay 🌶️', desc: 'Kim chi chua chuẩn vị hầm thịt ba chỉ bò mềm, đậu hũ non thanh mát.', price: '90k - 160k', vibe: 'Ấm lòng & Dễ chịu' },
      { id: 'kr_friedchicken', name: 'Gà Rán Sốt Cay Yangnyeom', emoji: '🍗', tag: 'Giòn Rụm Đậm Vị 🍺', desc: 'Gà rán giòn tan áo lớp sốt mật ong cay nồng, ăn kèm củ cải muối giòn ngọt.', price: '150k - 250k', vibe: 'Chill xem phim' },
      { id: 'kr_jajangmyeon', name: 'Mì Tương Đen Jajang', emoji: '🥢', tag: 'Huyền Thoại Phim Hàn 🎬', desc: 'Sợi mì tươi dai ngon ngập sốt tương đen Chunjang xào thịt heo và hành tây ngọt bùi.', price: '85k - 130k', vibe: 'Dễ ăn & Thú vị' },
      { id: 'kr_bibimbap', name: 'Cơm Trộn Thố Đá Bibimbap', emoji: '🍚', tag: 'Đầy Đủ Dinh Dưỡng 🥗', desc: 'Thố đá nóng giữ nhiệt với cơm cháy giòn, 7 loại rau củ, thịt bò và trứng lòng đào.', price: '95k - 140k', vibe: 'Thanh lành & Ngon miệng' },
      { id: 'kr_manduguk', name: 'Canh Sủi Cảo Mandu', emoji: '🥟', tag: 'Thanh Nhẹ 🥟', desc: 'Sủi cảo nhân thịt kim chi mọng nước trong nước dùng cá cơm ngọt thanh.', price: '70k - 120k', vibe: 'Dịu dàng & Ấm áp' },
      { id: 'kr_naengmyeon', name: 'Mì Lạnh Nước Đá Naengmyeon', emoji: '🍜', tag: 'Giải Nhiệt 🧊', desc: 'Sợi mì kiều mạch dai giòn trong nước dùng đá bào chua thanh mát lạnh sảng khoái.', price: '95k - 150k', vibe: 'Mát lạnh & Mới lạ' },
    ],
    homeRecipes: [
      {
        id: 'recipe_tokbokki_home',
        title: 'Tokbokki Phô Mai Kéo Sợi Chuẩn Vị Hàn',
        emoji: '🥘',
        country: 'korea',
        countryName: 'Hàn Quốc',
        countryFlag: '🇰🇷',
        cookTime: '25 phút',
        servings: '2 người ăn',
        difficulty: 'Dễ làm',
        tag: 'Món Hot Trend Cặp Đôi 🧀',
        description: 'Bánh gạo dẻo mềm, chả cá dai ngọt hòa quyện trong nước sốt cay ngọt óng ả và phô mai béo ngậy.',
        image: 'https://images.unsplash.com/photo-1583032015879-c73d9e830e79?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=mF4QvW2qYtE',
        ingredients: [
          { name: 'Bánh gạo Hàn Quốc (Tokbokki)', amount: '350g' },
          { name: 'Chả cá Hàn Quốc (Busan Eomuk)', amount: '2 lá (cắt tam giác)' },
          { name: 'Phô mai Mozzarella kéo sợi', amount: '150g' },
          { name: 'Tương ớt Gochujang Hàn Quốc', amount: '2 muỗng canh' },
          { name: 'Ớt bột Hàn Quốc (Gochugaru)', amount: '1 muỗng canh' },
          { name: 'Nước tương & Đường cát', amount: 'Mỗi loại 1.5 muỗng canh' },
          { name: 'Nước dùng cá cơm hoặc nước lọc', amount: '400ml' },
          { name: 'Trứng gà luộc & Hành boa-rô', amount: '2 quả trứng & 1 cây' },
        ],
        steps: [
          'Đun sôi 400ml nước dùng trong chảo sâu lòng, cho tương ớt Gochujang, ớt bột, nước tương, đường vào khuấy tan.',
          'Khi nước sốt sôi lăn tăn, cho bánh gạo và chả cá cắt miếng vào đảo đều.',
          'Hạ lửa vừa đun trong 7-10 phút để bánh gạo chín mềm và nước sốt sệt lại màu đỏ bóng đẹp mắt.',
          'Thêm trứng luộc bổ đôi và hành boa-rô cắt lát vào chảo.',
          'Rải đều phô mai Mozzarella lên trên mặt, đậy nắp chảo 2 phút ở lửa nhỏ cho phô mai tan chảy hoàn toàn rồi thưởng thức.',
        ],
        coupleTip: 'Cùng nhau kéo những sợi phô mai dài tít tắp và đút cho nhau miếng bánh gạo cay nồng nhé! 💖',
      },
    ],
  },

  // 🇯🇵 3. NHẬT BẢN
  {
    id: 'japan',
    label: 'Nhật Bản',
    flag: '🇯🇵',
    description: 'Nghệ thuật ẩm thực tinh tế, nguyên liệu tươi sống cao cấp và thanh đạm.',
    rouletteItems: [
      { id: 'jp_ramen', name: 'Ramen Tonkotsu Xương Hầm', emoji: '🍜', tag: 'Nước Dùng Đậm Đà 🥣', desc: 'Nước cốt xương heo hầm 14 tiếng, thịt xá xíu Chashu mềm tan và trứng lòng đào ngâm tương.', price: '120k - 220k', vibe: 'Ấm cúng & Tinh tế' },
      { id: 'jp_sushi', name: 'Sushi & Sashimi Cá Hồi', emoji: '🍣', tag: 'Tươi Ngon Thượng Hạng 🐟', desc: 'Cá hồi Nauy béo ngậy, cơm giấm dẻo thơm chấm nước tương Nhật và mù tạt wasabi tươi.', price: '250k - 500k', vibe: 'Sang trọng & Lãng mạn' },
      { id: 'jp_unagi', name: 'Cơm Lươn Nhật Nướng Sốt Unagi', emoji: '🍱', tag: 'Bổ Dưỡng Cao Cấp ✨', desc: 'Lươn Nhật nướng than hoa mềm rục, rưới sốt Kabayaki ngọt bùi thơm lừng.', price: '220k - 380k', vibe: 'Đặc biệt & Tinh tế' },
      { id: 'jp_wagyu', name: 'Bò Wagyu Nướng Đá Muối', emoji: '🥩', tag: 'Mềm Tan Trong Miệng 🥩', desc: 'Vân mỡ cẩm thạch tuyệt đẹp, nướng chín tới trên đá núi lửa thơm phức.', price: '450k - 850k', vibe: 'Kỷ niệm VIP' },
      { id: 'jp_tempura', name: 'Tempura Tôm Giòn Tan', emoji: '🍤', tag: 'Giòn Rụm Thanh Nhẹ 🍤', desc: 'Tôm sú tươi tẩm bột chiên phồng giòn rụm không ngấy dầu, chấm sốt củ cải mài.', price: '110k - 180k', vibe: 'Vui miệng & Ngon lành' },
      { id: 'jp_takoyaki', name: 'Bánh Bạch Tuộc Takoyaki', emoji: '🐙', tag: 'Đường Phố Osaka 🏮', desc: 'Bánh tròn nướng nóng hổi nhân bạch tuộc giòn sần sật, rắc cá ngừ bào nhảy múa.', price: '60k - 100k', vibe: 'Dạo phố & Ăn vui' },
      { id: 'jp_gyudon', name: 'Cơm Bò Nhật Gyudon', emoji: '🍚', tag: 'Đậm Vị Mirin 🥩', desc: 'Ba chỉ bò Mỹ thái mỏng xào hành tây ngọt lịm với rượu Mirin và nước tương Dashi.', price: '85k - 140k', vibe: 'Nhanh gọn & Ấm áp' },
      { id: 'jp_matcha', name: 'Trà Sữa Matcha Kyoto & Kem', emoji: '🍵', tag: 'Thanh Mát Matcha 🌿', desc: 'Bột trà xanh Uji Kyoto nguyên chất đậm vị umami kết hợp sữa tươi thanh trùng.', price: '65k - 95k', vibe: 'Thư giãn & Dễ chịu' },
    ],
    homeRecipes: [
      {
        id: 'recipe_gyudon_home',
        title: 'Cơm Bò Nhật Gyudon Nhanh Gọn Chuẩn Vị Yoshinoya',
        emoji: '🍚',
        country: 'japan',
        countryName: 'Nhật Bản',
        countryFlag: '🇯🇵',
        cookTime: '20 phút',
        servings: '2 người ăn',
        difficulty: 'Dễ làm',
        tag: 'Bữa Tối Nhanh & Ngon 🍱',
        description: 'Thịt bò mềm ngọt ngấm trọn nước sốt Dashi hành tây ngọt thanh, thêm trứng lòng đào béo ngậy.',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=bZ2dM_7QW0E',
        ingredients: [
          { name: 'Ba chỉ bò Mỹ hoặc bò Úc thái mỏng', amount: '350g' },
          { name: 'Hành tây trắng thái múi cau mỏng', amount: '1 củ' },
          { name: 'Nước dùng cá ngừ Dashi (hoặc nước lọc)', amount: '200ml' },
          { name: 'Nước tương Nhật Kikkoman', amount: '3 muỗng canh' },
          { name: 'Rượu ngọt Mirin Nhật', amount: '2 muỗng canh' },
          { name: 'Rượu Sake nấu ăn & Đường', amount: 'Mỗi loại 1 muỗng canh' },
          { name: 'Trứng gà tươi ăn sống (Onsen egg)', amount: '2 quả' },
          { name: 'Gừng đỏ ngâm Beni Shoga', amount: 'Một ít trang trí' },
        ],
        steps: [
          'Cho nước Dashi, nước tương Kikkoman, rượu Mirin, Sake và đường vào chảo đun sôi.',
          'Thả hành tây vào đun sôi nhỏ lửa khoảng 5 phút cho hành chín mềm và trong veo.',
          'Thả từng lát thịt bò mỏng vào chảo, đảo nhẹ tay để thịt chín đều và không bị vón cục.',
          'Hớt sạch bọt trên mặt sốt, đun thêm 3-4 phút cho thịt bò ngấm sâu gia vị rồi tắt bếp.',
          'Múc cơm trắng nóng ra tô, gắp thịt bò và hành tây phủ kín mặt cơm, rưới nước sốt, đặt quả trứng lòng đào vào giữa và rắc thêm hành hoa.',
        ],
        coupleTip: 'Đập nhẹ lòng đỏ trứng cho tan chảy quyện vào từng sợi thịt bò thơm mềm rồi cùng nhau thưởng thức nhé! ✨',
      },
    ],
  },

  // 🇮🇹 4. ÂU - Ý
  {
    id: 'italy',
    label: 'Âu - Ý',
    flag: '🇮🇹',
    description: 'Hương vị cổ điển lãng mạn, rượu vang nồng nàn và phô mai nướng lò thơm lừng.',
    rouletteItems: [
      { id: 'it_steak', name: 'Steak Thăn Bò Sốt Tiêu Rượu Vang', emoji: '🍷', tag: 'Ánh Nến Lãng Mạn 🕯️', desc: 'Thăn bò Black Angus áp chảo bơ tỏi hương thảo chín vừa Medium-Rare mềm mọng.', price: '350k - 650k', vibe: 'Hẹn hò lãng mạn VIP' },
      { id: 'it_pizza', name: 'Pizza Lò Củi Phô Mai 4 Loại', emoji: '🍕', tag: 'Phô Mai Kéo Sợi 🧀', desc: 'Đế bánh ủ men tươi giòn xốp nướng củi sồi, phủ 4 loại phô mai Ý hảo hạng và mật ong.', price: '220k - 380k', vibe: 'Ấm cúng & Ngon miệng' },
      { id: 'it_carbonara', name: 'Mì Ý Carbonara Truyền Thống', emoji: '🍝', tag: 'Béo Ngậy Trứng Phô Mai 🥚', desc: 'Sợi mì Spaghetti Al Dente quyện sốt lòng đỏ trứng gà, thịt má heo Guanciale và tiêu đen.', price: '140k - 240k', vibe: 'Tinh tế & Cổ điển' },
      { id: 'it_truffle', name: 'Pasta Nấm Truffle Kem Tươi', emoji: '🍄', tag: 'Hương Thơm Quý Phái 👑', desc: 'Mì dẹt Tagliatelle sốt kem nấm cục đen Truffle thơm lừng quý phái và phô mai Parmesan.', price: '180k - 320k', vibe: 'Sang trọng & Quyến rũ' },
      { id: 'it_lasagna', name: 'Lasagna Thịt Bò Đút Lò', emoji: '🧀', tag: 'Đậm Đà Đút Lò 🔥', desc: 'Các lớp mì phẳng xen kẽ sốt bò bằm Bolognese và sốt bechamel nướng vàng xém.', price: '160k - 260k', vibe: 'No nê & Ấm áp' },
      { id: 'it_risotto', name: 'Cơm Ý Risotto Hải Sản', emoji: '🥘', tag: 'Nấu Rượu Vang Trắng 🦐', desc: 'Hạt gạo Arborio nấu từ từ với nước dùng tôm mực và rượu vang trắng sánh mịn ngậy béo.', price: '190k - 310k', vibe: 'Đẳng cấp & Chuẩn vị' },
      { id: 'it_bruschetta', name: 'Bánh Mì Bruschetta Cà Chua', emoji: '🥖', tag: 'Khai Vị Tươi Mát 🍅', desc: 'Bánh mì nướng giòn quẹt tỏi, phủ cà chua bi ướp húng tây Basil và dầu ô liu nguyên chất.', price: '75k - 120k', vibe: 'Thanh tao & Nhẹ nhàng' },
      { id: 'it_wine', name: 'Cocktail Sangria & Vang Đỏ', emoji: '🍸', tag: 'Ngọt Ngào Nồng Say 🍇', desc: 'Rượu vang đỏ ngâm hoa quả nhiệt đới tươi mát kích thích vị giác cho buổi tối ngọt ngào.', price: '120k - 200k', vibe: 'Chill nồng say' },
    ],
    homeRecipes: [
      {
        id: 'recipe_bolognese_home',
        title: 'Mì Ý Sốt Bò Bằm Bolognese Cổ Điển',
        emoji: '🍝',
        country: 'italy',
        countryName: 'Âu - Ý',
        countryFlag: '🇮🇹',
        cookTime: '30 phút',
        servings: '2 người ăn',
        difficulty: 'Dễ làm',
        tag: 'Bữa Tối Lãng Mạn Tại Nhà 🕯️',
        description: 'Sợi mì Spaghetti chín tới dai dai quyện trong nước sốt thịt bò cà chua thơm lừng thảo mộc Ý.',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=a8_7w5B3q2Y',
        ingredients: [
          { name: 'Mì Spaghetti Barilla số 5', amount: '200g' },
          { name: 'Thịt bò tươi xay nhuyễn', amount: '300g' },
          { name: 'Cà chua chín băm nhỏ & Sốt cà chua hộp', amount: '2 quả & 150g' },
          { name: 'Hành tây & Tỏi băm nhuyễn', amount: '1/2 củ & 3 tép' },
          { name: 'Dầu ô liu nguyên chất & Bơ lạt', amount: '2 muỗng canh' },
          { name: 'Lá kinh giới Oregano & Húng tây Basil khô', amount: '1 muỗng cà phê' },
          { name: 'Phô mai bột Parmesan rắc mặt', amount: '50g' },
        ],
        steps: [
          'Đun sôi nồi nước lớn với 1 thìa muối, thả mì Spaghetti vào luộc trong 8-9 phút cho chín Al Dente rồi vớt ra để ráo, giữ lại 1/2 chén nước luộc mì.',
          'Phi thơm tỏi và hành tây băm với dầu ô liu trong chảo lớn đến khi hành chuyển trong suốt.',
          'Cho thịt bò xay vào xào ở lửa lớn, dùng muỗng dằm tơi thịt cho săn lại.',
          'Đổ sốt cà chua và cà chua tươi vào đảo đều, nêm muối, tiêu, lá thơm Oregano, đun nhỏ lửa trong 15 phút cho sốt sánh đậm đà.',
          'Trút mì Spaghetti và chút nước luộc mì vào chảo sốt đảo đều trong 1 phút cho sợi mì ngấm sốt óng ả. Gắp ra đĩa sâu lòng và rắc thật nhiều phô mai Parmesan lên trên.',
        ],
        coupleTip: 'Bật một bản nhạc Jazz cổ điển, thắp một ngọn nến thơm và cùng rót 2 ly vang đỏ để bắt đầu bữa tối nhé! 🍷🕯️',
      },
    ],
  },

  // 🍰 5. TRÁNG MIỆNG & CAFE
  {
    id: 'dessert',
    label: 'Tráng Miệng & Cafe',
    flag: '🍰',
    description: 'Hảo ngọt mê ly, không gian chill ngắm phố và chụp ảnh check-in siêu xinh.',
    rouletteItems: [
      { id: 'de_milktea', name: 'Trà Sữa Trân Châu Đường Đen', emoji: '🧋', tag: 'Ngọt Ngào Quen Thuộc 🧋', desc: 'Trà sữa đậm vị trà lài hoặc ô long, trân châu hoàng kim dai giòn béo ngậy.', price: '45k - 75k', vibe: 'Vui vẻ & Đáng yêu' },
      { id: 'de_bingsu', name: 'Bingsu Tuyết Xoài Phô Mai', emoji: '🍧', tag: 'Mát Lạnh Tuyết Mịn 🥭', desc: 'Tuyết sữa mềm tan trong miệng phủ đầy xoài cát chín ngọt và viên kem phô mai béo.', price: '120k - 180k', vibe: 'Check-in chụp ảnh' },
      { id: 'de_tiramisu', name: 'Bánh Tiramisu Cafe Rượu Rhum', emoji: '🍰', tag: 'Hương Vị Tình Yêu Ý 🍫', desc: 'Lớp kem phô mai Mascarpone mềm mượt thấm đẫm hương cafe espresso và bột cacao đắng nhẹ.', price: '65k - 95k', vibe: 'Lãng mạn & Tinh tế' },
      { id: 'de_eggcaffee', name: 'Cafe Trứng Hà Nội Béo Ngậy', emoji: '☕', tag: 'Nồng Ấm Hà Thành ☕', desc: 'Lớp kem trứng đánh bông mịn như mây béo ngậy phủ trên nền cafe phin đậm đà thơm phức.', price: '45k - 70k', vibe: 'Hoài niệm & Thư giãn' },
      { id: 'de_flan', name: 'Bánh Flan Caramen Cốt Dừa', emoji: '🍮', tag: 'Mềm Mịn Tan Chảy 🍮', desc: 'Bánh flan mềm mượt không rỗ, đẫm caramen đắng ngọt và cafe đá xay béo ngậy.', price: '25k - 45k', vibe: 'Bình dân & Dễ thương' },
      { id: 'de_croissant', name: 'Bánh Sừng Bò Croissant Trứng Muối', emoji: '🥐', tag: 'Nghìn Lớp Giòn Rụm 🥐', desc: 'Bánh nướng bơ Pháp thơm nức ngập tràn sốt trứng muối tan chảy béo ngậy.', price: '55k - 85k', vibe: 'Tiệm bánh xinh' },
      { id: 'de_che', name: 'Chè Bưởi An Giang Nước Cốt Dừa', emoji: '🥥', tag: 'Giòn Sần Sật 🥥', desc: 'Cùi bưởi giòn sần sật khử đắng kỹ lưỡng, đậu xanh bùi bùi và nước cốt dừa sánh mịn.', price: '30k - 50k', vibe: 'Mát lành giải nhiệt' },
      { id: 'de_matcha_latte', name: 'Matcha Latte Sữa Yến Mạch', emoji: '🍵', tag: 'Healthy Thanh Mát 🌿', desc: 'Trà xanh Nhật Bản đánh bông thơm mát kết hợp sữa hạt yến mạch béo nhẹ không ngọt gắt.', price: '60k - 85k', vibe: 'Thảnh thơi cuối tuần' },
    ],
    homeRecipes: [
      {
        id: 'recipe_tiramisu_home',
        title: 'Bánh Tiramisu Không Cần Lò Nướng',
        emoji: '🍰',
        country: 'dessert',
        countryName: 'Tráng Miệng & Cafe',
        countryFlag: '🍰',
        cookTime: '25 phút (để lạnh 2h)',
        servings: '2 người ăn',
        difficulty: 'Dễ làm',
        tag: 'Bánh Tình Yêu Ngọt Ngào 💕',
        description: 'Tiramisu bồng bềnh béo mịn mát lạnh, hương cafe nồng say cho buổi tối ngọt ngào nhất.',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=J6z0fC_0GZQ',
        ingredients: [
          { name: 'Bánh sâm-panh (Ladyfingers / Savoiardi)', amount: '12-14 cái' },
          { name: 'Phô mai Mascarpone', amount: '250g (để nhiệt độ phòng)' },
          { name: 'Whipping Cream (Kem tươi)', amount: '150ml' },
          { name: 'Cafe Espresso đậm đặc hoặc cafe đen hòa tan', amount: '150ml' },
          { name: 'Đường bột & Tinh chất Vani', amount: '50g & 1 thìa cà phê' },
          { name: 'Rượu Rhum hoặc Baileys (tùy chọn)', amount: '1 muỗng canh' },
          { name: 'Bột Cacao nguyên chất rắc mặt', amount: '2 muỗng canh' },
        ],
        steps: [
          'Pha cafe đen đậm với 1 thìa đường và 1 thìa rượu Rhum, để nguội.',
          'Dùng máy đánh trứng đánh bông mềm Whipping cream với đường bột và vani.',
          'Dằm nhuyễn phô mai Mascarpone rồi nhẹ nhàng fold (trộn) đều cùng whipping cream đã đánh bông thành hỗn hợp kem mịn mượt.',
          'Nhúng nhanh từng chiếc bánh sâm-panh vào cafe (1-2 giây mỗi mặt) rồi xếp một lớp vào ly hoặc khuôn thủy tinh.',
          'Phủ một lớp kem Mascarpone lên bánh, lặp lại lớp bánh thứ hai và phủ lớp kem còn lại trên cùng. Để ngăn mát tủ lạnh 2-3 tiếng.',
          'Trước khi ăn rây đều một lớp bột Cacao nguyên chất kín mặt bánh.',
        ],
        coupleTip: 'Cầm chung một chiếc thìa nhỏ và cùng nhau nếm thử lớp kem mịn màng đầu tiên nhé! 💖',
      },
    ],
  },
];
