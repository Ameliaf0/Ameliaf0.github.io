'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa'

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } else {
      setStatus('error')
    }
  }

  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand column */}
        <div className="footer-brand">
          <p className="footer-logo">Huck N' Pray</p>
          <p className="footer-tagline">Psychedelic · Surfy · Rock<br />Boulder, CO</p>
          <div className="footer-social">
            <a href="https://instagram.com/yourhandle" target="_blank" aria-label="Instagram"><FaInstagram size={18} /></a>
            <a href="https://youtube.com/@yourchannel" target="_blank" aria-label="YouTube"><FaYoutube size={18} /></a>
            <a href="https://open.spotify.com/artist/yourartistid" target="_blank" aria-label="Spotify"><FaSpotify size={18} /></a>
          </div>
        </div>

        {/* Links column */}
        <div className="footer-links">
          <p className="footer-col-heading">Navigate</p>
          <Link href="/">Home</Link>
          <Link href="/tour">Tour</Link>
          <Link href="/merch">Merch</Link>
          <Link href="/about">About</Link>
        </div>

        {/* Contact form column */}
        <div className="footer-contact">
          <p className="footer-col-heading">Get in Touch</p>
          {status === 'sent' ? (
            <p className="footer-success">Message sent — we'll be in touch!</p>
          ) : (
            <form className="footer-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="footer-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="footer-input"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
                className="footer-input footer-textarea"
                rows={4}
              />
              <button
                type="submit"
                className="footer-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="footer-error">Something went wrong — try again.</p>
              )}
            </form>
          )}
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Huck N' Pray. All rights reserved.</p>
        <p>Booking: <a href="mailto:hucknprayband@gmail.com">hucknprayband@gmail.com</a></p>
      </div>
    </footer>
  )
}