'use client'
import { useRouter } from 'next/navigation'

export default function MerchCard({ item }) {
  const router = useRouter()

  return (
    <div className="merch-card" onClick={() => router.push('/merch')}>
      <div className="merch-card-image">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />
        )}
      </div>
      <div className="merch-card-info">
        <p className="merch-card-name">{item.name}</p>
        <p className="merch-card-price">{item.priceDisplay}</p>
        <button className="merch-card-btn">View Item</button>
      </div>
    </div>
  )
}