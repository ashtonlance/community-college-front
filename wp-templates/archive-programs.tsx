import { CTABanner } from '@/components/CTABanner'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useMemo, useState, useEffect } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { useDebounce } from '@uidotdev/usehooks'
import { ProgramsAccordion } from '@/components/Accordion/ProgamsAccordion'
import { capitalize, organizeProgramsByTaggedAreas } from 'utils/programsHelper'

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
  uri: string
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
  program: {
    about: string
    degreeTypes: string[]
    title: string
  }
}

export default function ProgramsArchive(props: ProgramsIndexProps) {
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

  const degreeTypes = useMemo(() => {
    const degreeTypesSet = new Set(
      programs.reduce((acc: string[], program: Program) => {
        if (program.program && program.program.degreeTypes) {
          return [...acc, ...program.program.degreeTypes]
        }
        return acc
      }, [])
    )

    // Convert the Set back to an array and sort it
    const sortedDegreeTypes = Array.from(degreeTypesSet).sort()

    return sortedDegreeTypes
  }, [programs])

  const [filters, setFilters] = useState({
    degreeType: '',
    keyword: '',
  })
  const debouncedFilters = useDebounce(filters, 500)
  const organizedPrograms = organizeProgramsByTaggedAreas(programs)
  const [filteredPrograms, setFilteredPrograms] = useState(organizedPrograms)

  const filterPrograms = () => {
    let result = organizedPrograms

    if (debouncedFilters.degreeType) {
      Object.keys(result).forEach(key => {
        result[key].programs = result[key].programs.filter(
          program =>
            program.program.degreeTypes &&
            program.program.degreeTypes.includes(debouncedFilters.degreeType)
        )
      })
    }

    if (debouncedFilters.keyword) {
      Object.keys(result).forEach(key => {
        result[key].programs = result[key].programs.filter(program =>
          program.title
            .toLowerCase()
            .includes(debouncedFilters.keyword.toLowerCase())
        )
      })
    }

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
      <div className="wrapper-default-inner-pages flex flex-wrap justify-center gap-[15px] bg-grey">
        <select
          className="max-w-full flex-1 text-darkBeige"
          onChange={e => setFilters({ ...filters, degreeType: e.target.value })}
        >
          <option value="">Degree Type</option>

          {degreeTypes.map((type, i) =>
            type !== null ? (
              <option key={i} value={type}>
                {capitalize(type)}
              </option>
            ) : null
          )}
        </select>
        <input
          className="text-input"
          type="text"
          placeholder="Search by keyword"
          onChange={e => setFilters({ ...filters, keyword: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-center bg-grey">
        <div>
          <span className="rounded-lg bg-white p-[6px] text-xs font-extrabold text-darkGrey">
            WCE
          </span>{' '}
          ={' '}
          <span className="text-sm text-darkBeige">
            Workforce Continuing Education
          </span>
        </div>
      </div>
      <div className="gap-5 bg-grey px-[100px] py-[10px] md:px-[60px] sm:px-10 ">
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

    programs(first: 500, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        title
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        taggedProgramAreas {
          nodes {
            uri
            name
          }
        }
        program {
          degreeTypes
          title
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
