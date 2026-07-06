import { NextResponse } from 'next/server'
import stripe from '../../../lib/stripe'
import { logOrderToSheets } from '../../../lib/sheets'

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