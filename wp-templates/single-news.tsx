import { DefaultHero } from '@/components/Hero/DefaultHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql } from '@apollo/client'
import bg from 'assets/imgs/angled-bg-white.png'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { ResourceTags } from 'components/ResourceTags/ResourceTags'
import SharePost from 'components/SharePost/SharePost'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function SingleNews(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.newsItem
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const tags = pageData.newsCategories?.nodes
  const socialLinks = props.data?.footer?.prefooter || []

  if (props.loading) {
    return <>Loading...</>
  }
  return (
    <Layout
      pageClassName="single-news"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
    >
      <DefaultHero
        smallHeading={true}
        heading={pageData.title}
        bgImg={pageData.featuredImage?.node?.sourceUrl}
      />
      <div className="bg-grey">
        {pageData?.newsDetail?.details && (
          <WYSIWYG
            attributes={{
              data: { content: pageData?.newsDetail?.details },
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

SingleNews.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleNews.query = gql`
  ${Header.fragments.entry}
  query GetSingleNews($databaseId: ID!) {
    newsItem(id: $databaseId, idType: DATABASE_ID) {
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
      newsDetail {
        details
        title
      }
      newsCategories {
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
