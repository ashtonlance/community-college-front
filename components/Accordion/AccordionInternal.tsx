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

const ProgramsAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  // @ts-ignore
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'bg-grey px-8 py-5 md:px-0 md:py-[15px] sm:py-[10px]',
      className
    )}
    {...props}
  />
))
ProgramsAccordionItem.displayName = 'AccordionItem'

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

const ProgramsAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex" asChild>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        `h3 group flex w-full flex-1 items-center justify-between transition-all [&[data-state=open]>div>svg>rect]:rotate-180 ${
          props.disabled ? 'cursor-not-allowed text-darkBeige' : null
        }`,
        className
      )}
      {...props}
    >
      {children}
      <div
        className={`flex flex-col items-center justify-center rounded-full bg-white p-3 hover:bg-lightBlue ${
          props.disabled ? 'group-hover:bg-white' : null
        }`}
      >
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
ProgramsAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const isChildrenObject = typeof children === 'object'

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'body-regular overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className
      )}
      {...props}
    >
      <div className="whitespace-pre-wrap pb-4 pt-5">
        {isChildrenObject ? (
          children
        ) : (
          <div dangerouslySetInnerHTML={{ __html: children as string }} />
        )}
      </div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = AccordionPrimitive.Content.displayName

const ProgramsAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'body-regular overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="whitespace-pre-wrap pb-5 pt-6 md:pb-[17px] sm:pb-[14px] sm:pt-5">
      {children}
    </div>
  </AccordionPrimitive.Content>
))
ProgramsAccordionContent.displayName = AccordionPrimitive.Content.displayName

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  ProgramsAccordionContent,
  ProgramsAccordionTrigger,
  ProgramsAccordionItem,
}
