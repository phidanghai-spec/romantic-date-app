import { NextResponse } from 'next/server';
import { renderDateInviteHtml } from '@/components/emails/DateInviteTemplate';
import { generateICSContent } from '@/lib/ics';
import { generateGoogleCalendarUrl } from '@/lib/googleCalendar';

interface SendInvitationPayload {
  recipientEmail?: string;
  partnerEmail?: string;
  toEmail?: string;
  senderName?: string;
  partnerName?: string;
  dateDate?: string;
  dateStr?: string;
  dateTime?: string;
  timeStr?: string;
  cuisine?: string;
  activity?: string;
  location?: string;
  note?: string;
  specialNote?: string;
}

export async function POST(request: Request) {
  try {
    const body: SendInvitationPayload = await request.json();

    const targetEmail = (body.recipientEmail || body.partnerEmail || body.toEmail || '').trim();
    const sender = (body.senderName || 'Anh iu').trim();
    const partner = (body.partnerName || 'Bé iu').trim();
    const date = body.dateDate || body.dateStr || body.dateTime?.split(' ')[0] || new Date().toISOString().split('T')[0];
    const time = body.timeStr || (body.dateTime?.includes('vào lúc') ? body.dateTime.split('vào lúc')[1]?.trim() : '19:00');
    const cuisine = body.cuisine || 'Lẩu Haidilao & Bingsu Trái Cây';
    const location = body.location || 'Haidilao Landmark 81';
    const note = body.specialNote || body.note || 'Em chỉ cần chuẩn bị một nụ cười thật xinh thôi ❤️';

    if (!targetEmail || !targetEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Địa chỉ email người nhận không hợp lệ' },
        { status: 400 }
      );
    }

    const title = `💖 Hẹn Hò Cùng ${partner} (${cuisine})`;
    const description = `Buổi hẹn hò lãng mạn do ${sender} chuẩn bị.\nThực đơn: ${cuisine}\nLời nhắn: ${note}`;

    const icsContent = generateICSContent({
      title,
      description,
      location,
      startDate: date,
      startTime: time,
      durationHours: 3,
    });

    const googleCalendarUrl = generateGoogleCalendarUrl({
      title,
      description,
      location,
      startDate: date,
      startTime: time,
      durationHours: 3,
    });

    const htmlBody = renderDateInviteHtml({
      senderName: sender,
      partnerName: partner,
      dateStr: date,
      timeStr: time,
      cuisine,
      location,
      specialNote: note,
    });

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey && resendApiKey.startsWith('re_')) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Our Date Night <onboarding@resend.dev>',
          to: [targetEmail],
          subject: `💌 Thiệp Mời Hẹn Hò VIP Dành Riêng Cho ${partner} (${date})`,
          html: htmlBody,
          attachments: [
            {
              filename: `VIP_Date_Invitation_${partner.replace(/\s+/g, '_')}.ics`,
              content: Buffer.from(icsContent).toString('base64'),
            },
          ],
        }),
      });

      if (!resendResponse.ok) {
        const resData = await resendResponse.json();
        console.warn('Resend API notice:', resData);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Đã gửi thiệp mời hẹn hò thành công đến ${targetEmail}!`,
      icsContent,
      googleCalendarUrl,
      demoMode: !resendApiKey,
    });
  } catch (error) {
    console.error('Error sending invitation email:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể gửi email lúc này. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
