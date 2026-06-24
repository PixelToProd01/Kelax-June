import { sendEmail } from "../utils/sendEmail.js";

export const sendOtpMail = async (user, otp) => {
  return await sendEmail({
    to: user.email,
    subject: "Verify your account",
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;">

<div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;box-shadow:0 8px 25px rgba(0,0,0,0.08);overflow:hidden">

<div style="background:#111827;color:white;padding:20px;text-align:center;font-size:20px;font-weight:bold">
Kelax Security
</div>

<div style="padding:35px;text-align:center">

<h2 style="color:#111827;margin-top:0">
Verify Your Account
</h2>

<p style="color:#4b5563;font-size:15px">
Use the following One Time Password (OTP) to verify your Kelax account.
</p>

<div style="margin:30px 0">

<span style="
font-size:28px;
letter-spacing:6px;
font-weight:bold;
background:#f3f4f6;
padding:15px 30px;
border-radius:8px;
border:1px dashed #9ca3af;
display:inline-block;
">
${otp}
</span>

</div>

<p style="color:#6b7280;font-size:14px">
This OTP will expire in <b>10 minutes</b>.
</p>

<p style="color:#6b7280;font-size:14px">
If you did not request this email, please ignore it.
</p>

</div>

<div style="background:#f9fafb;padding:20px;text-align:center;font-size:13px;color:#6b7280">
© ${new Date().getFullYear()} Kelax Solutions Pvt. Ltd.
</div>

</div>

</body>
</html>
`,
  });
};

// export const sendForgotOtpMail = async (user, otp) => {
//   return await sendEmail({
//     to: user.email,
//     subject: "Forgot Your Password",
//     html: `<h1>Forgot Your Password</h1>
//     <h3>Your OTP is ${otp}</h3>
//     <h3>Enter OTP and Update Your Password</h3>
//     `,
//   });
// };

export const sendForgotOtpMail = async (user, otp) => {
  return await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;">

<div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;box-shadow:0 8px 25px rgba(0,0,0,0.08);overflow:hidden">

<div style="background:#111827;color:white;padding:20px;text-align:center;font-size:20px;font-weight:bold">
Kelax Security
</div>

<div style="padding:35px;text-align:center">

<h2 style="color:#111827;margin-top:0">
Password Reset Request
</h2>

<p style="color:#4b5563;font-size:15px">
We received a request to reset your password. Use the OTP below to continue.
</p>

<div style="margin:30px 0">

<span style="
font-size:28px;
letter-spacing:6px;
font-weight:bold;
background:#f3f4f6;
padding:15px 30px;
border-radius:8px;
border:1px dashed #9ca3af;
display:inline-block;
">
${otp}
</span>

</div>

<p style="color:#6b7280;font-size:14px">
Enter this OTP to create a new password. The code will expire in <b>10 minutes</b>.
</p>

</div>

<div style="background:#f9fafb;padding:20px;text-align:center;font-size:13px;color:#6b7280">
© ${new Date().getFullYear()} Kelax Solutions Pvt. Ltd.
</div>

</div>

</body>
</html>
`,
  });
};


// runner.instance_.gameOver = () => {}
