import { CTABanner } from '@/components/CTABanner'
import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { capitalize, organizeProgramsByTaggedAreas } from 'utils/programsHelper'
import { ProgramFinderHero } from '@/components/Hero/ProgramFinderHero'
import { Button } from '@/components/Button'
import { getDistance } from 'geolib'
import { useRouter } from 'next/router'
import { ProgramCard } from '@/components/Cards'

const getCoordinates = async zipCode => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.NEXT_PUBLIC_GEOCODE_KEY}`
    )
    const data = await response.json()
    return {
      latitude: data?.results[0]?.geometry?.location?.lat,
      longitude: data?.results[0]?.geometry?.location?.lng,
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    return null
  }
}

export const ProgramFinder = props => {
  const { data, loading } = props
  const router = useRouter()
  const { isReady, query } = useRouter()
  const params = query?.params || []
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
        window.history.replaceState(null, '', `?${queryString.toString()}`)
      }
    },
    [router.query]
  )

  const filterColleges = useCallback(
    coordinates => {
      if (shouldFilter && coordinates) {
        let result = combined // Use the combined list instead of colleges

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

        console.log(result, 'result')
        setFilteredPrograms(result)
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
      const { programArea, radius, zipCode, widget } = router.query
      const newValues = {
        programArea: programArea,
        radius: radius,
        zipCode: zipCode,
      }
      const fetchCoordinates = async (programArea, radius, zipCode, widget) => {
        if (programArea && radius && zipCode && widget === 'true') {
          setInputValues(newValues)
          if (zipCode.length === 5) {
            const coordinates = await getCoordinates(zipCode)
            setZipCodeCoordinates(coordinates)
          }
          handleSetFilters(newValues)
          setShouldFilter(true)
        }
      }
      fetchCoordinates(programArea, radius, zipCode, widget)
    }
  }, [isReady])

  const ctaAttributes = {
    data: {
      cta_copy: programFinderIndex?.programFinderDetails?.cta?.heading,
      button_link: programFinderIndex?.programFinderDetails?.cta?.link?.url,
      button_target:
        programFinderIndex?.programFinderDetails?.cta?.link?.target,
      button_label: programFinderIndex?.programFinderDetails?.cta?.link?.title,
      background_color: 'gold',
      type: 'fullWidth',
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
    >
      <ProgramFinderHero
        heading={programFinderIndex?.programFinderDetails?.title}
        description={programFinderIndex?.programFinderDetails?.description}
      />
      <div className="bg-grey">
        <div className="wrapper-default-inner-pages mx-auto flex items-stretch justify-center gap-[15px] pt-0 md:flex-wrap">
          <div className="flex flex-1 basis-full items-center gap-x-[20px] sm:flex-wrap">
            <label
              htmlFor="programArea"
              className="h5 mb-0 whitespace-nowrap sm:mx-auto sm:mb-3 sm:text-center"
            >
              I&apos;m Interested In
            </label>
            <select
              id="programArea"
              className="h-[52px] w-[229px] text-darkBeige  sm:h-auto sm:w-full"
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
          <div className="flex flex-1 items-center gap-x-[20px] sm:basis-full sm:flex-wrap">
            <label
              htmlFor="radius"
              className="h5 mb-0 whitespace-nowrap sm:mx-auto sm:mb-3 sm:w-full sm:text-center"
            >
              Within
            </label>
            <select
              id="radius"
              className="h-full w-[200px] text-darkBeige sm:h-auto sm:w-full"
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
          <div className="flex flex-1 items-center gap-x-[20px] sm:basis-full sm:flex-wrap">
            <label
              htmlFor="zipCode"
              className="h5 mb-0 whitespace-nowrap sm:mx-auto sm:mb-3 sm:w-full sm:text-center"
            >
              Of
            </label>
            <input
              id="zipCode"
              className="text-input w-[150px] sm:h-auto sm:w-full"
              type="text"
              pattern="[0-9]*"
              placeholder="Zip Code"
              value={inputValues.zipCode}
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
        <div className="flex items-center justify-center px-[205px] py-10 md:px-[60px] sm:px-10">
          <div className="h4 mb-0">
            {'Showing '}
            {filteredPrograms.length}{' '}
            {filteredPrograms.length === 1 ? 'Result' : 'Results'}
          </div>
        </div>
      ) : (
        shouldFilter && (
          <div className="flex items-center justify-center px-[205px] py-10 md:px-[60px] sm:px-10">
            <div className="h4 mb-0">No Results found</div>
          </div>
        )
      )}
      <div className=" bg-white">
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

    colleges(where: { orderby: { field: TITLE, order: ASC } }, first: 60) {
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
        }
        colleges {
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
