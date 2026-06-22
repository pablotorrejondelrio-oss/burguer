import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from '../components/AnimatedText'
import Menu from '../components/Menu'
import './HeroPage.css'

gsap.registerPlugin(SplitText, ScrollTrigger)

const GLYPHS = "@#$%&0123"
const FLICKER_WINDOW = 0.35
const SCRAMBLE_DURATION = 0.15

function flickerIn(element, delay = 0) {
  const split = SplitText.create(element, { type: "chars" })
  const chars = split.chars
  const originals = chars.map(c => c.textContent)
  gsap.set(element, { opacity: 1 })
  gsap.set(chars, { opacity: 0 })

  const tl = gsap.timeline({ delay })
  chars.forEach((char, i) => {
    const randomDelay = Math.random() * FLICKER_WINDOW
    if (originals[i] === " " || originals[i] === " ") {
      tl.to(char, { opacity: 1, duration: 0.05 }, randomDelay)
      return
    }
    tl.to(char, {
      opacity: 1,
      duration: SCRAMBLE_DURATION,
      onStart() { gsap.set(char, { opacity: 1 }) },
      onUpdate() {
        char.textContent = this.progress() < 0.85
          ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          : originals[i]
      }
    }, randomDelay)
  })
  return tl
}

function flickerOnlyIn(element, delay = 0) {
  const split = SplitText.create(element, { type: "words" })
  const words = split.words
  gsap.set(element, { opacity: 1 })
  gsap.set(words, { opacity: 0 })

  const tl = gsap.timeline({ delay })
  words.forEach((word) => {
    tl.to(word, { opacity: 1, duration: 0.05 }, Math.random() * FLICKER_WINDOW)
  })
  return tl
}

const BURGER_LAYERS = [
  { src: '/Pan brioche Top.png',    side: 'right', num: '01', label: 'un pan que se hornea cada mañana aquí mismo. mantequilla, un poco de miel, la corteza justa. el tipo de pan que cuando lo ves sabes que algo bueno está a punto de pasar.' },
  { src: '/Pepinillios.png',        side: 'left',  num: '02', label: 'encurtidos en casa, 48 horas. la gente los quita. están equivocados.' },
  { src: '/Bacon.png',              side: 'right', num: '03', label: 'ahumado en frío 12 horas. no es un ingrediente, es un argumento.' },
  { src: '/Carne Top.png',          side: 'left',  num: '04', label: 'vacuno gallego, madurada 30 días, molida el mismo día. sin rellenos, sin trucos, sin aditivos. solo carne que sabe a carne de verdad porque eso es exactamente lo que es.' },
  { src: '/Carne Bottom.png',       side: 'right', num: '05', label: 'sí, son dos. la primera hamburguesa te da lo que esperas. la segunda te recuerda por qué viniste. juntas forman algo que no tiene nombre oficial pero todo el mundo entiende.' },
  { src: '/Pan brioche Bottom.png', side: 'left',  num: '06', label: 'el suelo de todo esto. se empapa del jugo de la carne, del aceite del bacon, de todo lo que cae desde arriba. no se queja. no se deshace. aguanta. el héroe más silencioso de esta historia.' },
]

let labelTimelines = []

const CALORIAS_TEXT = 'ANTOJO ANTOJO ANTOJO ANTOJO ANTOJO ANTOJO ANTOJO ANTOJO '
const JUSTAS_TEXT = 'DEL GORDO  DEL GORDO  DEL GORDO  DEL GORDO  DEL GORDO  DEL GORDO  DEL GORDO  '

const MARQUEE_STRIPS = [
  { type: 'calorias', text: CALORIAS_TEXT, reverse: false, top: '18%', rotate: -4 },
  { type: 'justas', text: JUSTAS_TEXT, reverse: true, top: '36%', rotate: 2.5 },
  { type: 'calorias', text: CALORIAS_TEXT, reverse: false, top: '54%', rotate: -3 },
  { type: 'justas', text: JUSTAS_TEXT, reverse: true, top: '72%', rotate: 3.5 },
]

