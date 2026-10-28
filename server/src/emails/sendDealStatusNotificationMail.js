
import { sendEmail } from "../utils/sendEmail.js";

const sendDealStatusNotificationMail = async (deal) => {
  try {
    // Get partner details populated by updateDealStatus controller
    const partner = deal.partner;

    if (!partner?.email) {
      console.error(
        `Deal status email failed: Partner email not found for ${deal.dealId}`
      );
      return false;
    }

    const isApproved = deal.status === "Approved";
    const isRejected = deal.status === "Rejected";

    if (!isApproved && !isRejected) {
      console.error(
        `Invalid deal status for email: ${deal.status}`
      );
      return false;
    }

    const partnerName =
      partner.fullName || partner.name || "Partner";

    const subject = isApproved
      ? `Your Kelax Deal ${deal.dealId} Has Been Approved`
      : `Your Kelax Deal ${deal.dealId} Has Been Rejected`;

    const statusColor = isApproved ? "#15803d" : "#dc2626";

    const statusMessage = isApproved
      ? "Good news! Your deal registration has been approved by the Kelax team."
      : "Your deal registration has been rejected by the Kelax team. Please review the admin remarks below.";

    const remarks = deal.adminRemarks?.trim()
      ? deal.adminRemarks.trim()
      : "No additional remarks provided.";

    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;">

  <div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">

    <div style="background:#006db8;color:white;padding:25px;text-align:center;">
      <div style="font-size:24px;font-weight:bold;">Kelax</div>
      <div style="font-size:14px;margin-top:6px;">Deal Registration Update</div>
    </div>

    <div style="padding:35px;">

      <h2 style="color:#111827;margin-top:0;">
        Deal ${isApproved ? "Approved" : "Rejected"}
      </h2>

      <p style="color:#4b5563;font-size:15px;line-height:1.7;">
        Hello ${escapeHtml(partnerName)},
      </p>

      <p style="color:#4b5563;font-size:15px;line-height:1.7;">
        ${statusMessage}
      </p>

      <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:25px 0;">

        <h3 style="margin-top:0;color:#111827;">
          Deal Details
        </h3>

        <p style="margin:10px 0;color:#374151;">
          <b>Deal ID:</b> ${escapeHtml(deal.dealId || "-")}
        </p>

        <p style="margin:10px 0;color:#374151;">
          <b>Customer:</b> ${escapeHtml(deal.customerName || "-")}
        </p>

        <p style="margin:10px 0;color:#374151;">
          <b>Product:</b> ${escapeHtml(deal.productType || "-")}
        </p>

        <p style="margin:10px 0;color:#374151;">
          <b>Quantity:</b> ${escapeHtml(String(deal.quantity ?? "-"))}
        </p>

        <p style="margin:10px 0;color:#374151;">
          <b>Status:</b>
          <span style="color:${statusColor};font-weight:bold;">
            ${escapeHtml(deal.status)}
          </span>
        </p>

      </div>

      <div style="background:#f9fafb;border-left:4px solid ${statusColor};padding:18px;margin:25px 0;">
        <h3 style="margin:0 0 10px;color:#111827;">
          Kelax Teams Remarks
        </h3>

        <p style="margin:0;color:#4b5563;line-height:1.7;white-space:pre-wrap;">
          ${escapeHtml(remarks)}
        </p>
      </div>

      <p style="color:#4b5563;font-size:15px;line-height:1.7;">
        Thank you for partnering with Kelax.
      </p>

      <p style="color:#374151;line-height:1.7;">
        Regards,<br>
        <strong>Kelax Team</strong>
      </p>

    </div>

    <div style="background:#f9fafb;padding:20px;text-align:center;font-size:13px;color:#6b7280;">
      &copy; ${new Date().getFullYear()} Kelax Solutions Pvt. Ltd.<br>
      Kelax Portal
    </div>

  </div>

</body>
</html>
`;

    const text = `
Hello ${partnerName},

${statusMessage}

Deal ID: ${deal.dealId}
Customer: ${deal.customerName || "-"}
Product: ${deal.productType || "-"}
Quantity: ${deal.quantity ?? "-"}
Status: ${deal.status}

Admin Remarks:
${remarks}

Thank you for partnering with Kelax.

Regards,
Kelax Team
`;

    // Use the same email utility as registration confirmation.
    const result = await sendEmail({
      to: partner.email,
      subject,
      html,
      text,
    });

    // sendEmail must return a result or throw if delivery submission fails.
    if (result === false) {
      console.error(
        `Deal status email failed for ${partner.email} | ${deal.dealId}`
      );
      return false;
    }

    console.log(
      `Deal status email submitted through sendEmail for ${partner.email} | ${deal.dealId} | ${deal.status}`
    );

    return true;
  } catch (error) {
    console.error("Deal status notification email failed:", {
      dealId: deal?.dealId,
      recipient: deal?.partner?.email,
      message: error.message,
    });

    return false;
  }
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

export default sendDealStatusNotificationMail;
