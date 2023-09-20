import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { Map } from '@/components/Map'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { GeneralCard } from '@/components/Cards'
import { useRouter } from 'next/router'
import { PaginatedPosts } from '@/components/PaginatedPosts'

type CollegesIndexProps = {
  data: {
    nodeByUri: {
      seo: {}
    }
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
    const collegesIndex = props.data?.colleges
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

    return (
      <Layout
        menuItems={hierarchicalMenuItems}
        seo={collegesIndex?.seo}
        utilityNavigation={utilityNavigation}
        footerNavigation={hierarchicalFooterMenuItems}
        settings={settings}
      >
        <DefaultHero
          heading="Colleges"
          description="Optional Paragraph Large description area. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <Map coordinates={coordinates} />
        {/* {preFooterContent && <PreFooter preFooterContent={preFooterContent} />} */}
        <div className="grid grid-cols-3 gap-5 bg-grey px-[100px] py-[10px] ">
          {/* {colleges.map((college, index) => {
            // console.log(
            //   parseDMS(
            //     `${college.collegeDetails.coordinates.lat} ${college.collegeDetails.coordinates.lng}`
            //   )

            return <GeneralCard key={index} card={college} />
          })} */}
          <PaginatedPosts currentPage={currentPage} />
        </div>
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
    colleges(where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        title
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          fullHead
        }
        collegeDetails {
          name
          phoneNumber
          map {
            city
            latitude
            longitude
            postCode
            stateShort
            streetName
            streetNumber
            streetAddress
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
