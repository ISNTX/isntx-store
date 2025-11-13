# ISNTX Store

This repository contains a minimal self‑hosted storefront for selling
AI agent suites and resource packs under the ISNTX brand.  It is
designed to mirror the multi‑agent catalogue described in the
blueprint provided by the user.  The app is built with Next.js and
integrates with Stripe for both subscription and one‑time payments.

## Features

* **Catalogue of products** defined in `src/lib/products.ts`.  Each
  entry corresponds to one of the suites or packs described in the
  blueprint.  Update the `priceId` fields with your own Stripe Price
  IDs to enable checkout.
* **Subscription support** via Stripe Checkout.  Customers are
  redirected to Stripe to complete payment and then back to the app.
* **One‑time purchases** for downloadable packs.  After checkout the
  success page can display a download link to a ZIP placed under
  `public/products`.
* **Webhook endpoint** at `/api/webhook` to listen for
  `checkout.session.completed` events.  You can extend this handler to
  provision access or issue time‑limited download tokens.
* **Billing portal integration** for subscription customers.  The
  success page calls `/api/session` to create a customer portal link.

## Getting Started

1. **Install dependencies.**  Run `npm install` in the project root.
2. **Configure environment variables.**  Copy `.env.example` to
   `.env.local` and fill in your values:

   * `APP_URL` – the base URL of your deployed site (e.g. `https://isntx.com`).
   * `STRIPE_SECRET_KEY` – your secret API key from the Stripe dashboard.
   * `STRIPE_WEBHOOK_SECRET` – the signing secret for your webhook.

3. **Create Stripe prices.**  In the Stripe dashboard create a price
   for each product with the appropriate billing interval (monthly for
   subscriptions, one‑time for packs).  Copy the price IDs into
   `src/lib/products.ts`.
4. **Place downloadable files.**  For one‑time products, put the
   corresponding ZIP archives in `public/products` and ensure the
   filenames match the `zipPath` values.
5. **Start the development server.**  Run `npm run dev` and open
   `http://localhost:3000` in your browser to see the storefront.
6. **Set up the webhook.**  In Stripe, add an endpoint pointing to
   `/api/webhook` on your deployed domain and subscribe to
   `checkout.session.completed`.  Paste the signing secret into
   `STRIPE_WEBHOOK_SECRET`.

## Deployment on Render

Render offers a simple way to deploy Next.js applications.  Follow
these steps to get your store live:

1. **Create a new Web Service** on Render from your GitHub repository
   containing this project.  Select `Next.js` as the runtime.
2. **Add environment variables** in the Render dashboard corresponding
   to those defined in `.env.example` (`APP_URL`, `STRIPE_SECRET_KEY`,
   `STRIPE_WEBHOOK_SECRET`).
3. **Set the build and start commands:**

   * Build command: `npm run build`
   * Start command: `npm run start`

4. **Configure the webhook** by pointing Stripe at
   `https://your-service.onrender.com/api/webhook` and update
   `STRIPE_WEBHOOK_SECRET` accordingly.
5. **Point your domain** (e.g. `store.isntx.com` or a path on
   `isntx.com`) at the Render service.  You can use a CNAME record or
   a reverse proxy on your main site to route requests to the store.

Once deployed, your buyers will be able to visit the store, choose a
product and complete payment through Stripe.  After a successful
purchase they will be redirected back to the success page with
instructions to download their pack or manage their subscription.

## Extending the Store

The current implementation is intentionally minimal to keep the
example self‑contained.  In a real production setting you might wish
to:

* Integrate with a database (e.g. Prisma + Postgres) to store orders
  and generate unique download tokens.
* Send confirmation emails using Stripe’s email receipts or your own
  SMTP provider.
* Implement a partner or referral program by adding a `ref` query
  parameter to checkout sessions and recording commission data in a
  database.
* Add authentication and restrict certain product pages to logged‑in
  users.

## License

This project is provided as‑is for demonstration purposes.  You are
free to modify and use it in your own projects.
