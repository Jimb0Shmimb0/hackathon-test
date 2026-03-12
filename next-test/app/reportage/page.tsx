import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import Image from 'next/image'
import styles from './reportage.module.css'

export const metadata = {
  title: 'Reportage | Jason Bergh',
}

const reportageImages = [
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b8787_1.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87ab_1-1.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87ac_2-1.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b8789_3.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87ad_3-1.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b878a_4.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87ae_4-1.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87af_5-1.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b878b_5.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b87b0_6-1.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b878c_6.webp',
  'https://cdn.prod.website-files.com/696e26954ee505294b4b8653/696e26954ee505294b4b878d_7.webp',
]

export default function ReportagePage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.num}>02.</span>
          <h1 className={styles.title}>Reportage</h1>
        </div>

        <div className={styles.grid}>
          {reportageImages.map((src, i) => (
            <div key={i} className={styles.imgWrap}>
              <Image
                src={src}
                alt={`Reportage ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.img}
                unoptimized
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
