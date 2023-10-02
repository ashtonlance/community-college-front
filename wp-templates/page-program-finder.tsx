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

      const { pathname, query } = router
      const newQuery = {
        ...query,
        ...newFilters,
      }

      const queryString = new URLSearchParams(newQuery)?.toString()

      // window.history.replaceState(null, '', `?${queryString}`)
      router.replace(
        {
          pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true }
      )
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
          result = result.filter(program => {
            const withinRadius = program.colleges.some(college => {
              const collegeLatitude = college.collegeDetails.map.latitude
              const collegeLongitude = college.collegeDetails.map.longitude
              const distance = getDistance(
                { latitude: collegeLatitude, longitude: collegeLongitude },
                coordinates
              )
              const radiusInMeters = inputValuesRef.current.radius * 1609.334
              return distance <= radiusInMeters
            })
            return withinRadius
          })
        }

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
      <div className="flex items-stretch justify-center gap-x-[15px] bg-grey px-[205px] py-10 md:flex-wrap md:px-[60px] sm:px-10">
        <div className="flex flex-1 items-center gap-x-[20px]">
          <label htmlFor="programArea" className="h5 mb-0 whitespace-nowrap">
            I&apos;m Interested In
          </label>
          <select
            id="programArea"
            className="h-full max-w-[229px] text-darkBeige"
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
        <div className="flex flex-1 items-center gap-x-[20px]">
          <label htmlFor="radius" className="h5 mb-0 whitespace-nowrap">
            Within
          </label>
          <select
            id="radius"
            className="h-full w-[200px] text-darkBeige"
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
          </select>
        </div>
        <div className="flex flex-1 items-center gap-x-[20px]">
          <label htmlFor="zipCode" className="h5 mb-0 whitespace-nowrap">
            Of
          </label>
          <input
            id="zipCode"
            className="text-input w-[150px]"
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
            if (inputValues.zipCode.length === 5) {
              const coordinates = await getCoordinates(inputValues.zipCode)
              setZipCodeCoordinates(coordinates)
            }
            handleSetFilters(inputValues)
            setShouldFilter(true)
          }}
          content={'Search'}
          arrow
          classes="primary-btn navy"
          isButton
        />
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
      <div className="grid grid-cols-3 gap-5 bg-white px-[100px] py-[10px] pb-20">
        {filteredPrograms.map((item, index) => (
          <ProgramCard key={index} card={item} index={index} />
        ))}
      </div>
      {/* <CTABanner attributes={ctaAttributes} /> */}
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
