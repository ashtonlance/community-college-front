import { DefaultHero } from '@/components/Hero/DefaultHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql, useQuery } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import Link from 'next/link'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { unslugify } from 'utils/unslugify'
import bgFlip from '/assets/imgs/angled-bg-defaultHero-flip.png'
import bg from '/assets/imgs/angled-bg-defaultHero.png'

const GET_RELATED_PROGRAMS = gql`
  query GetRelatedPrograms($slug: [String]) {
    relatedPrograms: programs(
      first: 100
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
  const socialLinks = props.data?.footer?.prefooter || []

  const { data: relatedPrograms } = useQuery(GET_RELATED_PROGRAMS, {
    variables: { slug },
    context: {
      fetchOptions: {
        method: 'GET',
      },
    },
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
      socialLinks={socialLinks}
    >
      <DefaultHero
        smallHeading={true}
        heading={pageData?.title}
        bgImg={pageData?.featuredImage?.node?.sourceUrl}
        description={pageData?.program?.description}
      />
      {pageData?.program?.about ? (
        <div>
          <WYSIWYG
            attributes={{
              data: {
                content: pageData?.program?.about,
                background_color: 'grey',
              },
            }}
          />
        </div>
      ) : null}
      {pageData?.program?.programDetails ? (
        <div
          style={{
            backgroundImage: `url(${bgFlip.src})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
          }}
        >
          <WYSIWYG
            attributes={{
              data: { content: pageData?.program?.programDetails },
            }}
          />
        </div>
      ) : null}
      {pageData?.colleges?.nodes?.length ? (
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div
            className={`module-spacing-bottom-none module-spacing-top-none mx-auto flex w-[90%] max-w-[1220px] justify-between gap-[20px] md:flex-col`}
          >
            <div className="mx-auto flex max-w-[1030px] grow flex-col gap-[10px] rounded-xl border border-lightBlue p-[40px]">
              <h3 className="h5 mb-[32px] font-extrabold">
                Colleges That Offer This Program
              </h3>
              <div
                className={`grid grid-flow-row gap-[5px] ${
                  pageData?.colleges?.nodes?.length <= 3
                    ? 'grid-cols-1'
                    : 'grid-cols-3'
                } sm:flex sm:flex-col`}
              >
                {pageData?.colleges?.nodes?.map(college => {
                  return (
                    <Link
                      className="sub-nav has-arrow body-regular col-span-1 mb-[12px] max-w-fit font-normal text-darkGrey hover:text-navy"
                      key={college?.uri}
                      href={college?.uri ?? ''}
                    >
                      {unslugify(college?.slug)}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {relatedPrograms?.relatedPrograms?.nodes?.length ? (
        <div className="bg-grey p-[100px] md:p-[60px] sm:p-[40px]">
          <h2 className="h3 mb-10 flex items-center gap-3">
            Related Programs{' '}
            <span className="h5 text-darkBeige">{relatedPrograms?.length}</span>
          </h2>
          <ul className="grid grid-cols-5 gap-5 md:grid-cols-4 md:gap-[15px] sm:grid-cols-2 sm:gap-[10px]">
            {relatedPrograms?.relatedPrograms?.nodes?.map(program => {
              return (
                <div
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-white p-5 hover:bg-white hover:outline hover:outline-2 hover:outline-lightBlue"
                  key={program.uri}
                >
                  <Link
                    className="text-center font-condensed text-xl font-bold tracking-[-0.2px] text-navy"
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
                    <div className="tag absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-white text-darkGrey group-hover:bg-lightBlue">
                      {program.program.degreeTypes?.includes(
                        'continuingEducation'
                      )
                        ? 'WCE'
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
        title
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
      colleges(first: 60) {
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
