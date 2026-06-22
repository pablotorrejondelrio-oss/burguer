import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MenuSection.css'

const BURGERS = [
  {
    num: '01',
    name: 'La Clásica',
    desc: 'Carne de vacuno gallego, lechuga, tomate, cebolla caramelizada y nuestra salsa de la casa.',
    price: '12,50',
  },
  {
    num: '02',
    name: 'La Bestia',
    desc: 'Doble carne, doble bacon ahumado, queso cheddar fundido, pepinillos encurtidos y mostaza antigua.',
    price: '15,90',
  },
  {
    num: '03',
    name: 'La del Barrio',
    desc: 'Carne madurada, queso azul, cebolla crujiente, rúcula y reducción de Pedro Ximénez.',
    price: '14,50',
  },
  {
    num: '04',
    name: 'Sin Arrepentimientos',
    desc: 'Triple carne, bacon, huevo frito, queso gouda, jalapeños y mayonesa de chipotle.',
    price: '18,90',
  },
  {
    num: '05',
    name: 'La Silenciosa',
    desc: 'Pollo crujiente, aguacate, queso fresco, tomate seco y alioli de limón. No hace ruido. Tampoco falta.',
    price: '13,50',
  },
  {
    num: '06',
    name: 'La Gaditana',
    desc: 'Atún rojo de almadraba, mayonesa de wasabi, pepino encurtido y sésamo. El mar en un pan.',
    price: '16,50',
  },
  {
    num: '07',
    name: 'La del Chef',
    desc: 'Receta que cambia cada semana. Pregunta en sala. Si está, pídela sin pensarlo.',
    price: 'P.M.',
  },
]

const SIDES = [
  { num: '08', name: 'Patatas fritas belgas', desc: 'Doble fritura, sal gruesa y salsa aioli.', price: '4,50' },
  { num: '09', name: 'Aros de cebolla', desc: 'Rebozado crujiente, cebolla dulce, salsa ranch.', price: '5,50' },
  { num: '10', name: 'Croquetas de jamón', desc: 'Jamón ibérico, bechamel cremosa. Ración de 6.', price: '6,90' },
  { num: '11', name: 'Palitos de queso', desc: 'Queso manchego, empanado, miel de romero.', price: '5,90' },
]

const DESSERTS = [
  { num: '12', name: 'Tarta de queso', desc: 'Horneada, cremosa, base de galleta. La razón por la que vuelves.', price: '5,50' },
  { num: '13', name: 'Muerte de chocolate', desc: 'Brownie caliente, helado de vainilla, ganache de 70%.', price: '6,50' },
  { num: '14', name: 'Tarta de zanahoria', desc: 'Húmeda, especiada, con frosting de queso. El final que mereces.', price: '5,50' },
]

function MenuCategory({ title, label, items, className }) {
  return (
    <div className={`menu-category ${className || ''}`}>
      <div className="menu-category-header">
        <span className="menu-category-label">{label}</span>
        <h3 className="menu-category-title">{title}</h3>
      </div>
      <ul className="menu-items-list">
        {items.map(({ num, name, desc, price }) => (
          <li key={name} className="menu-dish">
            <div className="menu-dish-top">
              {num && <span className="menu-dish-num">({num})</span>}
              <span className="menu-dish-name">{name}</span>
              <span className="menu-dish-line" />
              <span className="menu-dish-price">{price}€</span>
            </div>
            <p className="menu-dish-desc">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MenuSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-category', {
        yPercent: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.menu-dish', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.menu-items-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="menu-section" id="carta" ref={sectionRef}>
      <div className="menu-section-header">
        <span className="menu-section-label">lo que hay</span>
        <h2 className="menu-section-title">La carta</h2>
      </div>

      <div className="menu-grid">
        <MenuCategory
          label="hamburguesas"
          title="Las protagonistas"
          items={BURGERS}
          className="menu-category--burgers"
        />
        <div className="menu-grid-right">
          <MenuCategory
            label="para compartir"
            title="Los cómplices"
            items={SIDES}
          />
          <MenuCategory
            label="postres"
            title="El final"
            items={DESSERTS}
          />
        </div>
      </div>
    </section>
  )
}
