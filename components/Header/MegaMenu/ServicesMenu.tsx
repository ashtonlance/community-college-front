import Link from "next/link";

type ServicesMenuProps = {
  subItems: any;
  classes?: string;
  handleActiveItem?: (id: string) => void;
};

export const ServicesMenu = ({
  subItems,
  classes,
  handleActiveItem,
}: ServicesMenuProps) => (
  <div className="semi-modal">
    <div
      onMouseLeave={() => handleActiveItem("")}
      className={`mega-menu md:top-0 ${classes}`}
    >
      <div className="flex justify-between max-w-[1600px] w-full items-center mx-auto">
        <div className="grid grid-cols-3 max-w-[75%] border-r-[1.5px] border-r-solid border-r-gmt-400 md:border-0 md:grid-cols-1 md:max-w-full md:w-full">
          {subItems?.map((subItem) => (
            <div
              className="flex flex-col mb-[40px] pr-[40px] md:pr-0 md:mb-[32px] sm:mb-[24px]"
              key={subItem.title}
            >
              <Link
                className="links-sub-nav text-white mb-[10px]"
                href={subItem?.url?.url || ""}
              >
                {subItem.title.replace("&amp;", "&")}
              </Link>
              <p className="p-regular text-gmt-300 max-w-[80%]">
                {subItem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-[20%] text-center pl-[40px] md:hidden">
          <h4 className="text-white mb-[32px]">
            Not sure which tier is right for you?
          </h4>
          <button className="secondary-btn border-[1.5px] border-solid border-white">
            {" "}
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </div>
);
