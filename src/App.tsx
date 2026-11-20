import { useEffect, useState } from 'react'
import { Cursor } from './components/Cursor'
import { ThemeToggle } from './components/ThemeToggle'
import { ProjectVisual, Specimen } from './components/Visuals'
import {
  achievement,
  contact,
  education,
  experience,
  marquee,
  nav,
  pillars,
  projects,
  skillGroups,
  stats,
  summary,
} from './data'
import { useMotion } from './motion'

const fmtTime = () =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())

function useClock() {
  const [time, setTime] = useState(fmtTime)
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmtTime()), 15000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

function Arrow({ dir = 'ne' }: { dir?: 'ne' | 'down' | 'up' }) {
  const rot = dir === 'down' ? 135 : dir === 'up' ? -45 : 0
  return (
    <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-top">
          <span>Shaik Maliha</span>
          <span>Portfolio · 2026</span>
        </div>
        <ul className="loader-log">
          <li>› resolving components</li>
          <li>› validating schema · formik + yup</li>
          <li>› hydrating interface</li>
          <li className="ok">✓ ready</li>
        </ul>
        <div className="loader-count">
          <span className="loader-num">000</span>
          <span className="loader-pct">%</span>
        </div>
        <div className="loader-bar">
          <i />
        </div>
      </div>
    </div>
  )
}

