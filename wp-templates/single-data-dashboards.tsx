import { ApprenticeshipHero } from '@/components/Hero/ApprenticeshipHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function SingleDataDashboard(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.dataDashboard
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const embedParams = pageData?.dataDashboardDetails
  const socialLinks = props.data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

  const {
    elementHeight = '',
    elementWidth = '',
    parameterName = '',
    parameterTabs = '',
    parameterToolbar = '',
  } = embedParams

  const embedUrl = `https://public.tableau.com/views/${parameterName}?:embed=y&amp;:showVizHome=no&amp;:host_url=https%3A%2F%2Fpublic.tableau.com%2F&amp;:embed_code_version=3&amp;:tabs=${parameterTabs}&amp;:toolbar=${parameterToolbar}&amp;:animate_transition=yes&amp;:display_static_image=yes&amp;:display_spinner=no&amp;:display_overlay=yes&amp;:display_count=yes&amp;:loadOrderID=0`

  if (props.loading) {
    return <>Loading...</>
  }

  return (
    <Layout
      pageClassName="single-data-dashboard"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
      databaseId={databaseId}
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
      <WYSIWYG
        attributes={{
          data: {
            content: `<iframe frameborder="0" marginheight="0" marginwidth="0" title="Data Visualization" allowtransparency={true} allowFullscreen={true} class="tableauViz" style="display: block; width: ${elementWidth}px; height: ${elementHeight}px; margin: 0px; padding: 0px; border: none;" src="${embedUrl}"></iframe>`,
            background_color: 'grey',
          },
        }}
      />
    </Layout>
  )
}

SingleDataDashboard.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleDataDashboard.query = gql`
  ${Header.fragments.entry}
  query GetApprenticeshipOpp($databaseId: ID!) {
    dataDashboard(id: $databaseId, idType: DATABASE_ID) {
      id
      databaseId
      title
      seo {
        fullHead
        title
      }
      dataDashboardDetails {
        title
        details
        elementHeight
        elementWidth
        parameterName
        parameterTabs
        parameterToolbar
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
