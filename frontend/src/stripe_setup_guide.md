# Stripe Integration & Setup Guide

This document outlines the complete Stripe integration implemented for Signature Global Conferences. It serves as a historical record of the steps we took and a technical reference for the current architecture.

## 1. Architecture Overview
Instead of processing credit cards directly on the frontend (which requires heavier PCI compliance), we implemented a secure **Stripe Checkout** flow using Supabase Edge Functions.

The workflow is as follows:
1. User completes the 3-step registration form on the frontend.
2. Frontend calls the `create-checkout-session` Supabase Edge Function.
3. Edge Function validates the package, calculates the price, securely talks to Stripe, and generates a Checkout URL.
4. User is redirected to the Stripe-hosted payment page.
5. Upon successful payment, Stripe fires a webhook to our `stripe-webhook` Edge Function.
6. The webhook updates the database (`payment_status = "paid"`) and triggers `send-registration-email`.
7. The user is redirected back to the `RegisterSuccess.jsx` page on the frontend.

---

## 2. Frontend Implementation (`registerdata.jsx`)
We updated the frontend submission logic to handle the secure redirect rather than direct database inserts.

- **`submitRegistration` function**: 
  Instead of writing directly to Supabase, we collect all form data and invoke the edge function:
  ```javascript
  const { data, error } = await supabase.functions.invoke("create-checkout-session", {
    body: { fields, fromRegion },
  });
  window.location.href = data.url; // Redirect to Stripe
  ```
- **Pricing Logic**: Extracted `calculateTotal` to accurately calculate packages, companion fees, extra nights, and discount coupons before sending them to the backend for verification.

---

## 3. Edge Function: `create-checkout-session`
Located at `supabase/functions/create-checkout-session/index.ts`. This is the core of the secure payment generation.

- **Stripe Initialization**: Connects to Stripe using the `STRIPE_SECRET_KEY` environment variable.
- **Line Items**: Dynamically builds Stripe `line_items` array:
  - Base Package price
  - Companion costs (if applicable)
  - Extra nights costs (if applicable)
- **Coupons**: If a valid coupon is applied, the function uses the Stripe API to generate a temporary ephemeral coupon and applies it to the checkout session.
- **Database Entry**: Creates a pending record in the `registrations` table and saves the `stripe_session_id` returned by Stripe.

---

## 4. Edge Function: `stripe-webhook`
Located at `supabase/functions/stripe-webhook/index.ts`. This acts as the secure listener for Stripe's payment confirmations.

- **Signature Verification**: Uses the `STRIPE_WEBHOOK_SECRET` to ensure the request is authentically coming from Stripe and not a malicious third party.
- **Event Handling**: Listens specifically for the `checkout.session.completed` event.
- **Status Update**: Extracts the `registration_id` from the session metadata and updates the Supabase `registrations` table, setting `payment_status` to `"paid"`.
- **Trigger Emails**: Automatically makes a POST request to our `send-registration-email` Edge Function to dispatch receipts and notifications.

---

## 5. Edge Function: `send-registration-email`
Located at `supabase/functions/send-registration-email/index.ts`.

- **SMTP Configuration**: Connects to Hostinger's SMTP (`smtp.hostinger.com`) on port 465 using `GMAIL_USER` and `GMAIL_PASSWORD`.
- **Templates**: Contains HTML email templates for both the User (Registration Confirmed) and Admin (New Registration Received).
- **Execution**: Triggered exclusively by the webhook after a payment is secured.

---

## 6. Database Schema Updates
To support the integration, we utilized two crucial fields in the `registrations` table:
1. `stripe_session_id` (String/Text) — Stores the unique `cs_test_...` (or `cs_live_...`) ID to match webhooks to users.
2. `payment_status` (String/Text) — Defaults to `"pending"` upon form submission and is updated to `"paid"` by the webhook.

---

## 7. Production Readiness Checklist (Pending)
As we shift our focus to production, the following steps must be completed to go live:

1. **Frontend**: Update `VITE_STRIPE_PUBLISHABLE_KEY` in the `.env` file to your **Live Publishable Key** (`pk_live_...`).
2. **Supabase Secrets**: Add your **Live Secret Key** (`sk_live_...`) as `STRIPE_SECRET_KEY` in the Supabase Dashboard.
3. **Webhook Setup**: 
   - Create a live Webhook in the Stripe Dashboard pointing to: `https://[YOUR_SUPABASE_PROJECT_ID].supabase.co/functions/v1/stripe-webhook`.
   - Add the resulting signing secret to Supabase as `STRIPE_WEBHOOK_SECRET`.
4. **Deploy Edge Functions**: Run `supabase functions deploy` to push the local functions to the live production server.
5. **Coupons**: Recreate any valid test discount codes in your Live Stripe Dashboard.
6. **SMTP Credentials**: Ensure `GMAIL_USER` and `GMAIL_PASSWORD` are securely added to Supabase secrets for the email dispatcher.
