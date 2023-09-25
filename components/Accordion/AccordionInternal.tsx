import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from 'utils'

import bg from '/public/angles/angled-bg_blue-white-btm.jpg'

const Accordion = AccordionPrimitive.Root
Accordion.displayName = 'nextword/accordion'

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  // @ts-ignore
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('mb-5 rounded-xl bg-white px-8 py-5', className)}
    style={{
      backgroundColor: '#fff',
      backgroundImage: `url(${bg.src})`,
      backgroundSize: 'cover',
    }}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex" asChild>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'h4 flex w-full flex-1 items-center justify-between transition-all [&[data-state=open]>div>svg>rect]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <div className="flex flex-col items-center justify-center rounded-full bg-grey p-3">
        <svg
          className="shrink-0 fill-navy"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`ttransform [&[data-state=open]:!rotate-180 origin-center transition duration-200 ease-out`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`[&[data-state=open]:!rotate-180 origin-center rotate-90 transform transition duration-200 ease-out`}
          />
        </svg>
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down body-regular overflow-hidden transition-all',
      className
    )}
    {...props}
  >
    <div
      className="whitespace-pre-wrap pb-4 pt-5"
      dangerouslySetInnerHTML={{ __html: children }}
    ></div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
