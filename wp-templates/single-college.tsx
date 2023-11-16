import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion/AccordionInternal'
import { CTABanner } from '@/components/CTABanner'
import { FadeIn } from '@/components/FadeIn'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { Map } from '@/components/Map'
import { Testimonial } from '@/components/Testimonial'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql, useQuery } from '@apollo/client'
import Location from 'assets/icons/location.svg'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { organizeProgramsByTaggedAreas } from 'utils/programsHelper'
import Stroke from '../assets/icons/long-stroke.svg'
import bg from '../assets/imgs/angled-bg-white.png'

const GET_PROGRAMS = gql`
  query GetPrograms($slug: [String]) {
    programs(
      first: 100
      where: {
        orderby: { field: TITLE, order: ASC }
        taxQuery: { taxArray: { taxonomy: COLLEGE, terms: $slug, field: SLUG } }
      }
    ) {
      nodes {
        title
        uri
        taggedProgramAreas {
          nodes {
            name
          }
        }
      }
    }
  }
`
export default function SingleCollege(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.college
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const socialLinks = props.data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

  const router = useRouter()
  const slug = router?.query?.wordpressNode[1]
  const { data: programs } = useQuery(GET_PROGRAMS, {
    variables: { slug },
    context: {
      fetchOptions: {
        method: 'GET',
      },
    },
  })
  const [programAreas, setProgramAreas] = useState([])

  useEffect(() => {
    if (programs?.programs?.nodes?.length > 0) {
      setProgramAreas(organizeProgramsByTaggedAreas(programs?.programs?.nodes))
    }
  }, [programs])

  if (props.loading) {
    return <>Loading...</>
  }

  return (
    <Layout
      pageClassName="college-single-page"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
      databaseId={databaseId}
    >
      <DefaultHero
        smallHeading={true}
        heading={pageData?.title}
        bgImg={pageData?.featuredImage?.node?.sourceUrl}
        description={pageData?.collegeDetails?.county}
        phone={pageData?.collegeDetails?.phoneNumber}
        email={pageData?.collegeDetails?.email}
        ctaLabel={pageData?.collegeDetails?.linkToWebsite?.title}
        ctaURL={pageData?.collegeDetails?.linkToWebsite?.url}
        isCollegeSingle={true}
      />
      <div className="flex bg-grey px-[100px] py-20 pb-10 md:flex-wrap md:gap-8 md:px-[60px] md:py-[60px] md:pb-8 sm:p-10 sm:pb-6">
        <div className="flex basis-1/2 flex-col justify-center pl-[105px] pr-[100px] lg:p-0 md:basis-full">
          {pageData?.collegeDetails?.map ? (
            <>
              <div className="mb-[27px] flex items-center">
                <Location className="mr-2 mt-[2px] h-[18px] w-[18px] text-gold" />
                <span className="h5 font-extrabold text-darkGrey">
                  Physical Address
                </span>
              </div>
              <address className="h4 mb-10 max-w-[21ch] whitespace-pre-line font-condensed text-[28px] not-italic leading-[110%] md:mb-8 md:text-2xl">
                <div className="w-full">
                  {pageData?.collegeDetails?.map?.streetNumber}{' '}
                  {pageData?.collegeDetails?.map?.streetName}
                </div>
                <div className="w-full">
                  {pageData?.collegeDetails?.map?.city},{' '}
                  {pageData?.collegeDetails?.map?.stateShort}{' '}
                  {pageData?.collegeDetails?.map?.postCode}
                </div>
              </address>
            </>
          ) : null}
          {pageData?.collegeDetails?.mailingAddress ? (
            <>
              <div className="flex flex-col gap-y-[15px]">
                <span className="h5 text-darkGrey">Mailing Address</span>
                <address className="body-large whitespace-pre-wrap font-bold not-italic text-navy">
                  {pageData?.collegeDetails?.mailingAddress}
                </address>
              </div>
            </>
          ) : null}
        </div>
        <div className="basis-1/2 md:basis-full">
          <Map
            coordinates={[
              {
                lat: pageData?.collegeDetails?.map?.latitude,
                lng: pageData?.collegeDetails?.map?.longitude,
              },
            ]}
            isEmbed={true}
            zoom={12}
          />
        </div>
      </div>
      <div
        className="flex flex-row gap-10 px-[100px] pb-[100px] pt-[150px] md:px-[60px] md:pb-[80px] md:pt-[100px] sm:flex-col sm:gap-8 sm:p-10 sm:pb-[40px] sm:pt-[60px]"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {pageData?.collegeDetails?.aboutTheCollege ? (
          <WYSIWYG
            customClasses="!p-0"
            attributes={{
              data: { content: pageData?.collegeDetails?.aboutTheCollege },
            }}
          />
        ) : null}
        {pageData?.collegeDetails?.logo?.mediaItemUrl ? (
          <div className="m-0 w-auto sm:m-auto">
            <div className="w-[275px] rounded-xl border-2 border-darkGrey border-opacity-25 p-5 md:w-[183px]">
              <Image
                src={pageData?.collegeDetails?.logo?.mediaItemUrl}
                alt={pageData?.collegeDetails?.logo?.altText}
                fill
                className={`!relative w-full`}
                priority
              />
            </div>
          </div>
        ) : null}
      </div>
      {pageData?.collegeDetails?.testimonial?.quote ? (
        <div className="px-[100px] pb-[100px] pt-0 md:px-[60px] md:pb-[60px]">
          <Testimonial
            attributes={{
              data: {
                quote: pageData?.collegeDetails?.testimonial?.quote,
                business_name:
                  pageData?.collegeDetails?.testimonial?.businessName,
                persons_name:
                  pageData?.collegeDetails?.testimonial?.personsName,
                label: 'Testimonial',
                background_color: 'blue',
              },
            }}
          />
        </div>
      ) : null}
      <FadeIn>
        <div className="bg-grey">
          <div className="flex flex-col items-center justify-center bg-grey px-[205px] py-[100px] text-center lg:pb-[60px] lg:pt-[80px] md:px-[60px] md:py-[60px] sm:px-10">
            <h2 className="h3  text-center ">Programs We Offer</h2>
            <Stroke className="my-6 h-[15px] max-w-full text-gold" />

            <Accordion className="mt-[20px] w-full" type="single" collapsible>
              {Object.keys(programAreas).map((key, index) => (
                <AccordionItem
                  className="bg-white"
                  key={index}
                  value={`item-${index}`}
                >
                  <AccordionTrigger>{key}</AccordionTrigger>
                  <AccordionContent>
                    {programAreas[key].programs.map((program, i) => {
                      return (
                        <Link
                          className="block w-full text-left underline hover:text-darkGrey"
                          href={program?.uri ?? ''}
                          key={i}
                        >
                          {program.title}
                        </Link>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </FadeIn>
      <CTABanner
        attributes={{
          data: {
            cta_copy: 'Interested in applying at this college?',
            button_link: pageData?.collegeDetails?.linkToApply?.url,
            button_label: pageData?.collegeDetails?.linkToApply?.title,
            hasCard: true,
            type: 'inset',
          },
        }}
      />
    </Layout>
  )
}

SingleCollege.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleCollege.query = gql`
  ${Header.fragments.entry}
  query GetCollege($databaseId: ID!) {
    college(id: $databaseId, idType: DATABASE_ID) {
      id
      databaseId
      title
      seo {
        fullHead
        title
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      collegeDetails {
        email
        mailingAddress
        map {
          city
          latitude
          longitude
          postCode
          stateShort
          streetName
          streetNumber
          streetAddress
        }
        linkToApply {
          target
          title
          url
        }
        linkToWebsite {
          target
          title
          url
        }
        faxNumber
        county
        collegeCode
        logo {
          altText
          mediaItemUrl
        }
        aboutTheCollege
        phoneNumber
        testimonial {
          businessName
          fieldGroupName
          personsName
          quote
        }
      }
    }

    menu(id: "students", idType: SLUG) {
      menuItems(first: 200) {
        nodes {
          ...NavigationMenuFragment
        }
      }
    }
    footer: menu(id: "Footer", idType: NAME) {
      menuItems(first: 200) {
        nodes {
          ...NavigationMenuFragment
        }
      }
      prefooter {
        facebook
        x
        youtube
        linkedin
        instagram
      }
    }
    settings {
      siteSettings {
        announcementBar {
          announcementBarText
          showAnnouncementBar
          announcementBarLink
        }
      }

      utilityNavigation {
        navigationItems {
          navItem {
            title
            url
            target
          }
        }
      }
    }
  }
`
