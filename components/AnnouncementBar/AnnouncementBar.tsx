import Close from 'assets/icons/close.svg'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

type AnnouncementBarProps = {
  announcementBar?: {
    announcementBarText?: string
    announcementBarLink?: string
    showAnnouncementBar?: string
  }
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = props => {
  const announcementBarText = props?.announcementBar?.announcementBarText || ''
  const announcementBarLink = props?.announcementBar?.announcementBarLink || ''
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
        <LazyMotion features={domAnimation}>
          <m.div
            suppressHydrationWarning
            key="announcement-bar"
            initial={{ opacity: 1, height: 'auto' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`body-regular flex w-full items-center justify-between border-b-[1px] border-[#51525540] bg-lightBlue text-center`}
          >
            {announcementBarLink ? (
              <Link
                href={announcementBarLink}
                target="_blank"
                className="announcement-bar-content"
              >
                {announcementBarText}
              </Link>
            ) : (
              <span className="announcement-bar-content">
                {announcementBarText}
              </span>
            )}

            <span
              onClick={handleDismiss}
              className="group flex h-full min-h-[56px] max-w-[38px] basis-1/12 cursor-pointer flex-col items-center justify-center bg-[#beddec] p-3 hover:bg-navy"
            >
              <Close className="mx-auto text-navy group-hover:text-white" />
            </span>
          </m.div>
        </LazyMotion>
      ) : null}
    </AnimatePresence>
  )
}
