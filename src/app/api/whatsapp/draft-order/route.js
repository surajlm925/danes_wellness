import { NextResponse } from 'next/server';
import { createDraftOrder } from '@/lib/shopifyAdmin';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.WHATSAPP_BOT_SECRET}`;

    if (!authHeader || authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { lineItems, customerPhone, shippingAddress } = body;

    if (!lineItems || !Array.isArray(lineItems)) {
       return NextResponse.json({ error: 'Invalid payload: lineItems array is required' }, { status: 400 });
    }

    const draftOrder = await createDraftOrder(lineItems, customerPhone, shippingAddress);

    return NextResponse.json({
      id: draftOrder.id,
      invoiceUrl: draftOrder.invoiceUrl
    }, { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}
