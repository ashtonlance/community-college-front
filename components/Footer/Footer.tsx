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
    node => node.label === 'Businesses'
  )

  const systemOfficeMenu = footerNavigation?.filter(
    node => node.label === 'About Us'
  )

  const utilityMenu = footerNavigation?.filter(
    node => node.label === 'Utility Menu'
  )
  return (
    <div className="grid-rows-auto relative grid grid-cols-12 px-[100px] py-[80px] text-white md:gap-y-[40px] sm:gap-y-0 sm:px-[40px] md:px-[60px] md:py-[60px]">
      <div className="col-start-1 col-end-3 md:col-span-12 sm:mb-[25px]">
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
          <div className="mb-6 md:w-[40%] sm:w-full">
            <Logo className="mx-auto" />
          </div>
          <div className="md:flex md:w-[40%] md:flex-col md:items-center md:justify-center md:text-center sm:w-full">
            <address className="mb-[15px] max-w-[200px] text-[14px] font-normal not-italic leading-[140%] text-white">
              200 West Jones Street Raleigh, North Carolina 27603
            </address>
            <p className="mb-[20px] text-[14px] font-normal leading-[140%] text-white hover:text-lightBlue">
              <a href="tel:(919) 807-7100">(919) 807-7100</a>
            </p>
            <div className="flex md:justify-center justify-between md:gap-x-5">
              <Link href="https://www.facebook.com/NCCommunityColleges">
                <Facebook
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
              <Link href="https://twitter.com/NCCommColleges">
                <Twitter
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
              <Link href="https://youtube.com/@n.c.communitycollegesystem8788?si=uQdLUXggpkT6R0S7">
                <Youtube
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
              <Link href="https://www.linkedin.com/company/105557/admin/feed/posts/">
                <Linkedin
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
              <Link href="https://www.instagram.com/nccommunitycolleges/">
                <Instagram
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Menu
        classlist="order-1 md:mt-0 sm:mb-[12px] mb-0 col-start-4 col-end-6 md:col-start-1 md:col-span-3 sm:col-start-1 sm:col-span-12 footer-links-headline"
        subItems={studentMenu}
        label={studentMenu[0]?.label}
      />
      <Menu
        classlist="order-1 md:mt-0 sm:mb-[12px] mb-0 col-start-6 col-end-8 md:col-start-5 md:col-span-4 sm:col-start-1 sm:col-span-12 footer-links-headline"
        subItems={facultyAndStaffMenu}
        label={facultyAndStaffMenu[0]?.label}
      />
      <Menu
        classlist="order-1 md:mt-0 sm:mb-[12px] mb-0 col-start-8 col-end-10 md:col-start-10 md:col-span-3 sm:col-start-1 sm:col-span-12 footer-links-headline"
        subItems={employerMenu}
        label={employerMenu[0]?.label}
      />
      <Menu
        classlist="order-1 md:mt-0 sm:mb-[12px] mb-0 col-start-10 col-end-12 md:col-start-2 md:col-span-3 sm:col-start-1 sm:col-span-12 footer-links-headline"
        subItems={systemOfficeMenu}
        label={systemOfficeMenu[0]?.label}
      />
      <div className="footer-links-headline order-2 col-start-12 md:col-span-3 md:col-start-9 sm:col-span-12 sm:col-start-1 mb-0">
        <div className="flex flex-col gap-y-5 md:gap-y-3 sm:gap-y-2">
          {utilityMenu[0]?.children?.map((item, i) => {
            return (
              <Link
                key={item?.label + i}
                className="font-condensed leading-[110%] text-lg text-white hover:text-lightBlue md:text-center sm:text-[15px]"
                href={item?.url || ''}
              >
                {item?.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
