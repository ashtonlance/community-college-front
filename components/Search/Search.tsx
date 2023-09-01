import Image from "next/image";
import { useState } from "react";
import close from "../../assets/icons/close.svg";

import Link from "next/link";

type SearchProps = {
  transparentMode: boolean;
  searchOpened: (val: boolean) => void;
};

export const Search = ({ transparentMode, searchOpened }: SearchProps) => {
  let [searchedTerm, setSearchedTerm] = useState("");
  let [searchBarActive, setSearchBarActive] = useState(false);

  const handleChange = (event) => {
    setSearchedTerm(event.target.value);
  };

  const toggleSearchBar = () => {
    searchOpened(!searchBarActive);
    setSearchBarActive(!searchBarActive);
  };

  return (
    <>
      {searchBarActive ? (
        <Image
          alt=""
          src={close}
          width={20}
          height={20}
          className="cursor-pointer rounded-[3px]"
          onClick={toggleSearchBar}
        />
      ) : transparentMode ? (
        <div onClick={toggleSearchBar}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="search-white"
              d="M8.89863 15.1971C12.1192 15.1971 14.7299 12.5864 14.7299 9.36586C14.7299 6.14529 12.1192 3.53461 8.89863 3.53461C5.67807 3.53461 3.06738 6.14529 3.06738 9.36586C3.06738 12.5864 5.67807 15.1971 8.89863 15.1971Z"
              stroke=""
              strokeWidth="1.5"
            />
            <path
              className="search-white"
              d="M13.397 13.9301L16.9324 17.4655"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </div>
      ) : (
        <div onClick={toggleSearchBar}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="search-black"
              d="M8.89863 15.1971C12.1192 15.1971 14.7299 12.5864 14.7299 9.36586C14.7299 6.14529 12.1192 3.53461 8.89863 3.53461C5.67807 3.53461 3.06738 6.14529 3.06738 9.36586C3.06738 12.5864 5.67807 15.1971 8.89863 15.1971Z"
              stroke=""
              strokeWidth="1.5"
            />
            <path
              className="search-black"
              d="M13.397 13.9301L16.9324 17.4655"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </div>
      )}

      <div
        className={`${
          searchBarActive
            ? "top-[98px] h-[80px] opacity-100 sm:top-[70px]"
            : "top-[-100px] h-[0px] opacity-0"
        } transition-opacity ease-in-out delay-250 z-0 absolute right-0 left-0 flex bg-gmt-300 justify-center items-center  gap-3 sm:px-[20px]`}
      >
        <input
          onChange={handleChange}
          className="h-[50px] primary-btn w-[80%]"
          type="text"
          defaultValue={searchedTerm}
        />
        <Link
          className="primary-btn bg-white text-black flex"
          href={{
            pathname: "/search",
            query: { searchedTerm },
          }}
        >
          Search
        </Link>
      </div>
    </>
  );
};
