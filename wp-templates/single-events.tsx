import { EventHero } from '@/components/Hero/EventHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql } from '@apollo/client'
import bg from 'assets/imgs/angled-bg-white.png'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { ResourceTags } from 'components/ResourceTags/ResourceTags'
import SharePost from 'components/SharePost/SharePost'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function SingleEvent(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.event
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const tags = pageData.eventsTags?.nodes || []
  const socialLinks = props.data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

  if (props.loading) {
    return <>Loading...</>
  }
  return (
    <Layout
      pageClassName="single-event"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
      databaseId={databaseId}
    >
      <EventHero
        heading={pageData.title}
        bgImg={pageData.featuredImage?.node?.sourceUrl}
        ctaLabel={pageData.eventDetails?.heroCta?.title}
        ctaURL={pageData.eventDetails?.heroCta?.url}
        location={pageData.eventDetails?.location}
        date={pageData.eventDetails?.date}
        endDate={pageData.eventDetails?.endDate}
        time={pageData.eventDetails?.time}
        description={pageData?.eventsCategories?.nodes[0]?.name}
      />
      <div className="bg-grey">
        {pageData?.eventDetails?.details && (
          <WYSIWYG
            attributes={{
              data: { content: pageData?.eventDetails?.details },
            }}
          />
        )}
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          className="flex justify-between px-52 py-20 md:flex-col md:gap-y-[32px] md:px-[100px] md:py-[60px] sm:gap-y-[24px] sm:p-[40px]"
        >
          <ResourceTags nodes={tags} />
          <SharePost postUrl={pageData?.link} />
        </div>
      </div>
    </Layout>
  )
}

SingleEvent.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleEvent.query = gql`
  ${Header.fragments.entry}
  query GetSingleEvent($databaseId: ID!) {
    event(id: $databaseId, idType: DATABASE_ID) {
      id
      databaseId
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
      eventDetails {
        details
        name
        date
        endDate
        time
        location
        heroCta {
          title
          url
          target
        }
      }
      eventsCategories {
        nodes {
          name
          link
        }
      }
      eventsTags {
        nodes {
          name
          link
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
