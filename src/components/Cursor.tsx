import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

/* Custom cursor + magnetic elements. Only on fine pointers with motion allowed. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const root = document.documentElement
      root.classList.add('has-cursor')
      gsap.set([dot.current, ring.current], { autoAlpha: 0 })
      let seen = false

      const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
      const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
      const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
      const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

      const move = (e: PointerEvent) => {
        if (!seen) {
          seen = true
          gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY })
          gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 })
        }
        dx(e.clientX)
        dy(e.clientY)
        rx(e.clientX)
        ry(e.clientY)
      }
      const over = (e: PointerEvent) => {
        const t = (e.target as HTMLElement).closest('a, button, input, textarea, label')
        ring.current?.classList.toggle('is-hover', !!t)
      }
      const leave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 })
      const enter = () => gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.2 })

      window.addEventListener('pointermove', move)
      window.addEventListener('pointerover', over)
      document.addEventListener('pointerleave', leave)
      document.addEventListener('pointerenter', enter)

      // Magnetic pull on [data-magnetic]
      const cleanups: (() => void)[] = []
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const strength = el.classList.contains('big-mail') ? 0.12 : 0.3
          mx((e.clientX - (r.left + r.width / 2)) * strength)
          my((e.clientY - (r.top + r.height / 2)) * strength)
        }
        const onLeave = () => {
          mx(0)
          my(0)
        }
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
          gsap.set(el, { x: 0, y: 0 })
        })
      })

      return () => {
        root.classList.remove('has-cursor')
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerover', over)
        document.removeEventListener('pointerleave', leave)
        document.removeEventListener('pointerenter', enter)
        cleanups.forEach((fn) => fn())
      }
    })
    return () => mm.revert()
  })

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
