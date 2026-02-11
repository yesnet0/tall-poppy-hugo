// Cloudflare Worker for Tall Poppy Group Contact Form
// Sends emails via Resend API

const RESEND_API_KEY = 're_5m5TDAfw_Hk3mxkNJEYcJWXvQrooza4RX';
const TO_EMAIL = 'casey@tallpoppygroup.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // Use Resend default until domain verified

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://tallpoppygroup.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const formData = await request.formData();
      const name = formData.get('name') || 'Unknown';
      const email = formData.get('email') || 'no-reply@example.com';
      const company = formData.get('company') || 'Not provided';
      const message = formData.get('message') || 'No message';

      // Send email via Resend
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY || RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL, // Must use Resend default until domain verified
          to: [env.TO_EMAIL || TO_EMAIL],
          reply_to: email,
          subject: `[TPG Contact] ${name} from ${company}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
          text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        console.error('Resend error:', error);
        return Response.redirect('https://tallpoppygroup.com/contact/?error=send', 302);
      }

      // Redirect back to success page
      return Response.redirect('https://tallpoppygroup.com/contact/?success=true', 302);

    } catch (error) {
      console.error('Error:', error);
      return Response.redirect('https://tallpoppygroup.com/contact/?error=server', 302);
    }
  },
};
