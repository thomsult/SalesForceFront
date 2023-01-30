import PropTypes from "prop-types";
import React, { useState } from "react";

import { Combobox } from "@headlessui/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import IsRequired from "./IsRequired";

export default function Sub({ list, onChange }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e);
    onChange(
      list.map((userCurrent) => {
        if (userCurrent.userName === e) {
          const user = userCurrent;
          user.isSub = true;
          return user;
        }
        return userCurrent;
      })
    );
  };
  return (
    <div className="" name="Remplaçant ">
      <label
        htmlFor="Select"
        className="block text-sm font-medium text-gray-700"
      >
        Remplaçant <IsRequired />
      </label>
      <div className="   w-full max-w-full mt-1 flex rounded-md shadow-sm">
        <Combobox
          as="div"
          className="w-full relative "
          onChange={handleChange}
          value={value}
        >
          <div className="">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => setValue(event.target.value)}
              displayValue={value}
              placeholder="Désignez un suppléant"
            />
            <Combobox.Options className="-top-2 transform -translate-y-full z-50 max-h-64 overflow-y-scroll absolute w-full mt-1  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {list &&
                list
                  .filter((el) =>
                    el.userName.match(new RegExp(`${value}`, "i"))
                  )
                  .map((el) => (
                    <Combobox.Option
                      key={el.userName}
                      value={el.userName}
                      className=" cursor-default flex items-center gap-4 select-none py-2 pl-3 pr-9 bg-white  text-gray-700 hover:text-gray-500"
                    >
                      <img
                        src={el.profilePicture || "/templateAccount.png"}
                        alt={el.userName}
                        className="h-10 rounded-full border-white border-2"
                      />
                      <p className="font-medium w-full">{el.email}</p>
                      <p className="font-medium">{el.companyName}</p>
                    </Combobox.Option>
                  ))}
            </Combobox.Options>
            <Combobox.Button className="absolute z-20 inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronLeftIcon className="h-5 text-gray-400" />
            </Combobox.Button>
          </div>
        </Combobox>
      </div>
    </div>
  );
}

Sub.defaultProps = {
  list: [],
};

Sub.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};
