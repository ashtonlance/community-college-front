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
}

type OrganizedPrograms = {
  [key: string]: {
    programs: Program[]
    slug: string
  }
}

type ProgramsAccordionProps = {
  organizedPrograms: OrganizedPrograms
}

export const ProgramsAccordion: React.FC<ProgramsAccordionProps> = ({
  organizedPrograms,
}) => {
  console.log(organizedPrograms, 'organizedPrograms')
  const accordionItems = organizedPrograms
    ? Object.entries(organizedPrograms).map(([programArea, data], i) => (
        <ProgramsAccordionItem key={`item-${i}`} value={`item-${i}`}>
          <ProgramsAccordionTrigger>
            <div className="flex items-center gap-x-3">
              {programArea}
              <span className="h5 text-darkBeige">
                {data?.programs?.length}
              </span>
            </div>
          </ProgramsAccordionTrigger>
          <ProgramsAccordionContent>
            {data.programs.map(program => {
              return (
                <div className="grid w-full grid-cols-5" key={program.uri}>
                  <div
                    className="flex w-full items-center justify-center rounded-xl bg-white p-5"
                    key={program.uri}
                  >
                    <Link href={program.uri}>{program.title}</Link>
                  </div>
                </div>
              )
            })}
          </ProgramsAccordionContent>
        </ProgramsAccordionItem>
      ))
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
