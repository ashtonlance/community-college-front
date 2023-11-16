import { ProgramsAccordion } from '@/components/Accordion/ProgamsAccordion'
import { CTABanner } from '@/components/CTABanner'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { PostFilter } from '@/components/PostFilter'
import { gql } from '@apollo/client'
import { useDebounce } from '@uidotdev/usehooks'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { organizeProgramsByTaggedAreas } from 'utils/programsHelper'

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
  const socialLinks = data?.footer?.prefooter || []
  const databaseId = data?.programIndex?.databaseId || []

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

  const filterPrograms = useCallback(() => {
    let result = { ...organizedPrograms }

    if (debouncedFilters.degreeType) {
      Object.keys(result).forEach(key => {
        result[key].programs = result[key].programs.filter(program => {
          const isFiltered =
            program.program.degreeTypes &&
            program.program.degreeTypes.includes(debouncedFilters.degreeType)
          if (isFiltered) {
          }
          return isFiltered
        })
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

    setFilteredPrograms({ ...result })
  }, [debouncedFilters, organizedPrograms])

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
      type: 'inset',
      hasCard: true,
    },
  }

  const filtersToGenerateDropdown = [
    {
      name: 'degreeType',
      options: degreeTypes,
      type: 'select',
    },
    {
      name: 'keyword',
      type: 'input',
    },
  ]

  if (loading) {
    return <>Loading...</>
  }

  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      seo={data?.programIndex?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
      databaseId={databaseId}
    >
      <DefaultHero
        heading={programsIndex?.heroTitle}
        description={programsIndex?.heroDescription}
      />
      <div className="bg-grey">
        <PostFilter
          filters={filters}
          setFilters={setFilters}
          filtersToGenerateDropdown={filtersToGenerateDropdown}
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

function getFirstPathPart(slug: string | undefined): string {
  if (!slug) {
    return 'students'
  }
  console.log({ slug })
  const parts = slug.split('/')
  console.log(parts[1], 'parts 1')

  if (parts.length > 0 && parts[1] === 'about-us') {
    return 'system-office'
  }

  if (parts.length > 0 && parts[1] === 'college-faculty-staff') {
    return 'college-faculty-and-staff'
  }

  return parts.length > 0 ? parts[1] : 'students'
}

ProgramsArchive.variables = (props, ctx) => {
  const { databaseId } = props
  let { uri } = props
  let slug = getFirstPathPart(uri)
  return {
    databaseId,
    slug,
    uri,
    asPreview: ctx?.asPreview,
  }
}

ProgramsArchive.query = gql`
  ${Header.fragments.entry}
  query ProgramsArchive($uri: ID!, $slug: ID!) {
    programIndex: page(id: $uri, idType: URI) {
      databaseId
      seo {
        fullHead
        title
      }
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

    menu(id: $slug, idType: SLUG) {
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
