import { CTABanner } from '@/components/CTABanner'
import { CollegesCard } from '@/components/Cards'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { Map } from '@/components/Map'
import { PaginatedPosts } from '@/components/PaginatedPosts'
import { PostFilter } from '@/components/PostFilter'
import { gql } from '@apollo/client'
import { useDebounce } from '@uidotdev/usehooks'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

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
    }
    footer: {
      menuItems: {}
      prefooter: {}
    }
    settings: {
      siteSettings: {
        announcementBar: {
          announcementBarText: string
          showAnnouncementBar: boolean
        }
      }

      utilityNavigation: {
        navigationItems: {}
      }
    }
  }
  loading: boolean
}

const getCoordinates = (colleges: any[]) =>
  colleges.map(college => {
    const uri = college.uri
    const { title: name, featuredImage } = college || {}
    const { phoneNumber } = college?.collegeDetails || {}
    const {
      latitude: lat,
      longitude: lng,
      streetAddress,
    } = college?.collegeDetails?.map || {}
    return { featuredImage, lat, lng, name, streetAddress, phoneNumber, uri }
  })

export default function CollegesArchive(props: CollegesIndexProps) {
  const router = useRouter()
  const { data, loading } = props
  const menuItems = data?.menu?.menuItems || []
  const collegesIndex = data?.collegeIndex?.collegeIndex || []
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const utilityNavigation = data?.settings?.utilityNavigation?.navigationItems
  const footerMenuItems = data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = data?.settings?.siteSettings || []
  const socialLinks = data?.footer?.prefooter || []

  const colleges = useMemo(
    () => data?.colleges?.nodes || [],
    [data?.colleges?.nodes]
  )

  const { page } = router.query
  const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')
  const counties = useMemo(
    () =>
      [...new Set(colleges.map(college => college.collegeDetails.county))]
        .sort()
        .filter(Boolean),
    [colleges]
  )

  const [filters, setFilters] = useState({
    zipCode: '',
    county: '',
    keyword: '',
    orderBy: { field: 'TITLE', order: 'DESC' },
  })

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredColleges, setFilteredColleges] = useState(colleges)

  const filterColleges = () => {
    let result = [...colleges]

    if (
      debouncedFilters.zipCode &&
      (debouncedFilters.zipCode.length === 5 ||
        debouncedFilters.zipCode.length === 0)
    ) {
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

    if (debouncedFilters.orderBy.order === 'ASC') {
      result = result.sort((a, b) => b.title.localeCompare(a.title))
    } else {
      result = result.sort((a, b) => a.title.localeCompare(b.title))
    }
    setFilteredColleges([...result])
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
      type: 'inset',
      hasCard: true,
    },
  }

  if (loading) {
    return <>Loading...</>
  }

  const filtersToGenerateDropdown = [
    {
      name: 'county',
      options: counties,
      type: 'select',
    },
    {
      name: 'zipCode',
      type: 'input',
    },
    {
      name: 'keyword',
      type: 'input',
    },
    {
      name: 'sort by',
      options: 'Sort by Name',
      type: 'select',
    },
  ]

  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      seo={collegesIndex?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
    >
      <div className="h-full bg-grey">
        <DefaultHero
          heading={collegesIndex?.heroTitle}
          description={collegesIndex?.heroDescription}
        />
        <Map coordinates={getCoordinates(filteredColleges)} />
        <PostFilter
          filters={filters}
          setFilters={setFilters}
          filtersToGenerateDropdown={filtersToGenerateDropdown}
        />
        <div
          className={`index-page-wrapper bg-grey ${
            filteredColleges.length < 9 ? 'pb-10' : null
          }`}
        >
          {filteredColleges.length > 0 ? (
            filteredColleges.length > 9 ? (
              <PaginatedPosts
                currentPage={currentPage}
                postType="colleges"
                posts={filteredColleges}
              />
            ) : (
              <>
                {filteredColleges.map((college, index) => (
                  <CollegesCard key={index} card={college} />
                ))}
                <div className="pb-10"></div>
              </>
            )
          ) : (
            <p className="h3 col-span-12 text-center">No results found.</p>
          )}
        </div>

        <CTABanner attributes={ctaAttributes} />
      </div>
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

    colleges(where: { orderby: { field: TITLE, order: DESC } }, first: 100) {
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
          title
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
