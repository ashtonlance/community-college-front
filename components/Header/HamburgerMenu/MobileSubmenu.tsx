import { useState } from "react";
import { Button } from "../../Button";
import arrowright from "../../../assets/icons/arrow-right.svg";
import arrowleft from "../../../assets/icons/arrow-left.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import { AboutMenu } from "../MegaMenu/AboutMenu";
import { ServicesMenu } from "../MegaMenu/ServicesMenu";
import { ResourcesMenu } from "../MegaMenu/ResourcesMenu";
import { Modal } from "components/Modal";
import { Login } from "components/Modal/Login";
import Link from "next/link";
import { Separator } from "components/Separator";

const TopLevelMenu = ({ items, setActiveMenuAs, classes }) => {
  return (
    <div
      className={`flex justify-center flex-col items-start text-white w-full ${classes}`}
    >
      {items &&
        items?.map((item) => (
          <div
            onClick={() => setActiveMenuAs(item)}
            key={item.id}
            className={`links-mobile-nav flex w-full justify-between border-b-[1.5px] border-gmt-400
                    ${item.label === "Events" ? "order-6 hide-border" : ""}
                    `}
          >
            <div className=""> {item.label} </div>
            {item?.navigationMenu?.items?.length > 0 && (
              <Image alt="" src={arrowright} width={10} height={10} />
            )}
          </div>
        ))}
    </div>
  );
};

const InternalMenu = ({ activeMenu, items, setActiveMenu }) => {
  const router = useRouter();
  let content = (
    <TopLevelMenu
      classes="top-[90px]"
      items={items}
      setActiveMenuAs={setActiveMenu}
    />
  );

  if (activeMenu?.label !== "") {
    switch (activeMenu?.label) {
      case "About":
        content = (
          <div className="w-full internal-menu-mobile text-left min-h-[90px] md:min-h-[80px]">
            <Link
              href={activeMenu?.url}
              className="links-mobile-nav text-white"
            >
              {activeMenu?.label}
            </Link>
            <Separator classes="relative bg-gmt-400 h-[1.5px] w-[40px] z-10" />
            <AboutMenu
              classes="justify-start md:h-fit !top-0 !pt-[10px] sm:!pt-0"
              subItems={activeMenu.navigationMenu.items}
            />
          </div>
        );

        break;
      case "Services":
        content = (
          <div className="w-full internal-menu-mobile text-left  min-h-[90px] md:min-h-[80px]">
            <Link
              href={activeMenu?.url}
              className="links-mobile-nav text-white"
            >
              {activeMenu?.label}
            </Link>
            <Separator classes="relative bg-gmt-400 h-[1.5px] w-[40px] z-10" />
            <ServicesMenu
              classes="pt-[32px] sm:pt-0"
              subItems={activeMenu.navigationMenu.items}
            />
          </div>
        );
        break;
      case "Resources":
        content = (
          <div className="w-full internal-menu-mobile text-left  min-h-[90px] md:min-h-[80px]">
            <Link
              href={activeMenu?.url}
              className="links-mobile-nav text-white"
            >
              {activeMenu?.label}
            </Link>
            <Separator classes="relative bg-gmt-400 h-[1.5px] w-[40px] z-10" />
            <ResourcesMenu
              classes="pt-[32px] sm:pt-0"
              subItems={activeMenu.navigationMenu.items}
              featuredResource={activeMenu.navigationMenu.featuredResource}
            />
          </div>
        );
        break;
      case "Events":
        router.push(activeMenu.url);
        break;
    }
  }
  return content;
};

export const MobileSubmenu = ({ items }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [loginModalActive, setLoginModalActive] = useState(false);
  const menu = (
    <InternalMenu
      activeMenu={activeMenu}
      items={items}
      setActiveMenu={setActiveMenu}
    />
  );

  return (
    <div className="semi-modal">
      <div className="mobile-submenu top-0">
        {activeMenu && (
          <div
            onClick={() => setActiveMenu(null)}
            className="tag bg-gmt-500 text-white flex gap-2 relative top-[-5px] z-10"
          >
            <Image alt="" src={arrowleft} width={6} height={6} />
            Back
          </div>
        )}

        {menu}

        {!activeMenu && (
          <>
            <div className="mt-[100px] flex justify-between w-full">
              <Link
                href="/customer-support"
                className="links-sub-nav text-white"
              >
                Customer Support
              </Link>
              <div
                onClick={() => setLoginModalActive(true)}
                className="links-sub-nav text-white"
              >
                Login
              </div>
              <Modal
                modalContent={<Login />}
                modalActive={loginModalActive}
                handleClose={() => setLoginModalActive(false)}
              />
            </div>
            <Button
              content="work with us"
              arrow={true}
              classes="hidden primary-btn bg-white text-black w-full justify-center sm:flex mt-[40px]"
            />
          </>
        )}
      </div>
    </div>
  );
};
