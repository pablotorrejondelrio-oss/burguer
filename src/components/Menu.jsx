import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Menu.css'

const ITEMS = [
  { num: '01', label: 'La Burger' },
  { num: '02', label: 'Ingredientes' },
  { num: '03', label: 'Nuestra Historia' },
  { num: '04', label: 'Contacto' },
]

export default function Menu({ isOpen, onClose }) {
  const overlayRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const el = overlayRef.current
    gsap.set(el, { xPercent: 100 })
    gsap.set('.menu-item-inner', { yPercent: 105 })
    gsap.set(['.menu-nav-brand', '.menu-close', '.menu-footer'], { opacity: 0 })

    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true })
        .to(el, { xPercent: 0, duration: 0.7, ease: 'power4.inOut' })
        .to('.menu-item-inner', {
          yPercent: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.07,
        }, '-=0.35')
        .to(['.menu-nav-brand', '.menu-close', '.menu-footer'], {
          opacity: 1,
          duration: 0.4,
        }, '-=0.7')
    }, el)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!tlRef.current) return
    if (isOpen) {
      tlRef.current.play()
    } else {
      tlRef.current.reverse()
    }
  }, [isOpen])

  return (
    <div ref={overlayRef} className="menu-overlay">
      <nav className="menu-nav">
        <button className="menu-close" onClick={onClose}>cerrar</button>
      </nav>

      <ul className="menu-list">
        {ITEMS.map(({ num, label }, i) => (
          <li key={i} className="menu-item">
            <div className="menu-item-clip">
              <div className="menu-item-inner">
                <span className="menu-item-num">({num})</span>
                <span className="menu-item-label">{label}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <footer className="menu-footer">
        <span>hecho con cariño · PRISMA</span>
      </footer>
    </div>
  )
}
