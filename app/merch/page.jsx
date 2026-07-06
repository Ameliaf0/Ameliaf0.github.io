'use client'
import { useState } from 'react'
import { merchItems } from '../../data/merch'

export default function MerchPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedSizes, setSelectedSizes] = useState({})
  const [cartOpen, setCartOpen] = useState(false)

  const categories = ['all', ...new Set(merchItems.map(i => i.category))]

  const filtered = activeCategory === 'all'
    ? merchItems
    : merchItems.filter(i => i.category === activeCategory)

  const addToCart = (item, size) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id && c.size === size)
      if (existing) {
        return prev.map(c =>
          c.id === item.id && c.size === size
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      }
      return [...prev, { ...item, size, quantity: 1 }]
    })
    setSelectedItem(null)
  }

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(c => !(c.id === id && c.size === size)))
  }

  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    })
    const { url } = await res.json()
    window.location.href = url
  }

  const cartTotal = cart.reduce((sum, c) => sum + c.priceInCents * c.quantity, 0)
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0)

  return (
    <div>
      {/* Header */}
      <div className="merch-header">
        <h1>Merch</h1>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>

      {/* Category Filter */}
      <div className="merch-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="merch-grid">
        {filtered.map(item => (
          <div key={item.id} className="merch-card" onClick={() => setSelectedItem(item)}>
            <div className="merch-card-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="merch-card-info">
              <p className="merch-card-name">{item.name}</p>
              <p className="merch-card-price">{item.priceDisplay}</p>
              <button className="merch-card-btn">View Item</button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Popup */}
      {selectedItem && (
        <div className="popup-overlay" onClick={() => setSelectedItem(null)}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelectedItem(null)}>✕</button>
            <div className="popup-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="popup-details">
              <h2>{selectedItem.name}</h2>
              <p className="popup-price">{selectedItem.priceDisplay}</p>
              <p className="popup-desc">{selectedItem.description}</p>

              {selectedItem.sizes && (
                <div className="size-selector">
                  <p>Size</p>
                  <div className="size-options">
                    {selectedItem.sizes.map(size => (
                      <button
                        key={size}
                        className={`size-btn ${selectedSizes[selectedItem.id] === size ? 'active' : ''}`}
                        onClick={() => setSelectedSizes(prev => ({ ...prev, [selectedItem.id]: size }))}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="btn popup-add-btn"
                onClick={() => {
                  const size = selectedItem.sizes
                    ? selectedSizes[selectedItem.id]
                    : null
                  if (selectedItem.sizes && !size) {
                    alert('Please select a size')
                    return
                  }
                  addToCart(selectedItem, size)
                }}
              >
                Add to Cart — {selectedItem.priceDisplay}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="popup-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Cart</h2>
              <button className="popup-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="cart-empty">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, i) => (
                    <div key={i} className="cart-item">
                      <div>
                        <p className="cart-item-name">{item.name}</p>
                        {item.size && <p className="cart-item-size">Size: {item.size}</p>}
                        <p className="cart-item-qty">Qty: {item.quantity}</p>
                      </div>
                      <div className="cart-item-right">
                        <p>${(item.priceInCents * item.quantity / 100).toFixed(2)}</p>
                        <button
                          className="cart-remove"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <p className="cart-total">Total: ${(cartTotal / 100).toFixed(2)}</p>
                  <button className="btn" onClick={handleCheckout}>Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}