import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValue,
} from 'framer-motion'
import { useRef } from 'react'

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

export const ScrollIndicator = ({emptyBg}:{emptyBg:boolean}) => {
  const ref = useRef(null)

  return (
    <span className="absolute bottom-[100px] md:bottom-[90px] right-[90px] flex items-center justify-center sm:hidden">
      <svg
        width="17"
        height="144"
        viewBox="0 0 17 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M9.136 4.928C8.824 6.26 8.368 7.736 6.544 7.736C4.948 7.736 3.868 6.728 3.868 4.436C3.868 3.032 4.456 1.808 5.392 1.172L6.472 2.384C5.788 2.972 5.512 3.728 5.512 4.532C5.512 5.528 5.788 5.996 6.424 5.996C6.964 5.996 7.204 5.708 7.564 4.124C7.924 2.576 8.416 1.496 10.072 1.496C11.596 1.496 12.532 2.84 12.532 4.496C12.532 5.804 12.04 6.764 11.212 7.556L10.036 6.344C10.588 5.804 10.9 5.204 10.9 4.436C10.9 3.536 10.516 3.236 10.144 3.236C9.616 3.236 9.448 3.596 9.136 4.928ZM6.268 13.2724L5.272 14.3284C4.456 13.7164 3.868 12.9964 3.868 11.7484C3.868 10.1044 5.212 8.79641 7.144 8.79641C9.076 8.79641 10.432 10.0684 10.432 11.8204C10.432 13.0204 9.844 13.7884 9.04 14.3164L7.936 13.2244C8.464 12.8524 8.836 12.4564 8.836 11.7844C8.836 10.9924 8.176 10.4764 7.144 10.4764C6.136 10.4764 5.464 10.9924 5.464 11.7844C5.464 12.4324 5.752 12.8404 6.268 13.2724ZM10.432 18.5177C10.432 19.0577 10.216 19.4657 9.988 19.6817L8.368 19.2497C8.608 18.9857 8.776 18.6617 8.776 18.2897C8.776 17.6417 8.5 17.2217 7.408 17.2217L4 17.2217L4 15.5657L10.3 15.5657L10.3 17.2217L9.88 17.2217C10.18 17.5097 10.432 17.9297 10.432 18.5177ZM10.432 23.0427C10.432 24.6868 9.076 25.8988 7.144 25.8988C5.212 25.8988 3.868 24.6867 3.868 23.0427C3.868 21.3987 5.212 20.1987 7.144 20.1987C9.076 20.1987 10.432 21.3987 10.432 23.0427ZM5.464 23.0427C5.464 23.8347 6.268 24.2187 7.144 24.2187C8.104 24.2187 8.836 23.8347 8.836 23.0427C8.836 22.2507 8.116 21.8787 7.144 21.8787C6.172 21.8787 5.464 22.2507 5.464 23.0427ZM12.748 28.895L4 28.895L4 27.239L11.92 27.239L12.748 28.895ZM12.748 32.2817L4 32.2817L4 30.6257L11.92 30.6257L12.748 32.2817Z"
          fill={`${emptyBg ? 'darkGrey' : 'white'}`}
        />
        <motion.path
          d="M8.5 43.5V143.5"
          stroke="#E1AF00"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </span>
  )
}
