import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const read = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.dataset.theme = 'dark'
    else delete root.dataset.theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0d12' : '#f6f4ef')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      data-theme-state={theme}
    >
      <span className="tt-track" aria-hidden="true">
        <svg className="tt-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
          </g>
        </svg>
        <svg className="tt-moon" viewBox="0 0 24 24">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
        </svg>
        <i className="tt-knob" />
      </span>
    </button>
  )
}
