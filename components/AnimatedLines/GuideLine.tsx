import { LazyMotion, domAnimation, m } from 'framer-motion'

const loadFeatures = import('@/components/FadeIn/features.js').then(
  res => res.default
)

export const GuideLine = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.svg
        viewBox="0 0 91 12"
        xmlns="http://www.w3.org/2000/svg"
        width="91"
        height="12"
      >
        <m.circle
          cx="6"
          cy="6"
          initial={{ pathLength: 0, r: 0 }}
          animate={{ pathLength: 1, r: 5 }}
          stroke="#00BB54"
          strokeWidth="1.5"
          fill={'none'}
        />
        <m.path
          d="M11 6L91 6"
          stroke="#00BB54"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.25,
            ease: 'easeInOut',
          }}
        />
      </m.svg>
    </LazyMotion>
  )
}
