import { ReactNode } from 'react'
import Link from 'next/link'
// defining the Props
export type CrumbItem = {
  title: string // e.g., Python
  href: string // e.g., /development/programming-languages/python
}
export type BreadcrumbsProps = {
  items: CrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  console.log(items)
  return (
    <div
      aria-label="Breadcrumbs"
      className="mb-8 flex items-start gap-2 md:mb-6"
    >
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1
        if (!isLastItem) {
          return (
            <>
              <Link
                href={crumb.href}
                key={i}
                className="font-bold text-darkBeige hover:text-navy"
              >
                {crumb.title}
              </Link>
              {/* separator */}
              <span className="font-bold text-beige"> / </span>
            </>
          )
        } else {
          return (
            <span key={i} className="font-bold text-navy">
              {crumb.title}
            </span>
          )
        }
      })}
    </div>
  )
}
