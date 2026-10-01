import { sendEmail } from "../utils/sendEmail.js";

export const sendAccountApprovalMail = async (user) => {
  const portalName =
    user.role === "partner" ? "Kelax Partner Portal" : "Kelax Customer Portal";

  const loginUrl =
    user.role === "partner"
      ? "https://kelax.in/login"
      : "https://kelax.in/login";

  return await sendEmail({
    to: user.email,
    subject: `Account Approved - ${portalName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Account Approved</title>
      </head>

      <body style="
        margin:0;
        padding:0;
        background:#f4f7fb;
        font-family:Arial,Helvetica,sans-serif;
      ">

        <div style="
          max-width:600px;
          margin:40px auto;
          background:#ffffff;
          border-radius:10px;
          overflow:hidden;
          box-shadow:0 4px 15px rgba(0,0,0,0.08);
        ">

          <!-- Header -->
          <div style="
            background:#006db8;
            padding:25px;
            text-align:center;
          ">
            <h1 style="
              color:#ffffff;
              margin:0;
              font-size:26px;
            ">
              Kelax
            </h1>
          </div>

          <!-- Content -->
          <div style="padding:35px 30px;">

            <h2 style="
              color:#222;
              margin-top:0;
            ">
              Account Approved Successfully 🎉
            </h2>

            <p style="
              color:#444;
              font-size:16px;
              line-height:1.6;
            ">
              Dear <strong>${user.fullName}</strong>,
            </p>

            <p style="
              color:#444;
              font-size:16px;
              line-height:1.6;
            ">
              Your registration for the
              <strong>${portalName}</strong>
              has been successfully approved by the Kelax admin team.
            </p>

            <div style="
              background:#f0f8ff;
              border-left:4px solid #006db8;
              padding:15px;
              margin:25px 0;
            ">
              <p style="
                margin:0;
                color:#333;
                font-size:15px;
                line-height:1.6;
              ">
                Your account is now active. You can log in to your
                ${user.role === "partner" ? "Partner" : "Customer"} Portal
                using your registered email address and password.
              </p>
            </div>

            <!-- Login Button -->
            <div style="
              text-align:center;
              margin:30px 0;
            ">
              <a href="${loginUrl}"
                style="
                  display:inline-block;
                  background:#006db8;
                  color:#ffffff;
                  text-decoration:none;
                  padding:14px 30px;
                  border-radius:6px;
                  font-size:16px;
                  font-weight:bold;
                ">
                Login to ${user.role === "partner" ? "Partner" : "Customer"} Portal
              </a>
            </div>

            <p style="
              color:#555;
              font-size:14px;
              line-height:1.6;
            ">
              If you have any questions or need assistance, please contact
              the Kelax support team.
            </p>

            <p style="
              color:#444;
              font-size:15px;
              line-height:1.6;
            ">
              Regards,<br />
              <strong>Kelax Team</strong>
            </p>

          </div>

          <!-- Footer -->
          <div style="
            background:#f4f7fb;
            padding:20px;
            text-align:center;
          ">
            <p style="
              margin:0;
              color:#777;
              font-size:12px;
            ">
              © ${new Date().getFullYear()} Kelax. All rights reserved.
            </p>
          </div>

        </div>

      </body>
      </html>
    `,
  });
};
