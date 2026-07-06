'use client'
import { useState } from 'react'

const pages = [
  {
    left: {
      type: 'cover-back',
      content: null,
    },
    right: {
      type: 'cover',
      heading: 'HUCK N\' PRAY',
      subheading: 'HIGHWIRE DAZE MAGAZINE',
      issue: 'Issue 12 · 2025',
      bg: '#1a1a1a',
    },
  },
  {
    left: {
      type: 'text',
      label: 'FEATURE',
      heading: '"Grounded, fearless, and endlessly evolving"',
      body: 'Huck N’ Pray’s sound challenges the status quo. No two setlists are ever the same, constantly being reshaped by gig and intuition. Their genre-blending approach breathes life into Boulder’s scene, showcasing a mix of 60s-inspired surf rock, heavy psychedelic grooves, and an unfiltered energy that keeps audiences coming back for more.',
      bg: '#f5f0e8',
    },
    right: {
      type: 'image',
      caption: 'Huck N\' Pray live at The Fox Theatre, Boulder CO',
      bg: '#2a2a2a',
    },
  },
  {
    left: {
      type: 'image',
      caption: 'Cory Shishik — Lead Guitar',
      bg: '#1c1c2e',
    },
    right: {
      type: 'text',
      label: 'THE SOUND',
      heading: 'Genre-Bending & High Energy',
      body: 'Psychedelic undertones meet surf-rock grit in a sound that\'s equal parts hypnotic and explosive. Each performance is a new experiment — no two shows the same.',
      bg: '#f5f0e8',
    },
  },
  {
    left: {
      type: 'text',
      label: 'THE MEMBERS',
      heading: 'Four Voices, One Vision',
      body: 'Cory Shishik on lead guitar. Fintan Canning on rhythm. Axel Pearson holding it down on drums. Will Berbaum anchoring on bass. Together since fall 2024 — already unstoppable.',
      bg: '#f5f0e8',
    },
    right: {
      type: 'quote',
      quote: '"Fire Personified"',
      attribution: '— Highwire Daze Magazine',
      bg: '#1a1a1a',
    },
  },
]

export default function MagazineFlip() {
  const [currentPage, setCurrentPage] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [direction, setDirection] = useState(null)

  const goNext = () => {
    if (currentPage < pages.length - 1 && !flipping) {
      setDirection('next')
      setFlipping(true)
      setTimeout(() => {
        setCurrentPage(p => p + 1)
        setFlipping(false)
      }, 400)
    }
  }

  const goPrev = () => {
    if (currentPage > 0 && !flipping) {
      setDirection('prev')
      setFlipping(true)
      setTimeout(() => {
        setCurrentPage(p => p - 1)
        setFlipping(false)
      }, 400)
    }
  }

  const page = pages[currentPage]

  return (
    <div className="magazine-section">
      <div className="magazine-wrapper">
        <div className={`magazine-spread ${flipping ? `flipping-${direction}` : ''}`}>
          <PagePanel panel={page.left} onClick={goPrev} side="left" />
          <div className="magazine-spine" />
          <PagePanel panel={page.right} onClick={goNext} side="right" />
        </div>

        <div className="magazine-controls">
          <button
            className="mag-btn"
            onClick={goPrev}
            disabled={currentPage === 0}
          >
            ← Prev
          </button>
          <span className="mag-page-count">
            {currentPage + 1} / {pages.length}
          </span>
          <button
            className="mag-btn"
            onClick={goNext}
            disabled={currentPage === pages.length - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

function PagePanel({ panel, onClick, side }) {
  if (!panel) return <div className="magazine-page" />

  const style = { background: panel.bg || '#f5f0e8' }

  if (panel.type === 'cover') {
    return (
      <div className="magazine-page magazine-cover" style={style} onClick={onClick}>
        <div className="cover-inner">
          <p className="cover-issue">{panel.issue}</p>
          <h2 className="cover-heading">{panel.heading}</h2>
          <p className="cover-sub">{panel.subheading}</p>
          <div className="cover-bar" />
          <p className="cover-hint">Click to open →</p>
        </div>
      </div>
    )
  }

  if (panel.type === 'cover-back') {
    return <div className="magazine-page" style={{ background: '#111' }} />
  }

  if (panel.type === 'text') {
    return (
      <div className="magazine-page magazine-text-page" style={style} onClick={onClick}>
        <span className="mag-label">{panel.label}</span>
        <h3 className="mag-heading">{panel.heading}</h3>
        <p className="mag-body">{panel.body}</p>
        <span className="mag-turn-hint">{side === 'right' ? 'Next →' : '← Back'}</span>
      </div>
    )
  }

  if (panel.type === 'image') {
    return (
      <div className="magazine-page magazine-image-page" style={style} onClick={onClick}>
        <div className="mag-image-placeholder" />
        <p className="mag-caption">{panel.caption}</p>
      </div>
    )
  }

  if (panel.type === 'quote') {
    return (
      <div className="magazine-page magazine-quote-page" style={style} onClick={onClick}>
        <div className="mag-quote-inner">
          <p className="mag-quote">{panel.quote}</p>
          <p className="mag-attribution">{panel.attribution}</p>
        </div>
      </div>
    )
  }

  return <div className="magazine-page" style={style} />
}