import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Summary from './components/Summary'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation scrollY={scrollY} />
      <Hero />
      <About />
      <Summary />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </div>
  )
}

export default App

