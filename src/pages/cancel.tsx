import Head from 'next/head';
import Link from 'next/link';

/**
 * The cancel page is displayed when a customer abandons the checkout
 * process. It provides a simple message and a link back to the
 * storefront.
 */
export default function Cancel() {
  return (
    <>
      <Head>
        <title>Checkout Cancelled</title>
      </Head>
      <main className="max-w-xl mx-auto p-8 prose">
        <h1>Checkout cancelled</h1>
        <p>
          Your purchase was cancelled. If this was a mistake you can
          return to the store and try again.
        </p>
        <p>
          <Link href="/">Back to Store</Link>
        </p>
      </main>
    </>
  );
}
