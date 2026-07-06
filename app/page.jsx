import Link from 'next/link'
import MerchGrid from '../components/MerchGrid'
import { merchItems } from '../data/merch'
import { getShows } from '../lib/shows'

export default async function Home() {
  const shows = await getShows()
  const upcoming = shows.slice(0, 4)
  return (
    <>
      {/* Hero */}
    <section className="hero">
      <img
        src="hero.png"
        alt="Band Name live"
        fill ="true"
        style={{ objectFit: 'cover', borderRadius: '8px' }}
        priority = "true"
      />
      <div className="hero-content">
        <h1>Huck 'N Pray</h1>
        <p>Currently on tour</p>
        <Link href="/tour" className="btn hero-cta">See Tour Dates →</Link>
      </div>
        <div className="hero-glass-banner">
      <div className="hero-glass-banner-left">
        <span className="hero-glass-label">Touring Soon!</span>
        <span className="hero-glass-title">Album / Single Title</span>
      </div>
      <Link href="/music" className="hero-glass-btn">Listen Now →</Link>
    </div>
    </section>

  

        <section className="tv-section">
          <div className="tv-content-grid">
            {/* Left column */}
            <div className="tv-left">
              <div className="tv-wrapper">
                <iframe
                  className="tv-video"
                  src="https://www.youtube.com/embed/8kl6q_9qZOs"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <img src="/tv.png" alt="TV frame" className="tv-frame" />
              </div>
              
               <a href="https://www.youtube.com/watch?v=8kl6q_9qZOs"
                target="_blank"
                className="tv-caption" >
                "HOLDING PATTERN" Live at The Fox (2025) ↗
              </a>
            </div>

            {/* Right column */}
            <div className="tv-right">
              <div className="tv-release tv-release-featured">
                <span className="tv-release-label">Out Now</span>
                <h2 className="tv-release-title">"WATCH OUT FOR REPTILES"</h2>
                
                  <a href="https://open.spotify.com/yourlink"
                  target="_blank"
                  className="tv-release-btn"
                >
                  Listen on Spotify ↗
                </a>
              </div>

              <div className="tv-release-divider" />

              <div className="tv-release">
                <span className="tv-release-label">June 14th</span>
                <h3 className="tv-release-subtitle">"KICKIN' UP A FUSS"</h3>
                <p className="tv-release-sub">Out everywhere June 14th</p>
              </div>
            </div>
          </div>
        </section>

 
        <section className="merch-preview-section">
          <div className="merch-preview-wrapper">
            <img src="/merch_preview.jpeg" id="merch_img" />
            <div className="merch-preview-overlay">
              <div className="merch-preview-overlay-content">
                <p className="merch-preview-overlay-label">Merch Collection</p>
                <Link href="/merch" className="merch-preview-overlay-btn">Shop Now →</Link>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}