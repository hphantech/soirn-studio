import { NextRequest, NextResponse } from "next/server";
import { shopifyClient, CHECKOUT_CREATE_MUTATION } from "@/app/lib/shopifyClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lineItems } = body;

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json(
        { error: "Line items are required" },
        { status: 400 }
      );
    }

    // Transform cart items to Shopify line items format
    const shopifyLineItems = lineItems.map((item: any) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const response = await shopifyClient.request(CHECKOUT_CREATE_MUTATION, {
      variables: {
        input: {
          lineItems: shopifyLineItems,
        },
      },
    });

    const { checkout, checkoutUserErrors } = response.data?.checkoutCreate || {};

    if (checkoutUserErrors && checkoutUserErrors.length > 0) {
      return NextResponse.json(
        { error: checkoutUserErrors[0].message },
        { status: 400 }
      );
    }

    if (!checkout) {
      return NextResponse.json(
        { error: "Failed to create checkout" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      checkoutId: checkout.id,
      checkoutUrl: checkout.webUrl,
    });
  } catch (error: any) {
    console.error("Checkout creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout" },
      { status: 500 }
    );
  }
}
