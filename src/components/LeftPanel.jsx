import { useEffect, useMemo, useRef, useState } from 'react'
import { annotate } from 'rough-notation'
import { profile } from '../data/content'

const FLAG_PARTS = ['flag', 'iamronney', 'surface', 'mapped']

const icons = {
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  'Backend Blogs': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M6 3h8.5L19 7.5V21H6V3Zm8 1.5V7h2.5L14 4.5ZM8 10.25h8v1.5H8v-1.5Zm0 3h8v1.5H8v-1.5Zm0 3h6v1.5H8v-1.5Z" />
    </svg>
  ),
  secureCloudX: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 2a5 5 0 0 0-5 5v2H6a3 3 0 0 0-3 3v5a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5v-5a3 3 0 0 0-3-3h-1V7a5 5 0 0 0-5-5Zm-3.5 7V7a3.5 3.5 0 1 1 7 0v2h-7Zm3.5 4.5a1.5 1.5 0 0 1 .75 2.8V18h-1.5v-1.7a1.5 1.5 0 0 1 .75-2.8Z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  'Twitter / X': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
}

export default function LeftPanel({ themePreference, onThemeChange }) {
  const ctfFlag = useMemo(
    () => `${FLAG_PARTS[0]}{${FLAG_PARTS[1]}_${FLAG_PARTS[2]}_${FLAG_PARTS[3]}}`,
    []
  )

  const [ctfInput, setCtfInput] = useState('')
  const [ctfSolved, setCtfSolved] = useState(false)
  const [ctfWrong, setCtfWrong] = useState(false)

  const hireRef = useRef(null)
  const taglineRef = useRef(null)

  // Typewriter on the "> I get things done" line
  const TYPEWRITER_TEXT = '> I get things done . Excellence is Worship'
  const [typed, setTyped] = useState('')
  useEffect(() => {
    let i = 0
    setTyped('')
    const interval = setInterval(() => {
      i++
      setTyped(TYPEWRITER_TEXT.slice(0, i))
      if (i >= TYPEWRITER_TEXT.length) clearInterval(interval)
    }, 38)
    return () => clearInterval(interval)
  }, [])

  // Rough-notation: animated box on hire line
  useEffect(() => {
    if (!hireRef.current) return
    const annotation = annotate(hireRef.current, {
      type: 'box',
      color: '#f59e0b',
      strokeWidth: 1.2,
      padding: [4, 6],
      animate: true,
      animationDuration: 600,
      iterations: 2,
      multiline: true,
    })
    const timer = setTimeout(() => annotation.show(), 400)
    return () => {
      clearTimeout(timer)
      annotation.remove()
    }
  }, [])


  useEffect(() => {
    const storedState = window.localStorage.getItem('iamronney_ctf_solved')
    if (storedState === 'true') {
      setCtfSolved(true)
    }
  }, [])

  function handleCtfSubmit(event) {
    event.preventDefault()

    if (ctfInput.trim().toLowerCase() === ctfFlag) {
      setCtfSolved(true)
      setCtfWrong(false)
      window.localStorage.setItem('iamronney_ctf_solved', 'true')
      window.dispatchEvent(new Event('iamronney:ctf-solved'))
      return
    }

    setCtfWrong(true)
  }

  return (
    <aside className="w-full md:w-[280px] md:shrink-0 md:sticky md:top-16 md:self-start">

      {/* Name */}
      <div className="identity-card mb-7">
        <h1 className="identity-heading mt-1 font-black leading-[0.88] tracking-[-0.04em] text-stone-700" aria-label={profile.name}>
          <span className="block font-mono text-[0.84rem] md:text-[0.92rem] uppercase tracking-[0.2em] text-stone-500">
            i am
          </span>

          <span
            className="identity-glitch-text block text-[3.5rem] md:text-[3.9rem]"
            data-text="ronney"
          >
            ronney
          </span>

          <span
            className="identity-glitch-text block text-[3.5rem] md:text-[3.9rem]"
            data-text="otieno."
          >
            otieno<span className="relative text-stone-500">.</span>
          </span>
        </h1>

        <div className="mt-2 h-px w-28 bg-stone-300" />

        <p ref={taglineRef} className="mt-2 font-mono text-[0.64rem] tracking-[0.14em] text-stone-500 terminal-cursor">
          {typed}
        </p>
      </div>

      {/* Avatar */}
      <div className="scanline-wrap w-32 h-32 mb-6 rounded-full">
        <img
          src={`${import.meta.env.BASE_URL}profile-pic.jpeg`}
          alt={profile.name}
          className="w-32 h-32 rounded-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>

      {/* Taglines */}
      <p className="text-sm text-stone-500 leading-[1.8] mb-3">
        {profile.taglines[0]}
      </p>
      <p ref={hireRef} className="text-sm text-stone-500 leading-[1.8] mb-3">
        {profile.taglines[1]}
      </p>

      {/* Microsoft MVP badge */}
      <a
        href="https://mvp.microsoft.com/"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Microsoft Security MVP"
        className="group relative mt-2 mb-5 block w-full max-w-[290px] overflow-hidden rounded-xl border border-stone-200 bg-white pl-4 pr-3 py-2.5 text-stone-700 shadow-[0_14px_34px_-28px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-[1px] hover:border-stone-300 hover:shadow-[0_20px_40px_-26px_rgba(2,132,199,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(180deg,#00A4EF_0%,#7FBA00_55%,#F25022_100%)]"
        />

        <div className="flex items-center gap-2.5">
          {/* Microsoft logo mark (four squares) */}
          <svg viewBox="0 0 21 21" width="14" height="14" aria-hidden="true" className="shrink-0">
            <rect x="0" y="0" width="10" height="10" fill="#F25022" />
            <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
            <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
            <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
          </svg>

          <div className="min-w-0">
            <p className="text-[0.67rem] uppercase tracking-[0.16em] text-stone-400 leading-none mb-1">
              Microsoft
            </p>
            <p className="text-[0.78rem] font-semibold leading-tight text-stone-800">
              Security MVP • Cloud & DevSecOps
            </p>
          </div>

          <span className="ml-auto rounded-full border border-stone-200 px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.09em] text-sky-700 bg-sky-50/70">
            MVP
          </span>
        </div>
      </a>

      <section className="mt-2 mb-5 rounded-xl border border-stone-200 bg-white p-3">
        <span className="hidden" data-ctf-flag={ctfFlag} aria-hidden="true">
          {ctfFlag}
        </span>

        <div className="flex items-center justify-between gap-2">
          {/* <p className="text-[0.63rem] font-mono uppercase tracking-[0.16em] text-stone-500">
            CTF // Mini Challenge
          </p> */}
          {ctfSolved ? (
            <span className="ctf-solved-pill rounded-full border px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em]">
              solved
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-[0.78rem] text-stone-700">
          Find the hidden flag in this site and unlock something special.
        </p>

        <form onSubmit={handleCtfSubmit} className="mt-3">
          <label htmlFor="ctf-flag" className="sr-only">
            Enter discovered flag
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-2 py-2">
            <span className="font-mono text-[0.68rem] text-stone-500">$</span>
            <input
              id="ctf-flag"
              type="text"
              value={ctfInput}
              onChange={(event) => {
                setCtfInput(event.target.value)
                if (ctfWrong) {
                  setCtfWrong(false)
                }
              }}
              placeholder="flag{...}"
              className="w-full bg-transparent text-[0.75rem] text-stone-800 placeholder:text-stone-400 focus:outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="rounded-md border border-stone-300 bg-white px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-stone-700 transition-colors hover:bg-stone-100"
            >
              Verify
            </button>
          </div>
        </form>

        {ctfSolved ? (
          <div className="ctf-solved-panel mt-3 rounded-lg border px-2.5 py-2">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.09em]">
              Recon Ranger Badge Unlocked
            </p>
            <p className="mt-1 text-[0.68rem]">
              Surface mapped. Vector confirmed.
            </p>
          </div>
        ) : (
          <p className="mt-2 text-[0.64rem] font-mono text-stone-500">
            hint: source-level recon helps.
          </p>
        )}

        {ctfWrong ? (
          <p className="mt-2 text-[0.64rem] font-mono text-rose-600">
            invalid flag // try again.
          </p>
        ) : null}
      </section>

      <a
        href={`mailto:${profile.email}`}
        className="block text-[0.86rem] text-brand-blue hover:text-stone-900 hover:underline mb-3 break-all"
      >
        {profile.email}
      </a>

      {/* Social icons */}
      <div className="flex flex-wrap items-center gap-2 mt-5">
        {profile.socials.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer noopener' : undefined}
            aria-label={label}
            title={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-400 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-colors duration-200 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-800"
          >
            {icons[label]}
          </a>
        ))}
      </div>

      <div className="mt-6 border-t border-stone-200 pt-4">
        <label className="theme-switcher flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-stone-600">
          <span>Theme</span>
          <span className="theme-switcher-control flex items-center gap-1">
            <select
              value={themePreference}
              onChange={onThemeChange}
              className="theme-switcher-select min-w-[6.2rem] appearance-none bg-transparent pr-4 text-right font-semibold text-stone-700 focus:outline-none"
              aria-label="Theme selector"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="poetic">Poetic</option>
              <option value="void">Void</option>
            </select>
            <span aria-hidden="true" className="theme-switcher-arrow text-stone-500">
              ▾
            </span>
          </span>
        </label>
      </div>

    </aside>
  )
}
