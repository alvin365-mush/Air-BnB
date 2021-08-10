import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import Modal from "react-modal";

export default function Header({ placeholder, txtColor }) {
  const [searchInput, setSearchInput] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [modal, setModal] = useState(false);
  const [navbar, setNavBar] = useState(false);

  const router = useRouter();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
      },
    });
  };

  useEffect(() => {
    const changeHeader = () => {
      if (window.scrollY >= 80) {
        setNavBar(true);
      } else {
        setNavBar(false);
      }
    };

    window.addEventListener("scroll", changeHeader);
  }, []);
  return (
    <header
      className={
        navbar
          ? "sticky z-[2] top-0 grid grid-cols-3 bg-white text-gray-600 shadow-md p-4 md:px-10"
          : `${txtColor} sticky z-[2] top-0 grid grid-cols-3  bg-transparent shadow-md p-4 md:px-10`
      }
    >
      <div
        className="relative flex items-center h-10 hover:cursor-pointer my-auto "
        onClick={() => router.push("/")}
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* search */}
      <div className="flex items-center md:border-2 md:shadow-sm rounded-full py-2 ">
        <input
          onClick={() => setModal(true)}
          type="text"
          placeholder={placeholder || "Start your search"}
          className=" pl-5 bg-transparent outline-none flex-grow  placeholder-gray-400"
        />
        <SearchIcon className="hidden md:mx-2 md:inline-flex h-8 bg-red-400 p-2 text-white rounded-full cursor-pointer" />
      </div>

      {/* right */}
      <div className="flex space-x-4 items-center justify-end  ">
        <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer hover:animate-spin" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={customStyles}
        className="relative z-50 max-w-full rounded-md  my-auto sm:max-w-3xl  p-5 justify-center sm:mt-11   mx-auto  shadow-md align-middle  bg-white "
      >
        {/* date item */}

        <div className="flex flex-col static mx-auto mt-3 overflow-x-scroll z-100">
          <div className="flex items-center md:border-2 md:shadow-sm rounded-full py-2 ">
            <input
              type="text"
              placeholder={placeholder || "Start your search"}
              className=" pl-5 bg-transparent outline-none flex-grow text-gray-600 placeholder-gray-400"
              onChange={(event) => setSearchInput(event.target.value)}
              value={searchInput}
            />
            <SearchIcon className=" md:mx-2 inline-flex h-8 bg-red-400 p-2 text-white rounded-full cursor-pointer" />
          </div>

          <div className="flex flex-col col-span-3 mx-auto mt-3">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
            <div className="flex items-center mb-4 border-b">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of guests
              </h2>
              <UsersIcon className="h-5" />
              <input
                value={numberOfGuests}
                type="number"
                className="w-12 pl-2 text-lg outline-none text-red-400"
                onChange={(event) => setNumberOfGuests(event.target.value)}
                min={1}
              />
            </div>
            <div className="flex">
              <button
                className="flex-grow text-gray-500"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button className="flex-grow text-red-400" onClick={search}>
                Search
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </header>
  );
}
const customStyles = {
  overlay: {
    zIndex: 50,
  },
};
