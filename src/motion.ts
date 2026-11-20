import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText, TextPlugin, ScrambleTextPlugin)

let introPlayed = false

const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)
const $$ = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel)

function finishLoader() {
  gsap.set('.loader', { display: 'none' })
  document.documentElement.classList.add('is-ready')
}

/* Looping checkout demo inside the hero specimen. */
function specimenLoop() {
  const card = document.querySelector<HTMLElement>('.spec-card')
  const state = (value: string) => () => {
    if (card) card.dataset.state = value
  }
  const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.4, defaults: { ease: 'none' } })
  tl.set(['.sc-num', '.sc-exp', '.sc-cvc'], { text: '' })
    .set('.sc-pay-text', { text: 'Pay $9.99' })
    .call(state('idle'))
    .to('.sc-num', { text: '4242 4242 4242 4242', duration: 1.3 }, 0.4)
    .to('.sc-exp', { text: '12 / 20', duration: 0.5 })
    .call(state('invalid'), [], '+=0.2')
    .to('.sc-exp', { text: '', duration: 0.3 }, '+=1.1')
    .to('.sc-exp', { text: '12 / 29', duration: 0.5 })
    .call(state('valid'))
    .to('.sc-cvc', { text: '•••', duration: 0.4 }, '+=0.2')
    .call(state('pressed'), [], '+=0.5')
    .call(state('loading'), [], '+=0.15')
    .to('.sc-pay-text', { text: 'Processing…', duration: 0.3 }, '<')
    .call(state('paid'), [], '+=1.1')
    .to('.sc-pay-text', { text: 'Payment successful ✓', duration: 0.4 }, '<')
    .to({}, { duration: 1.8 })
  return tl
}

