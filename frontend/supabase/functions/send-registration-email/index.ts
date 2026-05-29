import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { registration_id, registration_data } = await req.json();

    let reg = registration_data;

    if (!reg && registration_id) {
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("id", registration_id)
        .single();
      if (error || !data) throw new Error("Registration not found");
      reg = data;
    }

    if (!reg) throw new Error("No registration data provided");

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.hostinger.com",
        port: 465,
        tls: true,
        auth: {
          username: Deno.env.get("GMAIL_USER")!,
          password: Deno.env.get("GMAIL_PASSWORD")!,
        },
      },
    });

    await client.send({
      from:    Deno.env.get("GMAIL_USER")!,
      to:      reg.email,
      subject: "Registration Confirmed — Signature Global Conferences",
      html:    userEmailTemplate(reg),
    });

    await client.send({
      from:    Deno.env.get("GMAIL_USER")!,
      to:      Deno.env.get("ADMIN_EMAIL")!,
      subject: `New Registration — ${reg.first_name} ${reg.last_name}`,
      html:    adminEmailTemplate(reg),
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Email send error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

/* ══════════════════════════════════════════════════════════
   USER CONFIRMATION EMAIL
   ══════════════════════════════════════════════════════════ */
function userEmailTemplate(reg: any): string {
  // Always show companions and extra nights with fallback values
  const companionDisplay  = reg.companions   !== "0" ? `${reg.companions} person(s) (${reg.companion_cost})` : "0";
  const extraNightDisplay = reg.extra_nights !== "0" ? `${reg.extra_nights} night(s) (${reg.extra_night_cost})` : "Not chosen";

  // Build rows as a single string — coupon only added if used
  const summaryRows =
    summaryRow("Conference",   reg.conference_info) +
    summaryRow("Speaker Type", capitalize(reg.speaker_type)) +
    summaryRow("Package",      `${reg.package_name} (${reg.package_price})`) +
    summaryRow("Companions",   companionDisplay) +
    summaryRow("Extra Nights", extraNightDisplay) +
    (reg.coupon_code !== "NONE" ? summaryRow("Coupon Applied", `${reg.coupon_code} (${reg.discount} off)`) : "") +
    summaryRowBold("Total Amount", reg.total_amount);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registration Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
        <tr>
          <td style="background:#1a1a2e;padding:44px 40px;text-align:center;">
            <p style="margin:0 0 16px;display:inline-block;background:rgba(224,184,74,0.15);border:1px solid rgba(224,184,74,0.4);border-radius:50px;padding:5px 18px;color:#e0b84a;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Speaker Registration</p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;letter-spacing:1px;font-family:Georgia,serif;">Signature Global Conferences</h1>
            <p style="margin:10px 0 0;color:#a0b4c8;font-size:13px;font-family:Arial,sans-serif;letter-spacing:0.5px;">Empowering Voices Across the World</p>
          </td>
        </tr>
        <tr>
          <td style="background:#e0b84a;padding:18px 40px;text-align:center;">
            <p style="margin:0;color:#1a1a2e;font-size:17px;font-weight:700;font-family:Arial,sans-serif;letter-spacing:0.5px;">&#127881; You're Officially Registered!</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 6px;color:#1a1a2e;font-size:17px;font-family:Georgia,serif;">Dear <strong>${reg.first_name} ${reg.last_name}</strong>,</p>
            <p style="margin:0 0 28px;color:#5a6a7a;font-size:14px;line-height:1.8;font-family:Arial,sans-serif;">Thank you for registering as a speaker at Signature Global Conferences. Your application has been received and our team will contact you shortly to confirm your payment details.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fc;border:1px solid #e8ecf0;border-radius:10px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px 16px;">
                  <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:2.5px;color:#0f3460;text-transform:uppercase;font-family:Arial,sans-serif;border-bottom:2px solid #e0b84a;padding-bottom:10px;">Registration Summary</p>
                  <table width="100%" cellpadding="0" cellspacing="0">${summaryRows}</table>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;border-left:4px solid #0f3460;border-radius:0 8px 8px 0;margin-bottom:28px;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0;color:#1a1a2e;font-size:13px;line-height:1.7;font-family:Arial,sans-serif;"><strong>What happens next?</strong> Our team will reach out to you at <strong>${reg.email}</strong> within 2-3 business days to confirm your speaking slot and payment details.</p>
                </td>
              </tr>
            </table>
            <p style="margin:0;color:#5a6a7a;font-size:13px;font-family:Arial,sans-serif;line-height:1.7;">If you have any questions, simply reply to this email. We look forward to seeing you on stage!</p>
          </td>
        </tr>
        <tr>
          <td style="background:#1a1a2e;padding:28px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:#e0b84a;font-size:13px;font-family:Georgia,serif;letter-spacing:0.5px;">Signature Global Conferences</p>
            <p style="margin:0;color:#5a7a9a;font-size:11px;font-family:Arial,sans-serif;">&#169; 2026 All rights reserved &#124; This email was sent to ${reg.email}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* ══════════════════════════════════════════════════════════
   ADMIN NOTIFICATION EMAIL
   ══════════════════════════════════════════════════════════ */
function adminEmailTemplate(reg: any): string {
  // Always show companions and extra nights with fallback values
  const companionDisplay  = reg.companions   !== "0" ? `${reg.companions} person(s) (${reg.companion_cost})` : "0";
  const extraNightDisplay = reg.extra_nights !== "0" ? `${reg.extra_nights} night(s) (${reg.extra_night_cost})` : "Not chosen";

  // Optional personal rows — only if data exists
  let optionalPersonRows = "";
  if (reg.organization !== "NO_DATA") optionalPersonRows += summaryRow("Organization", reg.organization);
  if (reg.job_title    !== "NO_DATA") optionalPersonRows += summaryRow("Job Title",    reg.job_title);

  const personalRows =
    summaryRow("Full Name", `${reg.first_name} ${reg.last_name}`) +
    summaryRow("Email",     reg.email) +
    summaryRow("Phone",     reg.phone) +
    summaryRow("Country",   reg.country) +
    optionalPersonRows;

  const registrationRows =
    summaryRow("Region",       reg.region) +
    summaryRow("Conference",   reg.conference_info) +
    summaryRow("Speaker Type", capitalize(reg.speaker_type)) +
    summaryRow("Package",      `${reg.package_name} (${reg.package_price})`) +
    summaryRow("Companions",   companionDisplay) +
    summaryRow("Extra Nights", extraNightDisplay) +
    (reg.coupon_code !== "NONE" ? summaryRow("Coupon", `${reg.coupon_code} (${reg.discount})`) : "") +
    summaryRowBold("Total Amount", reg.total_amount);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Registration</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
        <tr>
          <td style="background:#1a1a2e;padding:36px 40px;">
            <p style="margin:0 0 6px;color:#e0b84a;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Admin Notification</p>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-family:Georgia,serif;">&#128276; New Registration Received</h1>
            <p style="margin:8px 0 0;color:#a0b4c8;font-size:12px;">${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#e0b84a;padding:13px 40px;">
            <p style="margin:0;color:#1a1a2e;font-size:13px;font-weight:700;">${reg.first_name} ${reg.last_name} &#8212; ${reg.region} &#8212; ${reg.total_amount}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fc;border:1px solid #e8ecf0;border-radius:10px;margin-bottom:20px;">
              <tr>
                <td style="padding:20px 24px 16px;">
                  <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:2.5px;color:#0f3460;text-transform:uppercase;border-bottom:2px solid #e0b84a;padding-bottom:10px;">Personal Details</p>
                  <table width="100%" cellpadding="0" cellspacing="0">${personalRows}</table>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fc;border:1px solid #e8ecf0;border-radius:10px;">
              <tr>
                <td style="padding:20px 24px 16px;">
                  <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:2.5px;color:#0f3460;text-transform:uppercase;border-bottom:2px solid #e0b84a;padding-bottom:10px;">Registration Details</p>
                  <table width="100%" cellpadding="0" cellspacing="0">${registrationRows}</table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#1a1a2e;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#5a7a9a;font-size:11px;">Signature Global Conferences &#8212; Admin Notification System</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* ── Helpers ── */
function summaryRow(label: string, value: string): string {
  return `<tr><td style="padding:8px 0;color:#5a6a7a;font-size:13px;width:40%;vertical-align:top;font-family:Arial,sans-serif;">${label}</td><td style="padding:8px 0;color:#1a1a2e;font-size:13px;font-weight:600;vertical-align:top;font-family:Arial,sans-serif;">${value}</td></tr>`;
}

function summaryRowBold(label: string, value: string): string {
  return `<tr><td style="padding:14px 0 8px;color:#1a1a2e;font-size:14px;font-weight:700;border-top:2px solid #e0b84a;font-family:Arial,sans-serif;">${label}</td><td style="padding:14px 0 8px;color:#0f3460;font-size:16px;font-weight:800;border-top:2px solid #e0b84a;font-family:Arial,sans-serif;">${value}</td></tr>`;
}

function capitalize(str: string): string {
  if (!str) return "—";
  return str.charAt(0).toUpperCase() + str.slice(1);
}