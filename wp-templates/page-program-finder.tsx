import { Button } from '@/components/Button'
import { CTABanner } from '@/components/CTABanner'
import { ProgramCard } from '@/components/Cards/ProgramCard'
import { ProgramFinderHero } from '@/components/Hero/ProgramFinderHero'
import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { getDistance } from 'geolib'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { capitalize, organizeProgramsByTaggedAreas } from 'utils/programsHelper'

const getCoordinates = async (zipCode: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.NEXT_PUBLIC_GEOCODE_KEY}`
    )
    const data = await response.json()
    const usLocation = data?.results.find((result: any) =>
      result.formatted_address.includes('USA')
    )
    console.log({ usLocation })
    return {
      latitude: usLocation?.geometry?.location?.lat,
      longitude: usLocation?.geometry?.location?.lng,
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    return null
  }
}

export const ProgramFinder = props => {
  const { data, loading } = props
  const router = useRouter()
  const { isReady } = router
  const socialLinks = data?.footer?.prefooter || []
  const databaseId = data?.page?.databaseId

  const menuItems = useMemo(
    () => flatListToHierarchical(data?.menu?.menuItems) || [],
    [data?.menu?.menuItems]
  )
  const programFinderIndex = useMemo(
    () => data?.programFinderIndex || [],
    [data?.programFinderIndex]
  )
  const footerMenuItems = useMemo(
    () => flatListToHierarchical(data?.footer?.menuItems) || [],
    [data?.footer?.menuItems]
  )
  const utilityNavigation = useMemo(
    () => data?.settings?.utilityNavigation?.navigationItems || [],
    [data?.settings?.utilityNavigation?.navigationItems]
  )
  const settings = useMemo(
    () => data?.settings?.siteSettings || [],
    [data?.settings?.siteSettings]
  )

  const programs = useMemo(
    () => data?.programs?.nodes || [],
    [data?.programs?.nodes]
  )
  const colleges = useMemo(
    () => data?.colleges?.nodes || [],
    [data?.colleges?.nodes]
  )

  const combined = useMemo(() => {
    return programs.map(program => {
      const matchedColleges = colleges.filter(college =>
        program.colleges.nodes.some(node => node.slug === college.slug)
      )

      return {
        ...program,
        colleges: matchedColleges,
      }
    })
  }, [programs, colleges])

  const [inputValues, setInputValues] = useState(() => ({
    programArea: router.query.programArea || '',
    radius: router.query.radius || '',
    zipCode: router.query.zipCode || '',
  }))

  const [zipCodeCoordinates, setZipCodeCoordinates] = useState(null)
  const [filteredPrograms, setFilteredPrograms] = useState([])
  const [shouldFilter, setShouldFilter] = useState(false)
  const [isFromWidget, setIsFromWidget] = useState(false)
  const [closestCollege, setClosestCollege] = useState(null)
  const [closestDistance, setClosestDistance] = useState<number | null>(null)
  const inputValuesRef = useRef(inputValues)

  useEffect(() => {
    inputValuesRef.current = inputValues
  }, [inputValues])

  const organizedPrograms = useMemo(
    () => organizeProgramsByTaggedAreas(programs),
    [programs]
  )

  const handleSetFilters = useCallback(
    newFilters => {
      setInputValues(newFilters)

      const { page, wordpressNode, ...rest } = router.query
      const newQuery = {
        ...rest,
        ...newFilters,
      }

      const queryString = new URLSearchParams(newQuery)
      if (queryString) {
        window.history.pushState(null, '', `?${queryString.toString()}`)
      }
    },
    [router.query]
  )

  const filterColleges = useCallback(
    coordinates => {
      if (shouldFilter && coordinates) {
        let result = [...combined] // Use the combined list instead of colleges
        let closestCollege = null
        let closestDistance = Infinity

        if (inputValuesRef.current.programArea) {
          result = result.filter(program => {
            return program.taggedProgramAreas.nodes.some(
              node => node.name === inputValuesRef.current.programArea
            )
          })
        }

        if (
          inputValuesRef.current.zipCode &&
          inputValuesRef.current.radius &&
          inputValuesRef.current.zipCode.length === 5 &&
          coordinates
        ) {
          result = result
            .map(program => {
              const colleges = program.colleges
                .map(college => {
                  const collegeLatitude = college.collegeDetails.map.latitude
                  const collegeLongitude = college.collegeDetails.map.longitude
                  const distance = getDistance(
                    { latitude: collegeLatitude, longitude: collegeLongitude },
                    coordinates
                  )
                  const radiusInMeters =
                    inputValuesRef.current.radius * 1609.334
                  const withinRadius = distance <= radiusInMeters

                  if (distance < closestDistance) {
                    closestDistance = distance
                    closestCollege = college
                    setClosestDistance(distance / 1609.334) // Convert distance to miles
                  }

                  return {
                    ...college,
                    distance: distance / 1609.334, // Convert distance to miles
                    withinRadius,
                  }
                })
                .filter(college => college.withinRadius)
                .sort((a, b) => a.distance - b.distance) // Sort colleges by distance

              return {
                ...program,
                colleges,
              }
            })
            .filter(program => program.colleges.length > 0)
        }
        setFilteredPrograms([...result])
        setClosestCollege(closestCollege)
        setShouldFilter(false)
        if (!result.length) {
          setShouldFilter(true)
        }
      } else {
        throw new Error('Missing coordinates')
      }
    },
    [combined, shouldFilter]
  )

  useEffect(() => {
    if (shouldFilter && zipCodeCoordinates) {
      filterColleges(zipCodeCoordinates)
    }
  }, [shouldFilter, zipCodeCoordinates, filterColleges])

  useEffect(() => {
    const { programArea, radius, zipCode } = router.query
    const newValues = {
      programArea: programArea,
      radius: radius,
      zipCode: zipCode,
    }
    setInputValues(newValues)
  }, [router.query])

  useEffect(() => {
    if (isReady) {
      const {
        programArea = '',
        radius = '',
        zipCode = '',
        widget = false,
      } = router.query
      const newValues = {
        programArea: programArea,
        radius: radius,
        zipCode: zipCode,
      }
      const fetchCoordinates = async (programArea, radius, zipCode, widget) => {
        if (widget === 'true') {
          if (programArea && radius && zipCode) {
            setInputValues(newValues)
            if (zipCode.length === 5) {
              const coordinates = await getCoordinates(zipCode)
              setZipCodeCoordinates(coordinates)
            }
            handleSetFilters(newValues)
            setShouldFilter(true)
          } else {
            // If other query parameters are empty, set all programs as filteredPrograms
            setIsFromWidget(true)
          }
        }
      }
      fetchCoordinates(programArea, radius, zipCode, widget)
    }
  }, [isReady, handleSetFilters, programs, router.query])

  const ctaAttributes = {
    data: {
      cta_copy: programFinderIndex?.programFinderDetails?.cta?.heading,
      button_link: programFinderIndex?.programFinderDetails?.cta?.link?.url,
      button_target:
        programFinderIndex?.programFinderDetails?.cta?.link?.target,
      button_label: programFinderIndex?.programFinderDetails?.cta?.link?.title,
      background_color: 'gold',
      type: 'inset',
      hasCard: true,
    },
  }

  return (
    <Layout
      pageClassName="program-finder-page"
      menuItems={menuItems}
      seo={programFinderIndex?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={footerMenuItems}
      settings={settings}
      socialLinks={socialLinks}
      databaseId={databaseId}
    >
      <ProgramFinderHero
        heading={programFinderIndex?.programFinderDetails?.title}
        description={programFinderIndex?.programFinderDetails?.description}
      />
      <div className="bg-grey">
        <div className="wrapper-default-inner-pages mx-auto flex items-stretch justify-center gap-[15px] py-10 md:flex-wrap md:pb-8 md:pt-5 sm:pt-[10px]">
          <div className="flex flex-1 basis-full items-center gap-x-[20px] md:flex-wrap">
            <label
              htmlFor="programArea"
              className="h5 mb-0 whitespace-nowrap md:mx-auto md:mb-3 md:text-center"
            >
              I&apos;m Interested In
            </label>
            <select
              id="programArea"
              className="h-[52px] w-[229px] text-darkBeige  md:w-full sm:h-auto"
              value={inputValues.programArea}
              onChange={e =>
                setInputValues({ ...inputValues, programArea: e.target.value })
              }
            >
              <option value="">Program Areas</option>
              {Object.keys(organizedPrograms).map((key, i) => (
                <option key={i} value={key}>
                  {capitalize(key)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 items-center gap-x-[20px] md:basis-full md:flex-wrap">
            <label
              htmlFor="radius"
              className="h5 mb-0 whitespace-nowrap md:mx-auto md:mb-3 md:w-full md:text-center"
            >
              Within
            </label>
            <select
              id="radius"
              className="h-full w-[200px] text-darkBeige md:h-auto md:w-full"
              value={inputValues.radius}
              onChange={e =>
                setInputValues({ ...inputValues, radius: e.target.value })
              }
            >
              <option value="">Mile Radius</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex flex-1 items-center gap-x-[20px] md:basis-full md:flex-wrap">
            <label
              htmlFor="zipCode"
              className="h5 mb-0 whitespace-nowrap md:mx-auto md:mb-3 md:w-full md:text-center"
            >
              Of
            </label>
            <input
              id="zipCode"
              className="text-input w-[150px] sm:h-auto sm:w-full"
              type="text"
              pattern="[0-9]*"
              placeholder="Zip Code"
              value={inputValues.zipCode ?? ''}
              onChange={e =>
                setInputValues({ ...inputValues, zipCode: e.target.value })
              }
            />
          </div>
          <Button
            onClick={async () => {
              if (inputValues?.zipCode?.length === 5) {
                const coordinates = await getCoordinates(inputValues.zipCode)
                setZipCodeCoordinates(coordinates)
              }
              handleSetFilters(inputValues)
              setShouldFilter(true)
            }}
            content={'Search'}
            arrow
            classes="primary-btn navy sm:basis-full"
            isButton
          />
        </div>
      </div>
      {filteredPrograms.length > 0 ? (
        <div className="flex items-center justify-center bg-grey px-[205px] py-[60px] text-center md:px-[60px] md:py-10 sm:px-10 sm:py-5">
          <div className="h2 mb-0">
            {'Showing '}
            {filteredPrograms.length}{' '}
            {filteredPrograms.length === 1 ? 'Result' : 'Results'}
          </div>
        </div>
      ) : shouldFilter ? (
        <div className="flex items-center justify-center bg-grey px-[205px] py-[60px] text-center md:px-[60px] md:py-10 sm:px-10 sm:py-5">
          <div className="flex flex-col gap-6 sm:gap-5">
            <div className="h2 mb-0">
              No results found within the selected radius.
            </div>
            {closestCollege && (
              <p>
                The closest college is {closestCollege?.title} at{' '}
                {Math.ceil(closestDistance)} miles away.
              </p>
            )}
            <p>Please adjust your selected filter and try again.</p>
          </div>
        </div>
      ) : isFromWidget ? (
        <div className="flex items-center justify-center bg-grey px-[205px] py-[60px] text-center md:px-[60px] md:py-10 sm:px-10 sm:py-5">
          <div className="flex flex-col gap-6 sm:gap-5">
            <div className="h2 mb-0">No filters selected.</div>
            <p>Please use the filters above.</p>
            <Button
              content="See All Programs"
              linkto={'/students/what-we-offer/programs/'}
              classes="primary-btn gold mx-auto"
            />
          </div>
        </div>
      ) : null}
      <div className=" bg-grey">
        <div className="mx-auto grid max-w-[1440px] grid-cols-3 gap-5 px-[100px] pb-20 pt-0 md:grid-cols-2 md:px-[60x] sm:grid-cols-1 sm:px-[40px]">
          {filteredPrograms.map((item, index) => (
            <ProgramCard key={index} card={item} index={index} />
          ))}
        </div>
      </div>
      <CTABanner attributes={ctaAttributes} />
    </Layout>
  )
}

ProgramFinder.variables = ({ uri }) => {
  return { uri }
}

ProgramFinder.query = gql`
  ${Header.fragments.entry}
  query ProgramFinder($uri: ID!) {
    programFinderIndex: page(id: $uri, idType: URI) {
      databaseId
      seo {
        fullHead
        title
      }
      programFinderDetails {
        title
        description
        cta {
          heading
          link {
            target
            title
            url
          }
        }
      }
    }

    colleges(where: { orderby: { field: TITLE, order: ASC } }, first: 100) {
      nodes {
        title
        uri
        slug
        featuredImage {
          node {
            sourceUrl
          }
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
          description
          about
        }
        colleges(first: 100) {
          nodes {
            slug
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

export default ProgramFinder
