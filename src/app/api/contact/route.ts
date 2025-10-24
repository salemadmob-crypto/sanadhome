export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, message, service, locale } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Prepare email content based on locale
        const isArabic = locale === 'ar';

        const emailSubject = isArabic
            ? `رسالة جديدة من ${name} - سند هوم`
            : `New Contact Message from ${name} - SanadHome`;

        const emailHtml = `
      <div dir="${isArabic ? 'rtl' : 'ltr'}" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          ${isArabic ? 'رسالة جديدة من موقع سند هوم' : 'New Message from SanadHome Website'}
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">
            ${isArabic ? 'تفاصيل المرسل:' : 'Contact Details:'}
          </h3>
          <p><strong>${isArabic ? 'الاسم:' : 'Name:'}</strong> ${name}</p>
          <p><strong>${isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> ${email}</p>
          ${phone ? `<p><strong>${isArabic ? 'رقم الهاتف:' : 'Phone:'}</strong> ${phone}</p>` : ''}
          ${service ? `<p><strong>${isArabic ? 'الخدمة المطلوبة:' : 'Service Requested:'}</strong> ${service}</p>` : ''}
        </div>

        <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="color: #1e40af; margin-top: 0;">
            ${isArabic ? 'الرسالة:' : 'Message:'}
          </h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px; text-align: center;">
          <p style="color: #1e40af; margin: 0;">
            ${isArabic
                ? 'تم إرسال هذه الرسالة من نموذج التواصل في موقع سند هوم'
                : 'This message was sent from the SanadHome website contact form'
            }
          </p>
        </div>
      </div>
    `;

        // Send email using Resend
        const data = await resend.emails.send({
            from: 'SanadHome Contact <noreply@sanadhome.com>',
            to: [process.env.CONTACT_EMAIL || 'info@sanadhome.com
'],
            subject: emailSubject,
            html: emailHtml,
            replyTo: email,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}




