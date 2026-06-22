import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contacto.css'

const INFO = [
  {
    label: 'Dirección',
    lines: ['Calle San Francisco, 14', 'Cádiz, 11003 · Andalucía'],
  },
  {
    label: 'Reservas y consultas',
    lines: ['+34 956 23 41 87', 'hola@laburguer.es'],
  },
  {
    label: 'Horario',
    lines: [
      'Mar – Vie · 13:00–16:00 / 20:00–23:30',
      'Sáb – Dom · 12:30–17:00 / 20:00–00:00',
      'Lunes · cerrado',
    ],
  },
]

export default function Contacto() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      SplitText.create('.contacto-headline', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          const inner = SplitText.create(self.lines, { type: 'lines' })
          return gsap.from(inner.lines, {
            yPercent: 105,
            duration: 1.4,
            stagger: 0.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: '.contacto-headline',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        },
      })

      gsap.from('.contacto-block', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.contacto-details',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="contacto-section" id="contacto" ref={sectionRef}>

      <div className="contacto-top">
        <div className="contacto-top-tag">
          <span className="contacto-label">contacto</span>
          <span className="contacto-since">Cádiz · San Francisco, 14</span>
        </div>
        <h2 className="contacto-headline">
          Ven<br />a por<br /><em>ella.</em>
        </h2>
      </div>

      <div className="contacto-details">
        {INFO.map(({ label, lines }) => (
          <div key={label} className="contacto-block">
            <span className="contacto-block-label">{label}</span>
            {lines.map((line) => (
              <p key={line} className="contacto-block-line">{line}</p>
            ))}
          </div>
        ))}
      </div>

    </section>
  )
}
