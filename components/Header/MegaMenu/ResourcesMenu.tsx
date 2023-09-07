import Link from 'next/link'
import { cleanHTMLText } from '../../../utils/cleanHTMLText'
import { relativeToAbsoluteUrls } from '../../../utils/relativeToAbsoluteUrls'
import { formatDate } from '../../../utils/dates'

const FeaturedResource = ({ featuredResource }) => (
  <div className="w-[50%] pl-[40px] md:hidden">
    <p className="p-small mb-[24px] text-gmt-300">
      {' '}
      Featured Resource • {formatDate(featuredResource?.date)}
    </p>
    <h4 className="mb-[24px] text-white">{featuredResource.title}</h4>
    <p className="text-gmt-300">
      {' '}
      {cleanHTMLText(featuredResource.excerpt ?? featuredResource.content)}
    </p>

    <div className="my-[24px] flex items-baseline gap-[40px]">
      <Link
        href={relativeToAbsoluteUrls(featuredResource.uri)}
        target="_blank"
        className="secondary-btn border-[1.5px] border-solid border-white"
      >
        Read Article
      </Link>
      <Link
        href="/all-resources"
        className="p-small border-b-solid border-b-[1.5px] border-b-gmt-300 text-[14px] text-gmt-300"
      >
        {' '}
        View All Resources
      </Link>
    </div>
  </div>
)

type ResourceMenuProps = {
  subItems: any
  featuredResource: any
  classes?: string
  handleActiveItem?: (id: string) => void
}

export const ResourcesMenu = ({
  subItems,
  featuredResource,
  classes,
  handleActiveItem,
}: ResourceMenuProps) => (
  <div className="semi-modal">
    <div
      onMouseLeave={() => handleActiveItem('')}
      className={`mega-menu  md:top-0 ${classes}`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        <div className="border-r-solid flex flex-1 justify-around border-r-[1.5px] border-r-gmt-400 md:flex-col md:border-0 md:text-left">
          {subItems?.map(subItem => (
            <div
              className="mb-[40px] flex flex-col pr-[40px]"
              key={subItem.title}
            >
              <Link
                className="p-small mb-[24px] text-gmt-300"
                href={subItem?.url?.url || ''}
              >
                {subItem.title}
              </Link>
              {subItem.resourcesLinks.map(link => (
                <Link
                  key={link.label}
                  className="links-sub-nav mb-[10px] text-white"
                  href={link.pageLink?.url || ''}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <FeaturedResource featuredResource={featuredResource} />
      </div>
    </div>
  </div>
)
