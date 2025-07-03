import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  const { call_sid } = req.body;

  try {
    const call = await client.calls(call_sid).fetch();

    res.status(200).json({
      from: call.from,
      to: call.to,
      startTime: call.startTime,
      duration: call.duration,
    });
  } catch (error) {
    console.error('Twilio Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch call details from Twilio' });
  }
}
