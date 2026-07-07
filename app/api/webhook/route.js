import { NextResponse } from 'next/server'
import stripe from '../../../lib/stripe'
import { logOrderToSheets } from '../../../lib/sheets'

export const runtime = 'nodejs'

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

 if (event.type === 'checkout.session.completed') {
  const session = event.data.object

  // Fetch line items to get individual products
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  })

    const address = session.shipping_details?.address
    ? `${session.shipping_details.address.line1}${session.shipping_details.address.line2 ? ', ' + session.shipping_details.address.line2 : ''}, ${session.shipping_details.address.city}, ${session.shipping_details.address.state} ${session.shipping_details.address.postal_code}, ${session.shipping_details.address.country}`
    : ''

    if (event.type === 'checkout.session.completed') {
  const session = event.data.object

  // Fetch line items to get individual products
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  })

    console.log('Session shipping:', JSON.stringify(session.shipping_details))
    console.log('Line items:', JSON.stringify(lineItems.data))


  const address = session.shipping_details?.address
    ? `${session.shipping_details.address.line1}${session.shipping_details.address.line2 ? ', ' + session.shipping_details.address.line2 : ''}, ${session.shipping_details.address.city}, ${session.shipping_details.address.state} ${session.shipping_details.address.postal_code}`
    : ''

  // Log one row per line item
  for (const lineItem of lineItems.data) {
    const order = {
      date: new Date().toLocaleString(),
      name: session.customer_details?.name || '',
      email: session.customer_details?.email || '',
      address,
      item: lineItem.description || lineItem.price?.product_data?.name || lineItem.description,
      quantity: lineItem.quantity,
      amount: `$${(lineItem.amount_total / 100).toFixed(2)}`,
      paymentId: session.payment_intent,
      status: 'Pending',
    }
    console.log('Logging order:', JSON.stringify(order))
    await logOrderToSheets(order)
  }
}

    const order = {
      date: new Date().toLocaleString(),
      name: session.customer_details?.name,
      email: session.customer_details?.email,
      address: session.shipping_details?.address
        ? `${session.shipping_details.address.line1}, ${session.shipping_details.address.city}, ${session.shipping_details.address.state} ${session.shipping_details.address.postal_code}`
        : '',
      amount: `$${(session.amount_total / 100).toFixed(2)}`,
      paymentId: session.payment_intent,
    }

    await logOrderToSheets(order)
  }

  return NextResponse.json({ received: true })
}