import { DefaultHero } from '@/components/Hero/DefaultHero'
import { gql } from '@apollo/client'
import bg from 'assets/imgs/angled-bg-white.png'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function SingleStaff(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.staff
  console.log('pageData', pageData)
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const socialLinks = props.data?.footer?.prefooter || []

  if (props.loading) {
    return <>Loading...</>
  }
  return (
    <Layout
      pageClassName="single-staff"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
    >
      <DefaultHero
        smallHeading={true}
        heading={pageData?.title}
        bgImg={pageData?.featuredImage?.node?.sourceUrl}
        email={pageData?.staffDetails?.email}
        phone={pageData?.staffDetails?.phone}
        subheading={pageData?.staffDetails?.jobTitle}
      />
      <div className="bg-grey">
        <div className="flex gap-[40px] px-[205px] pb-10 md:flex-wrap md:gap-8 md:px-[100px] sm:px-10">
          {pageData?.staffDetails?.location && (
            <div className="w-[40%] md:w-full">
              <div className="h5 mb-8 md:mb-6 sm:m-5 sm:ml-0">Location</div>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{
                  __html: pageData?.staffDetails?.location,
                }}
              />
            </div>
          )}
          <div className="w-[40%] md:w-full">
            <div className="h5 mb-8 md:mb-6 sm:m-5 sm:ml-0">Organizations</div>
            {pageData?.staffDetails?.organizations?.map((org, index) => (
              <div key={index}>
                <div className="wysiwyg">{org.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          className="flex justify-between px-52 py-20 md:flex-col md:gap-y-[32px] md:px-[100px] md:py-[60px] sm:gap-y-[24px] sm:p-[40px]"
        ></div>
      </div>
    </Layout>
  )
}

SingleStaff.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleStaff.query = gql`
  ${Header.fragments.entry}
  query GetSingleStaff($databaseId: ID!) {
    staff(id: $databaseId, idType: DATABASE_ID) {
      id
      title
      link
      seo {
        fullHead
        title
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      staffDetails {
        email
        jobTitle
        location
        phone
        staffName
        organizations {
          name
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
