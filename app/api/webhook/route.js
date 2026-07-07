import { NextResponse } from 'next/server'
import stripe from '../../../lib/stripe'
import { logOrderToSheets } from '../../../lib/sheets'

export const runtime = 'nodejs'

const processedEvents = new Set()

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

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

  if (processedEvents.has(event.id)) {
    return NextResponse.json({ received: true, duplicate: true })
  }
  processedEvents.add(event.id)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
    })

    const address = session.shipping_details?.address
      ? `${session.shipping_details.address.line1}${session.shipping_details.address.line2 ? ', ' + session.shipping_details.address.line2 : ''}, ${session.shipping_details.address.city}, ${session.shipping_details.address.state} ${session.shipping_details.address.postal_code}`
      : ''

    for (const lineItem of lineItems.data) {
      if (!lineItem.description) continue

      const order = {
        date: new Date().toLocaleString(),
        name: session.customer_details?.name || '',
        email: session.customer_details?.email || '',
        address,
        item: lineItem.description,
        quantity: lineItem.quantity,
        amount: `$${(lineItem.amount_total / 100).toFixed(2)}`,
        paymentId: session.payment_intent,
        status: 'Pending',
      }

      await logOrderToSheets(order)
    }
  }

  return NextResponse.json({ received: true })
}