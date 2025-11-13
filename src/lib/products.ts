export interface Product {
  /**
   * A short slug used in URLs and API routes.
   */
  slug: string;
  /**
   * The human friendly name of the product.
   */
  name: string;
  /**
   * A one‑sentence description that sells the value of the product.
   */
  description: string;
  /**
   * Defines how the product is billed. `subscription` products will
   * checkout in subscription mode, while `one_time` products will use
   * one‑off payments.
   */
  type: 'subscription' | 'one_time';
  /**
   * The Stripe Price ID. You must create a Price in your Stripe
   * dashboard and then paste the ID here before deploying.  Without a
   * valid price the checkout session will fail.
   */
  priceId: string;
  /**
   * For products that include a file download, specify the relative
   * path to the ZIP inside the `public/products` folder. The file will
   * be served after purchase.
   */
  zipPath?: string;
}

/**
 * A curated list of purchasable items on isntx.com. These mirror the
 * “agent suites” described in the blueprint supplied by the user. You
 * should update the `priceId` fields with real values from your
 * Stripe account and place any downloadable archives in
 * `/public/products` with matching filenames.
 */
export const products: Product[] = [
  {
    slug: 'sales-agent',
    name: 'Sales Agent Suite',
    description: 'Automated call prep, RFP drafting and CRM updates—hands‑free.',
    type: 'subscription',
    priceId: 'price_sales_agent_sub',
  },
  {
    slug: 'support-agent',
    name: 'Support Agent Suite',
    description: 'Ticket triage, product answers and call analysis for support teams.',
    type: 'subscription',
    priceId: 'price_support_agent_sub',
  },
  {
    slug: 'ops-agent',
    name: 'Ops & Compliance Agent',
    description: 'Audit and report automation plus compliance checks.',
    type: 'subscription',
    priceId: 'price_ops_agent_sub',
  },
  {
    slug: 'research-agent',
    name: 'Research & Analytics Agent',
    description: 'Deep research, dashboards and insightful analytics.',
    type: 'subscription',
    priceId: 'price_research_agent_sub',
  },
  {
    slug: 'docs-agent',
    name: 'Docs & Knowledge Agent',
    description: 'Enterprise search across Drive, SharePoint and other sources.',
    type: 'subscription',
    priceId: 'price_docs_agent_sub',
  },
  {
    slug: 'team-bundle',
    name: 'ISNTX Team (All Agents)',
    description: 'All suites together with priority support and updates.',
    type: 'subscription',
    priceId: 'price_team_bundle_sub',
  },
  {
    slug: 'n8n-lead-pack',
    name: 'n8n Workflow Pack: Lead Intake & Outreach',
    description: 'A collection of n8n workflows and setup guide. Instant ZIP.',
    type: 'one_time',
    priceId: 'price_n8n_pack_one',
    zipPath: 'n8n-lead-pack.zip',
  },
  {
    slug: 'prompt-sop-pack',
    name: 'Prompt & SOP Pack: Sales + Support',
    description: 'Prompts, playbooks and SOPs. Instant ZIP.',
    type: 'one_time',
    priceId: 'price_prompt_pack_one',
    zipPath: 'prompt-sop-pack.zip',
  },
];
