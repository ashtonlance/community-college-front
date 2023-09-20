import { CTABanner } from '@/components/CTABanner'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { Map } from '@/components/Map'
import { PaginatedPosts } from '@/components/PaginatedPosts'
import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useRouter } from 'next/router'
import { useMemo, useState, useEffect } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { useDebounce } from '@uidotdev/usehooks'

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

const getCoordinates = (colleges: any[]) =>
  colleges.map(college => {
    const { title: name, featuredImage } = college || {}
    const { phoneNumber } = college?.collegeDetails || {}
    const {
      latitude: lat,
      longitude: lng,
      streetAddress,
    } = college?.collegeDetails?.map || {}
    return { featuredImage, lat, lng, name, streetAddress, phoneNumber }
  })

export default function CollegesArchive(props: CollegesIndexProps) {
  const router = useRouter()
  const { data, loading } = props
  const menuItems = data?.menu?.menuItems || []
  const collegesIndex = data?.collegeIndex?.collegeIndex || []
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const utilityNavigation = data?.menu?.utilityNavigation?.navigationItems
  const footerMenuItems = data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = data?.settings?.siteSettings || []
  const colleges = useMemo(
    () => data?.colleges?.nodes || [],
    [data?.colleges?.nodes]
  )
  const { page } = router.query
  const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')
  const counties = useMemo(
    () => [...new Set(colleges.map(college => college.collegeDetails.county))],
    [colleges]
  )

  const [filters, setFilters] = useState({
    zipCode: '',
    county: '',
    keyword: '',
    orderBy: { field: 'TITLE', order: 'ASC' },
  })
  const debouncedFilters = useDebounce(filters, 500)
  const [filteredColleges, setFilteredColleges] = useState(colleges)

  const filterColleges = () => {
    let result = colleges

    if (debouncedFilters.zipCode) {
      result = result.filter(
        college =>
          college.collegeDetails.map.postCode === debouncedFilters.zipCode
      )
    }

    if (debouncedFilters.county) {
      result = result.filter(
        college => college.collegeDetails.county === debouncedFilters.county
      )
    }

    if (debouncedFilters.keyword) {
      result = result.filter(college =>
        college.title
          .toLowerCase()
          .includes(debouncedFilters.keyword.toLowerCase())
      )
    }

    if (debouncedFilters.orderBy.order === 'DESC') {
      result = result.sort((a, b) => b.title.localeCompare(a.title))
    } else {
      result = result.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredColleges(result)
  }

  useEffect(() => {
    filterColleges()
  }, [debouncedFilters])

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

  if (loading) {
    return <>Loading...</>
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
      <Map coordinates={getCoordinates(filteredColleges)} />
      <div className="flex justify-center gap-x-[15px] px-[205px] py-10">
        <select
          className="flex-1 text-darkBeige"
          onChange={e => setFilters({ ...filters, county: e.target.value })}
        >
          <option value="">Select a county</option>
          {counties.map(county =>
            county !== null ? (
              <option key={county} value={county}>
                {county}
              </option>
            ) : null
          )}
        </select>
        <input
          className="text-input"
          type="text"
          placeholder="Search by zip code"
          onChange={e => setFilters({ ...filters, zipCode: e.target.value })}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Search by keyword"
          onChange={e => setFilters({ ...filters, keyword: e.target.value })}
        />
        <select
          onChange={e =>
            setFilters({
              ...filters,
              orderBy: { field: 'TITLE', order: e.target.value },
            })
          }
          className="flex-1 text-navy"
        >
          <option value="ASC">Order by</option>
          <option value="ASC">Name Ascending</option>
          <option value="DESC">Name Descending</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-5 bg-grey px-[100px] py-[10px] ">
        <PaginatedPosts currentPage={currentPage} colleges={filteredColleges} />
      </div>
      <CTABanner attributes={ctaAttributes} />
    </Layout>
  )
}

CollegesArchive.variables = ({ uri }) => {
  return { uri }
}

CollegesArchive.query = gql`
  ${Header.fragments.entry}
  query CollegesArchive($uri: ID!) {
    collegeIndex: page(id: $uri, idType: URI) {
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
          county
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
