import Cursor from '@/components/Cursor'
import Preloader from '@/components/Preloader'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WorkGrid from '@/components/WorkGrid'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <WorkGrid />
      </main>
      <Footer />
    </>
  )
}
