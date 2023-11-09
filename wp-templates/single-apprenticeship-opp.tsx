import { CTABanner } from '@/components/CTABanner'
import { ApprenticeshipHero } from '@/components/Hero/ApprenticeshipHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function SingleApprenticeshipOpp(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.apprenticeshipOpportunity
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
      pageClassName="college-single-page"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
    >
      <ApprenticeshipHero
        heading={pageData?.title}
        bgImg={pageData?.featuredImage?.node?.sourceUrl}
        description={pageData?.collegeDetails?.county}
        phone={pageData?.opportunityDetails?.offeredBy?.phone}
        email={pageData?.opportunityDetails?.offeredBy?.email}
        category={
          pageData?.apprenticeshipOpportunitiesProgramAreas?.nodes[0]?.name
        }
        location={pageData?.opportunityDetails?.offeredBy?.address}
      />
      {pageData?.opportunityDetails?.about ? (
        <WYSIWYG
          attributes={{
            data: {
              content: pageData?.opportunityDetails?.about,
              background_color: 'grey',
            },
          }}
        />
      ) : null}
      <CTABanner
        attributes={{
          data: {
            cta_copy: 'Interested? Contact the employer.',
            button_link: pageData?.opportunityDetails?.offeredBy?.email,
            button_label: 'Send An Email',
            hasCard: true,
            type: 'inset',
            emailLink: true,
          },
        }}
      />
    </Layout>
  )
}

SingleApprenticeshipOpp.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleApprenticeshipOpp.query = gql`
  ${Header.fragments.entry}
  query GetApprenticeshipOpp($databaseId: ID!) {
    apprenticeshipOpportunity(id: $databaseId, idType: DATABASE_ID) {
      id
      title
      seo {
        fullHead
        title
      }
      apprenticeshipOpportunitiesProgramAreas {
        nodes {
          name
        }
      }
      opportunityDetails {
        name
        about
        offeredBy {
          address
          email
          employerName
          fieldGroupName
          phone
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
