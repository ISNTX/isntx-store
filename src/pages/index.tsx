import Head from 'next/head';
import Link from 'next/link';
import { products } from '@/lib/products';

/**
 * The store homepage displays a catalogue of AI agent suites and
 * downloadable packs. Each item includes a short description and a
 * button that initiates the Stripe checkout flow via our API route.
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>ISNTX Store</title>
      </Head>
      <main className="max-w-3xl mx-auto p-8 prose">
        <h1>ISNTX Store</h1>
        <p>
          Welcome to the ISNTX storefront. Select one of the AI agent
          suites or resource packs below to automate your business tasks.
        </p>
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.slug}
              className="border rounded-lg p-4 shadow-md flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600" style={{ marginTop: '0.25rem' }}>
                  {product.description}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                {/* The API route will redirect the browser to Stripe */}
                <Link
                  href={`/api/checkout?slug=${product.slug}`}
                  className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  {product.type === 'subscription' ? 'Subscribe' : 'Buy'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
