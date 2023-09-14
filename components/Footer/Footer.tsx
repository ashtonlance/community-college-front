import Link from 'next/link'
import Linkedin from 'assets/icons/icon-linkedin.svg'
import Facebook from 'assets/icons/icon-facebook.svg'
import Instagram from 'assets/icons/icon-instagram.svg'
import Youtube from 'assets/icons/icon-youtube.svg'
import Twitter from 'assets/icons/icon-twitter.svg'
import Image from 'next/image'
import bg from 'assets/imgs/angled-bg-footer.jpg'
import Logo from 'assets/imgs/ncccs-footer.svg'
import { Menu } from './Menu'

export const Footer = ({ menuItems, footerNavigation }) => {
  const studentMenu = footerNavigation?.filter(
    node => node.label === 'Students'
  )

  const facultyAndStaffMenu = footerNavigation?.filter(
    node => node.label === 'Faculty & Staff'
  )

  const employerMenu = footerNavigation?.filter(
    node => node.label === 'Employers'
  )

  const systemOfficeMenu = footerNavigation?.filter(
    node => node.label === 'System Office'
  )

  const utilityMenu = footerNavigation?.filter(
    node => node.label === 'Utility Menu'
  )

  return (
    <div className="relative flex items-start justify-between px-[100px] py-[80px] text-white md:flex-col md:p-[60px] sm:p-[40px]">
      <Image
        className="pointer-events-none -z-10 bg-navy object-fill object-center"
        src={bg}
        alt=""
        fill
        quality={80}
        loading="eager"
        priority
      />
      <div className="max-w-[200px] md:flex md:w-full md:max-w-full md:justify-between sm:flex-col">
        <Logo className="mb-6" />
        <div className="md:w-[40%] sm:w-full">
          <address className="mb-[15px] max-w-[200px] text-[14px] font-bold not-italic leading-[110%] tracking-[-0.01em] text-white">
            200 West Jones Street Raleigh, North Carolina 27603
          </address>
          <p className="mb-[20px] text-[14px] font-bold leading-[110%] tracking-[-0.01em] text-white hover:text-lightBlue">
            <a href="tel:(919) 807-7100">(919) 807-7100</a>
          </p>
          <div className="flex gap-x-5">
            <Link href="/">
              <Facebook
                alt=""
                className="h-5 w-5 text-gold hover:text-lightBlue sm:mb-[32px]"
              />
            </Link>
            <Link href="/">
              <Twitter
                alt=""
                className="h-5 w-5 text-gold hover:text-lightBlue sm:mb-[32px]"
              />
            </Link>
            <Link href="/">
              <Youtube
                alt=""
                className="h-5 w-5 text-gold hover:text-lightBlue sm:mb-[32px]"
              />
            </Link>
            <Link href="/">
              <Linkedin
                alt=""
                className="h-5 w-5 text-gold hover:text-lightBlue sm:mb-[32px]"
              />
            </Link>
            <Link href="/">
              <Instagram
                alt=""
                className="h-5 w-5 text-gold hover:text-lightBlue sm:mb-[32px]"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-3/4 flex-wrap justify-between md:w-full md:justify-around">
        <Menu
          classlist="order-1 w-[20%] md:w-1/3"
          subItems={studentMenu}
          label={studentMenu[0]?.label}
        />
        <Menu
          classlist="order-1 w-[20%] md:w-1/3"
          subItems={facultyAndStaffMenu}
          label={facultyAndStaffMenu[0]?.label}
        />
        <Menu
          classlist="order-1 w-[20%] md:w-1/3"
          subItems={employerMenu}
          label={employerMenu[0]?.label}
        />
        <Menu
          classlist="order-1 w-[20%] md:w-1/3"
          subItems={systemOfficeMenu}
          label={systemOfficeMenu[0]?.label}
        />
        <div className="order-2 w-[10%] md:w-1/3">
          <div className="flex flex-col gap-y-5">
            {utilityMenu[0]?.children?.map(item => {
              return (
                <Link
                  key={item?.label}
                  className="font-condensed text-lg text-white hover:text-lightBlue md:text-center sm:text-[15px]"
                  href={item?.url || ''}
                >
                  {item?.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
