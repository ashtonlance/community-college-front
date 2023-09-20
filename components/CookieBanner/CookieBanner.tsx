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
    <section className="shadow-banner fixed bottom-0 left-0 z-[2147483645] w-full">
      <>
        <div className="flex justify-between space-y-2 bg-white px-[60px] py-10 md:flex-row md:items-stretch md:space-x-2 md:space-y-0 sm:flex-col sm:space-x-0 sm:space-y-2 sm:px-[40px]">
          <div className="flex text-black">
            <p className="max-w-[1052px] font-bold md:text-base sm:text-sm">
              Our site uses cookies and external scripts to create a
              personalized and improved experience for users like you. By
              continuing to browse our site, you give consent for cookies to be
              used. See our{' '}
              <Link
                href="/privacy-policy"
                className="hover:text-lightAccent text-sm underline"
              >
                privacy policy
              </Link>{' '}
              for more details or adjust your Cookie Settings.
            </p>
          </div>
          <div className="flex items-center">
            <button
              className="secondary-btn navy"
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
