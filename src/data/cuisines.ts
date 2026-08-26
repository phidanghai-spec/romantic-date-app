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
  coupleTip: string; // Mẹo nhỏ để buổi nấu ăn đôi ngọt ngào hơn
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
      { id: 'vn_ocxao', name: 'Ốc Xào Bơ Tỏi', emoji: '🦪', tag: 'Náo Nhiệt 🍻', desc: 'Ốc hương sốt trứng muối / bơ tỏi thơm lừng kèm bánh mì nóng và trà tắc.', price: '120k - 250k', vibe: 'Vỉa hè & Chill tối' },
    ],
    homeRecipes: [
      {
        id: 'rec_suon_xao',
        title: 'Sườn Xào Chua Ngọt Hoàng Kim',
        emoji: '🍖',
        country: 'vietnam',
        countryName: 'Việt Nam',
        countryFlag: '🇻🇳',
        cookTime: '30 phút',
        servings: '2 người',
        difficulty: 'Dễ làm',
        tag: 'Món Cơm Gia Đình 🍚',
        description: 'Sườn non mềm mọng sốt óng ánh chua ngọt chuẩn vị đưa cơm, một người ướp sườn một người pha sốt cực kỳ ăn ý!',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+lam+suon+xao+chua+ngot+ngon',
        ingredients: [
          { name: 'Sườn non heo tươi', amount: '500g (chặt miếng vừa ăn)' },
          { name: 'Hành tím, tỏi băm nhuyễn', amount: '3 củ' },
          { name: 'Nước mắm ngon', amount: '2 thìa canh' },
          { name: 'Đường cát / Đường thốt nốt', amount: '2 thìa canh' },
          { name: 'Giấm gạo hoặc nước cốt chanh', amount: '2 thìa canh' },
          { name: 'Tương cà chua (Ketchup)', amount: '1 thìa canh tạo màu' },
          { name: 'Hành lá, ớt sừng cắt sợi', amount: '2 nhánh' },
          { name: 'Dầu ăn, hạt nêm, tiêu xay', amount: 'Vừa đủ' },
        ],
        steps: [
          'Chần sơ sườn qua nước sôi có gừng đập dập khoảng 2 phút để khử mùi, sau đó vớt ra rửa sạch để ráo.',
          'Ướp sườn với 1 thìa hạt nêm, 1 thìa hành tỏi băm và chút tiêu xay trong 15 phút.',
          'Pha chén nước sốt thần thánh: 2 thìa nước mắm + 2 thìa đường + 2 thìa giấm + 1 thìa tương cà + 3 thìa nước lọc, khuấy tan đều.',
          'Rán sườn trên chảo với lửa vừa cho đến khi xém vàng đều 2 mặt rồi gắp ra dĩa.',
          'Phi thơm phần tỏi ớt còn lại, đổ chén nước sốt vào đun sôi sền sệt, trút sườn vào đảo đều lửa nhỏ 7 phút cho sốt ngấm đều bóng bẩy.',
          'Bày ra đĩa, rắc hành lá và tiêu lên trên, ăn cùng cơm nóng dẻo.',
        ],
        coupleTip: 'Hãy phân chia: bạn nam chiên sườn xém vàng, bạn nữ nếm và cân chỉnh độ chua ngọt của chén sốt nhé! 💕',
      },
      {
        id: 'rec_canh_ga_chien_mam',
        title: 'Cánh Gà Chiên Nước Mắm Tỏi Ớt',
        emoji: '🍗',
        country: 'vietnam',
        countryName: 'Việt Nam',
        countryFlag: '🇻🇳',
        cookTime: '25 phút',
        servings: '2 người',
        difficulty: 'Dễ làm',
        tag: 'Ăn Vặt & Nhậu Chill 🍺',
        description: 'Vỏ ngoài giòn rụm đậm đà, bên trong thịt gà mọng nước thơm nức mùi bơ tỏi ớt.',
        image: 'https://images.unsplash.com/photo-1527477378372-14070a7b689a?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+lam+canh+ga+chien+nuoc+mam',
        ingredients: [
          { name: 'Cánh gà hoặc đùi gà khúc giữa', amount: '600g' },
          { name: 'Tỏi băm thật nhiều', amount: '2 củ lớn' },
          { name: 'Ớt tươi băm nhỏ', amount: '2 quả' },
          { name: 'Nước mắm truyền thống', amount: '3 thìa canh' },
          { name: 'Đường cát', amount: '2.5 thìa canh' },
          { name: 'Tương ớt', amount: '1 thìa canh' },
          { name: 'Bột bắp hoặc bột chiên giòn', amount: '2 thìa canh' },
          { name: 'Bơ thực vật Tường An', amount: '1 thìa cà phê' },
        ],
        steps: [
          'Rửa sạch cánh gà bằng muối và giấm, khía nhẹ mặt trong để ngấm gia vị.',
          'Áo một lớp mỏng bột bắp lên cánh gà để khi chiên da gà giòn lâu và không bị bắn dầu.',
          'Chiên gà ngập dầu với lửa vừa đến khi vàng giòn rụm cả 2 mặt, vớt ra giấy thấm dầu.',
          'Pha sốt mắm: 3 thìa mắm + 2.5 thìa đường + 1 thìa tương ớt + 1 thìa nước lọc.',
          'Làm nóng chảo với chút bơ, phi vàng thơm tỏi ớt băm, đổ sốt mắm vào đun sôi lăn tăn.',
          'Trút cánh gà vào đảo nhanh tay trên lửa lớn 2 phút cho sốt áo đều cánh gà vàng óng.',
        ],
        coupleTip: 'Chuẩn bị thêm 2 lon nước ngọt ướp lạnh hoặc bia hoa quả để cùng nhau thưởng thức vừa xem phim nhé!',
      },
      {
        id: 'rec_bo_sot_vang',
        title: 'Bò Sốt Vang Quế Hồi Chấm Bánh Mì',
        emoji: '🥖',
        country: 'vietnam',
        countryName: 'Việt Nam',
        countryFlag: '🇻🇳',
        cookTime: '45 phút',
        servings: '2 người',
        difficulty: 'Trung bình',
        tag: 'Bữa Tối Ấm Cúng 🍷',
        description: 'Thịt dẻ sườn bò hầm mềm rục cùng rượu vang đỏ, hoa hồi, quế thơm nức mũi chấm bánh mì giòn tan.',
        image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+lam+bo+sot+vang+cham+banh+mi',
        ingredients: [
          { name: 'Dẻ sườn hoặc nạm bò có gân', amount: '500g' },
          { name: 'Rượu vang đỏ (vang Đà Lạt / vang Pháp)', amount: '100ml' },
          { name: 'Cà chua chín băm nhỏ', amount: '2 quả' },
          { name: 'Khoai tây, cà rốt tỉa hoa', amount: 'Mỗi loại 1 củ' },
          { name: 'Hoa hồi, quế, thảo quả', amount: 'Mỗi loại 1 nhánh' },
          { name: 'Sốt cà chua (Tomato paste)', amount: '2 thìa canh' },
          { name: 'Bơ lạt, tỏi, gừng băm', amount: '2 thìa canh' },
          { name: 'Bánh mì nóng giòn ăn kèm', amount: '4 ổ' },
        ],
        steps: [
          'Thịt bò cắt khối vuông 3cm, ướp với gừng băm, 1/2 lượng rượu vang, hạt nêm, tiêu và ngũ vị hương trong 30 phút.',
          'Xào cà chua chín nhừ tạo màu, cho sốt cà chua paste và bơ vào xào cùng.',
          'Phi thơm tỏi, cho thịt bò vào xào săn trên lửa lớn, sau đó trút cà chua đã xào vào.',
          'Đổ nước ngập mặt thịt, thả hoa hồi, quế vào hầm lửa nhỏ khoảng 35 phút cho bò mềm nhừ.',
          'Cho khoai tây, cà rốt và phần rượu vang còn lại vào hầm thêm 10 phút cho rau củ chín mềm, nước sốt sánh mịn.',
          'Múc ra tô, trang trí rau mùi ta và thưởng thức nóng hổi cùng bánh mì giòn rụm.',
        ],
        coupleTip: 'Món ăn hoàn hảo cho những buổi tối se lạnh cuối tuần bên ánh nến lãng mạn!',
      },
    ],
  },

  // 🇰🇷 2. HÀN QUỐC
  {
    id: 'korea',
    label: 'Hàn Quốc',
    flag: '🇰🇷',
    description: 'Vị cay nồng quyến rũ của Gochujang và phô mai kéo sợi chuẩn phim K-Drama.',
    rouletteItems: [
      { id: 'kr_kbbq', name: 'K-BBQ Nướng Than', emoji: '🥩', tag: 'Chàng Khoái 🍖', desc: 'Dẻ sườn bò ướp sốt nướng than hồng xèo xèo, cuộn lá mè tỏi ớt và kimchi giòn.', price: '300k - 500k', vibe: 'Xèo xèo & Thơm nức' },
      { id: 'kr_tok', name: 'Tokbokki Phô Mai', emoji: '🥘', tag: 'Cay Kéo Sợi 🌶️', desc: 'Bánh gạo dẻo quánh đẫm sốt tương ớt Hàn Quốc kéo sợi phô mai mozzarella béo ngậy.', price: '90k - 180k', vibe: 'Cay xuýt xoa & Ngon' },
      { id: 'kr_canhkimchi', name: 'Canh Kim Chi Bò', emoji: '🍲', tag: 'Nóng Hổi ♨️', desc: 'Canh kimchi chua cay hầm thịt ba chỉ bò mềm và đậu hũ non ấm lòng ngày mưa.', price: '120k - 180k', vibe: 'Ấm áp & Đậm vị' },
      { id: 'kr_garan', name: 'Gà Rán Sốt Cay', emoji: '🍗', tag: 'Giòn Rụm 🍗', desc: 'Gà rán sốt mật ong tỏi hoặc sốt cay ngọt giòn tan nhâm nhi cùng bia mát lạnh.', price: '150k - 280k', vibe: 'Náo nhiệt & Vui tươi' },
      { id: 'kr_mituongden', name: 'Mì Tương Đen Jajang', emoji: '🥢', tag: 'Chuẩn Vị K-Drama 🥢', desc: 'Sợi mì tươi dai quyện sốt tương đen Chunjang thịt heo và dưa leo giòn rụm.', price: '75k - 120k', vibe: 'Hài hước & Phim ảnh' },
      { id: 'kr_bibimbap', name: 'Cơm Trộn Bibimbap', emoji: '🍚', tag: 'Đầy Đủ 🥗', desc: 'Cơm thố đá nóng xèo xèo trộn thịt bò băm, rau củ xào, trứng lòng đào và sốt Gochujang.', price: '85k - 130k', vibe: 'Nhiều màu sắc & Bổ dưỡng' },
      { id: 'kr_lauquandoi', name: 'Lẩu Quân Đội Budae', emoji: '🍲', tag: 'Ngập Topping 🧀', desc: 'Xúc xích khói, thịt hộp Spam, mì gói Shin, phô mai và đậu hũ hầm nước súp cay nồng.', price: '220k - 380k', vibe: 'No nê & Ấm cúng' },
      { id: 'kr_kimbap', name: 'Kimbap Chiên Giòn', emoji: '🍙', tag: 'Thơm Ngon 🍱', desc: 'Cơm cuộn rong biển nhân thanh cua trứng xúc xích lăn bột chiên xù giòn tan.', price: '60k - 90k', vibe: 'Ăn nhẹ & Ngọt ngào' },
    ],
    homeRecipes: [
      {
        id: 'rec_tokbokki_cheese',
        title: 'Tokbokki Chả Cá Phô Mai Kéo Sợi',
        emoji: '🧀',
        country: 'korea',
        countryName: 'Hàn Quốc',
        countryFlag: '🇰🇷',
        cookTime: '20 phút',
        servings: '2 người',
        difficulty: 'Dễ làm',
        tag: 'K-Drama Cooking 🎬',
        description: 'Bánh gạo dẻo mềm đẫm sốt cay ngọt Hàn Quốc, ngập tràn chả cá xoắn và phô mai Mozzarella kéo sợi béo ngậy.',
        image: 'https://images.unsplash.com/photo-1583032015879-66a9871bb5d1?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+lam+tokbokki+pho+mai+tai+nha',
        ingredients: [
          { name: 'Bánh gạo Tokbokki tươi', amount: '350g' },
          { name: 'Chả cá Hàn Quốc (Eomuk)', amount: '3 miếng cắt tam giác' },
          { name: 'Phô mai Mozzarella bào sợi', amount: '150g' },
          { name: 'Tương ớt Hàn Quốc (Gochujang)', amount: '2 thìa canh' },
          { name: 'Ớt bột Hàn Quốc (Gochugaru)', amount: '1 thìa canh' },
          { name: 'Nước tương, đường cát, siro ngô', amount: 'Mỗi loại 1 thìa' },
          { name: 'Hành boaro (tỏi tây), trứng gà luộc', amount: '1 cây, 2 quả' },
          { name: 'Nước dùng cá cơm hoặc nước lọc', amount: '400ml' },
        ],
        steps: [
          'Đun sôi 400ml nước dùng trong chảo sâu lòng.',
          'Hòa tan sốt: 2 thìa Gochujang + 1 thìa ớt bột + 1 thìa nước tương + 1 thìa đường + 1 thìa siro ngô vào chảo.',
          'Khi nước sốt sôi lăn tăn, cho bánh gạo và chả cá vào đảo đều lửa vừa khoảng 5-7 phút cho bánh gạo ngấm sốt dẻo quánh.',
          'Thêm trứng gà luộc bóc vỏ và hành boaro cắt xéo vào đảo thêm 1 phút.',
          'Rải đều phô mai Mozzarella lên trên mặt chảo, đậy nắp vung 2 phút cho phô mai tan chảy kéo sợi hoàn hảo.',
          'Rắc chút mè trắng rang lên mặt và thưởng thức ngay khi còn nóng hổi!',
        ],
        coupleTip: 'Cùng nhau kéo sợi phô mai đút cho nhau ăn và thi xem phô mai của ai kéo dài hơn nhé! 🧀💕',
      },
      {
        id: 'rec_canh_rong_bien',
        title: 'Canh Rong Biển Thịt Bò Sinh Nhật',
        emoji: '🍲',
        country: 'korea',
        countryName: 'Hàn Quốc',
        countryFlag: '🇰🇷',
        cookTime: '25 phút',
        servings: '2 người',
        difficulty: 'Dễ làm',
        tag: 'Thanh Nhẹ & Ấm Áp 🍃',
        description: 'Món canh truyền thống thể hiện tình cảm chăm sóc yêu thương, nước canh thanh ngọt thịt bò và thơm nồng dầu mè.',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+nau+canh+rong+bien+thit+bo',
        ingredients: [
          { name: 'Rong biển khô Hàn Quốc (Miyeok)', amount: '20g' },
          { name: 'Thịt thăn bò tươi thái mỏng', amount: '200g' },
          { name: 'Dầu mè thơm Hàn Quốc', amount: '1.5 thìa canh' },
          { name: 'Tỏi băm nhuyễn', amount: '1 thìa canh' },
          { name: 'Nước tương guk-ganjang / hạt nêm', amount: '2 thìa canh' },
          { name: 'Nước lọc', amount: '800ml' },
        ],
        steps: [
          'Ngâm rong biển khô trong nước lạnh 15 phút cho nở mềm, vớt ra bóp muối rửa sạch rồi cắt khúc vừa ăn.',
          'Thịt bò ướp với chút tỏi băm, tiêu và 1 thìa dầu mè.',
          'Làm nóng nồi, cho dầu mè vào xào thịt bò chín tái, sau đó trút rong biển vào xào chung 2 phút cho thơm.',
          'Đổ 800ml nước vào đun sôi lớn, hớt bọt rồi hạ lửa nhỏ đun liu riu 15 phút cho nước ngọt.',
          'Nêm nước tương và hạt nêm cho vừa miệng, múc ra tô thưởng thức cùng cơm trắng nóng dẻo.',
        ],
        coupleTip: 'Nấu món này vào ngày kỷ niệm hoặc khi người ấy cảm thấy mệt mỏi sẽ cực kỳ ghi điểm đấy!',
      },
    ],
  },

  // 🇯🇵 3. NHẬT BẢN
  {
    id: 'japan',
    label: 'Nhật Bản',
    flag: '🇯🇵',
    description: 'Nghệ thuật ẩm thực tinh tế, thanh tao và tươi ngon hàng đầu thế giới.',
    rouletteItems: [
      { id: 'jp_ramen', name: 'Ramen Xương Hầm', emoji: '🍜', tag: 'Tinh Túy 🍲', desc: 'Nước dùng Tonkotsu hầm xương 14 tiếng béo ngậy, thịt chashu mềm tan và trứng lòng đào.', price: '120k - 190k', vibe: 'Yên tĩnh & Ấm áp' },
      { id: 'jp_sushi', name: 'Sushi & Sashimi Tươi', emoji: '🍣', tag: 'Tươi Ngon 🐟', desc: 'Cá hồi Na Uy và cá ngừ tươi béo mềm tan chấm mù tạt wasabi cay nồng.', price: '180k - 400k', vibe: 'Tinh tế & Sang trọng' },
      { id: 'jp_unagi', name: 'Cơm Lươn Nhật Unagi', emoji: '🍱', tag: 'Bổ Dưỡng 🍚', desc: 'Lươn nướng sốt ngọt Teriyaki bóng bẩy trên nền cơm trắng dẻo hạt Nhật Bản.', price: '160k - 290k', vibe: 'Dinh dưỡng & Đẳng cấp' },
      { id: 'jp_teriyaki', name: 'Bò Sốt Teriyaki', emoji: '🥩', tag: 'Đậm Đà 🥢', desc: 'Thịt bò xào sốt Teriyaki Nhật Bản óng ánh mè rang ăn cùng cơm nóng.', price: '110k - 200k', vibe: 'Dễ ăn & Thơm lừng' },
      { id: 'jp_okonomi', name: 'Bánh Xèo Okonomiyaki', emoji: '🥞', tag: 'Độc Đáo 🐙', desc: 'Bánh xèo bắp cải hải sản phủ sốt ngọt, mayonnaise và cá bào Katsuobushi nhảy múa.', price: '80k - 140k', vibe: 'Vui nhộn & Thơm ngậy' },
      { id: 'jp_shabu', name: 'Lẩu Shabu Shabu', emoji: '🍲', tag: 'Nhúng Thịt Bò 🥩', desc: 'Thịt bò Wagyu nhúng nước dùng dashi thanh ngọt chấm sốt mè rang béo bùi.', price: '280k - 550k', vibe: 'Lãng mạn & Tinh tế' },
      { id: 'jp_tempura', name: 'Tempura Tôm Giòn', emoji: '🍤', tag: 'Vàng Rụm 🍤', desc: 'Tôm sú tươi tẩm bột tempura chiên phồng giòn xốp chấm nước sốt củ cải mài.', price: '90k - 160k', vibe: 'Giòn tan & Nhẹ nhàng' },
      { id: 'jp_yakitori', name: 'Gà Nướng Yakitori', emoji: '🍢', tag: 'Xiên Nướng 🍢', desc: 'Xiên gà nướng than hoa phết sốt Tare mặn ngọt ăn kèm bia tươi Asahi.', price: '60k - 120k', vibe: 'Chill & Quán Izakaya' },
    ],
    homeRecipes: [
      {
        id: 'rec_com_ga_teriyaki',
        title: 'Cơm Gà Sốt Teriyaki Nhật Bản',
        emoji: '🍱',
        country: 'japan',
        countryName: 'Nhật Bản',
        countryFlag: '🇯🇵',
        cookTime: '20 phút',
        servings: '2 người',
        difficulty: 'Dễ làm',
        tag: 'Bữa Tối Tinh Tế 🍚',
        description: 'Đùi gà lọc xương áp chảo da giòn rụm, thịt mọng nước đẫm sốt Teriyaki óng ả rắc mè trắng.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+lam+com+ga+teriyaki+tai+nha',
        ingredients: [
          { name: 'Má đùi gà lọc bỏ xương', amount: '450g' },
          { name: 'Nước tương Nhật (Kikkoman)', amount: '3 thìa canh' },
          { name: 'Rượu nấu ăn Mirin', amount: '2 thìa canh' },
          { name: 'Đường cát / Mật ong', amount: '1.5 thìa canh' },
          { name: 'Gừng tươi gọt vỏ băm nhỏ', amount: '1 nhánh nhỏ' },
          { name: 'Bông cải xanh / Cà rốt luộc kèm', amount: '100g' },
          { name: 'Mè trắng rang thơm', amount: '1 thìa cà phê' },
        ],
        steps: [
          'Dùng dĩa châm nhẹ lên mặt da gà để khi áp chảo không bị co rút.',
          'Pha chén sốt Teriyaki: 3 thìa nước tương + 2 thìa rượu Mirin + 1.5 thìa đường + 1 thìa gừng băm + 2 thìa nước lọc.',
          'Đặt mặt da gà xuống chảo không dính (không cần cho dầu), áp chảo lửa vừa 6 phút cho da gà vàng giòn chảy bớt mỡ.',
          'Lật mặt thịt áp chảo tiếp 3 phút cho thịt chín 80%.',
          'Đổ chén sốt Teriyaki vào chảo, đun lửa vừa cho sốt sôi sủi bọt, lật đều 2 mặt gà cho sốt sánh đặc óng ả phủ đều miếng gà.',
          'Gắp gà ra thớt cắt lát dày 1.5cm, xếp lên tô cơm nóng cùng rau củ luộc, rưới nước sốt và rắc mè trắng lên trên.',
        ],
        coupleTip: 'Bày trí đĩa cơm thật đẹp mắt phong cách Bento Nhật Bản và chụp một bức ảnh kỷ niệm nhé!',
      },
    ],
  },

  // 🇮🇹 4. ÂU - Ý & LÃNG MẠN
  {
    id: 'italy',
    label: 'Âu - Ý',
    flag: '🇮🇹',
    description: 'Hương vị bơ tỏi, rượu vang đỏ và phô mai nung chảy trong ánh nến lung linh.',
    rouletteItems: [
      { id: 'eu_steak', name: 'Steak Thăn Bò Sốt Tiêu', emoji: '🍷', tag: 'Lãng Mạn 🕯️', desc: 'Thăn bò Black Angus nướng medium rare sốt tiêu đen bên ly rượu vang đỏ nồng nàn.', price: '280k - 550k', vibe: 'Ánh nến & Rượu vang' },
      { id: 'eu_pizza', name: 'Pizza Lò Củi Phô Mai', emoji: '🍕', tag: 'Thủ Công 🍕', desc: 'Đế bánh mỏng giòn nướng lò củi phủ phô mai Mozzarella tươi và sốt cà chua Ý.', price: '180k - 320k', vibe: 'Ấm cúng & Chia sẻ' },
      { id: 'eu_pasta', name: 'Mì Ý Carbonara Béo Ngậy', emoji: '🍝', tag: 'Béo Ngậy 🧀', desc: 'Sợi mì spaghetti quyện sốt lòng đỏ trứng gà, phô mai Pecorino và thịt xông khói giòn.', price: '120k - 190k', vibe: 'Tinh tế & Thơm bơ' },
      { id: 'eu_salad', name: 'Salad Cá Hồi Sốt Bơ', emoji: '🥗', tag: 'Thanh Mát 🥑', desc: 'Cá hồi áp chảo, quả bơ béo bùi, rau rocket và sốt dầu giấm balsamic chua thanh.', price: '140k - 220k', vibe: 'Healthy & Sang trọng' },
      { id: 'eu_soup', name: 'Súp Bí Đỏ Kem Tươi', emoji: '🥣', tag: 'Mịn Màng 🥣', desc: 'Súp bí đỏ sánh mịn thơm bơ tỏi ăn kèm bánh mì bơ nướng giòn rụm.', price: '70k - 120k', vibe: 'Nhẹ nhàng & Ấm lòng' },
      { id: 'eu_potato', name: 'Khoai Tây Đút Lò Phô Mai', emoji: '🥔', tag: 'Thơm Lừng 🧀', desc: 'Khoai tây cắt lát nướng kem sữa béo ngậy phủ phô mai nướng vàng cháy xém.', price: '85k - 140k', vibe: 'Béo bùi & Đưa miệng' },
      { id: 'eu_lasagna', name: 'Lasagna Phô Mai Nướng', emoji: '🧀', tag: 'Đậm Đà 🇮🇹', desc: 'Từng lớp mì lá xen kẽ sốt thịt bò băm Bolognese đẫm sốt kem bechamel béo ngậy.', price: '150k - 230k', vibe: 'Đậm vị Ý & No nê' },
      { id: 'eu_risotto', name: 'Risotto Nấm Truffle', emoji: '🍚', tag: 'Thượng Hạng ✨', desc: 'Cơm Ý hầm nước dùng rượu vang quyện phô mai Parmesan và nấm hương thảo.', price: '160k - 280k', vibe: 'Lãng mạn & Quý phái' },
    ],
    homeRecipes: [
      {
        id: 'rec_pasta_bolognese',
        title: 'Mì Ý Sốt Bò Băm Bolognese Cổ Điển',
        emoji: '🍝',
        country: 'italy',
        countryName: 'Âu - Ý',
        countryFlag: '🇮🇹',
        cookTime: '25 phút',
        servings: '2 người',
        difficulty: 'Dễ làm',
        tag: 'Buổi Hẹn Pasta & Wine 🍷',
        description: 'Sợi mì Spaghetti chuẩn al dente đẫm sốt cà chua thịt bò băm thơm lừng lá nguyệt quế và phô mai Parmesan.',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+lam+mi+y+sot+bo+bam+bolognese',
        ingredients: [
          { name: 'Mì Spaghetti Ý số 5', amount: '200g' },
          { name: 'Thịt bò xay tươi', amount: '300g' },
          { name: 'Cà chua chín băm nhỏ', amount: '3 quả' },
          { name: 'Hành tây thái hạt lựu', amount: '1/2 củ' },
          { name: 'Tỏi băm', amount: '1 thìa canh' },
          { name: 'Sốt cà chua hộp (Tomato puree)', amount: '100g' },
          { name: 'Dầu ô liu, lá Oregano / Húng tây khô', amount: '1 thìa cà phê' },
          { name: 'Phô mai Parmesan bào nhuyễn', amount: 'Tùy thích' },
        ],
        steps: [
          'Đun sôi nồi nước lớn với 1 thìa cà phê muối, cho mì vào luộc trong 8-9 phút cho chín vừa tới (al dente), vớt ra trộn chút dầu ô liu.',
          'Phi thơm tỏi và hành tây với 2 thìa dầu ô liu cho mềm ngọt.',
          'Cho thịt bò xay vào xào săn trên lửa lớn, nêm chút muối tiêu.',
          'Trút cà chua băm và sốt cà chua puree vào xào đều, thêm 1/2 chén nước luộc mì và đun nhỏ lửa 10 phút cho sốt sánh đặc thơm lừng.',
          'Rắc lá Oregano và nêm nếm lại sốt cho vừa miệng.',
          'Gắp mì ra đĩa, múc sốt bò băm nóng hổi rưới lên trên, bào phô mai Parmesan phủ kín mặt.',
        ],
        coupleTip: 'Bật một bản nhạc Jazz Lo-fi nhẹ nhàng, rót 2 ly vang đỏ để bắt đầu bữa tối lãng mạn tại gia nhé!',
      },
      {
        id: 'rec_steak_bo',
        title: 'Steak Bò Bơ Tỏi Sốt Tiêu Đen Kèm Măng Tây',
        emoji: '🥩',
        country: 'italy',
        countryName: 'Âu - Ý',
        countryFlag: '🇮🇹',
        cookTime: '20 phút',
        servings: '2 người',
        difficulty: 'Dễ làm',
        tag: 'Fine Dining Tại Nhà 🕯️',
        description: 'Miếng thăn bò nướng chảo gang xém cạnh thơm nức mùi bơ tỏi lá hương thảo, thịt mọng nước mềm tan.',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+lam+steak+bo+sot+tieu+den',
        ingredients: [
          { name: 'Thăn lưng bò Mỹ / Úc (Ribeye hoặc Striploin)', amount: '2 miếng (mỗi miếng 250g, dày 2.5cm)' },
          { name: 'Bơ lạt Anchor', amount: '40g' },
          { name: 'Tỏi nguyên tép đập dập', amount: '4 tép' },
          { name: 'Lá hương thảo tươi (Rosemary)', amount: '2 nhánh' },
          { name: 'Muối biển hạt, tiêu đen xay thô', amount: 'Vừa đủ' },
          { name: 'Măng tây tươi / Khoai tây bi', amount: '150g' },
          { name: 'Sốt tiêu đen pha sẵn hoặc tự nấu', amount: '4 thìa canh' },
        ],
        steps: [
          'Thấm thật khô miếng bò bằng giấy ăn. Rắc đều muối biển và tiêu đen lên cả 2 mặt miếng bò 5 phút trước khi áp chảo.',
          'Đun chảo gang thật nóng với 1 thìa dầu ô liu đến khi bốc khói nhẹ.',
          'Đặt miếng bò vào áp chảo lửa lớn: 2 phút mỗi mặt không lật để tạo lớp vỏ xém nâu giòn rụm.',
          'Hạ nhỏ lửa, cho bơ lạt, tỏi và nhánh hương thảo vào chảo. Dùng thìa múc bơ chảy rưới liên tục lên mặt miếng bò trong 1.5 phút.',
          'Gắp bò ra thớt sạch, ĐỂ NGHỈ (Resting) 5 phút để nước ngọt ngấm ngược vào từng thớ thịt.',
          'Dùng chảo đó xào nhanh măng tây 2 phút với bơ tỏi còn sót lại.',
          'Cắt lát bò xếp ra đĩa cùng măng tây, rưới sốt tiêu đen nóng ấm lên trên.',
        ],
        coupleTip: 'Quy tắc vàng: Nhất định phải để thịt bò nghỉ 5 phút trước khi cắt để thịt không bị chảy mất nước ngọt!',
      },
    ],
  },

  // 🍰 5. TRÁNG MIỆNG & CAFE
  {
    id: 'dessert',
    label: 'Tráng Miệng & Cafe',
    flag: '🍰',
    description: 'Những món ngọt ngào êm dịu xua tan mọi mệt mỏi và làm buổi hẹn thêm trọn vẹn.',
    rouletteItems: [
      { id: 'de_trasua', name: 'Trà Sữa Trân Châu', emoji: '🧋', tag: 'Hảo Ngọt 🧋', desc: 'Trà sữa đậm vị trà ô long nướng kết hợp trân châu đen dẻo quánh thơm lừng.', price: '35k - 65k', vibe: 'Ngọt ngào & Tươi vui' },
      { id: 'de_bingsu', name: 'Bingsu Xoài Tuyết', emoji: '🍧', tag: 'Mát Lạnh 🥭', desc: 'Tuyết sữa bào mịn như bông tuyết phủ sốt xoài tươi thơm phức và kem vani.', price: '85k - 160k', vibe: 'Mát lạnh & Chụp ảnh đẹp' },
      { id: 'de_tiramisu', name: 'Bánh Tiramisu Ý', emoji: '🍰', tag: 'Đậm Đà ☕', desc: 'Bánh quy ladyfinger đẫm cafe espresso và kem mascarpone bồng bềnh phủ bột cacao.', price: '50k - 90k', vibe: 'Say đắm & Tinh tế' },
      { id: 'de_cafetrung', name: 'Cafe Trứng Hà Nội', emoji: '☕', tag: 'Ấm Áp ☕', desc: 'Lớp kem trứng đánh bông mịn như mây trên nền cafe phin đắng nhẹ thơm phức.', price: '40k - 65k', vibe: 'Ấm áp & Hoài niệm' },
      { id: 'de_chekhucbach', name: 'Chè Khúc Bạch Hạnh Nhân', emoji: '🥣', tag: 'Thanh Mát 🍃', desc: 'Khúc bạch phô mai sữa mềm béo ăn cùng nhãn tươi giòn và hạnh nhân lát rang vàng.', price: '35k - 55k', vibe: 'Giải nhiệt & Nhẹ nhàng' },
      { id: 'de_gelato', name: 'Kem Gelato Ý', emoji: '🍨', tag: 'Thủ Công 🍨', desc: 'Kem gelato hạt dẻ cười pistachio và dâu tây hữu cơ béo ngậy không ngấy.', price: '45k - 85k', vibe: 'Mịn màng & Dễ thương' },
      { id: 'de_crepe', name: 'Bánh Crepe Ngập Sốt', emoji: '🥞', tag: 'Béo Ngậy 🥞', desc: 'Vỏ bánh mỏng tang bọc đầy kem tươi dâu tây và sốt socola Nutella ngọt ngào.', price: '55k - 95k', vibe: 'Hảo ngọt & Xinh xắn' },
      { id: 'de_croissant', name: 'Croissant Bơ Pháp', emoji: '🥐', tag: 'Thơm Bơ 🥐', desc: 'Bánh sừng bò ngàn lớp thơm lừng bơ Pháp nướng giòn tan ăn kèm socola nóng.', price: '35k - 65k', vibe: 'Chill sáng & Chiều nhẹ' },
    ],
    homeRecipes: [
      {
        id: 'rec_flan_caramel',
        title: 'Bánh Flan Trứng Sữa Caramel Béo Ngậy',
        emoji: '🍮',
        country: 'dessert',
        countryName: 'Tráng Miệng & Cafe',
        countryFlag: '🍰',
        cookTime: '30 phút',
        servings: '2 - 4 hũ',
        difficulty: 'Dễ làm',
        tag: 'Tráng Miệng Tình Yêu 🍮',
        description: 'Bánh flan mềm mịn núng nính, không bị rỗ mặt, đẫm nước sốt caramel cafe thơm lừng mát lạnh.',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cach+lam+banh+flan+khong+bi+ro+mat',
        ingredients: [
          { name: 'Trứng gà tươi (ở nhiệt độ phòng)', amount: '4 quả (3 quả lấy cả lòng trắng + 1 chỉ lấy lòng đỏ)' },
          { name: 'Sữa tươi không đường', amount: '350ml' },
          { name: 'Sữa đặc Ông Thọ', amount: '120g' },
          { name: 'Đường cát làm caramel', amount: '60g' },
          { name: 'Nước cốt chanh', amount: '1 thìa cà phê' },
          { name: 'Vani thơm', amount: '1 ống nhỏ' },
        ],
        steps: [
          'Nấu caramel: Cho 60g đường và 30ml nước vào chảo nhỏ đun không khuấy đến khi đường chuyển màu cánh gián, vắt chanh vào lắc đều rồi rót vào đáy các khuôn flan.',
          'Đun ấm 350ml sữa tươi và 120g sữa đặc đến khoảng 50 độ C (không để sôi).',
          'Đánh tan nhẹ trứng gà với vani (không đánh bông tạo bọt khí).',
          'Rót từ từ sữa ấm vào tô trứng, khuấy nhẹ 1 chiều.',
          'Lọc hỗn hợp trứng sữa qua rây 2 lần để hỗn hợp mịn mướt không lợn cợn.',
          'Rót vào các khuôn caramel, dùng giấy bạc bọc kín miệng khuôn.',
          'Hấp cách thủy lửa nhỏ liu riu trong 20 phút (hoặc nướng cách thủy lò nướng 150 độ C trong 30 phút).',
          'Để nguội và cho vào ngăn mát tủ lạnh 3 tiếng trước khi thưởng thức.',
        ],
        coupleTip: 'Thưởng thức bánh flan mát lạnh cùng chút cafe phin đắng nhẹ và đá bào nhé!',
      },
    ],
  },
];
