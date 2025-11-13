import type { NextApiRequest, NextApiResponse } from 'next';
import stripe from '@/lib/stripe';
import { products } from '@/lib/products';

/**
 * This API route creates a Stripe Checkout Session for a given product.
 * It expects a `slug` query parameter matching one of the product
 * definitions in `lib/products.ts`.  The client will be redirected to
 * the hosted checkout URL returned by Stripe.  Make sure your Stripe
 * price IDs are configured before deploying.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Missing product slug' });
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return res.status(400).json({ error: 'Invalid product slug' });
  }

  const host = req.headers.origin || process.env.APP_URL;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: product.type === 'subscription' ? 'subscription' : 'payment',
      line_items: [
        {
          price: product.priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${host}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${host}/cancel`,
    });

    // On success, redirect to the Stripe hosted payment page
    return res.status(303).setHeader('Location', session.url || '').end();
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    return res.status(500).json({ error: 'Unable to create session' });
  }
}