function Nav({ time }: { time: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
  }, [open])
  return (
    <>
      <header className="site-nav">
        <a className="mark" href="#top" aria-label="Shaik Maliha — back to top" data-magnetic>
          <span>SM</span>
        </a>
        <nav aria-label="Primary" className="nav-links">
          {nav.map((item, i) => (
            <a key={item.href} href={item.href} data-scramble>
              <sup>0{i + 1}</sup>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <span className="nav-time">
            <i className="pulse" /> HYD {time}
          </span>
          <ThemeToggle />
          <a className="pill-btn" href={contact.resume} target="_blank" rel="noreferrer" data-magnetic>
            Résumé <Arrow />
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <i />
            <i />
          </button>
        </div>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        {nav.map((item, i) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <sup>0{i + 1}</sup>
            {item.label}
          </a>
        ))}
        <a className="mm-resume" href={contact.resume} target="_blank" rel="noreferrer">
          Résumé (PDF) <Arrow />
        </a>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-meta" data-intro>
        <span>
          <em>Role</em> {contact.role}
        </span>
        <span>
          <em>Base</em> {contact.location}
        </span>
        <span>
          <em>Shipping UI</em> {contact.tenure}
        </span>
        <span className="status">
          <i className="pulse" /> Open to frontend roles
        </span>
      </div>

      <div className="hero-mid">
        <div className="hero-copy">
          <p className="hero-kicker" data-intro>
            <span className="mono">(Frontend / React)</span>
          </p>
          <p className="hero-lede" data-intro>
            I build interfaces that <em>hold up</em> — reusable, accessible and payment&#8209;grade, from the first
            keystroke to the final&nbsp;checkout.
          </p>
          <div className="hero-ctas" data-intro>
            <a className="btn btn-solid" href="#work" data-magnetic>
              <span>See selected work</span> <Arrow dir="down" />
            </a>
            <a className="btn btn-line" href={contact.emailHref} data-magnetic>
              <span>Start a conversation</span>
            </a>
          </div>
        </div>
        <Specimen />
      </div>

      <h1 className="hero-name">
        <span className="sr-only">
          {contact.name} — {contact.role}
        </span>
        <span className="hn-line hn-1" aria-hidden="true">
          <span className="hn-word">{contact.first}</span>
          <span className="hn-aside mono">
            ↳ React Js
            <br />
            Frontend Developer
          </span>
        </span>
        <span className="hn-line hn-2" aria-hidden="true">
          <span className="hn-word">{contact.last}</span>
          <span className="hn-dot">.</span>
        </span>
      </h1>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <span className="mono">Scroll</span>
        <i />
      </a>
    </section>
  )
}

function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i}>
            {item}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-no mono">(01)</span>
          <span className="sec-name mono">About</span>
        </div>
        <p className="manifesto" aria-label={summary}>
          <span aria-hidden="true">{summary}</span>
        </p>

        <div className="pillars">
          {pillars.map((p) => (
            <article className="pillar reveal" key={p.no}>
              <span className="mono">{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>

        <dl className="stats">
          {stats.map((s) => (
            <div className="stat reveal" key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="stat-num">
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix}
                </span>
                <span className="stat-label">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Toolkit() {
  return (
    <section className="toolkit" id="toolkit">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-no mono">(02)</span>
          <span className="sec-name mono">Toolkit</span>
        </div>
        <h2 className="title split">
          A stack chosen for <em>trust</em>, not trends.
        </h2>
        <div className="groups">
          {skillGroups.map((g) => (
            <div className="group reveal" key={g.title}>
              <div className="group-head">
                <span className="mono">{g.no}</span>
                <h3>{g.title}</h3>
                <span className="mono group-note">{g.note}</span>
              </div>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="work" id="work">
      <div className="work-top">
        <div className="sec-head">
          <span className="sec-no mono">(03)</span>
          <span className="sec-name mono">Selected work · {projects.length} projects</span>
        </div>
        <div className="work-progress" aria-hidden="true">
          <i />
        </div>
      </div>
      <div className="work-track">
        <div className="work-intro">
          <h2 className="title split">
            Interfaces where <em>money</em>, <em>media</em> and <em>forms</em> meet.
          </h2>
          <p className="work-intro-copy">
            CMS tooling, an open-sourced payment component and subscription flows for streaming platforms — each built
            to be reused, validated and accessible.
          </p>
          <span className="mono drag-hint">
            Keep scrolling <Arrow />
          </span>
        </div>
        {projects.map((p) => (
          <article className="work-panel" key={p.index}>
            <div className="wp-visual">
              <ProjectVisual kind={p.visual} />
              <span className="wp-caption mono">Interface sketch</span>
            </div>
            <div className="wp-info">
              <div className="wp-meta mono">
                <span>{p.index} / 0{projects.length}</span>
                <span>{p.org}</span>
              </div>
              <h3 className="wp-title">{p.title}</h3>
              <p className="wp-sub">{p.subtitle}</p>
              <ul className="wp-bullets">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="xp" id="experience">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-no mono">(04)</span>
          <span className="sec-name mono">Experience</span>
        </div>
        <div className="xp-grid">
          <div className="xp-aside">
            <p className="mono xp-dates">{experience.dates}</p>
            <h2 className="xp-company split">{experience.company}</h2>
            <p className="xp-role">{experience.title}</p>
            <p className="mono xp-span">
              <i className="pulse" /> {experience.span} · full-time
            </p>
          </div>
          <div className="xp-list">
            <div className="xp-rail" aria-hidden="true">
              <i />
            </div>
            <ol>
              {experience.items.map((item, i) => (
                <li className="xp-item" key={item.key}>
                  <span className="xp-no mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.key}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="edu" id="education">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-no mono">(05)</span>
          <span className="sec-name mono">Education & recognition</span>
        </div>
        <div className="edu-grid">
          <div className="edu-rows">
            {education.map((row) => (
              <div className="edu-row reveal" key={row.year}>
                <span className="edu-year">{row.year}</span>
                <div>
                  <h3>{row.title}</h3>
                  <p>{row.school}</p>
                </div>
                <span className="edu-marks mono">{row.marks}</span>
              </div>
            ))}
          </div>
          <aside className="award reveal">
            <div className="award-term mono" aria-hidden="true">
              <span>~/stripe-payment $ npm publish</span>
              <span className="ok">✓ published · ready for reuse</span>
            </div>
            <p className="mono award-kicker">Publications / Contributions</p>
            <p className="award-body">{achievement}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Contact({ time }: { time: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = contact.emailHref
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-no mono">(06)</span>
          <span className="sec-name mono">Contact</span>
        </div>
        <h2 className="contact-title split">
          Let’s build something <em>reliable</em>.
        </h2>

        <div className="contact-grid">
          <div className="contact-main">
            <a className="big-mail" href={contact.emailHref} data-magnetic>
              {contact.email}
            </a>
            <div className="contact-actions">
              <button type="button" className="btn btn-line" onClick={copy} aria-live="polite">
                <span>{copied ? 'Copied ✓' : 'Copy email'}</span>
              </button>
              <a className="btn btn-solid" href={contact.resume} download data-magnetic>
                <span>Download résumé</span> <Arrow dir="down" />
              </a>
            </div>
            <dl className="contact-facts">
              <div>
                <dt className="mono">Phone</dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="mono">Location</dt>
                <dd>{contact.location}</dd>
              </div>
              <div>
                <dt className="mono">Local time</dt>
                <dd>{time} IST</dd>
              </div>
            </dl>
          </div>

          <form
            className="form"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              const subject = encodeURIComponent(String(data.get('subject') || 'Hello Maliha'))
              const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')}`)
              window.location.href = `${contact.emailHref}?subject=${subject}&body=${body}`
            }}
          >
            <p className="mono form-kicker">Or write here — it opens your mail app</p>
            <label className="f">
              <input name="name" required autoComplete="name" placeholder=" " />
              <span>Your name</span>
            </label>
            <label className="f">
              <input name="subject" required defaultValue="Frontend opportunity" placeholder=" " />
              <span>Subject</span>
            </label>
            <label className="f">
              <textarea name="message" rows={4} required placeholder=" " />
              <span>Message</span>
            </label>
            <button type="submit" className="btn btn-solid" data-magnetic>
              <span>Compose email</span> <Arrow />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-name" aria-hidden="true">
        Maliha<span>.</span>
      </div>
      <div className="footer-row">
        <span>© 2026 {contact.name}</span>
        <span>
          {contact.role} · {contact.location}
        </span>
        <a href="#top">
          Back to top <Arrow dir="up" />
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  const [fontsReady, setFontsReady] = useState(false)
  const time = useClock()

  useEffect(() => {
    let alive = true
    const done = () => alive && setFontsReady(true)
    document.fonts.ready.then(done)
    const fallback = window.setTimeout(done, 2500)
    return () => {
      alive = false
      window.clearTimeout(fallback)
    }
  }, [])

  useMotion(fontsReady)

  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Loader />
      <Cursor />
      <div className="progress" aria-hidden="true">
        <i />
      </div>
      <Nav time={time} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <Marquee />
            <About />
            <Toolkit />
            <Work />
            <Experience />
            <Education />
            <Contact time={time} />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
