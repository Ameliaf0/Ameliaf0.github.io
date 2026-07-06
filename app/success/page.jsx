import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1>Order confirmed!</h1>
      <p>Thanks for your purchase. You'll receive a confirmation email shortly.</p>
      <Link href="/merch" className="btn" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
        Back to Merch
      </Link>
    </div>
  )
}