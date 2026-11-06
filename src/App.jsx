import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

const navigation = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Contact', 'contact'],
]

const skillGroups = [
  {
    icon: 'bi-window',
    title: 'Frontend UI',
    className: 'skill-card--primary',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    icon: 'bi-braces',
    title: 'Backend (secondary)',
    className: 'skill-card--secondary',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL'],
  },
  {
    icon: 'bi-tools',
    title: 'Tools',
    className: 'skill-card--tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
]

const projects = [
  {
    number: '01',
    icon: 'bi-grid-1x2',
    title: 'UI Gallery',
    description:
      'A collection of responsive interface experiments focused on thoughtful layouts and reusable components.',
    technologies: ['React', 'JavaScript', 'CSS'],
    variant: 'project-card--lavender',
    demoLink: null,
    repository: null,
  },
  {
    number: '02',
    icon: 'bi-check2-square',
    title: 'To Do Application',
    description:
      'A responsive task manager with create, read, update, and delete actions, plus shared app state.',
    technologies: ['React', 'Redux', 'REST APIs'],
    variant: 'project-card--peach',
    demoLink: null,
    repository: 'https://github.com/gowthamvaddi143-pixel/react-task-manager',
  },
  {
    number: '03',
    icon: 'bi-play-btn',
    title: 'React Video App',
    description:
      'A video-sharing experience with separate admin and user flows, comments, likes, and video management.',
    technologies: ['React', 'Hooks', 'MongoDB', 'REST APIs'],
    variant: 'project-card--blue',
    demoLink: null,
    repository: 'https://github.com/gowthamvaddi143-pixel/video-project',
  },
]

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const sections = navigation
      .map(([, section]) => document.getElementById(section))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)

        if (visibleSections[0]) setActiveSection(visibleSections[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.2, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg container" aria-label="Main navigation">
        <a className="navbar-brand brand-mark" href="#home" onClick={() => setIsMenuOpen(false)}>
          <img className="brand-icon" src="/logo.jpg" alt="" />
          <span>GowthaM<span className="brand-dot">.</span></span>
        </a>
        <button
          className="navbar-toggler menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end${isMenuOpen ? ' show' : ''}`}
          id="primary-navigation"
        >
          <ul className="navbar-nav align-items-lg-center gap-lg-4">
            {navigation.map(([label, section]) => (
              <li className="nav-item" key={section}>
                <a
                  className={`nav-link${activeSection === section ? ' active' : ''}`}
                  href={`#${section}`}
                  aria-current={activeSection === section ? 'location' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a className="btn btn-dark nav-contact" href="#contact" onClick={() => setIsMenuOpen(false)}>
                Let&apos;s talk <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="availability">
            <span className="availability-dot" />
            Open to opportunities
          </span>
          <p className="hero-intro">Hello, I&apos;m</p>
          <h1>Vaddi<br /><span>Gowtham.</span></h1>
          <p className="hero-role">Frontend UI Developer <span aria-hidden="true">·</span> React Developer</p>
          <p className="hero-tagline">
            I build polished, responsive interfaces with React, thoughtful details, and a focus on the people using them.
          </p>
          <ul className="hero-expertise" aria-label="Frontend expertise">
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React.js</li>
            <li>Bootstrap</li>
          </ul>
          <div className="hero-actions">
            <a className="btn btn-dark btn-lg primary-button" href="#projects">
              View projects <i className="bi bi-arrow-down-right" aria-hidden="true" />
            </a>
            <a
              className="btn btn-outline-dark btn-lg resume-button"
              href="/GOWTHAM_RESUME%20%283%29.pdf"
              download
            >
              Resume <i className="bi bi-download" aria-hidden="true" />
            </a>
          </div>
          <div className="hero-socials" aria-label="Social profiles">
            <span>Find me on</span>
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="bi bi-github" aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="bi bi-linkedin" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-art" aria-label="A preview of a code editor" role="img">
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="code-window">
            <div className="code-window-bar">
              <span /><span /><span />
              <small>about-me.jsx</small>
            </div>
            <div className="code-content">
              <div><span className="code-muted">01</span> <span className="code-purple">const</span> developer = {'{'}</div>
              <div><span className="code-muted">02</span> &nbsp;name: <span className="code-green">&apos;Gowtham&apos;</span>,</div>
              <div><span className="code-muted">03</span> &nbsp;focus: <span className="code-green">&apos;React&apos;</span>,</div>
              <div><span className="code-muted">04</span> &nbsp;building: <span className="code-green">&apos;for people&apos;</span></div>
              <div><span className="code-muted">05</span> {'}'}</div>
              <div className="code-spacer" />
              <div><span className="code-muted">06</span> <span className="code-purple">export default</span> developer</div>
            </div>
            <div className="code-window-footer">
              <span><i className="bi bi-check-circle-fill" aria-hidden="true" /> All systems go</span>
              <span>React · JavaScript</span>
            </div>
          </div>
          <div className="floating-note floating-note--top">
            <i className="bi bi-lightning-charge-fill" aria-hidden="true" />
            Built with curiosity
          </div>
          <div className="floating-note floating-note--bottom">
            <span className="mini-avatar">G</span>
            <span>Based in<br /><strong>Hyderabad, IN</strong></span>
          </div>
          <span className="art-spark art-spark--one">✳</span>
          <span className="art-spark art-spark--two">✳</span>
        </div>
      </div>
      <a className="scroll-cue" href="#about"><span /> Scroll to explore</a>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="section section-about" id="about">
      <div className="container about-grid">
        <SectionHeading eyebrow="A little about me" title={<>Curious by nature.<br />Developer by choice.</>} />
        <div className="about-copy">
          <p>
            I&apos;m a frontend UI developer and React developer based in Madhapur, Hyderabad. I enjoy
            building responsive web applications that feel clear, useful, and easy to navigate.
          </p>
          <p>
            With a foundation in React, JavaScript, and REST APIs, I like taking an idea from
            its first sketch to a polished, working interface. I&apos;m a quick learner who is
            always exploring better ways to build for people.
          </p>
          <div className="about-facts">
            <div><span className="fact-icon"><i className="bi bi-mortarboard" /></span><span><strong>B.Com (Honors)</strong><small>Ideal College of Arts &amp; Science</small></span></div>
            <div><span className="fact-icon"><i className="bi bi-geo-alt" /></span><span><strong>Hyderabad, India</strong><small>Open to new opportunities</small></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section className="section section-skills" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="What I work with"
          title="A toolkit for good ideas."
          description="The technologies and tools I use to bring web experiences to life."
        />
        <div className="row g-4 skill-grid">
          {skillGroups.map((group) => (
            <div className="col-md-6 col-lg-4" key={group.title}>
              <article className={`skill-card ${group.className} h-100`}>
                <div className="skill-card-heading">
                  <span className="skill-icon"><i className={`bi ${group.icon}`} aria-hidden="true" /></span>
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-badges">
                  {group.skills.map((skill) => (
                    <span className="skill-badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const projectCount = String(projects.length).padStart(2, '0')

  return (
    <section className="section section-projects" id="projects">
      <div className="container">
        <div className="projects-heading-row">
          <SectionHeading
            eyebrow="Selected work"
            title="A few things I&apos;ve built."
            description="A selection of projects made to solve everyday problems and explore better experiences."
          />
          <span className="project-count"><span>03</span> projects</span>
        </div>
        <div className="row g-4 project-grid">
          {projects.map((project) => (
            <div className="col-md-6 col-lg-4" key={project.number}>
              <article className={`project-card ${project.variant}`}>
                <div className="project-visual">
                  <span className="project-number">{project.number} / {projectCount}</span>
                  <div className="project-illustration" aria-hidden="true">
                    <i className={`bi ${project.icon}`} />
                  </div>
                  <span className="project-visual-label">Selected project</span>
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                  <div className="project-links">
                    {project.demoLink ? (
                      <a href={project.demoLink} target="_blank" rel="noreferrer">
                        Live demo <i className="bi bi-arrow-up-right" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="project-link-unavailable">Demo coming soon</span>
                    )}
                    {project.repository ? (
                      <a href={project.repository} target="_blank" rel="noreferrer">
                        GitHub repo <i className="bi bi-github" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="project-link-unavailable">Repository coming soon</span>
                    )}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitted(false)
    setSubmitError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) nextErrors.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) nextErrors.message = 'Please write a message.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }

    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (!publicKey) {
      setSubmitError('The contact form is not configured yet. Please email me directly instead.')
      return
    }

    setIsSending(true)
    setSubmitError('')

    try {
      await emailjs.send(
        'service_lfp6rij',
        'template_z71id4i',
        {
          name: form.name.trim(),
          email: form.email.trim(),
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          reply_to: form.email.trim(),
          message: form.message.trim(),
        },
        { publicKey },
      )
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS contact form submission failed.', error)
      setSubmitError('Your message could not be sent. Please try again or email me directly.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="section section-contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <SectionHeading
            eyebrow="Have a project in mind?"
            title={<>Let&apos;s make<br />something great.</>}
            description="Have an idea, an opportunity, or just want to say hello? My inbox is always open."
          />
          <a className="contact-email" href="mailto:gowthamvaddi143@gmail.com">
            gowthamvaddi143@gmail.com <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>
          <a className="contact-phone" href="tel:+918179549120">+91 81795 49120</a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {submitted && (
            <div className="alert alert-success success-alert" role="status">
              Thanks for reaching out! Your message has been sent.
            </div>
          )}
          {submitError && (
            <div className="alert alert-danger success-alert" role="alert">
              {submitError}{' '}
              <a href="mailto:gowthamvaddi143@gmail.com">Email me directly</a>.
            </div>
          )}
          <div className="mb-4">
            <label className="form-label" htmlFor="contact-name">Your name</label>
            <input
              className={`form-control${errors.name ? ' is-invalid' : ''}`}
              id="contact-name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name && <div className="invalid-feedback" id="contact-name-error">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="contact-email">Email address</label>
            <input
              className={`form-control${errors.email ? ' is-invalid' : ''}`}
              id="contact-email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && <div className="invalid-feedback" id="contact-email-error">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="contact-message">Your message</label>
            <textarea
              className={`form-control${errors.message ? ' is-invalid' : ''}`}
              id="contact-message"
              name="message"
              rows="4"
              placeholder="Tell me a little about what you have in mind..."
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && <div className="invalid-feedback" id="contact-message-error">{errors.message}</div>}
          </div>
          <button className="btn btn-dark btn-lg primary-button submit-button" type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send a message'}
            <i className={`bi ${isSending ? 'bi-arrow-repeat' : 'bi-arrow-up-right'}`} aria-hidden="true" />
          </button>
          <p className="form-note">Your message will be sent by email. I&apos;ll get back to you soon.</p>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="footer-brand" href="#home">Gowtham<span>.</span></a>
        <p>Designed &amp; built with care by Gowtham.</p>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <a href="#home">Back to top <i className="bi bi-arrow-up" aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <NavigationBar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
