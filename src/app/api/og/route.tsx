import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'Lời Mời Hẹn Hò Ngọt Ngào 💕';
  const from = searchParams.get('from') || 'Người thương';
  const to = searchParams.get('to') || 'Bé iu';
  const date = searchParams.get('date') || 'Tối nay';
  const time = searchParams.get('time') || '19:00';
  const cuisine = searchParams.get('cuisine') || 'Món ngon bí mật';
  const location = searchParams.get('location') || 'Trung tâm thành phố';

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
          backgroundImage:
            'radial-gradient(circle at 15% 25%, rgba(244, 114, 182, 0.2), transparent 45%), radial-gradient(circle at 85% 75%, rgba(253, 230, 138, 0.25), transparent 45%)',
          fontFamily: 'sans-serif',
          padding: '36px',
        }}
      >
        {/* Ticket Outer Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#FFFDF9',
            borderRadius: '28px',
            border: '2px solid #F472B6',
            boxShadow: '0 25px 60px rgba(74, 29, 47, 0.12)',
            width: '1080px',
            height: '520px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Left Main Ticket Section */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px 48px',
              borderRight: '2px dashed #FDA4AF',
            }}
          >
            {/* Header / Badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFE4E6',
                  color: '#9F1239',
                  padding: '6px 18px',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: 700,
                  border: '1px solid #FECDD3',
                }}
              >
                🎟️ VIP FLORAL DATE PASS
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#831843',
                }}
              >
                Gửi tới: <span style={{ fontWeight: 800 }}>{to}</span> 🌸
              </div>
            </div>

            {/* Title & From */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: '38px',
                  fontWeight: 800,
                  color: '#2D1E2F',
                  lineHeight: 1.2,
                  marginBottom: '8px',
                  display: 'flex',
                }}
              >
                {title}
              </div>
              <div style={{ fontSize: '18px', color: '#715A75', display: 'flex' }}>
                Từ người thương: <span style={{ fontWeight: 700, color: '#BE123C', marginLeft: '6px' }}>{from}</span>
              </div>
            </div>

            {/* Date / Food Info Grid */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                backgroundColor: '#FFF1F2',
                padding: '16px 20px',
                borderRadius: '18px',
                border: '1px solid #FECDD3',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#9F1239', fontWeight: 600 }}>THỜI GIAN</div>
                <div style={{ fontSize: '18px', color: '#2D1E2F', fontWeight: 700 }}>
                  📅 {date} • ⏰ {time}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#9F1239', fontWeight: 600 }}>ẨM THỰC &amp; ĐỊA ĐIỂM</div>
                <div style={{ fontSize: '18px', color: '#2D1E2F', fontWeight: 700 }}>
                  🍲 {cuisine}
                </div>
                <div style={{ fontSize: '13px', color: '#715A75' }}>
                  📍 {location}
                </div>
              </div>
            </div>
          </div>

          {/* Right Ticket Stub */}
          <div
            style={{
              width: '260px',
              backgroundColor: '#FFF0F3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '36px 24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 800,
                color: '#BE123C',
                letterSpacing: '1px',
              }}
            >
              OUR DATE NIGHT
            </div>

            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #FDA4AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '44px',
                boxShadow: '0 8px 20px rgba(244, 114, 182, 0.25)',
              }}
            >
              💕
            </div>

            <div
              style={{
                fontSize: '13px',
                color: '#715A75',
                lineHeight: 1.4,
              }}
            >
              Nhấn để mở thiệp &amp; xác nhận lời hẹn hò ngay ✨
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
