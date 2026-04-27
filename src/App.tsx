import { useEffect, useRef, useState } from 'react'

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
  'Responsive UI',
  'Web Apps',
]

type Project = (typeof projects)[number]

function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={`grid rounded-lg border border-white/10 bg-[#120b09] transition hover:-translate-y-1 hover:border-[#ef233c]/60 ${compact ? 'grid-cols-[104px_1fr] gap-3 p-3' : 'grid-cols-[220px_1fr] gap-5 p-4 items-center'}`}>
      <div className={`${compact ? 'h-[208px] w-[104px]' : 'h-[360px] w-[180px]'} overflow-hidden rounded-md bg-black`}>
        <img src={project.image} alt={project.title} className="h-full w-full object-cover object-top transition duration-500 hover:scale-105" />
      </div>
      <div className={compact ? 'py-1' : 'p-4'}>
        <h3 className={`${compact ? 'text-lg' : 'text-2xl'} font-black`}>{project.title}</h3>
        <p className={`${compact ? 'mt-2 text-xs leading-5' : 'mt-4 leading-7'} text-white/66`}>{project.text}</p>
        {'link' in project && project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={`${compact ? 'mt-3 text-xs' : 'mt-5 text-sm'} inline-flex font-bold text-[#ff4d5f] transition hover:text-white`}
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
  const [activeSlide, setActiveSlide] = useState(0)
  const portfolioSliderRef = useRef<HTMLDivElement>(null)
  const activeSlideRef = useRef(0)

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

  return (
    <div className="min-h-screen bg-[#1b0f0b] text-white">
      <header className="relative z-50 bg-[#1b0f0b]">
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
              <a
                href="mailto:muzamuzammil01@gmail.com"
                className="rounded-full bg-[#ef233c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#c1121f]"
              >
                Hire Me
              </a>
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
          <a
            href="mailto:muzamuzammil01@gmail.com"
            className="mx-auto mt-8 w-full max-w-xs rounded-full bg-[#ef233c] px-5 py-4 text-lg font-bold text-white transition hover:bg-[#c1121f]"
          >
            Hire Me
          </a>
        </div>
      </aside>

      <main>
        <section id="home" className="bg-[#1b0f0b]">
          <div
            className="mx-auto aspect-[1366/768] min-h-[210px] w-full max-w-7xl bg-contain bg-center bg-no-repeat sm:min-h-[320px] md:min-h-[480px] lg:min-h-0"
            style={{ backgroundImage: 'url(/hero.png)' }}
            aria-label="Hero banner"
          />
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
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

        <section id="services" className="border-y border-white/10 bg-[#0e0908] px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff4d5f]">Services</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">Development services for web and app projects.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article key={service.title} className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <h3 className="text-2xl font-black">{service.title}</h3>
                  <p className="mt-4 leading-7 text-white/66">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff4d5f]">Portfolio</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">Selected website and application work.</h2>
            <div ref={portfolioSliderRef} className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-hidden pb-3 md:hidden">
              {projects.map((project) => (
                <div key={project.title} className="grid min-w-full snap-start">
                  <ProjectCard project={project} compact />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2 md:hidden" aria-label="Portfolio carousel position">
              {projects.map((project, index) => (
                <span
                  key={project.title}
                  className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-8 bg-[#ef233c]' : 'w-2 bg-white/30'}`}
                />
              ))}
            </div>
            <div className="mt-10 hidden gap-6 md:grid">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="bg-[#0e0908] px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
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

        <section id="contact" className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#ef233c] px-6 py-12 text-white md:px-12 md:py-16">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white/70">Contact</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">Need a website or application? Let us build it.</h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:muzamuzammil01@gmail.com" className="rounded-full bg-[#1b0f0b] px-6 py-3.5 text-center font-bold text-white transition hover:bg-black">
                muzamuzammil01@gmail.com
              </a>
              <a href="tel:9400525063" className="rounded-full border border-white/30 px-6 py-3.5 text-center font-bold text-white transition hover:bg-white hover:text-[#ef233c]">
                9400525063
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
