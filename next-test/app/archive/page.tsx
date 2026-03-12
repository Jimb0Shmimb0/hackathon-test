import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import { projects } from '@/lib/data'
import Image from 'next/image'
import styles from './archive.module.css'

export const metadata = {
  title: 'Archive | Jason Bergh',
}

export default function ArchivePage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.num}>04.</span>
          <h1 className={styles.title}>Archive</h1>
        </div>

        <div className={styles.list}>
          {projects.map((project, i) => (
            <div key={project.id} className={styles.item}>
              <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}.</span>
              <div className={styles.itemThumb}>
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  width={80}
                  height={50}
                  className={styles.thumb}
                  unoptimized
                />
              </div>
              <div className={styles.itemTitle}>
                <span>{project.title}</span>
                <span className={styles.subtitle}>{project.subtitle}</span>
              </div>
              <span className={styles.itemType}>{project.type}</span>
              <span className={styles.itemCat}>{project.categoryLabel}</span>
              <span className={styles.itemClient}>{project.client}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
