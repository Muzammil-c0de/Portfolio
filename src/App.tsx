import { useEffect, useRef, useState } from 'react'
import './App.css'


const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  {
    title: 'Website Development',
    text: 'Responsive business websites, portfolio sites, landing pages, and modern web experiences built for speed and clarity.',
  },
  {
    title: 'Application Development',
    text: 'Custom web applications with clean interfaces, reusable components, and practical user flows.',
  },
  {
    title: 'Full-Stack Development',
    text: 'End-to-end development covering frontend screens, backend logic, APIs, databases, and deployment-ready structure.',
  },
  {
    title: 'Frontend UI',
    text: 'Pixel-focused React interfaces, mobile-first layouts, and polished interaction details.',
  },
]

const projects = [
  {
    title: 'Ecommerce Website',
    image: '/work (1).png',
    text: 'Ahalia is an e-commerce dress shop website currently in progress. The project focuses on a clean shopping experience, product presentation, responsive layout, and a smooth path for customers to explore collections.',
    link: 'https://ahalia.vercel.app',
  },
  {
    title: 'Fullstack Travels Website',
    image: '/work (2).png',
    text: 'Pompi Travels is a full-stack travel website for managing travel packages, ticket booking details, and customer booking flow. The project is built to present packages clearly and guide users toward bookings.',
    link: 'https://pompi-three.vercel.app',
  },
  {
    title: 'Product Booking Web App',
    image: '/work (3).png',
    text: 'A full-stack product booking web app for Zcafe Marketing. Users can book products from the website, and the company can manage bookings across 4 branches. Each branch manager can view their own customers and booked products with booking notifications.',
    link: 'https://zcafe.in',
  },
  {
    title: 'Company Website',
    image: '/work (4).png',
    text: 'CleanMy Car is a car cleaning company website built to present services, company details, and contact options in a clean and responsive layout for customers.',
    link: 'https://cleanmycar.vercel.app',
  },
  {
    title: 'Food Product Website',
    image: '/work (5).png',
    text: 'Fresh&Co is an Easy Cook food product company website for showcasing products, rate details, and company information in a clean customer-friendly layout.',
    link: 'https://fresh-co-green.vercel.app',
  },
]

const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'MySQL',
  'Firebase Storage',
  'Python',
  'Flutter',
  'Dart',
  'VSCode',
  'Antigravity',
  'Canva',
  'Github',
  'Vercel',
]

