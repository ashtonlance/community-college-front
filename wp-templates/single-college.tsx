import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { Map } from '@/components/Map'
import Location from 'assets/icons/location.svg'
import { WYSIWYG } from '@/components/WYSIWYG'
import { CTABanner } from '@/components/CTABanner'
import { Testimonial } from '@/components/Testimonial'
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
  console.log(pageData, 'pageData')

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
    >
      <DefaultHero
        heading={pageData?.title}
        bgImg={pageData?.featuredImage?.node?.sourceUrl}
        description={pageData?.collegeDetails?.county}
        phone={pageData?.collegeDetails?.phoneNumber}
        email={pageData?.collegeDetails?.email}
        ctaLabel={pageData?.collegeDetails?.linkToWebsite?.title}
        ctaURL={pageData?.collegeDetails?.linkToWebsite?.url}
        isCollegeSingle={true}
      />
      <div className="flex px-52 pb-10 pt-20 ">
        <div className="basis-1/2">
          {pageData?.collegeDetails?.map ? (
            <>
              <div className="mb-[27px] flex items-center">
                <Location className="mr-2 mt-[2px] h-[18px] w-[18px] text-gold" />
                <span className="h5 font-extrabold text-darkGrey">
                  Physical Address
                </span>
              </div>
              <address className="h4 mb-10 max-w-[19ch] whitespace-pre-wrap not-italic">
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
                <span className="h5 font-bold text-darkGrey">
                  Mailing Address
                </span>
                <address className="body-large whitespace-pre-wrap font-bold not-italic text-navy">
                  {pageData?.collegeDetails?.mailingAddress}
                </address>
              </div>
            </>
          ) : null}
        </div>
        <div className="basis-1/2">
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
      {pageData?.collegeDetails?.aboutTheCollege ? (
        <WYSIWYG
          attributes={{
            data: { content: pageData?.collegeDetails?.aboutTheCollege },
          }}
        />
      ) : null}
      {pageData?.collegeDetails?.testimonial?.quote ? (
        <div className="p-[100px] pt-0">
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
      <CTABanner
        attributes={{
          data: {
            cta_copy: 'Interested in applying at this college?',
            button_link: pageData?.collegeDetails?.linkToApply?.url,
            button_label: pageData?.collegeDetails?.linkToApply?.title,
            hasCard: true,
            type: 'fullWidth',
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
