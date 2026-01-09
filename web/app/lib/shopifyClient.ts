import { createStorefrontApiClient } from "@shopify/storefront-api-client";

let shopifyClientInstance: ReturnType<typeof createStorefrontApiClient> | null = null;

function getShopifyClient() {
  if (shopifyClientInstance) {
    return shopifyClientInstance;
  }

  if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
    throw new Error("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set");
  }

  if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error("SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set");
  }

  shopifyClientInstance = createStorefrontApiClient({
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    apiVersion: "2024-10",
    publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  });

  return shopifyClientInstance;
}

export const shopifyClient = {
  request: (...args: Parameters<ReturnType<typeof createStorefrontApiClient>["request"]>) => {
    return getShopifyClient().request(...args);
  },
};

// GraphQL queries and mutations
export const CHECKOUT_CREATE_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        totalPrice {
          amount
          currencyCode
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const CHECKOUT_LINE_ITEMS_ADD_MUTATION = `
  mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;
