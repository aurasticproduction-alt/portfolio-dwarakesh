import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ScrollInit from '../components/ScrollInit'

export default function IdentityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollInit />
      <Nav />
      {children}
      <Footer />
    </>
  )
}
