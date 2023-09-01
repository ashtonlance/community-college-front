import { useState } from "react";
import arrowdown from "../../assets/icons/arrow-down.svg";
import Image from "next/image";
import { AboutFooter } from "./AboutFooter";
import { ServicesFooter } from "./ServicesFooter";
import { ResourcesFooter } from "./ResourcesFooter";

const SubmenuFooter = ({ activeMenu }) => {
  switch (activeMenu?.label) {
    case "About":
      return <AboutFooter subItems={activeMenu.navigationMenu.items} />;
    case "Services":
      return <ServicesFooter subItems={activeMenu.navigationMenu.items} />;
    case "Resources":
      return (
        <ResourcesFooter
          subItems={
            activeMenu.navigationMenu.items.filter(
              (item) => item.title === "Resource Types"
            )[0].resourcesLinks
          }
        />
      );
  }
};

export const MobileFooter = ({ items }) => {
  const [activeMenu, setActiveMenu] = useState();

  const openSubmenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center flex-col items-start text-white w-full">
        {items &&
          items?.map((item) => (
            <div
              key={item.id}
              className={`${
                item.label === "Events" ? "order-6 hide-border" : ""
              } flex flex-col w-full`}
            >
              <div
                onClick={() => openSubmenu(item)}
                className={`${
                  item.label !== "Events" && "border-b-[1.5px] border-gmt-400"
                } links-mobile-nav flex w-full justify-between py-[10px] font-semibold`}
              >
                <div className="text-[16px]"> {item.label} </div>
                {item?.navigationMenu?.items?.length > 0 && (
                  <Image alt="" src={arrowdown} width={10} height={10} />
                )}
              </div>
              <div>
                {activeMenu === item && (
                  <SubmenuFooter activeMenu={activeMenu} />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
