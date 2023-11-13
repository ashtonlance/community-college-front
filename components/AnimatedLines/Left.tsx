import { LazyMotion, domAnimation, m, useInView } from 'framer-motion'
import { useRef } from 'react'

export const Left = ({ classes = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <LazyMotion features={domAnimation}>
      <m.svg
        viewBox="0 0 40 3"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="3"
        className={classes}
        ref={ref}
      >
        <m.path
          d="M0 1.5L40 1.5"
          stroke="#00BB54"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{
            duration: 1.25,
            ease: 'easeInOut',
          }}
        />
      </m.svg>
    </LazyMotion>
  )
}