export default function HeroPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      SplitText.create(['.title-que-te', '.title-obsesiona'], {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          const inner = SplitText.create(self.lines, { type: "lines" })
          return gsap.from(inner.lines, {
            yPercent: 105,
            duration: 1.5,
            delay: 0.2,
            stagger: 0.25,
            ease: "power4.inOut",
            force3D: true,
            scrollTrigger: {
              trigger: '.title-bottom',
              start: "top 80%",
              toggleActions: "play none none none"
            }
          })
        }
      })

      flickerIn('.burger-tagline', 0.2)

      gsap.set('.burger-label', { opacity: 0 })

      ScrollTrigger.create({
        start: 20,
        onEnter: () => {
          gsap.to(['.burger-tagline', '.paren', '.title-bottom', '.title-burguer'], { opacity: 0, duration: 0.4 })
          labelTimelines = []
          gsap.set('.burger-label', { opacity: 1 })
          document.querySelectorAll('.burger-label-text').forEach((el, i) => {
            labelTimelines.push(flickerOnlyIn(el, 0.4 + i * 0.15))
          })
          document.querySelectorAll('.burger-label-num').forEach((el, i) => {
            labelTimelines.push(flickerOnlyIn(el, 0.4 + i * 0.15))
          })
        },
        onLeaveBack: () => {
          gsap.to(['.title-bottom', '.title-burguer'], { opacity: 1, duration: 0.4 })
          gsap.to(['.burger-tagline', '.paren'], { opacity: 1, duration: 0.4, delay: 0.2 })
          gsap.to('.burger-label', { opacity: 0, duration: 0.3 })
        }
      })

      const isMobile = window.innerWidth <= 600
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-page',
          start: 'top top',
          end: '+=1000',
          scrub: true,
        }
      })
      .to('.burger-layer:not(:last-child)', { marginBottom: -30, ease: 'none' }, 0)
      .to('.burger-row', { y: isMobile ? -40 : -80, ease: 'none' }, 0)

      gsap.from('.burger-stack', {
        scale: 0.3,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.burger-stack',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      gsap.from('.paren', {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.burger-stack',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
    <div className="hero-page">
      <nav className="hero-nav">
        <span className="brand-tag">#cadiz</span>
        <button className="nav-menu-link" onClick={() => setMenuOpen(true)}>Menu</button>
      </nav>

      <div className="hero-body">
        <AnimatedText as="h1" className="title-burguer">LA BURGER</AnimatedText>

        <div className="burger-row">
          <p className="burger-tagline">Cómeme<br />entero</p>
          <span className="paren paren-left">(</span>

          <div className="burger-stack">
            {BURGER_LAYERS.map(({ src, label, side, num }, i) => (
              <div key={i} className="burger-layer">
                <img src={src} alt="" />
                <span className={`burger-label burger-label--${side}`}>
                  {side === 'right' && <span className="burger-label-num">({num})</span>}
                  <span className="burger-label-text">{label}</span>
                  {side === 'left' && <span className="burger-label-num">({num})</span>}
                </span>
              </div>
            ))}
          </div>

          <span className="paren paren-right">)<span className="paren-asterisk">*</span></span>
        </div>

        <div className="title-bottom">
          <span className="title-que-te">QUE TE</span>
          <span className="title-obsesiona">OBSESIONA</span>
        </div>
      </div>
    </div>
    <section className="marquee-section" aria-hidden>
      {MARQUEE_STRIPS.map(({ type, text, reverse, top, rotate }, i) => (
        <div
          key={i}
          className={`marquee-strip marquee-strip--${type}`}
          style={{ top, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
        >
          <div className={`marquee-track${reverse ? ' marquee-track--reverse' : ''}`}>
            <span className="marquee-text">{text}</span>
            <span className="marquee-text">{text}</span>
          </div>
        </div>
      ))}
    </section>
    <footer className="site-footer">
      <p className="site-footer-text">Esto es el 5%. Un boceto hecho en un rato para enseñarte de qué va esto. Imagínate el 95% que falta: tu carta, tus hamburguesas, tu sitio entero moviéndose así. Si esto ya te ha entrado por los ojos… hablamos.</p>
      <span className="site-footer-tag">hecho con cariño · PRISMA</span>
    </footer>
    <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
