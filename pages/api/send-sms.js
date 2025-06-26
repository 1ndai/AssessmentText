export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Missing 'to' or 'message'" });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;

    const twilio = require("twilio")(accountSid, authToken);

    await twilio.messages.create({
      to,
      from,
      body: message,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SMS Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
