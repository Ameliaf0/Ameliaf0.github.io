'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa'

export default function Nav() {
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 200)
      setScrollOpacity(opacity)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        className="nav-sticky"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,${0.55 * scrollOpacity}), rgba(0,0,0,0))`,
        }}
      >
        <Link href="/" id="logo">Huck N&apos; Pray</Link>

        <div className="nav-links">
          <Link href="/tour">Tour</Link>
          <Link href="/merch">Merch</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="nav-right">
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

          <button
            className="nav-burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`burger-line ${menuOpen ? 'open-1' : ''}`} />
            <span className={`burger-line ${menuOpen ? 'open-2' : ''}`} />
            <span className={`burger-line ${menuOpen ? 'open-3' : ''}`} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/tour" onClick={() => setMenuOpen(false)}>Tour</Link>
        <Link href="/merch" onClick={() => setMenuOpen(false)}>Merch</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <div className="mobile-menu-social">
          <a href="https://instagram.com/yourhandle" target="_blank" aria-label="Instagram"><FaInstagram size={20} /></a>
          <a href="https://youtube.com/@yourchannel" target="_blank" aria-label="YouTube"><FaYoutube size={20} /></a>
          <a href="https://open.spotify.com/artist/yourartistid" target="_blank" aria-label="Spotify"><FaSpotify size={20} /></a>
        </div>
      </div>
    </>
  )
}