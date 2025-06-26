export const config = {
  runtime: 'edge', // or remove this line to force Node.js instead
};

export default async function handler(req) {
  try {
    const bodyText = await req.text(); // get raw text
    const data = JSON.parse(bodyText); // manually parse JSON

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;
    const toPhone = data.to || process.env.DEFAULT_TO_PHONE;

    const twilio = require('twilio')(accountSid, authToken);
    const message = await twilio.messages.create({
      body: 'Thanks for chatting with us today. Reply anytime if you need help!',
      from: fromPhone,
      to: toPhone,
    });

    console.log('SMS sent:', message.sid);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Invalid JSON or server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
