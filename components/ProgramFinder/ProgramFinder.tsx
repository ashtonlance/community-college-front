import { useState, useCallback } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { Button } from '@/components/Button'
import bg from '/public/angles/angled-bg_finder_grey.jpg'

const GET_PROGRAM_AREAS = gql`
  query GetPrograms {
    programAreas(first: 50, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        title
      }
    }
  }
`

export const ProgramFinderForm = () => {
  const { data } = useQuery(GET_PROGRAM_AREAS)
  const router = useRouter()

  const [inputValues, setInputValues] = useState({
    programArea: '',
    radius: '',
    zipCode: '',
  })

  const programAreas = data?.programAreas?.nodes || []

  const handleSubmit = useCallback(() => {
    const queryString = new URLSearchParams(inputValues).toString()
    router.push(
      `/students/what-we-offer/program-finder?${queryString}&widget=true`
    )
  }, [inputValues, router])

  return (
    <div
      className="relative z-10 mx-auto -mt-[290px] flex max-w-[1030px] flex-wrap items-stretch justify-center gap-5 gap-x-[15px] rounded-lg bg-grey px-[100px] py-20 md:-mt-[9%] md:max-w-[90%] md:p-8"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
    >
      <div className="mb-10 flex-1 basis-full text-center">
        <span className="h2 mb-0">Discover your new career</span>
      </div>
      <div className="flex flex-1 basis-full items-center gap-x-[20px]">
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
      <div className="flex flex-1 basis-[48%] items-center gap-x-[20px]">
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
        </select>
      </div>
      <div className="flex flex-1 basis-[48%] items-center gap-x-[20px]">
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
        onClick={handleSubmit}
        content={'Search Programs'}
        arrow
        classes="primary-btn navy mt-10"
        isButton
      />
    </div>
  )
}
