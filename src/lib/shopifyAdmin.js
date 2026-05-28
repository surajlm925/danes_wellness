export async function createDraftOrder(lineItems, customerPhone, shippingAddress) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error('Missing Shopify Admin environment variables');
  }

  const endpoint = `https://${domain}/admin/api/2024-01/graphql.json`;

  const query = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          invoiceUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Provide an email if missing, as Shopify sometimes expects it when associating customers,
  // but we primarily rely on the phone number based on instructions. We'll pass phone to customer.
  const variables = {
    input: {
      lineItems: lineItems,
      shippingAddress: shippingAddress,
      useCustomerDefaultAddress: false,
      // If customer phone is provided, attach a generic customer object
      ...(customerPhone ? { customerId: null } : {}), // We can't lookup ID directly here easily without another query, so we pass phone
      // Alternatively, we can pass email/phone on the draft order level
    }
  };

  // Since we only have customerPhone, let's look at the DraftOrderInput spec.
  // It takes a purchasingEntity, or we can just provide the phone/email.
  if (customerPhone) {
      variables.input.phone = customerPhone;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Shopify API error: ${response.status} - ${text}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(data.errors)}`);
    }

    const draftOrderData = data.data?.draftOrderCreate;

    if (draftOrderData?.userErrors?.length > 0) {
      throw new Error(`User Errors: ${JSON.stringify(draftOrderData.userErrors)}`);
    }

    return draftOrderData.draftOrder;

  } catch (error) {
    console.error("Error creating draft order:", error);
    throw error;
  }
}
