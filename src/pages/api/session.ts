import type { NextApiRequest, NextApiResponse } from 'next';
import stripe from '@/lib/stripe';
import { products } from '@/lib/products';

/**
 * This API route retrieves a checkout session from Stripe and returns
 * information useful for the success page. It can optionally create a
 * billing portal session for subscription customers and compute a
 * download URL for one‑time purchases.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;
  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  try {
    // Expand line items so we can inspect the price id.
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items.data.price'],
    });

    const origin = req.headers.origin || process.env.APP_URL || '';
    let portalUrl: string | undefined;
    let downloadUrl: string | undefined;

    // If this was a subscription purchase and we know the customer ID,
    // create a billing portal session so the user can manage their plan.
    if (session.mode === 'subscription' && typeof session.customer === 'string') {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: session.customer,
        return_url: `${origin}/`,
      });
      portalUrl = portalSession.url;
    }

    // Determine the purchased product by matching the price ID to our
    // product definitions.
    const lineItem = session.line_items?.data?.[0];
    const priceId = lineItem?.price?.id;
    if (priceId) {
      const product = products.find((p) => p.priceId === priceId);
      if (product && product.type === 'one_time' && product.zipPath) {
        // A real implementation would issue a time‑limited download
        // token and append it as a query parameter. For simplicity we
        // return a direct link to the file under the public directory.
        downloadUrl = `/products/${product.zipPath}`;
      }
    }

    res.status(200).json({ portalUrl, downloadUrl });
  } catch (err) {
    console.error('Error retrieving checkout session:', err);
    res.status(500).json({ error: 'Unable to retrieve session' });
  }
}
