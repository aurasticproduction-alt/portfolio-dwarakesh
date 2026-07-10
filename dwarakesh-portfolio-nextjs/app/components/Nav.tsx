'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const isHome   = pathname === '/';

  const [hidden,   setHidden]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastY);
      setScrolled(y > 40);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (!isHome) { window.location.href = `/#${id}`; return; }
    const el = id === 'top' ? document.documentElement : document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className="nav-header"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`nav-wrap${scrolled ? ' nav-wrap--scrolled' : ''}`}>

          {/* Logo */}
          <Link href="/" className="nav-logo-img" aria-label="Home">
            <Image src="/dwaralogo-white.png" alt="Dwarakesh"
              width={160} height={40} priority className="nav-logo-image" />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary" className="nav-desktop">
            <ul className="nav-list">
              <li>
                <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top'); }}
                  className={`nav-link${isHome && pathname !== '/gallery' ? ' nav-link--active' : ''}`}>
                  Home
                </a>
              </li>
              <li>
                <Link href="/gallery"
                  className={`nav-link${pathname === '/gallery' ? ' nav-link--active' : ''}`}>
                  Gallery
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right: Get In Touch */}
          <div className="nav-right">
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
              className="nav-cta">
              Get In Touch
              <span className="nav-cta-arrow">
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <button className="nav-hamburger" onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> :
                  <><line x1={3} y1={7} x2={21} y2={7} /><line x1={3} y1={17} x2={21} y2={17} /></>}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button type="button"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} aria-label="Close menu" className="nav-backdrop" />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,   scale: 1 }}
              exit={{   opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="nav-drawer">
              <div className="nav-drawer-accent" />
              <ul className="nav-drawer-list">
                <li>
                  <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top'); }}
                    className="nav-drawer-link">Home</a>
                </li>
                <li>
                  <Link href="/gallery" onClick={() => setOpen(false)}
                    className={`nav-drawer-link${pathname === '/gallery' ? ' nav-drawer-link--active' : ''}`}>
                    Gallery
                  </Link>
                </li>
              </ul>
              <div className="nav-drawer-footer">
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                  className="nav-drawer-cta">
                  Get In Touch
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
