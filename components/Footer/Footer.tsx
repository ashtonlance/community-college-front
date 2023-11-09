import Facebook from 'assets/icons/icon-facebook.svg'
import Instagram from 'assets/icons/icon-instagram.svg'
import Linkedin from 'assets/icons/icon-linkedin.svg'
import Twitter from 'assets/icons/icon-twitter.svg'
import Youtube from 'assets/icons/icon-youtube.svg'
import bg from 'assets/imgs/angled-bg-footer.jpg'
import Logo from 'assets/imgs/ncccs-footer.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from './Menu'

export const Footer = ({ footerNavigation, socialLinks }) => {
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
    <div className="grid-rows-auto relative grid grid-cols-12 px-[100px] py-[80px] text-white md:gap-y-[40px] md:px-[60px] md:py-[60px] sm:gap-y-0 sm:px-[40px]">
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
            <div className="flex justify-between md:justify-center md:gap-x-5">
              <Link href={socialLinks?.facebook ?? '/'} target="_blank">
                <Facebook
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
              <Link href={socialLinks?.x ?? '/'} target="_blank">
                <Twitter
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
              <Link href={socialLinks?.youtube ?? '/'} target="_blank">
                <Youtube
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
              <Link href={socialLinks?.linkedin ?? '/'} target="_blank">
                <Linkedin
                  alt=""
                  className="h-5 w-5 text-gold hover:text-lightBlue"
                />
              </Link>
              <Link href={socialLinks?.instagram ?? '/'} target="_blank">
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
      <div className="footer-links-headline order-2 col-start-12 mb-0 md:col-span-3 md:col-start-9 sm:col-span-12 sm:col-start-1">
        <div className="flex flex-col gap-y-5 md:gap-y-3 sm:gap-y-2">
          {utilityMenu[0]?.children?.map((item, i) => {
            return (
              <Link
                key={item?.label + i}
                className="font-condensed text-lg leading-[110%] text-white hover:text-lightBlue md:text-center sm:text-[15px]"
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
