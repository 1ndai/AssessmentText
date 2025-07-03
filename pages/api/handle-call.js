// pages/api/handle-call.ts

import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { call_sid } = req.body;

  if (!call_sid || typeof call_sid !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid call_sid' });
  }

  try {
    const call = await client.calls(call_sid).fetch();

    console.log('Fetched Call:', call);

    // Example response or logic
    res.status(200).json({
      success: true,
      from: call.from,
      to: call.to,
      status: call.status,
      startTime: call.startTime,
      duration: call.duration,
    });
  } catch (error: any) {
    console.error('Twilio Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch call details from Twilio' });
  }
}
