'use client'

import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

const previewImages = [
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b8787_1.webp', alt: 'The Greatest Love Story' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87ab_1-1.webp', alt: 'Barbara Palvin' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87ac_2-1.webp', alt: 'Sasha Calle' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b878a_4.webp', alt: 'Halftime' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87ad_3-1.webp', alt: 'Lenny Kravitz' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b8789_3.webp', alt: 'Noted' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b879d_2-2.webp', alt: 'Mazda Oscars' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87ae_4-1.webp', alt: 'Katseye' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87af_5-1.webp', alt: 'RZA' },
  { src: 'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87b0_6-1.webp', alt: 'Bryan Cranston' },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      const titleEl = hero.querySelector(`.${styles.heroTitle}`) as HTMLElement
      if (titleEl) {
        titleEl.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Background images */}
      <div className={styles.bgImages}>
        {previewImages.map((img, i) => (
          <div
            key={i}
            className={styles.bgImage}
            style={{
              backgroundImage: `url(${img.src})`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        <div className={styles.bgOverlay} />
      </div>

      {/* Hero text */}
      <div className={styles.heroContent}>
        <div className={styles.heroLabel}>
          <span>00</span>
          <span>Jason Bergh</span>
        </div>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine1}>Intimate, Raw</span>
          <span className={styles.heroLine2}>Human Storytelling</span>
        </h1>
        <p className={styles.heroSub}>Director · Cinematographer · Producer</p>
      </div>

      {/* Scrolling ticker */}
      <div className={styles.ticker}>
        <div className={styles.tickerInner}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.tickerTrack}>
              {['Director', '·', 'Cinematographer', '·', 'Producer', '·', 'Jason Bergh', '·', 'Documentary', '·', 'Editorial', '·', 'Commercial', '·'].map((word, j) => (
                <span key={j} className={styles.tickerItem}>{word}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  )
}
