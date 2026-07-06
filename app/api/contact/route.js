import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Log to console for now — swap in email service later
    console.log('Contact form submission:', { name, email, message })

    // Optional: log to Google Sheets using your existing sheets lib
    // await logOrderToSheets({ date: new Date().toLocaleString(), name, email, message, amount: 'N/A', paymentId: 'contact-form', items: '' })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}