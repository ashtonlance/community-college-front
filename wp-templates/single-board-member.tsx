import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { WYSIWYG } from '@/components/WYSIWYG'
import SharePost from 'components/SharePost/SharePost'
import bg from 'assets/imgs/angled-bg-white.png'
import { BoardMemberHero } from '@/components/Hero/BoardMemberHero'

export default function SingleBoardMember(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.boardMember
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const tags = pageData?.newsCategories?.nodes
  console.log(pageData, 'pageData')

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
    >
      <BoardMemberHero
        heading={pageData?.title}
        bgImg={pageData?.featuredImage?.node?.sourceUrl}
        appointment={pageData?.boardMember?.appointment}
        termExpiration={pageData?.boardMember?.termExpiration}
        role={pageData?.boardMember?.role}
        biography={pageData?.boardMember?.biography}
        email={pageData?.boardMember?.email}
      />
      <div className="bg-grey">
        <div className="flex md:flex-wrap sm:px-10 md:px-[100px] px-[205px] gap-[40px] md:gap-8">
          {pageData?.boardMember?.biography && (
            <div className="md:w-full w-[60%]">
            <div className="h2">About</div>
            <div className="">
              <WYSIWYG
                customClasses='!px-0 sm:!pt-5 md:!pt-6 !pt-8 !pb-0'
                attributes={{
                  data: { content: pageData?.boardMember?.biography },
                }}
              />
            </div>
            </div>
          )}
          {pageData?.boardMember?.committeeAssignments && (
            <div className="md:w-full w-[40%]">
              <div className="h5 sm:m-5 md:mb-6 mb-8">Committee Assignments</div>
              <div className='wysiwyg'
                dangerouslySetInnerHTML={{
                  __html: pageData?.boardMember?.committeeAssignments,
                }}
              />
            </div>
          )}
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

SingleBoardMember.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleBoardMember.query = gql`
  ${Header.fragments.entry}
  query GetSingleBoardMember($databaseId: ID!) {
    boardMember(id: $databaseId, idType: DATABASE_ID) {
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
      boardMember {
        role
        name
        appointment
        email
        biography
        termExpiration
        committeeAssignments
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
