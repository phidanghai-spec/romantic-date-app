export interface DateInviteEmailProps {
  senderName: string;
  partnerName: string;
  dateStr: string;
  timeStr: string;
  cuisine: string;
  location: string;
  specialNote: string;
  confirmUrl?: string;
}

export function renderDateInviteHtml({
  senderName,
  partnerName,
  dateStr,
  timeStr,
  cuisine,
  location,
  specialNote,
  confirmUrl = 'https://romantic-date-app.vercel.app/chat',
}: DateInviteEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lời Mời Hẹn Hò Dành Riêng Cho ${partnerName} 💌</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF6EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2D1E2F;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF6EE; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background-color: #FFFDF9; border: 2px solid #FDA4AF; border-radius: 28px; box-shadow: 0 15px 35px rgba(244, 114, 182, 0.15); overflow: hidden;">
          <!-- Header Banner -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FEF3C7 100%); padding: 30px 20px; border-bottom: 2px dashed #FECDD3;">
              <div style="font-size: 36px; line-height: 1; margin-bottom: 8px;">🌷💌✨</div>
              <span style="font-size: 11px; font-family: monospace; font-weight: bold; letter-spacing: 2px; color: #E11D48; text-transform: uppercase;">✦ OFFICIAL VIP DATE PASS ✦</span>
              <h1 style="margin: 6px 0 0 0; font-size: 26px; color: #4A1D2F; font-weight: bold;">Lời Mời Hẹn Hò Đặc Biệt</h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 24px;">
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; color: #4A1D2F;">
                Gửi <strong>${partnerName}</strong> yêu dấu 💕,<br>
                <strong>${senderName}</strong> đã chuẩn bị sẵn một buổi tối thật ngọt ngào và ấm áp dành riêng cho hai đứa mình:
              </p>

              <!-- Ticket Info Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFF8F6; border: 1px solid #FECDD3; border-radius: 18px; margin-bottom: 22px; padding: 16px;">
                <tr>
                  <td style="padding: 6px 0;">
                    <span style="font-size: 11px; color: #886A8B; text-transform: uppercase; font-weight: bold;">📅 Thời gian hẹn:</span><br>
                    <strong style="font-size: 15px; color: #831843;">${dateStr} lúc ${timeStr}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    <span style="font-size: 11px; color: #886A8B; text-transform: uppercase; font-weight: bold;">🍽️ Thực đơn yêu thích:</span><br>
                    <strong style="font-size: 15px; color: #831843;">${cuisine}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    <span style="font-size: 11px; color: #886A8B; text-transform: uppercase; font-weight: bold;">📍 Địa điểm đón:</span><br>
                    <strong style="font-size: 15px; color: #831843;">${location}</strong>
                  </td>
                </tr>
              </table>

              <!-- Lover Special Note -->
              <div style="background-color: #FFF1F2; border-left: 4px solid #F43F5E; padding: 14px 16px; border-radius: 12px; margin-bottom: 26px;">
                <p style="margin: 0; font-size: 13px; font-style: italic; color: #5E4761; line-height: 1.5;">
                  &ldquo;${specialNote}&rdquo;
                </p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${confirmUrl}" target="_blank" style="display: inline-block; background: linear-gradient(90deg, #F43F5E 0%, #EC4899 100%); color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: bold; padding: 14px 32px; border-radius: 50px; box-shadow: 0 6px 20px rgba(244, 63, 94, 0.35); text-align: center;">
                      💖 Xác Nhận Buổi Hẹn & Nhắn Tin Ngay ➔
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; font-size: 11px; color: #886A8B; text-align: center; line-height: 1.5;">
                📎 Tệp đính kèm <strong>date_invite.ics</strong> đã được tạo sẵn để bạn thêm vào Google Calendar / Apple Calendar chỉ với 1 chạm.
              </p>
            </td>
          </tr>

          <!-- Footer Stub -->
          <tr>
            <td align="center" style="background-color: #FAF6EE; padding: 16px 20px; border-top: 2px dashed #FECDD3;">
              <span style="font-size: 11px; color: #A08DA3; font-family: monospace;">
                OUR DATE NIGHT • PRIVATE DATING & ACTIVITY PLANNER FOR COUPLES
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
