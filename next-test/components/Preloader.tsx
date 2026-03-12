'use client'

import { useState, useEffect } from 'react'
import styles from './Preloader.module.css'

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const duration = 1800
    const interval = 30
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current++
      setCount(Math.min(Math.round((current / steps) * 100), 100))
      if (current >= steps) {
        clearInterval(timer)
        setTimeout(() => setHidden(true), 300)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (hidden) return null

  return (
    <div className={`${styles.preloader} ${count === 100 ? styles.done : ''}`}>
      <div className={styles.counter}>{String(count).padStart(2, '0')}</div>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${count}%` }} />
      </div>
      <div className={styles.label}>Loading</div>
    </div>
  )
}
