'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa'

export default function Nav() {
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeDistance = 200 // px of scroll until fully transparent
      const opacity = Math.max(0, 1 - scrollY / fadeDistance)
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="nav-sticky"
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,${0.55 * scrollOpacity}), rgba(0,0,0,${0 * scrollOpacity}))`,
      }}
    >
      <Link href="/" id="logo">Huck N' Pray</Link>
      <div>
        <Link href="/music">Music</Link>
        <Link href="/tour">Tour</Link>
        <Link href="/merch">Merch</Link>
        <Link href="/about">About</Link>
      </div>
      <div className="nav-social">
        <a href="https://instagram.com/yourhandle" target="_blank" aria-label="Instagram">
          <FaInstagram size={18} />
        </a>
        <a href="https://youtube.com/@yourchannel" target="_blank" aria-label="YouTube">
          <FaYoutube size={18} />
        </a>
        <a href="https://open.spotify.com/artist/yourartistid" target="_blank" aria-label="Spotify">
          <FaSpotify size={18} />
        </a>
      </div>
    </nav>
  )
}