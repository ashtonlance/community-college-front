import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './AccordionInternal'

export const AccordionDisplay = props => {
  console.log(props, 'props')
  const items = props?.attributes?.data?.accordion
  const accordionItems = []
  for (let i = 0; i < items; i++) {
    accordionItems.push(
      <AccordionItem key={`item-${i}`} value={`item-${i}`}>
        <AccordionTrigger>
          {props?.attributes.data[`accordion_${i}_heading`]}
        </AccordionTrigger>
        <AccordionContent>
          {props?.attributes.data[`accordion_${i}_content`]}
        </AccordionContent>
      </AccordionItem>
    )
  }
  return (
    <div className="bg-grey">
      <div className="px-52 pb-[100px]">
        <Accordion type="single" collapsible>
          {accordionItems}
        </Accordion>
      </div>
    </div>
  )
}
AccordionDisplay.displayName = 'nextword/accordion'
