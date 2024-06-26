import { BoardMemberHero } from '@/components/Hero/BoardMemberHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql } from '@apollo/client'
import bg from 'assets/imgs/angled-bg-white.png'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

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
  const boardMemberType =
    props.data?.boardMember?.boardMembersCategories?.nodes[0]?.name
  const socialLinks = props.data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

  if (props.loading) {
    return <>Loading...</>
  }
  return (
    <Layout
      pageClassName="single-board-member"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
      databaseId={databaseId}
    >
      <BoardMemberHero
        heading={pageData?.title}
        bgImg={
          pageData?.featuredImage?.node?.sourceUrl ||
          pageData?.boardMember?.image?.sourceUrl
        }
        appointment={pageData?.boardMember?.appointment}
        termExpiration={pageData?.boardMember?.termExpiration}
        role={pageData?.boardMember?.role}
        type={boardMemberType}
        email={pageData?.boardMember?.email}
      />
      <div className="bg-grey pt-[100px] md:pt-[60px]">
        <div className="flex gap-[40px] px-[205px] pb-[60px] md:flex-wrap md:gap-8 md:px-[100px] md:pb-[50px] sm:px-10 sm:pb-[40px]">
          {pageData?.boardMember?.biography && (
            <div className="w-[60%] md:w-full">
              <div className="h2">About</div>
              <div className="">
                <WYSIWYG
                  customClasses="!px-0 sm:!pt-5 md:!pt-6 !pt-8 !pb-0"
                  attributes={{
                    data: { content: pageData?.boardMember?.biography },
                  }}
                />
              </div>
            </div>
          )}
          {pageData?.boardMember?.committeeAssignments && (
            <div className="w-[40%] md:w-full">
              <div className="h5 mb-8 md:mb-6 sm:m-5">
                Committee Assignments
              </div>
              <div
                className="wysiwyg"
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
      boardMember {
        role
        name
        appointment
        email
        biography
        termExpiration
        committeeAssignments
        image {
          sourceUrl
        }
      }

      boardMembersCategories {
        nodes {
          name
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
