import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerLeft}>
          <span className={styles.footerName}>Jason Bergh</span>
          <span className={styles.footerTitle}>Director · Cinematographer · Producer</span>
        </div>
        <nav className={styles.footerNav}>
          <Link href="/">Work</Link>
          <Link href="/reportage">Reportage</Link>
          <Link href="/about">About</Link>
          <Link href="/archive">Archive</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Jason Bergh. All rights reserved.</p>
        <p className={styles.footerCredits}>
          Design by <a href="https://blacklead.studio/" target="_blank" rel="noopener noreferrer">BL/S®</a>
        </p>
      </div>
    </footer>
  )
}
