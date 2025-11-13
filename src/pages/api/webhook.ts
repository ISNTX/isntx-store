import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import stripe from '@/lib/stripe';

// We disable the default body parser so that we can access the raw
// request body for signature verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Stripe Webhook handler. This endpoint listens for events from Stripe
 * such as `checkout.session.completed` and processes them as needed.
 * To enable this, configure the webhook endpoint in your Stripe
 * dashboard and provide the signing secret via the
 * `STRIPE_WEBHOOK_SECRET` environment variable.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  if (!sig || Array.isArray(sig)) {
    return res.status(400).send('Missing signature');
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // TODO: handle completed checkout sessions. For subscription
      // products you might provision access here. For one‑time
      // products you could generate a download token and email the
      // purchaser. See the blueprint for more details.
      console.log('Checkout session completed:', session.id);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}
