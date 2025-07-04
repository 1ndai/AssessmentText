import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  console.log('Request method:', req.method);
  console.log('Query params:', req.query);
  console.log('Body:', req.body);

  let phone_number = req.query.user_phone || req.query.phone_number;

  // Also try pulling from body just in case Retell flips formats
  if (!phone_number && req.body) {
    if (typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
      } catch (err) {
        console.error('Failed to parse body as JSON:', err);
      }
    }
    phone_number = req.body.user_phone || req.body.phone_number;
  }

  if (!phone_number) {
    return res.status(400).json([
      "1",
      "2",
      { error: "3" },
      "Missing phone_number",
      "1"
    ]);
  }

  try {
    const message = "Thanks for your booking! Here’s your link: https://calendly.com/1ndai-info/30min";

    const twilioResponse = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone_number,
    });

    return res.status(200).json({ success: true, sid: twilioResponse.sid });
  } catch (error) {
    console.error('Twilio send error:', error);
    return res.status(500).json({ error: 'SMS failed', details: error.message });
  }
}
