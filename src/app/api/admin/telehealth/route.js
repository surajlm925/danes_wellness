import { NextResponse } from 'next/server';
import { createDraftOrder } from '@/lib/shopifyAdmin';

// Scaffold Telehealth Dashboard Backend (Phase 2)
// This file will provide a backend to fetch specific Customer profile + order history,
// and logic to create a draft order.

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

// GET method to fetch a specific Customer profile and their order history
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const email = searchParams.get('email');

    // Simple admin auth check
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.ADMIN_SECRET || process.env.WHATSAPP_BOT_SECRET}`;
    if (!authHeader || authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!customerId && !email) {
      return NextResponse.json({ error: 'Missing customerId or email parameter' }, { status: 400 });
    }

    if (!domain || !token) {
      throw new Error('Missing Shopify Admin environment variables');
    }

    const endpoint = `https://${domain}/admin/api/2024-01/graphql.json`;

    let query = '';
    let variables = {};

    if (customerId) {
      query = `
        query getCustomer($id: ID!) {
          customer(id: $id) {
            id
            firstName
            lastName
            email
            phone
            orders(first: 10, sortKey: CREATED_AT, reverse: true) {
              edges {
                node {
                  id
                  name
                  createdAt
                  totalPriceSet {
                    shopMoney {
                      amount
                      currencyCode
                    }
                  }
                  displayFinancialStatus
                  displayFulfillmentStatus
                }
              }
            }
          }
        }
      `;
      // Usually customer ID looks like: gid://shopify/Customer/123456789
      variables = { id: customerId.includes('gid://') ? customerId : `gid://shopify/Customer/${customerId}` };
    } else if (email) {
      query = `
        query getCustomers($query: String!) {
          customers(first: 1, query: $query) {
            edges {
              node {
                id
                firstName
                lastName
                email
                phone
                orders(first: 10, sortKey: CREATED_AT, reverse: true) {
                  edges {
                    node {
                      id
                      name
                      createdAt
                      totalPriceSet {
                        shopMoney {
                          amount
                          currencyCode
                        }
                      }
                      displayFinancialStatus
                      displayFulfillmentStatus
                    }
                  }
                }
              }
            }
          }
        }
      `;
      variables = { query: `email:${email}` };
    }

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

    let customer = null;
    if (customerId) {
        customer = data.data?.customer;
    } else {
        customer = data.data?.customers?.edges?.[0]?.node;
    }

    if (!customer) {
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ customer }, { status: 200 });

  } catch (error) {
    console.error('Telehealth Customer Fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}

// POST method utilizing the existing createDraftOrder webhook logic so a doctor can hit "Prescribe"
export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.ADMIN_SECRET || process.env.WHATSAPP_BOT_SECRET}`;

    if (!authHeader || authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { lineItems, customerPhone, shippingAddress, customerEmail } = body;

    if (!lineItems || !Array.isArray(lineItems)) {
       return NextResponse.json({ error: 'Invalid payload: lineItems array is required' }, { status: 400 });
    }

    // Pass customerPhone down as per existing hook
    const draftOrder = await createDraftOrder(lineItems, customerPhone, shippingAddress);

    // If the draft order creation succeeds, return the checkout URL for the doctor to share
    return NextResponse.json({
      id: draftOrder.id,
      invoiceUrl: draftOrder.invoiceUrl,
      message: 'Prescription generated successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Telehealth Prescribe error:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}
