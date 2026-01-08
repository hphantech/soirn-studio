# Shopify Headless Checkout Setup Guide

This guide will help you set up Shopify headless checkout for your Soirn Studio website.

## Prerequisites

1. A Shopify store (you can create one at [shopify.com](https://www.shopify.com))
2. Access to your Shopify admin panel

## Step 1: Get Your Storefront API Access Token

1. Log in to your Shopify admin panel
2. Go to **Settings** → **Apps and sales channels**
3. Click **Develop apps** (or **Manage private apps** if using older Shopify)
4. Click **Create an app**
5. Name it something like "Soirn Studio Storefront"
6. Click **Create app**
7. Click **Configure Admin API scopes** and grant the following permissions:
   - `read_products`
   - `read_product_listings`
   - `write_checkouts`
   - `read_checkouts`
8. Click **Configure Storefront API scopes** and enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
9. Click **Save**
10. Click **Install app**
11. After installation, go to **API credentials** tab
12. Under **Storefront API access token**, click **Reveal token once**
13. Copy the token (you'll need this for your `.env` file)

## Step 2: Get Your Store Domain

Your store domain is in the format: `your-store-name.myshopify.com`

You can find it in your Shopify admin URL or in **Settings** → **Domains**.

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root of your project (or add to existing `.env`):

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
```

**Important:** 
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` must start with `NEXT_PUBLIC_` because it's used in client-side code
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` should NOT have `NEXT_PUBLIC_` prefix (keep it server-side only)

## Step 4: Create Products in Shopify

1. In Shopify admin, go to **Products**
2. Create products matching your website products
3. For each product:
   - Add variants for each size (XS, S, M, L, XL, etc.)
   - Note the Product ID and Variant IDs

## Step 5: Map Products to Shopify IDs

Update your `app/(site)/shop/products.ts` file to include Shopify IDs:

```typescript
{
  slug: "drop-001-hoodie-black",
  name: "Drop 001 Hoodie — Black",
  // ... other fields
  shopifyProductId: "gid://shopify/Product/1234567890",
  shopifyVariants: {
    "XS": "gid://shopify/ProductVariant/1111111111",
    "S": "gid://shopify/ProductVariant/2222222222",
    "M": "gid://shopify/ProductVariant/3333333333",
    "L": "gid://shopify/ProductVariant/4444444444",
    "XL": "gid://shopify/ProductVariant/5555555555",
    "XXL": "gid://shopify/ProductVariant/6666666666",
  },
}
```

### How to Get Shopify IDs

1. In Shopify admin, go to a product
2. The URL will look like: `https://admin.shopify.com/store/your-store/products/1234567890`
3. The number at the end is the product ID
4. For variant IDs, click on a variant and check the URL or use the Shopify API

Alternatively, you can use the Shopify GraphQL Admin API or a tool like [Shopify GraphiQL App](https://apps.shopify.com/graphiql) to query for IDs.

## Step 6: Test the Checkout

1. Start your development server: `npm run dev`
2. Add items to cart
3. Click "Check out" in the cart drawer
4. You should be redirected to Shopify's checkout page

## Troubleshooting

### "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set"
- Make sure your `.env.local` file exists and has the correct variable name
- Restart your development server after adding environment variables

### "SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set"
- Make sure you've added the token to `.env.local`
- Make sure it doesn't have `NEXT_PUBLIC_` prefix
- Restart your development server

### "Variant ID not found"
- Make sure you've added `shopifyVariants` to your product data
- Verify the size keys match exactly (case-sensitive)

### Checkout fails to create
- Verify your Storefront API token has the correct permissions
- Check that variant IDs are in the correct format: `gid://shopify/ProductVariant/...`
- Check browser console and server logs for detailed error messages

## Security Notes

- Never commit your `.env.local` file to git
- The Storefront API token should only be used server-side
- Consider using environment variables in your hosting platform (Vercel, Netlify, etc.)

## Additional Resources

- [Shopify Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [Shopify Checkout API](https://shopify.dev/docs/api/checkout)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
