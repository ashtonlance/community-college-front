import Link from 'next/link'

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
      className="mb-8 flex flex-wrap items-start gap-2 md:mb-6"
    >
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1
        if (!isLastItem) {
          return (
            <span key={i}>
              <Link
                href={crumb.href}
                key={i}
                className="font-bold text-darkBeige hover:text-navy"
              >
                {crumb.title.replace('And', '&')}
              </Link>
              {/* separator */}
              <span className="font-bold text-beige"> / </span>
            </span>
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