type Project = (typeof projects)[number]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid grid-cols-[104px_1fr] items-center gap-4 rounded-lg border border-[#ef233c]/30 bg-white p-3 text-[#142f38] shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-[#ef233c]/70 md:grid-cols-[200px_1fr] md:gap-6 md:p-4">
      <div className="w-[104px] shrink-0 overflow-hidden rounded-md bg-white md:w-[200px]">
        <img src={project.image} alt={project.title} className="w-full h-auto object-contain transition duration-500 hover:scale-105" />
      </div>
      <div className="py-1 md:py-1">
        <h3 className="text-xl font-black md:text-2xl">{project.title}</h3>
        <p className="mt-2 text-xs leading-5 text-[#48545a] md:mt-2 md:text-sm md:leading-6">{project.text}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-xs font-bold text-[#d90429] transition hover:text-[#142f38] md:mt-3 md:text-sm"
          >
            {project.link.replace('https://', '')}
          </a>
        )}
      </div>
    </article>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHireMeModalOpen, setIsHireMeModalOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const portfolioSliderRef = useRef<HTMLDivElement>(null)
  const activeSlideRef = useRef(0)

  const scrollToSlide = (index: number) => {
    const slider = portfolioSliderRef.current
    if (!slider) return
    
    const slideElement = slider.children[index] as HTMLElement | undefined
    if (!slideElement) return

    slider.scrollTo({ left: slideElement.offsetLeft - slider.offsetLeft, behavior: 'smooth' })
    activeSlideRef.current = index
    setActiveSlide(index)
  }

  useEffect(() => {
    const slider = portfolioSliderRef.current

    if (!slider) {
      return
    }

    const interval = window.setInterval(() => {
      const nextSlide = activeSlideRef.current + 1
      const isLastSlide = nextSlide >= projects.length

      if (isLastSlide) {
        slider.scrollTo({ left: 0, behavior: 'auto' })
        activeSlideRef.current = 0
        setActiveSlide(0)
        return
      }

      const nextSlideElement = slider.children[nextSlide] as HTMLElement | undefined

      if (!nextSlideElement) {
        return
      }

      slider.scrollTo({ left: nextSlideElement.offsetLeft - slider.offsetLeft, behavior: 'smooth' })
      activeSlideRef.current = nextSlide
      setActiveSlide(nextSlide)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [])

  // Scroll reveal animation
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-children')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a3a48] text-white">
      <header className="relative z-50 bg-[#0a3a48]">
        <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-5 md:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center" aria-label="Go to home">
              <img src="/logo.png" alt="Muzammil logo" className="h-10 w-auto object-contain sm:h-11" />
            </a>

            <div className="hidden items-center gap-7 text-sm font-semibold text-white/70 md:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-[#ef233c]">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <button
                onClick={() => setIsHireMeModalOpen(true)}
                className="rounded-full bg-[#ef233c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#c1121f]"
              >
                Hire Me
              </button>
            </div>

            <button
              type="button"
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition duration-300 hover:border-[#ef233c]/70 hover:text-[#ff4d5f] md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative h-5 w-5">
                <span className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${isMenuOpen ? 'top-2.5 rotate-45' : ''}`} />
                <span className={`absolute left-0 top-3.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${isMenuOpen ? 'top-2.5 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <aside
        className={`fixed inset-0 z-40 h-dvh w-full bg-[#1b0f0b] px-6 pb-8 pt-24 transition-all duration-500 ease-out md:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full flex-col justify-center gap-4 text-center text-4xl font-black text-white">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-4 text-white transition hover:text-[#ff4d5f]"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setIsMenuOpen(false); setIsHireMeModalOpen(true); }}
            className="mx-auto mt-8 w-full max-w-xs rounded-full bg-[#ef233c] px-5 py-4 text-lg font-bold text-white transition hover:bg-[#c1121f]"
          >
            Hire Me
          </button>
        </div>
      </aside>

      <main className="bg-[#0a3a48]">
        <section id="home" className="bg-[#0a3a48]">
          <div className="w-full overflow-hidden bg-[#02161b]">
            <video
              className="block aspect-[2732/1356] h-auto w-full object-contain"
              aria-label="Hero banner"
              autoPlay
              loop
              muted
              playsInline
              poster="/hero.png"
            >
              <source src="/hero2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-7 md:px-8 md:pb-16 md:pt-10">
            <div className="max-w-3xl">
            <h1 className="text-5xl font-black leading-[0.96] tracking-normal md:text-7xl">
              I build websites and apps that look sharp and work smoothly.
            </h1>
            <p className="mt-7 text-lg leading-8 text-white/72">
              I am Muzammil, a developer focused on modern websites, responsive interfaces, and application experiences for businesses, personal brands, and digital products.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#portfolio" className="rounded-full bg-[#ef233c] px-7 py-3.5 text-center font-bold text-white shadow-lg shadow-[#ef233c]/25 transition hover:bg-[#c1121f]">
                View My Work
              </a>
              <a href="#contact" className="rounded-full border border-white/24 px-7 py-3.5 text-center font-bold text-white transition hover:border-[#ef233c] hover:text-[#ff4d5f]">
                Contact Me
              </a>
            </div>
          </div>
          </div>
        </section>

        <section id="services" className="border-y border-white/10 bg-[#062d38] px-5 py-12 md:px-8 md:py-16">
          <div className="reveal mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff4d5f]">Services</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">Development services for web and app projects.</h2>
            <div className="reveal-children mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article key={service.title} className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <h3 className="text-2xl font-black">{service.title}</h3>
                  <p className="mt-4 leading-7 text-white/66">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="px-5 py-8 md:px-8 md:py-2">
          <div className="reveal mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff4d5f]">Portfolio</p>
            <h2 className="mt-1 max-w-3xl text-4xl font-black md:text-4xl">Selected website and application work.</h2>
            <div ref={portfolioSliderRef} className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-hidden pb-4">
              {projects.map((project) => (
                <div key={project.title} className="grid min-w-full snap-start">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-3" aria-label="Portfolio carousel position">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  onClick={() => scrollToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-12 bg-[#ef233c]' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="bg-[#062d38] px-5 py-12 md:px-8 md:py-16">
          <div className="reveal mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff4d5f]">Tools</p>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Tools, languages, and platforms I use.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/6 px-5 py-3 font-bold text-white/78">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-12 md:px-8 md:py-16">
          <div className="reveal mx-auto max-w-7xl rounded-[2rem] bg-[#ef233c] px-6 py-12 text-white md:px-12 md:py-16">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white/70">Contact</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">Need a website or application? Let us build it.</h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:muzamuzammil01@gmail.com" className="rounded-full bg-[#0a3a48] px-6 py-3.5 text-center font-bold text-white transition hover:bg-[#073a4a]">
                muzamuzammil01@gmail.com
              </a>
              <a href="tel:9400525063" className="rounded-full border border-white/30 px-6 py-3.5 text-center font-bold text-white transition hover:bg-white hover:text-[#ef233c]">
                9400525063
              </a>
            </div>
          </div>
        </section>

        <footer className="reveal border-t border-white/10 bg-[#062d38] px-5 py-12 md:px-8 md:py-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
              <div>
                <h3 className="font-black text-white">Navigation</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#home" className="text-white/60 transition hover:text-[#ff4d5f]">Home</a></li>
                  <li><a href="#services" className="text-white/60 transition hover:text-[#ff4d5f]">Services</a></li>
                  <li><a href="#portfolio" className="text-white/60 transition hover:text-[#ff4d5f]">Portfolio</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-black text-white">More</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#skills" className="text-white/60 transition hover:text-[#ff4d5f]">Skills</a></li>
                  <li><a href="#contact" className="text-white/60 transition hover:text-[#ff4d5f]">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-black text-white">Contact</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="mailto:muzamuzammil01@gmail.com" className="text-white/60 transition hover:text-[#ff4d5f]">Email</a></li>
                  <li><a href="tel:9400525063" className="text-white/60 transition hover:text-[#ff4d5f]">Phone</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-black text-white">Social</h3>
                <div className="social-card mt-4">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="socialContainer containerOne" aria-label="Instagram">
                    <svg className="socialSvg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" /></svg>
                  </a>

                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="socialContainer containerThree" aria-label="LinkedIn">
                    <svg className="socialSvg" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.83-48.3 93.97 0 111.28 61.9 111.28 142.3V448z" /></svg>
                  </a>
                  <a href="https://wa.me/919400525063" target="_blank" rel="noreferrer" className="socialContainer containerFour" aria-label="WhatsApp">
                    <svg className="socialSvg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.325-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                  </a>
                  <a href="https://github.com/Muzammil-c0de" target="_blank" rel="noreferrer" className="socialContainer containerFive" aria-label="GitHub">
                    <svg className="socialSvg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-center text-sm text-white/50">© 2026 Muzammil. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {isHireMeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md md:max-w-xl rounded-2xl border border-white/10 bg-[#1b0f0b] p-6 shadow-2xl md:p-6">
            <button
              onClick={() => setIsHireMeModalOpen(false)}
              className="absolute right-4 top-4 text-white/50 transition hover:text-white"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-6 md:mb-4 text-2xl font-black text-white">Hire Me</h3>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              const company = formData.get('company');
              const email = formData.get('email');
              const contact = formData.get('contact');
              const position = formData.get('position');
              const salary = formData.get('salary');
              const date = formData.get('date');
              const body = `Company Name: ${company}%0ACompany Mail ID: ${email}%0AContact Number: ${contact}%0APosition: ${position}%0ASalary Budget: ${salary}%0ADate of Joining/Interview: ${date}`;
              window.location.href = `mailto:muzamuzammil01@gmail.com?subject=Hire Me Request - ${company}&body=${body}`;
              setIsHireMeModalOpen(false); 
            }} className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-white/70">Company Name</label>
                <input name="company" type="text" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 md:py-1.5 text-white outline-none focus:border-[#ef233c] focus:bg-white/10" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-white/70">Company Mail ID</label>
                <input name="email" type="email" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 md:py-1.5 text-white outline-none focus:border-[#ef233c] focus:bg-white/10" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-white/70">Contact Number</label>
                <input name="contact" type="tel" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 md:py-1.5 text-white outline-none focus:border-[#ef233c] focus:bg-white/10" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-white/70">Position</label>
                <input name="position" type="text" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 md:py-1.5 text-white outline-none focus:border-[#ef233c] focus:bg-white/10" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-white/70">Salary Budget</label>
                <input name="salary" type="text" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 md:py-1.5 text-white outline-none focus:border-[#ef233c] focus:bg-white/10" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-white/70">Date of Joining / Interview</label>
                <input name="date" type="date" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 md:py-1.5 text-white outline-none focus:border-[#ef233c] focus:bg-white/10 [color-scheme:dark]" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="mt-2 w-full rounded-full bg-[#ef233c] py-3.5 md:py-2.5 font-bold text-white transition hover:bg-[#c1121f]">
                  Submit Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
