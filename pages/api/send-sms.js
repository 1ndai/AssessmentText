// /pages/api/send-sms.js

import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Only GET or POST requests allowed' });
  }

  const phone_number = req.method === 'GET'
    ? req.query.phone_number || req.query.user_phone // support both
    : req.body.phone_number || req.body.user_phone;

  if (!phone_number) {
    return res.status(400).json([{ error: '1' }, 'Missing phone_number']);
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
