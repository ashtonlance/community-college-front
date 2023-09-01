import { MobileSubmenu } from "./MobileSubmenu";

export type HamburgerMenuProps = {
  menuItems: any;
  bgTransparent: boolean;
  isOpen: boolean;
  toggleHamburgerMenu: (val: boolean) => void;
};

export const HamburgerMenu = ({
  menuItems,
  bgTransparent,
  isOpen,
  toggleHamburgerMenu,
}: HamburgerMenuProps) => {
  const handleclick = () => {
    toggleHamburgerMenu(!isOpen);
  };

  return (
    <div className="hamburguer-menu">
      {isOpen ? (
        bgTransparent ? (
          <div onClick={handleclick}>
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.16113 18.8389L20.8388 1.1612"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M3.16119 1.16113L20.8389 18.8388"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        ) : (
          <div onClick={handleclick}>
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.16113 18.8389L20.8388 1.1612"
                stroke="black"
                strokeWidth="1.5"
              />
              <path
                d="M3.16119 1.16113L20.8389 18.8388"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )
      ) : (
        <div onClick={handleclick}>
          {bgTransparent ? (
            <svg
              width="24"
              height="19"
              viewBox="0 0 24 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.5H24"
                className="hamburguer-white"
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M0 9.5H24"
                className="hamburguer-white"
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M0 17.5H24"
                className="hamburguer-white"
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="19"
              viewBox="0 0 24 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 1.5H24" stroke="black" strokeWidth="1.5" />
              <path d="M0 9.5H24" stroke="black" strokeWidth="1.5" />
              <path d="M0 17.5H24" stroke="black" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      )}
      {isOpen && <MobileSubmenu items={menuItems} />}
    </div>
  );
};
