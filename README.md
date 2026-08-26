# 🎀 Romantic Taste Match — Dating & Date-Planning Web App 🍽️✨

Một ứng dụng web hẹn hò hiện đại kết hợp giữa **thuật toán gợi ý đối tượng hợp gu ẩm thực (Taste-Skill Engine)** và **trải nghiệm lên kế hoạch hẹn hò tương tác 4 bước (Interactive Date Planner)**.

---

## 🌟 Tính Năng Nổi Bật (Core Modules)

### 1. 🍲 Taste-Skill Matching Engine (`/lib/tasteEngine.ts`)
- **Metric 1 (30% weight):** Độ tương thích khẩu vị (Độ ăn cay 🌶️, Mức độ hảo ngọt 🍰, Phân khúc ngân sách 💳).
- **Metric 2 (40% weight):** Độ trùng khớp món ăn yêu thích theo hệ số tương đồng Jaccard.
- **Metric 3 (30% weight):** Đồng điệu không gian & năng lượng buổi hẹn (Lãng mạn & ấm cúng, Chill nhạc acoustic, Rooftop bar...).

### 2. 🔥 Discovery & Swipe Deck (`/discover`)
- Thao tác quẹt thẻ Tinder-style mượt mà với **Framer Motion**.
- Dynamic stamps chân thực: `LIKE 💖`, `PASS 💔`, `SUPER LIKE ⭐`.
- Huy hiệu tính điểm Taste Match tức thì kèm bộ sưu tập ảnh và thông tin chi tiết.
- Hiệu ứng pháo hoa ăn mừng khi ghép đôi thành công (`canvas-confetti`).

### 3. 🎟️ Interactive Date Planner 4 Bước (`/date-planner`)
- **Bước 0 (Ask Out):** Lời ngỏ ngọt ngào với **nút "Không" né chuột thông minh** kèm các câu năn nỉ vui nhộn, không thể từ chối!
- **Bước 1 (Date & Time):** Bộ chọn ngày & giờ tiện lợi kèm gợi ý preset thông minh (Tối nay 19:00, Cuối tuần 18:30...).
- **Bước 2 (Taste & Cuisine):** Chọn phong cách ẩm thực: Lẩu Haidilao, BBQ Nướng Hàn Quốc, Ramen, Cafe lãng mạn, Fine Dining hoặc Quán ruột tự nhập.
- **Bước 3 (Date Pass & Share):** Xuất vé **VIP Romantic Date Pass**, sao chép link gửi qua Zalo/Messenger hoặc gửi thẳng vào khung chat.

### 4. 💬 Realtime Chat & Date Lock-in (`/chat` & `/chat/[matchId]`)
- Nhắn tin tức thì với Supabase Realtime channel.
- Thẻ lời mời hẹn hò tương tác trực tiếp (`DateInviteCard`) cho phép **Chấp nhận 💖 / Từ chối**.

### 5. 🍷 Taste & Vibe Customizer (`/profile`)
- Thanh trượt điều chỉnh độ cay, hảo ngọt, ngân sách và danh sách quán ruột, tự động cập nhật lại độ tương thích với toàn bộ đối tượng gợi ý.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (Strict mode)
- **Styling:** Tailwind CSS + Custom Animations & Glassmorphism
- **Animations:** Framer Motion + Canvas-Confetti
- **State Management:** Zustand (có hỗ trợ LocalStorage persistence)
- **Database & Realtime:** Supabase (PostgreSQL, Row Level Security, Realtime Channels)
- **Icons:** Lucide-React

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Cấu hình Biến Môi Trường (`.env.local`)
Tạo tệp `.env.local` ở thư mục gốc (tham khảo `.env.example`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
> *Lưu ý: Nếu chưa cấu hình Supabase, ứng dụng sẽ tự động kích hoạt **Mock Mode** với dữ liệu mẫu phong phú và mô phỏng phản hồi tin nhắn tự động.*

### 3. Thiết lập Database Supabase (Tùy chọn)
Nếu sử dụng Supabase thật:
1. Mở **SQL Editor** trên Dashboard Supabase.
2. Chạy nội dung trong [supabase/migrations/01_schema.sql](file:///d:/app%20h%E1%BA%B9n%20h%C3%B2/supabase/migrations/01_schema.sql) để tạo bảng và cấu hình RLS, Realtime.
3. Chạy nội dung trong [supabase/seed.sql](file:///d:/app%20h%E1%BA%B9n%20h%C3%B2/supabase/seed.sql) để nạp dữ liệu mẫu ban đầu.

### 4. Khởi chạy Dev Server
```bash
npm run dev
```
Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt.

### 5. Đóng gói Production Build
```bash
npm run build
npm run start
```
