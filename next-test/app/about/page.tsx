import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import styles from './about.module.css'

export const metadata = {
  title: 'About | Jason Bergh',
}

export default function AboutPage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.num}>03.</span>
          <h1 className={styles.title}>About</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.bio}>
            <p>
              Jason Bergh is an award-winning director, cinematographer, and producer whose work spans
              feature documentaries, docuseries, fashion films, and brand campaigns. Known for intimate,
              raw human storytelling, Bergh has collaborated with some of the world's most iconic artists,
              athletes, and cultural figures.
            </p>
            <p>
              His filmography includes Netflix's <em>Halftime</em> — an intimate documentary portrait of
              Jennifer Lopez — and Amazon Original's <em>The Greatest Love Story Never Told</em>, as well as
              acclaimed docuseries <em>Noted: Alicia Keys The Untold Stories</em> for YouTube Originals and
              <em>Life's A Tripp</em> for Snapchat Originals.
            </p>
            <p>
              Bergh's work has been recognized at the Tribeca Film Festival, earned Emmy nominations,
              and screened at major festivals worldwide. He brings an uncompromising visual sensibility
              and deep emotional intelligence to every project he undertakes.
            </p>
          </div>

          <div className={styles.disciplines}>
            <h2>Disciplines</h2>
            <ul>
              <li>Direction</li>
              <li>Cinematography</li>
              <li>Executive Production</li>
              <li>Showrunning</li>
              <li>Documentary</li>
              <li>Fashion Film</li>
              <li>Commercial</li>
            </ul>
          </div>
        </div>

        <div className={styles.clients}>
          <h2>Selected Clients</h2>
          <div className={styles.clientGrid}>
            {['Netflix', 'Amazon', 'YouTube Originals', 'ESPN', 'Snapchat', 'NPR', 'BET', 'NBC', 'Tribeca', 'Flaunt', "Harper's Bazaar", 'InStyle', 'Mazda', 'Genesis', 'JLO Beauty', "Hershey's"].map(c => (
              <span key={c} className={styles.client}>{c}</span>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
