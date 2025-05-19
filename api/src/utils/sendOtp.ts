import { MailtrapClient } from "mailtrap";

interface Sender {
  name: string;
  email: string;
}

function generateOtp(n: number) {
  if (n !== 6) {
    throw new Error("The number of digits must be 6");
  }
  let otp = Math.floor(Math.random() * 10 ** n)
    .toString()
    .padStart(n, "0");

  console.log(otp);

  return otp;
}

async function send(RECIPIENT_EMAIL: string, Token: string) {
  const SENDER_EMAIL = "hello@demomailtrap.co";
  const client = new MailtrapClient({ token: Token });
  let otp = generateOtp(6);
  const sender: Sender = { name: "Bamlak", email: SENDER_EMAIL };
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#eee; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; margin-top:40px;">
            <tr>
              <td style="background-color:#5C6BC0; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0;">Verify Your Email</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px; color:#030E1F;">
                <p style="font-size:16px; margin-bottom:24px;">
                  Hi there,<br><br>
                  To verify your email address, please use the one-time password (OTP) below. This code is valid for the next <strong>10 minutes</strong>:
                </p>
                <div style="font-size:28px; font-weight:bold; color:#5C6BC0; text-align:center; margin:20px 0;">
                  ${otp}
                </div>
                <p style="font-size:14px; color:#444;">
                  If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f5f5f5; padding:20px; text-align:center; color:#888;">
                <small>&copy; 2025 Your Company. All rights reserved.</small>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  try {
    const res = await client.send({
      from: sender,
      to: [{ email: RECIPIENT_EMAIL }],
      subject: "Email verification",
      html: htmlContent,
    });

    console.log(`the response is: ${res}`);
    return otp;
  } catch (err) {
    console.log(err);
  }
}

export default send;
