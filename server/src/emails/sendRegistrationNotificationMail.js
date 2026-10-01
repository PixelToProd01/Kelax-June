import { sendEmail } from "../utils/sendEmail.js";

export const sendRegistrationNotificationMail = async (user) => {
  return await sendEmail({
    to: "info@kelax.in",
    subject: `New ${user.role} Registration - Kelax Portal`,
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;">

<div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">

  <div style="background:#006db8;color:white;padding:25px;text-align:center;">
    <div style="font-size:24px;font-weight:bold;">Kelax</div>
    <div style="font-size:14px;margin-top:6px;">Portal Registration</div>
  </div>

  <div style="padding:35px;">

    <h2 style="color:#111827;margin-top:0;">
      New ${user.role === "partner" ? "Partner" : "Customer"} Registration
    </h2>

    <p style="color:#4b5563;font-size:15px;line-height:1.6;">
      A new user has successfully registered on the
      <b>Kelax Portal</b> and completed email verification.
    </p>

    <div style="
      background:#f8fafc;
      border:1px solid #e5e7eb;
      border-radius:8px;
      padding:20px;
      margin:25px 0;
    ">

      <h3 style="margin-top:0;color:#111827;">
        Registration Details
      </h3>

      <p style="margin:10px 0;color:#374151;">
        <b>Registration Type:</b>
        ${user.role === "partner" ? "Partner" : "Customer"}
      </p>

      <p style="margin:10px 0;color:#374151;">
        <b>Name:</b> ${user.fullName}
      </p>

      <p style="margin:10px 0;color:#374151;">
        <b>Email:</b> ${user.email}
      </p>

      <p style="margin:10px 0;color:#374151;">
        <b>Phone:</b> ${user.phone}
      </p>

      <p style="margin:10px 0;color:#374151;">
        <b>Company:</b> ${user.company?.name || "N/A"}
      </p>

      <p style="margin:10px 0;color:#374151;">
        <b>Email Verification:</b>
        <span style="color:#16a34a;font-weight:bold;">
          Verified
        </span>
      </p>

      <p style="margin:10px 0;color:#374151;">
        <b>Account Status:</b>
        <span style="color:#d97706;font-weight:bold;">
          Pending Admin Approval
        </span>
      </p>

    </div>

    <p style="color:#4b5563;font-size:15px;line-height:1.6;">
      Please log in to the <b>Kelax Admin Portal</b> to review
      the registration details and take the required action.
    </p>

  </div>

  <div style="
    background:#f9fafb;
    padding:20px;
    text-align:center;
    font-size:13px;
    color:#6b7280;
  ">
    © ${new Date().getFullYear()} Kelax Solutions Pvt. Ltd.<br>
    Kelax Portal
  </div>

</div>

</body>
</html>
`,
  });
};
