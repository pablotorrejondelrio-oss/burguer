import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Manifesto.css'

export default function Manifesto() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      SplitText.create('.manifesto-quote', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          const inner = SplitText.create(self.lines, { type: 'lines' })
          return gsap.from(inner.lines, {
            yPercent: 105,
            duration: 1.6,
            stagger: 0.25,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: '.manifesto-quote',
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })
        },
      })

      gsap.from('.manifesto-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.manifesto-inner',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="manifesto-section" ref={sectionRef}>
      <div className="manifesto-inner">
        <hr className="manifesto-rule" />
        <p className="manifesto-quote">
          «Esto no es un restaurante de hamburguesas.<br />
          Es un argumento a favor de hacerlo bien.»
        </p>
        <hr className="manifesto-rule" />
      </div>
    </section>
  )
}
