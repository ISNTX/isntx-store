import Stripe from 'stripe';

/**
 * Initialise a Stripe client using the secret API key. Ensure that the
 * `STRIPE_SECRET_KEY` environment variable is defined in your
 * deployment environment. Without it, Stripe API calls will fail.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default stripe;
