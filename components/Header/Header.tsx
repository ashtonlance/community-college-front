import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/imgs/site-logo.svg";
import logoTransparent from "../../assets/imgs/site-logo-transparent.svg";
import mobilelogo from "../../assets/imgs/mobile-site-logo.svg";
import { Button } from "@/components/Button";
import { Search } from "components/Search";
import { NavigationItem } from "./NavigationItem";
import { useState } from "react";
import { HamburgerMenu } from "./HamburgerMenu";
import { Modal } from "components/Modal";
import { Login } from "components/Modal/Login";
import useScrollPosition from "utils/hooks/useScrollPosition";

const Logo = ({ transparentMode }) => {
  const gmtLogo = transparentMode ? logoTransparent : logo;

  return (
    <div className="md:w-max">
      <Link href="/" className="cursor-pointer">
        <Image
          alt="header-logo"
          src={gmtLogo}
          width={75}
          height={32}
          className="sm:hidden"
        />
        <Image
          alt="header-logo-mobile"
          src={mobilelogo}
          width={26}
          height={26}
          className="hidden sm:block"
        />
      </Link>
    </div>
  );
};

export const DynamicNavigationMenu = ({
  menuItems,
  openDropdownItem,
  updateActiveItem,
  transparentMode,
}) => (
  <div className="flex justify-center items-center md:hidden">
    {menuItems &&
      menuItems?.map((item) => (
        <div
          className="flex justify-center items-center relative"
          key={item.id}
        >
          <NavigationItem
            handleActiveItem={updateActiveItem}
            item={item}
            transparentMode={transparentMode}
            dropdownOpened={item.id === openDropdownItem}
          />
        </div>
      ))}
  </div>
);

export type HeaderVariant = "transparent" | "default";

export type HeaderProps = {
  menuItems: any;
  variant?: HeaderVariant;
  form: any;
};

export const Header = (props: HeaderProps) => {
  const menuItems = props.menuItems?.nodes;
  const variant = props.variant ?? "default";

  const [activeItem, setActiveItem] = useState("");
  const [loginModalActive, setLoginModalActive] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const [hamburgerMenuOpened, setHamburgerMenuOpen] = useState(false);

  const scrollPosition = useScrollPosition();

  const handleActiveItem = (id) => {
    setActiveItem(id);
  };

  const displayTransparentMode =
    variant == "transparent" &&
    scrollPosition == 0 &&
    activeItem === "" &&
    !searchOpened &&
    !hamburgerMenuOpened;
  const transparentScrolledMode =
    variant == "transparent" && scrollPosition > 0 && activeItem === "";

  return (
    <div
      id="gmt-topbar"
      className={`${
        displayTransparentMode
          ? "fixed topbar-transparent w-full z-10"
          : "fixed bg-white top-0 w-full z-10"
      } transition-background duration-200`}
    >
      <div
        className={`${
          transparentScrolledMode
            ? "py-[24px] px-[60px] md:px-[24px] md:py-[20px] "
            : "py-[32px] px-[60px] md:p-[24px] md:pl-[40px]"
        } flex bg-transparent h-fit max-w-[1700px] mx-auto w-full items-center justify-between sm:py-[10px] sm:pl-[24px] sm:pr-[20px] transition-padding duration-200`}
      >
        <Logo transparentMode={displayTransparentMode} />
        <DynamicNavigationMenu
          transparentMode={displayTransparentMode}
          openDropdownItem={activeItem}
          menuItems={menuItems}
          updateActiveItem={handleActiveItem}
        />

        {/* Static links and search */}
        <div className="flex justify-center text-center items-center md:w-max gap-[16px] md:gap-0">
          <div className="flex">
            <span className="secondary-nav flex justify-center items-center text-center md:hidden">
              <Link
                className={`${displayTransparentMode && "text-white"}`}
                href="/"
              >
                Home
              </Link>
            </span>
            <span className="secondary-nav flex justify-center items-center text-center md:hidden">
              <div
                role="button"
                className={`${displayTransparentMode && "text-white"}`}
                onClick={() => setLoginModalActive(true)}
              >
                Login
              </div>
              <Modal
                id="login-modal"
                modalContent={<Login />}
                modalActive={loginModalActive}
                handleClose={() => setLoginModalActive(false)}
              />
            </span>
            <span className="search-wrapper-icon hover:bg-gmt-200 rounded-[3px] p-[15px] flex items-center md:p-0 md:w-[50px] md:h-[50px] md:justify-center">
              <Search
                transparentMode={displayTransparentMode}
                searchOpened={setSearchOpened}
              />
            </span>
          </div>
          <div className="hamburguer-wrapper hidden md:flex hover:bg-gmt-200 rounded-[3px] w-[50px] h-[50px] items-center justify-center">
            <HamburgerMenu
              menuItems={menuItems}
              bgTransparent={displayTransparentMode}
              isOpen={hamburgerMenuOpened}
              toggleHamburgerMenu={setHamburgerMenuOpen}
            />
          </div>

          <Button
            linkto="https://simplefocus.com"
            content="work with us"
            arrow={true}
            classes="w-fit primary-btn bg-black text-white md:ml-[20px] sm:hidden border-none"
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
};

Header.displayName = "Menu";
Header.fragments = {
  key: "NavigationMenuFragment",
  entry: gql`
    fragment NavigationMenuFragment on MenuItem {
      id
      parentId
      cssClasses
      description
      label
      url
      navigationMenu {
        fieldGroupName
        items {
          description
          fieldGroupName
          title
          url {
            target
            title
            url
          }
          resourcesLinks {
            label
            pageLink {
              url
            }
          }
        }
      }
    }
  `,
};
