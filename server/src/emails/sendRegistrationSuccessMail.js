import { sendEmail } from "../utils/sendEmail.js";

export const sendRegistrationSuccessMail = async (user) => {
  const portalName =
    user.role === "partner" ? "Kelax Partner Portal" : "Kelax Customer Portal";

  return await sendEmail({
    to: user.email,

    subject: `Registration Successful - ${portalName}`,

    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;">

<div style="
  max-width:650px;
  margin:40px auto;
  background:#ffffff;
  border-radius:10px;
  overflow:hidden;
  box-shadow:0 8px 25px rgba(0,0,0,0.08);
">

  <!-- Header -->
  <div style="
    background:#006db8;
    color:white;
    padding:25px;
    text-align:center;
  ">

    <div style="
      font-size:26px;
      font-weight:bold;
    ">
      Kelax
    </div>

    <div style="
      font-size:14px;
      margin-top:6px;
    ">
      ${portalName}
    </div>

  </div>


  <!-- Content -->
  <div style="padding:35px;">

    <h2 style="
      color:#111827;
      margin-top:0;
    ">
      Registration Successful
    </h2>

    <p style="
      color:#4b5563;
      font-size:15px;
      line-height:1.7;
    ">
      Dear <b>${user.fullName}</b>,
    </p>

    <p style="
      color:#4b5563;
      font-size:15px;
      line-height:1.7;
    ">
      Thank you for registering with the
      <b>Kelax ${user.role === "partner" ? "Partner" : "Customer"} Portal</b>.
    </p>

    <p style="
      color:#4b5563;
      font-size:15px;
      line-height:1.7;
    ">
      Your email address has been successfully verified and
      your registration has been completed successfully.
    </p>


    <!-- Status Box -->

    <div style="
      background:#f0fdf4;
      border:1px solid #bbf7d0;
      border-radius:8px;
      padding:20px;
      margin:25px 0;
    ">

      <p style="
        margin:0 0 10px 0;
        color:#166534;
        font-size:15px;
      ">
        <b>Registration Status:</b>
        Successfully Registered
      </p>

      <p style="
        margin:0;
        color:#854d0e;
        font-size:15px;
      ">
        <b>Account Status:</b>
        Waiting for Admin Approval
      </p>

    </div>


    <p style="
      color:#4b5563;
      font-size:15px;
      line-height:1.7;
    ">
      Our admin team will review your registration details.
      Please wait for the admin approval.
    </p>

    <p style="
      color:#4b5563;
      font-size:15px;
      line-height:1.7;
    ">
      Once your account has been approved, you will receive
      another email confirming that you can log in to your
      ${user.role === "partner" ? "Partner" : "Customer"} Portal.
    </p>


    <!-- Important -->

    <div style="
      background:#eff6ff;
      border-left:4px solid #006db8;
      padding:15px;
      margin-top:25px;
    ">

      <p style="
        margin:0;
        color:#1e3a8a;
        font-size:14px;
        line-height:1.6;
      ">
        <b>Please Note:</b>
        You will not be able to access your portal until
        your account has been approved by the Kelax Admin Team.
      </p>

    </div>

  </div>


  <!-- Footer -->

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
