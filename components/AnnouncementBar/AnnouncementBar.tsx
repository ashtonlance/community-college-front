import React, { useEffect, useState } from 'react'
import Close from 'assets/icons/close.svg'
import { useCookies } from 'react-cookie'
import { motion, AnimatePresence } from 'framer-motion'

type AnnouncementBarProps = {
  announcementBarText?: string
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = props => {
  const announcementBarText = props?.announcementBarText || ''
  const [cookies, setCookie] = useCookies(['ncccs-announcement-bar'])
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    if (cookies['ncccs-announcement-bar'] === 'dismissed') {
      setIsDismissed(true)
    } else {
      setIsDismissed(false)
    }
  }, [cookies])

  const handleDismiss = () => {
    setCookie('ncccs-announcement-bar', 'dismissed', { path: '/' })
    setIsDismissed(true)
  }

  return (
    <AnimatePresence>
      {!isDismissed ? (
        //@ts-ignore
        <motion.div
          suppressHydrationWarning
          key="announcement-bar"
          initial={{ opacity: 1, height: 'auto' }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`body-regular flex w-full items-center justify-between border-b-[1px] border-[#51525540] bg-lightBlue text-center`}
        >
          <span className="body-regular basis-full px-52 py-4 text-navy">
            {announcementBarText}
          </span>
          <span
            onClick={handleDismiss}
            className="group flex h-full min-h-[56px] max-w-[38px] basis-1/12 cursor-pointer flex-col items-center justify-center bg-[#beddec] p-2 hover:bg-navy"
          >
            <Close className="mx-auto text-navy group-hover:text-white" />
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
