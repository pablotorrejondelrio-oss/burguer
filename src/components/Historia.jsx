import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Historia.css'

const CHAPTERS = [
  {
    year: '2019',
    title: 'El principio',
    body: 'Empezó en una cocina pequeña. Sin nombre, sin local, sin plan. Solo la obsesión de hacer una hamburguesa que valiera la pena. La que te comes y piensas: esto lo cambia todo.',
  },
  {
    year: '2021',
    title: 'El primer local',
    body: 'Cuarenta metros cuadrados en el casco antiguo. Diez taburetes, una plancha y una carta con tres platos. La cola llegaba hasta la esquina desde el primer fin de semana. No añadimos más mesas. Añadimos más carne.',
  },
  {
    year: '2023',
    title: 'La madurez',
    body: 'Decidimos no crecer por crecer. Decidimos crecer bien. Nuevos proveedores, nueva cocina, los mismos valores. El pan sigue horneándose aquí cada mañana. La carne sigue siendo gallega. Eso no cambia.',
  },
  {
    year: 'Hoy',
    title: 'Lo que somos',
    body: 'Un sitio donde la hamburguesa importa de verdad. Donde cada ingrediente tiene nombre y origen. Donde el que cocina sabe lo que pone. Donde tú sabes lo que comes. Eso es todo. Y es suficiente.',
  },
]

export default function Historia() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      SplitText.create('.historia-headline', {
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
              trigger: '.historia-headline',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        },
      })

      gsap.from('.historia-intro', {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.historia-intro',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.historia-chapter', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.historia-chapters',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.historia-closing', {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.historia-closing',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="historia-section" id="historia" ref={sectionRef}>

      <div className="historia-top">
        <div className="historia-top-tag">
          <span className="historia-label">nuestra historia</span>
          <span className="historia-since">Cádiz · desde 2019</span>
        </div>
        <h2 className="historia-headline">
          No fue<br /><em>un plan.</em><br />Fue una<br />obsesión.
        </h2>
      </div>

      <div className="historia-body">
        <p className="historia-intro">
          Hay cosas que no se explican con un PowerPoint. Esta es una de ellas. Lo que somos hoy viene de algo mucho más simple: la convicción de que una hamburguesa bien hecha puede ser la mejor experiencia gastronómica de tu semana. Y de probar esa hipótesis, una y otra vez, hasta que dejó de ser hipótesis.
        </p>

        <div className="historia-chapters">
          {CHAPTERS.map(({ year, title, body }) => (
            <article key={year} className="historia-chapter">
              <span className="historia-chapter-year">{year}</span>
              <div className="historia-chapter-content">
                <h3 className="historia-chapter-title">{title}</h3>
                <p className="historia-chapter-body">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>
  )
}
