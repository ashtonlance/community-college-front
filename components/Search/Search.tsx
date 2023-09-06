import Image from "next/image";
import { useState } from "react";
import close from "../../assets/icons/close.svg";

import Link from "next/link";

type SearchProps = {
  transparentMode: boolean;
  searchOpened: (val: boolean) => void;
};

export const Search = ({ transparentMode, searchOpened }: SearchProps) => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [searchBarActive, setSearchBarActive] = useState(false);

  const handleChange = (event) => {
    setSearchedTerm(event.target.value);
  };

  const toggleSearchBar = () => {
    searchOpened(!searchBarActive);
    setSearchBarActive(!searchBarActive);
  };

  return (
    <div
      className="flex gap-[10px] items-center hover:cursor-pointer"
      onClick={toggleSearchBar}
    >
      {"Search"}
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
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <circle
              cx="8.26125"
              cy="8.44917"
              r="5.52297"
              stroke="#14435B"
              strokeWidth="2"
            />
            <path
              d="M14.5839 15.724L15.291 16.4311L16.7052 15.0169L15.9981 14.3098L14.5839 15.724ZM11.5292 12.6693L14.5839 15.724L15.9981 14.3098L12.9434 11.2551L11.5292 12.6693Z"
              fill="#14435B"
            />
          </svg>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <circle
              cx="8.26125"
              cy="8.44917"
              r="5.52297"
              stroke="#14435B"
              strokeWidth="2"
            />
            <path
              d="M14.5839 15.724L15.291 16.4311L16.7052 15.0169L15.9981 14.3098L14.5839 15.724ZM11.5292 12.6693L14.5839 15.724L15.9981 14.3098L12.9434 11.2551L11.5292 12.6693Z"
              fill="#14435B"
            />
          </svg>
        </>
      )}

      <div
        className={`${
          searchBarActive
            ? "top-[152px] h-[80px] opacity-100 sm:top-[70px]"
            : "top-[-100px] h-[0px] opacity-0"
        } transition-opacity ease-in-out delay-250 z-0 absolute right-0 left-0 flex bg-white justify-center items-center  gap-3 sm:px-[20px]`}
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
    </div>
  );
};
