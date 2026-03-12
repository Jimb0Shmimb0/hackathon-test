'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { navLinks } from '@/lib/data'
import styles from './Nav.module.css'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoJ}>J</span>
          <span className={styles.logoName}>ason</span>
          <span className={styles.logoB}>B</span>
          <span className={styles.logoLast}>ergh</span>
        </Link>

        <div className={styles.navRight}>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.menuLabel}>{menuOpen ? 'close' : 'menu'}</span>
            <div className={`${styles.menuIcon} ${menuOpen ? styles.open : ''}`}>
              <span />
              <span />
            </div>
          </button>
        </div>
      </nav>

      <div className={`${styles.menuOverlay} ${menuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuContent}>
          <ul className={styles.menuLinks}>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ animationDelay: `${i * 0.07}s` }}>
                <Link
                  href={link.href}
                  className={styles.menuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.menuNum}>{link.num}</span>
                  <span className={styles.menuLinkText}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.menuFooter}>
            <p className={styles.menuCredits}>
              credits: <a href="https://blacklead.studio/" target="_blank" rel="noopener noreferrer">BL/S®</a>,{' '}
              <a href="https://www.artycoders.com/" target="_blank" rel="noopener noreferrer">Artycoders</a>{' '}
              &amp; <a href="https://serhii-art.com/" target="_blank" rel="noopener noreferrer">serhii polyvanyi</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
