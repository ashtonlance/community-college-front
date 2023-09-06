import Link from 'next/link'
import Cookies from 'js-cookie'
import { MouseEvent, useEffect, useState } from 'react'

const USER_CONSENT_COOKIE_KEY = 'cookie_consent_is_true'
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365

export const CookieBanner = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true)

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true'
    setCookieConsentIsTrue(consentIsTrue)
  }, [])

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      })
      setCookieConsentIsTrue(true)
    }
  }

  if (cookieConsentIsTrue) {
    return null
  }

  return (
    <section className="fixed bottom-0 left-0 w-full shadow-banner z-[2147483645]">
      <>
        <div className="flex sm:flex-col justify-between sm:px-[40px] px-[60px] py-10 space-y-2 bg-white md:flex-row md:space-y-0 md:items-stretch sm:space-x-0 sm:space-y-2 md:space-x-2">
          <div className="flex text-black">
            <p className="sm:text-sm md:text-base font-bold max-w-[1052px]">
              Our site uses cookies and external scripts to create a
              personalized and improved experience for users like you. By
              continuing to browse our site, you give consent for cookies to be
              used. See our{' '}
              <Link
                href="/privacy-policy"
                className="text-sm underline hover:text-lightAccent"
              >
                privacy policy
              </Link>{' '}
              for more details or adjust your Cookie Settings.
            </p>
          </div>
          <div className="flex items-center">
            <button
              className="secondary-btn text-white bg-emerald whitespace-nowrap"
              onClick={onClick}
            >
              Ok
            </button>
          </div>
        </div>
      </>
    </section>
  )
}
