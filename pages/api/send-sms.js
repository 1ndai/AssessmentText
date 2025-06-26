export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed');
  }

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;
    const toPhone = req.body.to || process.env.DEFAULT_TO_PHONE;

    const messageBody =
      'Thanks for chatting with us today. Reply anytime if you need help!';

    const twilio = require('twilio')(accountSid, authToken);
    const message = await twilio.messages.create({
      body: messageBody,
      from: fromPhone,
      to: toPhone,
    });

    console.log('SMS sent:', message.sid);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send SMS:', error);
    res.status(500).json({ error: 'Invalid JSON or server error' });
  }
}
