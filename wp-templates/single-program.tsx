import { gql, useQuery } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import Link from 'next/link'

const GET_RELATED_PROGRAMS = gql`
  query GetRelatedPrograms($slug: [String]) {
    relatedPrograms: programs(
      where: {
        orderby: { field: TITLE, order: ASC }
        taxQuery: {
          taxArray: { taxonomy: TAGGEDPROGRAMAREA, terms: $slug, field: SLUG }
        }
      }
    ) {
      nodes {
        title
        uri
        program {
          degreeTypes
        }
      }
    }
  }
`

export default function SingleProgram(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.program
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const slug = pageData?.taggedProgramAreas?.nodes[0]?.slug || []
  const {
    loading,
    error,
    data: relatedPrograms,
  } = useQuery(GET_RELATED_PROGRAMS, {
    variables: { slug },
  })
  if (props.loading) {
    return <>Loading...</>
  }
  return (
    <Layout
      pageClassName="program-area-single-page"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
    >
      <DefaultHero
        heading={pageData?.title}
        bgImg={pageData?.featuredImage?.node?.sourceUrl}
        description={pageData?.program?.description}
      />
      {pageData?.program?.about ? (
        <WYSIWYG
          attributes={{
            data: { content: pageData?.program?.about },
          }}
        />
      ) : null}
      {pageData?.program?.programDetails ? (
        <WYSIWYG
          attributes={{
            data: { content: pageData?.program?.programDetails },
          }}
        />
      ) : null}
      {relatedPrograms?.relatedPrograms?.nodes?.length ? (
        <div className="p-[100px] md:p-[60px] sm:p-[40px] ">
          <h2 className="h3 mb-10 flex items-center gap-3">
            Related Programs{' '}
            <span className="h5 text-darkBeige">{relatedPrograms?.length}</span>
          </h2>
          <ul className="grid grid-cols-5 gap-5 sm:gap-[10px] md:gap-[15px] md:grid-cols-4 sm:grid-cols-2">
            {relatedPrograms?.relatedPrograms?.nodes?.map(program => {
              return (
                <div
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-grey p-5 hover:bg-white hover:outline hover:outline-2 hover:outline-lightBlue"
                  key={program.uri}
                >
                  <Link
                    className="font-condensed text-xl font-bold text-navy tracking-[-0.2px] text-center"
                    href={program.uri}
                  >
                    {program.title}
                  </Link>
                  {(program.program.degreeTypes?.includes(
                    'continuingEducation'
                  ) ||
                    program.program.degreeTypes?.includes(
                      'workforceContinuingEducation'
                    )) && (
                    <div className="tag absolute right-0 top-0 rounded-bl-lg rounded-tr-lg text-darkGrey bg-white group-hover:bg-lightBlue">
                      {program.program.degreeTypes?.includes(
                        'continuingEducation'
                      )
                        ? 'CE'
                        : 'WCE'}
                    </div>
                  )}
                </div>
              )
            })}
          </ul>
        </div>
      ) : null}
    </Layout>
  )
}

SingleProgram.variables = (seedQuery, ctx) => {
  const { databaseId, slug } = seedQuery
  return {
    databaseId,
    slug,
    asPreview: ctx?.asPreview,
  }
}

SingleProgram.query = gql`
  ${Header.fragments.entry}
  query GetProgram($databaseId: ID!) {
    program(id: $databaseId, idType: DATABASE_ID) {
      id
      title
      seo {
        fullHead
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      program {
        about
        degreeTypes
        programDetails
        description
      }
      colleges {
        nodes {
          uri
          title
          slug
        }
      }
      taggedProgramAreas {
        nodes {
          slug
          id
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
