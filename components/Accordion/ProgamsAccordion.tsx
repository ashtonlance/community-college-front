import {
  Accordion,
  ProgramsAccordionContent,
  ProgramsAccordionItem,
  ProgramsAccordionTrigger,
} from './AccordionInternal'
import Link from 'next/link'

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
    nodes: {
      slug: string
      name: string
    }[]
  }
  program: {
    about: string
    degreeTypes: string[]
    title: string
  }
}

type OrganizedPrograms = {
  [key: string]: {
    programs: Program[]
    slug: string
    uri: string
  }
}

type ProgramsAccordionProps = {
  organizedPrograms: OrganizedPrograms
}

export const ProgramsAccordion: React.FC<ProgramsAccordionProps> = ({
  organizedPrograms,
}) => {
  console.log(organizedPrograms)
  const accordionItems = organizedPrograms
    ? Object.entries(organizedPrograms).map(([programArea, data], i) => {
        return (
          <ProgramsAccordionItem key={`item-${i}`} value={`item-${i}`}>
            <ProgramsAccordionTrigger disabled={!data?.programs?.length}>
              <Link
                href={data?.uri || ''}
                className={`flex items-center gap-x-3 text-left hover:text-darkBeige md:mr-4`}
              >
                {programArea}
                <span className="h5 text-darkBeige">
                  {data?.programs?.length}
                </span>
              </Link>
            </ProgramsAccordionTrigger>
            <ProgramsAccordionContent>
              {data.programs.map(program => {
                return (
                  <div
                    className="grid w-full grid-cols-5 gap-5 pl-[4px] md:grid-cols-4 md:gap-[15px] sm:grid-cols-2 sm:gap-[10px]"
                    key={program.uri}
                  >
                    <div
                      className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-white p-5 hover:outline hover:outline-2 hover:outline-lightBlue"
                      key={program.uri}
                    >
                      <Link href={program.uri}>{program.title}</Link>
                      {(program.program.degreeTypes?.includes(
                        'continuingEducation'
                      ) ||
                        program.program.degreeTypes?.includes(
                          'workforceContinuingEducation'
                        )) && (
                        <div className="tag absolute right-0 top-0 rounded bg-grey group-hover:bg-lightBlue">
                          {program.program.degreeTypes?.includes(
                            'continuingEducation'
                          )
                            ? 'CE'
                            : 'WCE'}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </ProgramsAccordionContent>
          </ProgramsAccordionItem>
        )
      })
    : []

  return (
    <div className={`bg-grey`}>
      <div className={`module-spacing-top-medium module-spacing-bottom-medium`}>
        <Accordion type="single" collapsible>
          {accordionItems}
        </Accordion>
      </div>
    </div>
  )
}
