import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface SessionInfo {
  portalUrl?: string;
  downloadUrl?: string;
}

/**
 * After a successful checkout the customer is redirected to this page.
 * You can optionally display a billing portal link for subscription
 * customers or a download link for one‑time purchases. The sample
 * implementation calls `/api/session` to look up the checkout
 * session and return any necessary URLs. See `pages/api/session.ts`
 * for details.
 */
export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  	if (!session_id || typeof session_id !== 'string') return;
  	setLoading(true);
  	fetch('/api/session?session_id=' + session_id)
  	  .then((res) => res.json())
  	  .then((data) => {
  	    setInfo(data);
  	  })
  	  .finally(() => setLoading(false));
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Payment Successful</title>
      </Head>
      <main className="max-w-xl mx-auto p-8 prose">
        <h1>Thank you!</h1>
        <p>Your payment was successful. A confirmation email will arrive shortly.</p>
        {loading && <p>Retrieving order details…</p>}
        {info?.portalUrl && (
          <p>
            <a
              href={info.portalUrl}
              className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Manage your subscription
            </a>
          </p>
        )}
        {info?.downloadUrl && (
          <p>
            <Link
              href={info.downloadUrl}
              className="inline-block px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            >
              Download your purchase
            </Link>
          </p>
        )}
        <p>
          <Link href="/">Return to Store</Link>
        </p>
      </main>
    </>
  );
}
