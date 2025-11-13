Place your downloadable ZIP archives in this folder. When you define a
product with a `zipPath` in `lib/products.ts` (for example
`n8n-lead-pack.zip`) that file should live here. These files will be
served by Next.js at runtime under the `/products` path.  For
security, consider appending a time‑limited token to the download URL
and verifying it in a custom API route.
