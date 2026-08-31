import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Our Date Night - Private Dating & Couple Planner';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAF6EE',
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(244, 114, 182, 0.15), transparent 40%), radial-gradient(circle at 90% 80%, rgba(253, 230, 138, 0.2), transparent 40%)',
          fontFamily: 'sans-serif',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Border decorative frame */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '2px dashed rgba(244, 114, 182, 0.5)',
            borderRadius: '32px',
            display: 'flex',
          }}
        />

        {/* Content Box */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 253, 249, 0.85)',
            borderRadius: '28px',
            padding: '48px 64px',
            border: '1px solid rgba(251, 113, 133, 0.3)',
            boxShadow: '0 20px 50px rgba(74, 29, 47, 0.08)',
            maxWidth: '1000px',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFE4E6',
              color: '#BE123C',
              padding: '8px 24px',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '1px',
              marginBottom: '20px',
              border: '1px solid #FDA4AF',
            }}
          >
            🌸 OUR DATE NIGHT • PRIVATE COUPLE SPACE 💕
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#2D1E2F',
              lineHeight: 1.15,
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            Không Gian Hẹn Hò &amp; Kỷ Niệm Tình Yêu
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '22px',
              color: '#6B5B6E',
              maxWidth: '780px',
              lineHeight: 1.4,
              marginBottom: '32px',
              display: 'flex',
            }}
          >
            Vòng quay hôm nay ăn gì 🍲 • Thiệp mời VIP Date Pass 🎟️ • Góc Chat thời gian thực 💬 • Sổ kỷ niệm ảnh HD 📸
          </div>

          {/* Feature Badges */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFF1F2',
                color: '#9F1239',
                padding: '10px 20px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 600,
                border: '1px solid #FECDD3',
              }}
            >
              ✨ Google Calendar 1-Click
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                padding: '10px 20px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 600,
                border: '1px solid #FDE68A',
              }}
            >
              🎲 Roulette 5 Quốc Gia
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#EFF6FF',
                color: '#1E40AF',
                padding: '10px 20px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 600,
                border: '1px solid #BFDBFE',
              }}
            >
              💌 Gửi Thiệp Zalo / Messenger
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
