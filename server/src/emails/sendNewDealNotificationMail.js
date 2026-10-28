import {sendEmail} from "../utils/sendEmail.js";

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

const sendNewDealNotificationMail = async (deal, partner) => {
  const dealId = deal.dealId || deal.dealNumber || deal._id;

  const details = [
    ["Deal ID", dealId],
    ["Deal Name", deal.dealName || deal.title || deal.projectName],
    ["Partner Name", partner?.fullName || deal.partnerName],
    ["Partner Email", partner?.email || deal.partnerEmail],
    ["Company", partner?.company?.name || deal.companyName],
    ["Product", deal.productName || deal.product],
    [
      "Registration Date",
      new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    ],
  ].filter(([, value]) => value);

  const rows = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;color:#334155;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:12px;border:1px solid #e2e8f0;color:#475569;">
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join("");

  return sendEmail({
    to: "info@kelax.in",
    subject: `New Deal Registered - ${dealId}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f1f5f9;padding:24px;">
        <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;">
          <div style="background:#006db8;padding:24px;color:#ffffff;">
            <h2 style="margin:0;">Kelax Partner Portal</h2>
            <p style="margin:8px 0 0;">New Deal Registration Notification</p>
          </div>

          <div style="padding:24px;">
            <h3 style="color:#0f172a;">A partner has registered a new deal.</h3>
            <p style="color:#475569;line-height:1.6;">
              A new deal has been successfully submitted through the
              Kelax Partner Portal. Please review the details below.
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              ${rows}
            </table>

            <p style="margin-top:24px;color:#64748b;font-size:12px;">
              This is an automated notification from Kelax Partner Portal.
              &copy; ${new Date().getFullYear()} Kelax Solutions Pvt. Ltd.
            </p>
          </div>
        </div>
      </div>
    `,
  });
};

export default sendNewDealNotificationMail;
