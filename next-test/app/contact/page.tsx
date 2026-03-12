import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import styles from './contact.module.css'

export const metadata = {
  title: 'Contact | Jason Bergh',
}

export default function ContactPage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.num}>05.</span>
          <h1 className={styles.title}>Contact</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.intro}>
            <p>Available for select directorial, cinematographic, and production projects worldwide.</p>
          </div>

          <div className={styles.contacts}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>General Inquiries</span>
              <a href="mailto:info@jasonbergh.com" className={styles.contactLink}>info@jasonbergh.com</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Commercial & Brand</span>
              <a href="mailto:brand@jasonbergh.com" className={styles.contactLink}>brand@jasonbergh.com</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Film & TV</span>
              <a href="mailto:film@jasonbergh.com" className={styles.contactLink}>film@jasonbergh.com</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
