import { NumberedMemoHero } from '@/components/Hero/NumberedMemoHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql } from '@apollo/client'
import bg from 'assets/imgs/angled-bg-white.png'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { ResourceTags } from 'components/ResourceTags/ResourceTags'
import SharePost from 'components/SharePost/SharePost'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function SingleNumberedMemo(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.numberedMemo
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const tags = pageData.numberedMemoCategories?.nodes
  const socialLinks = props.data?.footer?.prefooter || []

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
    >
      <NumberedMemoHero
        heading={pageData.numberedMemo.subject}
        number={pageData.numberedMemo.number}
        date={pageData.numberedMemo.date}
        from={pageData.numberedMemo.memoFrom}
        to={pageData.numberedMemo.memoTo}
        categories={tags}
      />
      <div className="bg-grey">
        {pageData?.numberedMemo?.body && (
          <WYSIWYG
            attributes={{
              data: { content: pageData?.numberedMemo?.body },
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

SingleNumberedMemo.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleNumberedMemo.query = gql`
  ${Header.fragments.entry}
  query GetProgramArea($databaseId: ID!) {
    numberedMemo(id: $databaseId, idType: DATABASE_ID) {
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
      numberedMemo {
        body
        date
        fieldGroupName
        memoFrom
        memoTo
        number
        subject
      }
      numberedMemoCategories {
        nodes {
          name
          link
        }
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
