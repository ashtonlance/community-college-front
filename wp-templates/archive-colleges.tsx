import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { Map } from '@/components/Map'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { useRouter } from 'next/router'
import { PaginatedPosts } from '@/components/PaginatedPosts'
import { CTABanner } from '@/components/CTABanner'

type CollegesIndexProps = {
  data: {
    nodeByUri: {
      seo: {}
    }
    collegeIndex: any
    colleges: {
      seo: {}
      nodes: [any: any]
    }
    menus: {
      nodes: {}
    }
    menu: {
      menuItems: {}
      utilityNavigation: {
        navigationItems: {}
      }
    }
    footer: {
      menuItems: {}
    }
    settings: {
      siteSettings: {
        announcementBar: {
          announcementBarText: string
          showAnnouncementBar: boolean
        }
      }
    }
  }
  loading: boolean
}

function getCoordinates(colleges: any[]) {
  return colleges.map(college => {
    const { title: name } = college
    const { phoneNumber } = college.collegeDetails
    const {
      latitude: lat,
      longitude: lng,
      streetAddress,
    } = college.collegeDetails.map
    return { lat, lng, name, streetAddress, phoneNumber }
  })
}

export default function CollegesArchive(props: CollegesIndexProps) {
  const router = useRouter()
  if (props.loading) {
    return <>Loading...</>
  } else {
    const menuItems = props.data?.menu?.menuItems || []
    const collegesIndex = props.data?.collegeIndex?.collegeIndex || []
    // const preFooterContent = props.data?.menus.nodes[0]
    const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
    const utilityNavigation =
      props.data?.menu?.utilityNavigation?.navigationItems
    const footerMenuItems = props.data?.footer?.menuItems || []
    const hierarchicalFooterMenuItems =
      flatListToHierarchical(footerMenuItems as any) || []
    const settings = props.data?.settings?.siteSettings || []
    const colleges = props.data?.colleges?.nodes || []
    const { page } = router.query
    const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')
    const coordinates = getCoordinates(colleges)
    const ctaAttributes = {
      data: {
        cta_copy: collegesIndex?.cta?.heading,
        button_link: collegesIndex?.cta?.link?.url,
        button_target: collegesIndex?.cta?.link?.target,
        button_label: collegesIndex?.cta?.link?.title,
        background_color: 'gold',
        type: 'fullWidth',
        hasCard: true,
      },
    }

    return (
      <Layout
        menuItems={hierarchicalMenuItems}
        seo={collegesIndex?.seo}
        utilityNavigation={utilityNavigation}
        footerNavigation={hierarchicalFooterMenuItems}
        settings={settings}
      >
        <DefaultHero
          heading={collegesIndex?.heroTitle}
          description={collegesIndex?.heroDescription}
        />
        <Map coordinates={coordinates} />
        {/* {preFooterContent && <PreFooter preFooterContent={preFooterContent} />} */}
        <div className="grid grid-cols-3 gap-5 bg-grey px-[100px] py-[10px] ">
          <PaginatedPosts currentPage={currentPage} />
        </div>
        <CTABanner attributes={ctaAttributes} />
      </Layout>
    )
  }
}

CollegesArchive.variables = ({ uri }) => {
  return { uri }
}

CollegesArchive.query = gql`
  ${Header.fragments.entry}
  query CollegesArchive {
    collegeIndex: page(id: "/what-we-offer/colleges/", idType: URI) {
      collegeIndex {
        heroDescription
        heroTitle
        cta {
          fieldGroupName
          heading
          link {
            target
            title
            url
          }
        }
      }
    }

    menu(id: "primary", idType: SLUG) {
      menuItems(first: 200) {
        nodes {
          ...NavigationMenuFragment
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
        }
      }
    }
  }
`
