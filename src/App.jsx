import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Gallery />
      <CTA />
      <Footer />
    </div>
  )
}
