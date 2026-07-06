import MerchCard from './MerchCard'

export default function MerchGrid({ items }) {
  return (
    <div className="merch-grid">
      {items.map(item => (
        <MerchCard key={item.id} item={item} />
      ))}
    </div>
  )
}