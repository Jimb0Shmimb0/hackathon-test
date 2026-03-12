'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { projects, type Category, type Project } from '@/lib/data'
import styles from './WorkGrid.module.css'

const filters: { label: string; value: Category | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'TV & Film', value: 'tv-film' },
  { label: 'Editorial', value: 'editorial' },
  { label: 'Commercial', value: 'commercial' },
]

export default function WorkGrid() {
  const [active, setActive] = useState<Category | 'all'>('all')
  const [selected, setSelected] = useState<Project | null>(null)
  const [videoMode, setVideoMode] = useState<'preview' | 'full'>('preview')
  const videoRef = useRef<HTMLVideoElement>(null)

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  const openProject = (project: Project) => {
    setSelected(project)
    setVideoMode('preview')
  }

  const closeProject = () => {
    setSelected(null)
    if (videoRef.current) videoRef.current.pause()
  }

  return (
    <section className={styles.section}>
      {/* Filter bar */}
      <div className={styles.filterBar}>
        <span className={styles.filterLabel}>Filter:</span>
        <div className={styles.filters}>
          {filters.map(f => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${active === f.value ? styles.filterActive : ''}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className={styles.filterCount}>{filtered.length.toString().padStart(2, '0')}</span>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((project, i) => (
          <article
            key={project.id}
            className={styles.item}
            onClick={() => openProject(project)}
          >
            <div className={styles.itemMedia}>
              <Image
                src={project.thumbnailUrl}
                alt={`${project.title} ${project.subtitle}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.itemImg}
                unoptimized
              />
              <div className={styles.itemOverlay}>
                <video
                  src={project.previewVideoUrl}
                  className={styles.itemVideo}
                  muted
                  loop
                  playsInline
                  onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={e => {
                    const v = e.currentTarget as HTMLVideoElement
                    v.pause()
                    v.currentTime = 0
                  }}
                />
                <div className={styles.playBtn}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>play video</span>
                </div>
              </div>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.itemMeta}>
                <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}.</span>
                <span className={styles.itemType}>{project.type}</span>
                <span className={styles.itemCat}>{project.categoryLabel}</span>
              </div>
              <div className={styles.itemTitle}>
                <h2>{project.title}</h2>
                <h3>{project.subtitle}</h3>
              </div>
              <p className={styles.itemClient}>{project.client}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className={styles.modal} onClick={closeProject}>
          <div className={styles.modalInner} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeProject}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="24" height="24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              <span>close</span>
            </button>

            <div className={styles.modalMedia}>
              <video
                ref={videoRef}
                key={videoMode === 'full' ? selected.fullVideoUrl : selected.previewVideoUrl}
                src={videoMode === 'full' ? selected.fullVideoUrl : selected.previewVideoUrl}
                controls
                autoPlay
                playsInline
                className={styles.modalVideo}
              />
            </div>

            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div className={styles.modalMeta}>
                  <span>{selected.type}</span>
                  <span>·</span>
                  <span>{selected.categoryLabel}</span>
                </div>
                <div className={styles.modalTitle}>
                  <h2>{selected.title}</h2>
                  <h3>{selected.subtitle}</h3>
                </div>
                <p className={styles.modalClient}>{selected.client}</p>
              </div>
              <p className={styles.modalDescription}>{selected.description}</p>
              <div className={styles.modalRole}>
                <span className={styles.modalRoleLabel}>Role</span>
                <span>{selected.role}</span>
              </div>
              <button
                className={styles.watchFull}
                onClick={() => setVideoMode('full')}
              >
                Watch Full Film
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
