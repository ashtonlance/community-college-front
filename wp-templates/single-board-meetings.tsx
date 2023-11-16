import { DefaultHero } from '@/components/Hero/DefaultHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql } from '@apollo/client'
import bg from 'assets/imgs/angled-bg-white.png'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { ResourceTags } from 'components/ResourceTags/ResourceTags'
import SharePost from 'components/SharePost/SharePost'
import { formatDate } from 'utils/dates'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function SingleBoardMeeting(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.boardMeeting
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const tags = pageData?.numberedMemoCategories?.nodes || []
  const socialLinks = props.data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

  if (props.loading) {
    return <>Loading...</>
  }
  return (
    <Layout
      pageClassName="single-numbered-memo-page"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
      databaseId={databaseId}
    >
      <DefaultHero
        heading={pageData.boardMeetingDetails.title}
        description={formatDate(pageData.boardMeetingDetails.date)}
        type="board-meeting"
      />
      <div className="bg-grey">
        {pageData?.boardMeetingDetails?.details && (
          <WYSIWYG
            attributes={{
              data: { content: pageData?.boardMeetingDetails?.details },
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

SingleBoardMeeting.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleBoardMeeting.query = gql`
  ${Header.fragments.entry}
  query GetSingleBoardMeeting($databaseId: ID!) {
    boardMeeting(id: $databaseId, idType: DATABASE_ID) {
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
      boardMeetingDetails {
        date
        details
        location
        title
      }
    }

    menu(id: "System Office", idType: NAME) {
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
