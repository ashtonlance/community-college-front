import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './AccordionInternal'

export const AccordionDisplay = props => {
  const items = props?.attributes?.data?.accordion
  const color = props?.attributes?.data?.background_color || 'grey'
  const spaceTop = props?.attributes?.data?.margins_top_spacing || 'medium'
  const spaceBottom =
    props?.attributes?.data?.margins_bottom_spacing || 'medium'
  const accordionItems = []
  for (let i = 0; i < items; i++) {
    let content = props?.attributes.data[`accordion_${i}_content`]
    let heading = props?.attributes.data[`accordion_${i}_heading`]
    accordionItems.push(
      <AccordionItem key={`item-${i}`} value={`item-${i}`} color={`${color}`}>
        <AccordionTrigger>{heading}</AccordionTrigger>
        <AccordionContent>
          {typeof content === 'string' ? (
            content
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          )}
        </AccordionContent>
      </AccordionItem>
    )
  }
  return (
    <div className={`bg-${color}`}>
      <div
        className={`sm:p-10 md:p-[60px] px-52 pb-[100px] module-spacing-top-${spaceBottom} module-spacing-bottom-${spaceTop}`}
      >
        <Accordion type="single" collapsible>
          {accordionItems}
        </Accordion>
      </div>
    </div>
  )
}
AccordionDisplay.displayName = 'nextword/accordion'
