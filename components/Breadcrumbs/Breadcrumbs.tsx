import Link from 'next/link'
import { cn } from 'utils/index'

export type CrumbItem = {
  title: string
  href: string
}
export type BreadcrumbsProps = {
  items: CrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div
      aria-label="Breadcrumbs"
      className="mb-8 flex flex-wrap items-start gap-x-2 md:mb-6"
    >
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1
        const isSecondToLastItem = i === items.length - 2
        if (!isLastItem) {
          return (
            <span key={i}>
              <Link
                href={crumb.href}
                key={i}
                className={`text-darkBeige font-bold hover:text-navy`}
              >
                {crumb.title.replace('And', '&')}
              </Link>
              {/* separator */}
              {!isSecondToLastItem && (
                <span className="font-bold text-beige pl-2">/</span>
              )}
            </span>
          )
        } else {
          return (
            // <span key={i} className="font-bold text-navy">
            //   {crumb.title}
            // </span>
            null
          )
        }
      })}
    </div>
  )
}
