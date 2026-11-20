import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import portrait from './assets/hero-portrait.jpg'
import {
  achievement,
  contact,
  education,
  experience,
  nav,
  projects,
  skillGroups,
  summary,
} from './data'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(
      {
        fine: '(pointer: fine)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { fine, reduce } = context.conditions as {
          fine: boolean
          reduce: boolean
        }
        if (!fine || reduce) return
        document.body.classList.add('has-cursor')
        const move = (event: MouseEvent) => {
          gsap.to(dot.current, { x: event.clientX, y: event.clientY, duration: 0.08 })
          gsap.to(ring.current, { x: event.clientX, y: event.clientY, duration: 0.28 })
        }
        window.addEventListener('mousemove', move)
        return () => {
          document.body.classList.remove('has-cursor')
          window.removeEventListener('mousemove', move)
        }
      },
    )
    return () => mm.revert()
  })

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [hyderabad, setHyderabad] = useState(() =>
    new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date()),
  )

  useEffect(() => {
    const clock = window.setInterval(() => {
      setHyderabad(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()),
      )
    }, 30000)
    return () => window.clearInterval(clock)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          isDesktop: '(min-width: 900px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduce } = context.conditions as {
            isDesktop: boolean
            reduce: boolean
          }

          if (reduce) {
            gsap.set(['.hero-copy > *', '.portrait-wrap', '.signal-line', '.reveal'], {
              autoAlpha: 1,
              y: 0,
              scaleX: 1,
            })
            return
          }

          const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
          intro
            .from('.eyebrow', { y: 24, autoAlpha: 0, duration: 0.6 })
            .from('.line-a, .line-b', { yPercent: 40, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
            .from('.role, .tagline, .hero-actions, .status, .meta-line', {
              y: 18,
              autoAlpha: 0,
              stagger: 0.08,
              duration: 0.55,
            }, '-=0.35')
            .from('.portrait-wrap', { autoAlpha: 0, y: 30, duration: 0.8 }, 0.2)
            .from('.signal-line', { scaleX: 0, duration: 1.1 }, '-=0.4')

          gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
            gsap.from(el, {
              y: 28,
              autoAlpha: 0,
              duration: 0.7,
              scrollTrigger: {
                trigger: el,
                start: 'top 86%',
              },
            })
          })

          if (isDesktop && track.current) {
            const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth)
            gsap.to(track.current, {
              x: () => -distance(),
              ease: 'none',
              scrollTrigger: {
                trigger: '.transmission',
                pin: '.transmission',
                scrub: 1,
                start: 'top top',
                end: () => `+=${distance()}`,
                invalidateOnRefresh: true,
              },
            })
          }
        },
      )

      return () => mm.revert()
    },
    { scope: root },
  )

  const close = () => setOpen(false)

  return (
    <div ref={root}>
      <Cursor />
      <a className="skip" href="#signal">
        Skip to content
      </a>
      <header className="site-nav">
        <a className="mark" href="#signal">
          SM
        </a>
        <div className="live">
          <span className="live-dot" aria-hidden="true" />
          Live signal · HYD {hyderabad}
        </div>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.id} {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="nav-cta" href={contact.resume}>
          Resume
        </a>
        <button className="menu-btn" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Index'}
        </button>
      </header>
      <div className={`mobile-panel${open ? ' open' : ''}`}>
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={close}>
            {item.id} {item.label}
          </a>
        ))}
      </div>

      <main>
        <section className="hero" id="signal">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                {contact.location} · {contact.tenure}
              </p>
              <h1 className="display-name">
                <span className="line-a">Shaik</span>
                <br />
                <span className="line-b">Maliha</span>
              </h1>
              <p className="role">{contact.role}</p>
              <p className="tagline">Reusable interfaces. Accessible systems. Payment-grade craft.</p>
              <div className="hero-actions">
                <a className="btn btn-fill" href="#transmission">
                  View transmission
                </a>
                <a className="btn btn-ghost" href={contact.emailHref}>
                  Open line
                </a>
              </div>
              <div className="status">Available for React frontend roles</div>
              <p className="meta-line">
                <a href={contact.phoneHref}>{contact.phone}</a>
                {' · '}
                <a href={contact.emailHref}>{contact.email}</a>
              </p>
            </div>
            <figure className="portrait-wrap">
              <img src={portrait} alt="Cinematic studio portrait used as atmospheric hero art." />
              <figcaption className="portrait-caption">Broadcast atelier · atmosphere</figcaption>
            </figure>
          </div>
          <div className="signal-line" aria-hidden="true" />
        </section>

        <section className="section" id="craft">
          <p className="section-kicker reveal">02 · Craft</p>
          <h2 className="section-title reveal">Interface with integrity</h2>
          <div className="craft-grid">
            <p className="lede reveal">{summary}</p>
            <div>
              {skillGroups.map((group) => (
                <div className="skill-block reveal" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="pills">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section transmission" id="transmission">
          <div className="transmission-head">
            <p className="section-kicker reveal">03 · Transmission</p>
            <h2 className="section-title reveal">Channel work</h2>
          </div>
          <div className="project-track" ref={track}>
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <img src={project.image} alt="" />
                <div>
                  <div className="project-index">
                    {project.index} · {project.org}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="sub">{project.subtitle}</p>
                  <div className="pills" style={{ margin: '0.7rem 0' }}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ul>
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="ledger">
          <p className="section-kicker reveal">04 · Ledger</p>
          <h2 className="section-title reveal">One house. Full stack of UI.</h2>
          <div className="ledger-head reveal">
            <div>
              <h3 className="ledger-role">{experience.title}</h3>
              <p className="ledger-meta">{experience.company}</p>
            </div>
            <p className="ledger-meta">{experience.dates}</p>
          </div>
          <ul className="ledger-list">
            {experience.bullets.map((bullet) => (
              <li className="reveal" key={bullet}>
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="studio">
          <p className="section-kicker reveal">05 · Studio</p>
          <h2 className="section-title reveal">Formation</h2>
          {education.map((row) => (
            <div className="edu-row reveal" key={row.year}>
              <div className="edu-year">{row.year}</div>
              <div>
                <h3 className="edu-title">{row.title}</h3>
                <p className="edu-school">{row.school}</p>
              </div>
              <div className="edu-marks">Marks {row.marks}</div>
            </div>
          ))}
          <aside className="achievement reveal">
            <p className="section-kicker">Publications / Contributions</p>
            <p>{achievement}</p>
          </aside>
        </section>

        <section className="section" id="line">
          <p className="section-kicker reveal">06 · Line</p>
          <h2 className="section-title reveal">Open a channel</h2>
          <div className="contact-grid">
            <div className="reveal">
              <a className="line-email" href={contact.emailHref}>
                {contact.email}
              </a>
              <p className="meta-line">
                <a href={contact.phoneHref}>{contact.phone}</a>
                <br />
                {contact.location}
              </p>
              <p>
                <a className="btn btn-fill" href={contact.resume}>
                  Download resume
                </a>
              </p>
            </div>
            <form
              className="form reveal"
              onSubmit={(event) => {
                event.preventDefault()
                const form = event.currentTarget
                const data = new FormData(form)
                const subject = encodeURIComponent(String(data.get('subject') || 'Hello Maliha'))
                const body = encodeURIComponent(
                  `${data.get('message')}\n\n— ${data.get('name')}`,
                )
                window.location.href = `${contact.emailHref}?subject=${subject}&body=${body}`
              }}
            >
              <label>
                Name
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                Subject
                <input name="subject" required defaultValue="Frontend opportunity" />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} required />
              </label>
              <button type="submit">Compose email</button>
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>© 2026 Shaik Maliha</span>
        <span>
          {contact.role} · {contact.location}
        </span>
      </footer>
    </div>
  )
}
