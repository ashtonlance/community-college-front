import { DefaultHero } from '@/components/Hero/DefaultHero'
import { WYSIWYG } from '@/components/WYSIWYG'
import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import Link from 'next/link'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import bgFlip from '/assets/imgs/angled-bg-defaultHero-flip.png'
import Image from 'next/image'

export default function SingleProgramArea(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.programArea
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const relatedPrograms = props.data?.relatedPrograms?.nodes || []
  const socialLinks = props.data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

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
      databaseId={databaseId}
    >
      <DefaultHero
        smallHeading={true}
        heading={pageData?.title}
        bgImg={pageData?.featuredImage?.node?.sourceUrl}
        description={pageData?.programAreaDetails?.description}
        type="program-area"
      />
      {pageData?.programAreaDetails?.about ? (
        <WYSIWYG
          attributes={{
            data: { 
              content: pageData?.programAreaDetails?.about,
              background_color: 'grey'
            },
          }}
        />
      ) : null}
      {relatedPrograms?.length ? (
        <div className="relative">
          <Image
            src={bgFlip.src}
            fill
            alt="background"
            className="object-fill !h-auto bottom-0 max-h-full z-[-1]"
          />
          <div className="p-[100px] md:p-[60px] sm:p-[40px] ">
            <h2 className="h3 mb-10 flex items-center gap-3">
              Programs in This Program Area{' '}
              <span className="h5 text-darkBeige">{relatedPrograms?.length}</span>
            </h2>
            <ul className="grid grid-cols-5 gap-5 md:grid-cols-4 md:gap-[15px] sm:grid-cols-2 sm:gap-[10px]">
              {relatedPrograms.map(program => {
                return (
                  <div
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-grey p-5 hover:bg-white hover:outline hover:outline-2 hover:outline-lightBlue"
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
        </div>
      ) : null}
    </Layout>
  )
}

SingleProgramArea.variables = ({ databaseId, slug }, ctx) => {
  console.log({ slug })
  return {
    databaseId,
    slug,
    asPreview: ctx?.asPreview,
  }
}

SingleProgramArea.query = gql`
  ${Header.fragments.entry}
  query GetProgramArea($databaseId: ID!, $slug: [String]) {
    programArea(id: $databaseId, idType: DATABASE_ID) {
      id
      databaseId
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
      programAreaDetails {
        about
        description
      }
    }

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
