import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function AnimatedText({ as: Tag = 'h2', children, className }) {
  const targetRef = useRef(null)
  const splitInstanceRef = useRef(null)
  const innerSplitInstanceRef = useRef(null)

  useEffect(() => {
    if (!targetRef.current) return

    const splitInstance = SplitText.create(targetRef.current, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        const innerSplitInstance = SplitText.create(self.lines, {
          type: "lines"
        })

        splitInstanceRef.current = self
        innerSplitInstanceRef.current = innerSplitInstance

        const targets = innerSplitInstance.lines

        return gsap.from(targets, {
          yPercent: 105,
          duration: 1.5,
          delay: 0.2,
          stagger: 0.25,
          ease: "power4.inOut",
          force3D: true,
          transformOrigin: "50% 50%",
          scrollTrigger: {
            trigger: targetRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        })
      }
    })

    return () => {
      if (innerSplitInstanceRef.current) innerSplitInstanceRef.current.revert()
      if (splitInstanceRef.current) splitInstanceRef.current.revert()
    }
  }, [])

  return <Tag ref={targetRef} className={className}>{children}</Tag>
}
