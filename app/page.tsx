import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import StatsDashboard from './components/StatsDashboard'
import About from './components/About'
import CreativeDisciplines from './components/CreativeDisciplines'
import Journey from './components/Journey'
import Identities from './components/Identities'
import Works from './components/Works'
import Software from './components/Software'
import HomeGallery from './components/HomeGallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollInit from './components/ScrollInit'

export default function Page() {
  return (
    <>
      <ScrollInit />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <StatsDashboard />
        <About />
        <CreativeDisciplines />
        <Journey />
        <Identities />
        <Works />
        <Software />
        <HomeGallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
