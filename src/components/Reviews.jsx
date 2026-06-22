import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Reviews.css'

const REVIEWS = [
  {
    num: '01',
    text: 'Me la comí entera y no me arrepiento de nada. La volví a pedir antes de terminar la primera.',
    author: 'María G.',
    city: 'Cádiz',
  },
  {
    num: '02',
    text: 'El bacon. Solo el bacon ya justifica el viaje. Pero luego está todo lo demás.',
    author: 'Alejandro R.',
    city: 'Sevilla',
  },
  {
    num: '03',
    text: 'Hacía años que no me manchaba tanto comiendo y que me importara tan poco.',
    author: 'Lucía M.',
    city: 'Málaga',
  },
  {
    num: '04',
    text: 'Los pepinillos son los mejores que he probado en mi vida. Y eso que siempre los quitaba.',
    author: 'Carlos V.',
    city: 'Madrid',
  },
]

export default function Reviews() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.review-item', {
        yPercent: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="reviews-section" ref={sectionRef}>
      <div className="reviews-header">
        <span className="reviews-label">opiniones</span>
        <h2 className="reviews-title">Lo que dicen<br /><em>los que ya lo saben</em></h2>
      </div>

      <ul className="reviews-list">
        {REVIEWS.map(({ num, text, author, city }) => (
          <li key={num} className="review-item">
            <span className="review-num">({num})</span>
            <blockquote className="review-text">"{text}"</blockquote>
            <footer className="review-author">
              <span>{author}</span>
              <span className="review-city">— {city}</span>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  )
}
