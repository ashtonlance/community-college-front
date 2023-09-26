import { CTABanner } from '@/components/CTABanner'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { PaginatedPosts } from '@/components/PaginatedPosts'
import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useRouter } from 'next/router'
import { useMemo, useState, useEffect } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { useDebounce } from '@uidotdev/usehooks'
import { ProgramsAccordion } from '@/components/Accordion/ProgamsAccordion'

type ProgramsIndexProps = {
  data: {
    nodeByUri: {
      seo: {}
    }
    programIndex: any
    programs: {
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

type TaggedArea = {
  slug: string
  name: string
}

type Program = {
  title: string
  uri: string
  featuredImage: {
    node: {
      sourceUrl: string
    }
  }
  seo: {
    fullHead: string
  }
  taggedProgramAreas: {
    nodes: TaggedArea[]
  }
}

const organizeProgramsByTaggedAreas = (programs: Program[]) => {
  const organizedPrograms: {
    [key: string]: { programs: Program[]; slug: string }
  } = {}

  programs.forEach(program => {
    program.taggedProgramAreas.nodes.forEach((taggedArea: TaggedArea) => {
      if (!organizedPrograms[taggedArea.name]) {
        organizedPrograms[taggedArea.name] = {
          programs: [],
          slug: taggedArea.slug,
        }
      }
      organizedPrograms[taggedArea.name].programs.push(program)
    })
  })

  return organizedPrograms
}

export default function ProgramsArchive(props: ProgramsIndexProps) {
  // console.log(props, 'props')
  const router = useRouter()
  const { data, loading } = props
  const menuItems = data?.menu?.menuItems || []
  const programsIndex = data?.programIndex?.programsIndex || []
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const utilityNavigation = data?.settings?.utilityNavigation?.navigationItems
  const footerMenuItems = data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = data?.settings?.siteSettings || []
  const programs = useMemo(
    () => data?.programs?.nodes || [],
    [data?.programs?.nodes]
  )

  const [filters, setFilters] = useState({
    degreeType: '',
    keyword: '',
  })
  const debouncedFilters = useDebounce(filters, 500)
  const organizedPrograms = organizeProgramsByTaggedAreas(programs)

  const [filteredPrograms, setFilteredPrograms] = useState(organizedPrograms)

  const filterPrograms = () => {
    let result = organizedPrograms

    // if (debouncedFilters.zipCode) {
    //   result = result.filter(
    //     college =>
    //       college.collegeDetails.map.postCode === debouncedFilters.zipCode
    //   )
    // }

    // if (debouncedFilters.county) {
    //   result = result.filter(
    //     college => college.collegeDetails.county === debouncedFilters.county
    //   )
    // }

    // if (debouncedFilters.keyword) {
    //   result = result.filter(college =>
    //     college.title
    //       .toLowerCase()
    //       .includes(debouncedFilters.keyword.toLowerCase())
    //   )
    // }

    // if (debouncedFilters?.orderBy?.order === 'DESC') {
    //   result = result.sort((a, b) => b.title.localeCompare(a.title))
    // } else {
    //   result = result.sort((a, b) => a.title.localeCompare(b.title))
    // }

    setFilteredPrograms(result)
  }

  useEffect(() => {
    filterPrograms()
  }, [debouncedFilters])

  const ctaAttributes = {
    data: {
      cta_copy: programsIndex?.cta?.heading,
      button_link: programsIndex?.cta?.link?.url,
      button_target: programsIndex?.cta?.link?.target,
      button_label: programsIndex?.cta?.link?.title,
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
      seo={programsIndex?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
    >
      <DefaultHero
        heading={programsIndex?.heroTitle}
        description={programsIndex?.heroDescription}
      />
      <div className="flex justify-center gap-x-[15px] bg-grey px-[205px] py-10">
        <select
          className="flex-1 text-darkBeige"
          onChange={e => setFilters({ ...filters, county: e.target.value })}
        >
          <option value="">Degree Type</option>
          {/* {counties.map(county =>
            county !== null ? (
              <option key={county} value={county}>
                {county}
              </option>
            ) : null
          )} */}
        </select>
        <input
          className="text-input"
          type="text"
          placeholder="Search by keyword"
          onChange={e => setFilters({ ...filters, keyword: e.target.value })}
        />
      </div>
      <div className="gap-5 bg-grey px-[100px] py-[10px] ">
        <ProgramsAccordion organizedPrograms={filteredPrograms} />
      </div>
      <CTABanner attributes={ctaAttributes} />
    </Layout>
  )
}

ProgramsArchive.variables = ({ uri }) => {
  return { uri }
}

ProgramsArchive.query = gql`
  ${Header.fragments.entry}
  query ProgramsArchive($uri: ID!) {
    programIndex: page(id: $uri, idType: URI) {
      programsIndex {
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

    programs(where: { orderby: { field: TITLE, order: ASC } }) {
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
        taggedProgramAreas {
          nodes {
            slug
            name
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
