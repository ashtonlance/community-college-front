import Link from "next/link";
import { cleanHTMLText } from "../../../utils/cleanHTMLText";
import { relativeToAbsoluteUrls } from "../../../utils/relativeToAbsoluteUrls";
import { formatDate } from "../../../utils/dates";

const FeaturedResource = ({ featuredResource }) => (
  <div className="w-[50%] pl-[40px] md:hidden">
    <p className="p-small text-gmt-300 mb-[24px]">
      {" "}
      Featured Resource • {formatDate(featuredResource?.date)}
    </p>
    <h4 className="text-white mb-[24px]">{featuredResource.title}</h4>
    <p className="text-gmt-300">
      {" "}
      {cleanHTMLText(featuredResource.excerpt ?? featuredResource.content)}
    </p>

    <div className="flex my-[24px] items-baseline gap-[40px]">
      <Link
        href={relativeToAbsoluteUrls(featuredResource.uri)}
        target="_blank"
        className="secondary-btn border-[1.5px] border-solid border-white"
      >
        Read Article
      </Link>
      <Link
        href="/all-resources"
        className="p-small text-gmt-300 border-b-[1.5px] border-b-solid border-b-gmt-300 text-[14px]"
      >
        {" "}
        View All Resources
      </Link>
    </div>
  </div>
);

type ResourceMenuProps = {
  subItems: any;
  featuredResource: any;
  classes?: string;
  handleActiveItem?: (id: string) => void;
};

export const ResourcesMenu = ({
  subItems,
  featuredResource,
  classes,
  handleActiveItem,
}: ResourceMenuProps) => (
  <div className="semi-modal">
    <div
      onMouseLeave={() => handleActiveItem("")}
      className={`mega-menu  md:top-0 ${classes}`}
    >
      <div className="flex justify-between max-w-[1600px] w-full items-center mx-auto">
        <div className="flex justify-around flex-1 border-r-[1.5px] border-r-solid border-r-gmt-400 md:border-0 md:flex-col md:text-left">
          {subItems?.map((subItem) => (
            <div
              className="flex flex-col mb-[40px] pr-[40px]"
              key={subItem.title}
            >
              <Link
                className="p-small text-gmt-300 mb-[24px]"
                href={subItem?.url?.url || ""}
              >
                {subItem.title}
              </Link>
              {subItem.resourcesLinks.map((link) => (
                <Link
                  key={link.label}
                  className="links-sub-nav text-white mb-[10px]"
                  href={link.pageLink?.url || ""}
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
);
