// /pages/api/send-sms.js

import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    // You can replace this with dynamic lookup logic later
    const to = process.env.TEST_TO_NUMBER || '+15555555555';

    const message = "Thanks for chatting with us today! Book your AI assessment here: https://calendly.com/1ndai-info/30min";

    const twilioResponse = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    return res.status(200).json({ success: true, sid: twilioResponse.sid });
  } catch (error) {
    console.error('Twilio send error:', error);
    return res.status(500).json({ error: 'SMS failed', details: error.message });
  }
}
