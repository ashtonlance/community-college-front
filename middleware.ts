import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  let cookie = req.cookies.get('ncccs-preferred-landing-page')

  if (pathname === '/') {
    if (cookie?.value === 'employers') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/businesses`
      )
    }
    if (cookie?.value === 'businesses') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/businesses`
      )
    }
    if (cookie?.value === 'college-faculty-staff') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/college-faculty-staff`
      )
    }
    if (cookie?.value === 'system-office') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/system-office`
      )
    }
  }

  // otherwise the header is present
  return NextResponse.next()
}
