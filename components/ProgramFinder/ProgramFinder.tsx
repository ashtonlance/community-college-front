import { Button } from '@/components/Button'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useState, useEffect, useRef } from 'react'
import bg from '/public/angles/angled-bg_finder_grey.jpg'
import { usePlacesWidget } from "react-google-autocomplete";

const GET_PROGRAM_AREAS = gql`
  query GetPrograms {
    programAreas(first: 50, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        title
      }
    }
  }
`

export const ProgramFinderForm = ({ heading = '' }) => {
  const { data } = useQuery(GET_PROGRAM_AREAS, {
    context: {
      fetchOptions: {
        method: 'GET',
      },
    },
  })
  const router = useRouter()

  const [inputValues, setInputValues] = useState({
    programArea: '',
    radius: '',
    address: '',
  })

  const inputValuesRef = useRef(inputValues)

  useEffect(() => {
    inputValuesRef.current = inputValues
  }, [inputValues])

  const { ref: autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GEOCODE_KEY,
    options: {
      types: [],
      fields: ["formatted_address"],
      componentRestrictions: { country: "us" },
    },
    onPlaceSelected: (place) => {
      if (place?.formatted_address) {
        setInputValues({ ...inputValuesRef.current, address: place.formatted_address });
      }
    }
  });

  const programAreas = data?.programAreas?.nodes || [
    {
      __typename: 'ProgramArea',
      title: 'Animals & Environment',
    },
    {
      __typename: 'ProgramArea',
      title: 'Arts & Media',
    },
    {
      __typename: 'ProgramArea',
      title: 'Beauty & Personal Care',
    },
    {
      __typename: 'ProgramArea',
      title: 'Business & Leadership',
    },
    {
      __typename: 'ProgramArea',
      title: 'College Entrance Prep',
    },
    {
      __typename: 'ProgramArea',
      title: 'Dual Enrollment (CCP)',
    },
    {
      __typename: 'ProgramArea',
      title: 'Education & Teaching',
    },
    {
      __typename: 'ProgramArea',
      title: 'Engineering & Construction',
    },
    {
      __typename: 'ProgramArea',
      title: 'Finish High School',
    },
    {
      __typename: 'ProgramArea',
      title: 'Healthcare & Medicine',
    },
    {
      __typename: 'ProgramArea',
      title: 'Hospitality & Food',
    },
    {
      __typename: 'ProgramArea',
      title: 'Languages',
    },
    {
      __typename: 'ProgramArea',
      title: 'Law & Public Safety',
    },
    {
      __typename: 'ProgramArea',
      title: 'Science & Research',
    },
    {
      __typename: 'ProgramArea',
      title: 'Sports & Recreation',
    },
    {
      __typename: 'ProgramArea',
      title: 'Tech & Computers',
    },
    {
      __typename: 'ProgramArea',
      title: 'Trades & Mechanics',
    },
    {
      __typename: 'ProgramArea',
      title: 'Transport & Logistics',
    },
    {
      __typename: 'ProgramArea',
      title: 'University Transfer',
    },
  ]

  const handleSubmit = useCallback(() => {
    const queryString = new URLSearchParams(inputValues).toString()
    router.push(
      `/students/what-we-offer/program-finder?${queryString}&widget=true`
    )
  }, [inputValues, router])

  return (
    <div className="relative z-10 mx-auto -mt-[290px] flex max-w-[1030px] flex-wrap items-stretch justify-center sm:gap-[12px] gap-5 rounded-lg bg-grey md:-mt-[9%] md:max-w-[90%] sm:px-8 md:px-[60px] md:pt-[53px] pt-[73px] px-[100px] sm:pb-[40px] md:pb-[60px] pb-[80px]">
       <Image
         src={bg.src}
         alt=""
         className="-z-10 object-cover object-bottom rounded-lg"
         fill
         sizes="100vw"
       />
      <div className="absolute text-navy md:text-[11px] text-[12px] font-sans font-bold top-0 px-[14px] py-[6px] bg-gold rounded-b-[8px]">Program Finder</div>
      <div className="sm:mb-[30px] md:mb-[14px] mb-5 flex-1 basis-full text-center">
        <span className="h2 mb-0">{heading}</span>
      </div>
      <div className="flex flex-1 basis-full items-center gap-x-[20px] sm:flex-col sm:gap-y-[12px]">
        <label htmlFor="programArea" className="h5 mb-0 whitespace-nowrap">
          I&apos;m Interested In
        </label>
        <select
          id="programArea"
          className="h-[52px] w-full text-darkBeige"
          value={inputValues.programArea}
          onChange={e =>
            setInputValues({ ...inputValues, programArea: e.target.value })
          }
        >
          <option value="">Program Areas</option>
          {programAreas.map((program: any, i) => {
            const excludedProgramAreas = [
              'Dual Enrollment (CCP)',
              'College Entrance Prep',
              'Finish High School',
              'Sports & Recreation',
            ]
            if (excludedProgramAreas.includes(program?.title)) return null
            return (
              <option key={i} value={program?.title}>
                {program?.title}
              </option>
            )
          })}
        </select>
      </div>
      <div className="flex flex-1 basis-[calc(35%-20px)] items-center gap-x-[20px] sm:basis-full mdsm:basis-full md:basis-[14rem] sm:flex-col sm:gap-y-[12px]">
      {/* mdsm:basis-full md:basis-[12rem]  */}
        <label htmlFor="radius" className="h5 mb-0 whitespace-nowrap">
          Within
        </label>
        <select
          id="radius"
          className="h-full w-full text-darkBeige"
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
      <div className="flex flex-1 basis-[calc(65%-20px)] items-center gap-x-[20px] sm:basis-full sm:flex-col sm:gap-y-[12px]">
        <label htmlFor="address" className="h5 mb-0 whitespace-nowrap">
          Of
        </label>
        <input
          id="address"
          className="text-input w-[150px] sm:w-full rounded-[8px]"
          type="text"
          pattern="[0-9]*"
          placeholder="111 Example Lane, Ste 3, Greensboro, NC 27410"
          value={inputValues.address}
          ref={autocompleteRef}
          onChange={e =>
            setInputValues({ ...inputValues, address: e.target.value })
          }
        />
      </div>
      <div className="basis-[100%] flex items-center justify-center">
        <Button
          onClick={handleSubmit}
          content={'Search Programs'}
          arrow
          classes="primary-btn navy sm:mt-6 mt-5"
          isButton
        />
      </div>
    </div>
  )
}
