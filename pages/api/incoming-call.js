// /pages/api/incoming-call.ts (or .js)
export default async function handler(req, res) {
  const { From, To, CallSid } = req.body;

  console.log("Incoming call from:", From);

  // optionally send SMS here using Twilio SDK or REST
  // or trigger downstream automation (booking, logging, etc.)

  res.status(200).send("<Response><Say>Thanks for calling!</Say></Response>");
}
