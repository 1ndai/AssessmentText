function sendSMSFromSelection() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  const phoneNumber = range.getValue().toString();

  const url = "https://your-vercel-url.vercel.app/api/send-sms"; // ← Replace this
  const payload = {
    to: phoneNumber,
    message: "Thanks for your booking! Here’s your link: https://calendly.com/1ndai-info/30min"
  };

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());

  if (result.success) {
    range.offset(0, 1).setValue("✅ Sent");
  } else {
    range.offset(0, 1).setValue("❌ Error");
  }
}