export function useMotion(ready: boolean) {
  useGSAP(
    () => {
      if (!ready) return
      const mm = gsap.matchMedia()

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 1024px)',
          fine: '(pointer: fine)',
        },
        (ctx) => {
          const { motion, desktop, fine } = ctx.conditions as Record<string, boolean>

          // Reduced motion: show everything, no choreography.
          if (!motion) {
            finishLoader()
            $$('.sc-num').forEach((el) => (el.textContent = '4242 4242 4242 4242'))
            $$('.sc-exp').forEach((el) => (el.textContent = '12 / 29'))
            $$('.sc-cvc').forEach((el) => (el.textContent = '•••'))
            return
          }

          /* ---------- Smooth scroll (desktop mouse only) ---------- */
          let smoother: ScrollSmoother | undefined
          if (desktop && fine) {
            smoother = ScrollSmoother.create({
              wrapper: '#smooth-wrapper',
              content: '#smooth-content',
              smooth: 1.1,
              effects: true,
              normalizeScroll: false,
            })
          }
          const onAnchor = (e: MouseEvent) => {
            const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
            if (!a) return
            const id = a.getAttribute('href')!
            const target = id === '#top' ? document.body : $(id)
            if (!target) return
            e.preventDefault()
            if (smoother) smoother.scrollTo(id === '#top' ? 0 : target, true, 'top top')
            else window.scrollTo({ top: id === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' })
          }
          document.addEventListener('click', onAnchor)

          /* ---------- Splits ---------- */
          const name = SplitText.create('.hn-word', { type: 'chars', mask: 'chars' })

          const demo = specimenLoop()

          /* ---------- Loader → hero intro ---------- */
          const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
          const firstRun = !introPlayed
          if (firstRun) {
            const count = { v: 0 }
            const num = $('.loader-num')
            intro
              .to(count, {
                v: 100,
                duration: 1.8,
                ease: 'power2.inOut',
                onUpdate: () => {
                  if (num) num.textContent = String(Math.round(count.v)).padStart(3, '0')
                },
              })
              .to('.loader-bar i', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
              .to('.loader-log li', { autoAlpha: 1, x: 0, stagger: 0.38, duration: 0.3, ease: 'power2.out' }, 0.1)
              .to('.loader-inner', { yPercent: -12, autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, '+=0.15')
              .to('.loader', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' }, '-=0.15')
              .add(finishLoader)
          } else {
            finishLoader()
          }
          introPlayed = true

          intro
            .from(name.chars, { yPercent: 118, rotate: 6, duration: 1.3, stagger: 0.04 }, firstRun ? '-=0.55' : 0)
            .from('.hn-dot', { scale: 0, transformOrigin: '50% 80%', duration: 0.9, ease: 'back.out(3)' }, '-=0.9')
            .from('.hn-aside', { autoAlpha: 0, x: -20, duration: 0.8 }, '<')
            .from('.site-nav > *', { yPercent: -120, autoAlpha: 0, stagger: 0.08, duration: 1 }, '<-0.2')
            .from('.hero [data-intro]', { y: 30, autoAlpha: 0, stagger: 0.09, duration: 1 }, '<0.1')
            .from('.spec-card', { y: 60, rotateX: -25, autoAlpha: 0, duration: 1.4 }, '<0.1')
            .from('.spec-tag, .spec-note', { autoAlpha: 0, scale: 0.9, stagger: 0.12, duration: 0.6 }, '-=0.8')
            .from('.scroll-cue', { autoAlpha: 0, duration: 0.6 }, '<')
            .add(() => {
              demo.play()
            })

          /* ---------- Hero scroll parallax ---------- */
          if (desktop) {
            gsap
              .timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
              .to('.hn-1', { xPercent: -10 }, 0)
              .to('.hn-2', { xPercent: 8 }, 0)
              .to('.hero-mid', { yPercent: -18, autoAlpha: 0.2 }, 0)
          }

          /* ---------- Specimen tilt ---------- */
          if (fine) {
            const card = $('.spec-stage')
            const rx = gsap.quickTo(card, 'rotationX', { duration: 0.8, ease: 'power3' })
            const ry = gsap.quickTo(card, 'rotationY', { duration: 0.8, ease: 'power3' })
            const hero = $('.hero')!
            const tilt = (e: PointerEvent) => {
              const x = e.clientX / window.innerWidth - 0.5
              const y = e.clientY / window.innerHeight - 0.5
              ry(x * 14)
              rx(-y * 10)
            }
            hero.addEventListener('pointermove', tilt)
            ctx.add(() => () => hero.removeEventListener('pointermove', tilt))
          }

          /* ---------- Progress + nav ---------- */
          gsap.to('.progress i', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
          })
          const navEl = $('.site-nav')!
          ScrollTrigger.create({
            start: 'top -120',
            end: 'max',
            onUpdate: (self) => {
              navEl.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 400)
              navEl.classList.toggle('is-scrolled', self.scroll() > 40)
            },
            onLeaveBack: () => navEl.classList.remove('is-scrolled', 'is-hidden'),
          })

          /* ---------- Nav label scramble on hover ---------- */
          $$('[data-scramble]').forEach((a) => {
            const label = a.querySelector('span')
            if (!label) return
            const text = label.textContent ?? ''
            const run = () =>
              gsap.to(label, { duration: 0.6, scrambleText: { text, chars: 'lowerCase', speed: 0.6 }, overwrite: true })
            a.addEventListener('pointerenter', run)
            ctx.add(() => () => a.removeEventListener('pointerenter', run))
          })

          /* ---------- Marquee reacting to scroll velocity ---------- */
          const loop = gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 38, repeat: -1 })
          loop.totalTime(loop.duration() * 50)
          ScrollTrigger.create({
            trigger: '.marquee',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              const dir = self.direction
              const boost = gsap.utils.clamp(1, 7, Math.abs(self.getVelocity()) / 220)
              gsap.to(loop, {
                timeScale: dir * boost,
                duration: 0.25,
                overwrite: true,
                onComplete: () => {
                  gsap.to(loop, { timeScale: dir, duration: 1.2 })
                },
              })
            },
          })

          /* ---------- Manifesto: words light up as you read ---------- */
          const manifesto = SplitText.create('.manifesto > span', { type: 'words' })
          gsap.fromTo(
            manifesto.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: '.manifesto', start: 'top 78%', end: 'bottom 45%', scrub: true },
            },
          )

          /* ---------- Section titles ---------- */
          $$('.split').forEach((el) => {
            const s = SplitText.create(el, { type: 'lines', mask: 'lines' })
            gsap.from(s.lines, {
              yPercent: 105,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: 'top 85%' },
            })
          })

          $$('.sec-head').forEach((el) => {
            gsap.from(el.children, {
              y: 14,
              autoAlpha: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
            })
          })

          ScrollTrigger.batch('.reveal', {
            start: 'top 88%',
            onEnter: (els) =>
              gsap.fromTo(
                els,
                { y: 40, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, stagger: 0.09, duration: 1, ease: 'power3.out', overwrite: true },
              ),
          })
          gsap.set('.reveal', { autoAlpha: 0 })

          /* ---------- Counters ---------- */
          $$('[data-count]').forEach((el) => {
            const target = Number(el.dataset.count)
            const o = { v: 0 }
            gsap.to(o, {
              v: target,
              duration: 1.8,
              ease: 'power3.out',
              onUpdate: () => (el.textContent = String(Math.round(o.v))),
              scrollTrigger: { trigger: el, start: 'top 90%' },
            })
          })

          /* ---------- Toolkit rows ---------- */
          $$('.group').forEach((g) => {
            gsap.from(g.querySelectorAll('li'), {
              xPercent: -6,
              autoAlpha: 0,
              stagger: 0.05,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: g, start: 'top 80%' },
            })
          })

          /* ---------- Work: horizontal on desktop ---------- */
          const track = $('.work-track')
          if (desktop && track) {
            const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
            const horizontal = gsap.to(track, {
              x: () => -distance(),
              ease: 'none',
              scrollTrigger: {
                trigger: '.work',
                start: 'top top',
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            })
            gsap.to('.work-progress i', {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.work',
                start: 'top top',
                end: () => `+=${distance()}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            $$('.work-panel').forEach((panel) => {
              gsap.from(panel.querySelector('.v-window, .v-stripe'), {
                yPercent: 14,
                rotate: -3,
                scale: 0.92,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontal,
                  start: 'left right',
                  end: 'center center',
                  scrub: true,
                },
              })
              gsap.from(panel.querySelectorAll('.wp-info > *'), {
                x: 60,
                autoAlpha: 0,
                stagger: 0.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontal,
                  start: 'left 85%',
                  end: 'left 35%',
                  scrub: true,
                },
              })
            })
          } else {
            $$('.work-panel').forEach((panel) => {
              gsap.from(panel, {
                y: 60,
                autoAlpha: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: panel, start: 'top 85%' },
              })
            })
          }

          /* ---------- Experience ---------- */
          if (desktop) {
            ScrollTrigger.create({
              trigger: '.xp-grid',
              start: 'top 120px',
              end: () => `bottom ${120 + ($('.xp-aside')?.offsetHeight ?? 0)}px`,
              pin: '.xp-aside',
              pinSpacing: false,
              invalidateOnRefresh: true,
            })
          }
          gsap.to('.xp-rail i', {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.xp-list', start: 'top 60%', end: 'bottom 60%', scrub: true },
          })
          $$('.xp-item').forEach((item) => {
            ScrollTrigger.create({
              trigger: item,
              start: 'top 62%',
              end: 'bottom 62%',
              toggleClass: 'is-active',
            })
            gsap.from(item, {
              y: 30,
              autoAlpha: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 90%' },
            })
          })

          /* ---------- Footer name ---------- */
          gsap.from('.footer-name', {
            yPercent: 40,
            ease: 'none',
            scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
          })

          ScrollTrigger.refresh()

          return () => {
            document.removeEventListener('click', onAnchor)
          }
        },
      )

      return () => mm.revert()
    },
    { dependencies: [ready] },
  )
}
