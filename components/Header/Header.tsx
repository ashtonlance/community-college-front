import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/imgs/site-logo.svg";
import logoShort from "../../assets/imgs/ncccs-short.svg";
import { Search } from "components/Search";
import { NavigationItem } from "./NavigationItem";
import { useState } from "react";
import { HamburgerMenu } from "./HamburgerMenu";
import useScrollPosition from "utils/hooks/useScrollPosition";
import dynamic from "next/dynamic";
import useWindowDimensions from "utils/hooks/useWindowDimensions";

const Modal = dynamic(
  async () => {
    const { Modal } = await import("components/Modal");
    return { default: Modal };
  },
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const Logo = ({ scrolled }) => {
  const ncccsLogo = scrolled ? logoShort : logo;
  const { width } = useWindowDimensions();
  return (
    <div className="md:w-max">
      <Link href="/" className="cursor-pointer">
        <Image
          alt="header-logo"
          src={width > 768 ? ncccsLogo : logoShort}
          width={width > 768 ? 145 : 99}
          height={width > 768 ? 50 : 24}
          className="md:w-[99px] md:h-[24px]"
          priority
          loading="eager"
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
  const transparentScrolledMode = scrollPosition > 0 && activeItem === "";

  return (
    <div
      id="topbar"
      className={`${
        displayTransparentMode
          ? "fixed topbar-transparent w-full z-10"
          : "fixed bg-white top-0 w-full z-10"
      } transition-background duration-200 border-solid border-b-2 border-grey`}
    >
      <div className="flex justify-end h-auto bg-navy">
        <span className="bg-lightBlue search-wrapper-icon hover:bg-gmt-200 py-[14px] px-[20px] flex items-center md:p-0 md:w-[50px] md:h-[50px] md:justify-center text-navy font-condensed">
          <Search
            transparentMode={displayTransparentMode}
            searchOpened={setSearchOpened}
          />
        </span>
      </div>
      <div
        className={`${
          transparentScrolledMode
            ? "py-[16px] px-[32px] md:px-[24px] md:py-[20px] "
            : "py-[24px] px-[32px] md:p-[24px] md:pl-[40px]"
        } flex bg-transparent h-fit max-w-[1700px] mx-auto w-full items-center justify-between sm:py-[10px] sm:pl-[24px] sm:pr-[20px] transition-padding duration-200`}
      >
        <Logo scrolled={transparentScrolledMode} />
        <DynamicNavigationMenu
          transparentMode={displayTransparentMode}
          openDropdownItem={activeItem}
          menuItems={menuItems}
          updateActiveItem={handleActiveItem}
        />

        <div className="hamburguer-wrapper hidden md:flex hover:bg-gmt-200 rounded-[3px] w-[50px] h-[50px] items-center justify-center">
          <HamburgerMenu
            menuItems={menuItems}
            bgTransparent={displayTransparentMode}
            isOpen={hamburgerMenuOpened}
            toggleHamburgerMenu={setHamburgerMenuOpen}
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
