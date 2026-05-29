import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const contact = await req.json();

    if (!contact) throw new Error("No contact data provided");

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: Deno.env.get("CONTACT_GMAIL_USER")!,
          password: Deno.env.get("CONTACT_GMAIL_PASSWORD")!,
        },
      },
    });

    await client.send({
      from:    Deno.env.get("CONTACT_GMAIL_USER")!,
      to:      Deno.env.get("CONTACT_GMAIL_USER")!,
      subject: `New Contact Message — ${contact.first_name} ${contact.last_name}`,
      html:    adminNotificationTemplate(contact),
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Contact email error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function adminNotificationTemplate(c: any): string {
  const phone = c.phone ? `${c.country_code} ${c.phone}` : "Not provided";

  const rows =
    summaryRow("Full Name", `${c.first_name} ${c.last_name}`) +
    summaryRow("Email",     c.email) +
    summaryRow("Phone",     phone) +
    summaryRow("Message",   c.message);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a2e;padding:36px 40px;">
            <p style="margin:0 0 6px;color:#e0b84a;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Admin Notification</p>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-family:Georgia,serif;">&#9993; New Contact Message</h1>
            <p style="margin:8px 0 0;color:#a0b4c8;font-size:12px;font-family:Arial,sans-serif;">${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</p>
          </td>
        </tr>

        <!-- Alert Bar -->
        <tr>
          <td style="background:#e0b84a;padding:13px 40px;">
            <p style="margin:0;color:#1a1a2e;font-size:13px;font-weight:700;font-family:Arial,sans-serif;">${c.first_name} ${c.last_name} &mdash; ${c.email}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fc;border:1px solid #e8ecf0;border-radius:10px;">
              <tr>
                <td style="padding:20px 24px 16px;">
                  <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:2.5px;color:#0f3460;text-transform:uppercase;border-bottom:2px solid #e0b84a;padding-bottom:10px;font-family:Arial,sans-serif;">Contact Details</p>
                  <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
                </td>
              </tr>
            </table>

            <!-- Reply Button -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
              <tr>
                <td align="center">
                  <a href="mailto:${c.email}" style="display:inline-block;background:#0f3460;color:#ffffff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;padding:12px 32px;border-radius:6px;text-decoration:none;letter-spacing:0.5px;">Reply to ${c.first_name}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1a2e;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#5a7a9a;font-size:11px;font-family:Arial,sans-serif;">Signature Global Conferences &mdash; Contact Notification System</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function summaryRow(label: string, value: string): string {
  return `<tr><td style="padding:8px 0;color:#5a6a7a;font-size:13px;width:35%;vertical-align:top;font-family:Arial,sans-serif;">${label}</td><td style="padding:8px 0;color:#1a1a2e;font-size:13px;font-weight:600;vertical-align:top;font-family:Arial,sans-serif;">${value}</td></tr>`;
}