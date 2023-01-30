import React, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

import AxiosWithAuth from "../../../../services/axiosRequest";

import FormType from "./PropsTypeForm";
import IsRequired from "./IsRequired";

export default function Category({ onChange, value }) {
  const [CategoryList, SetCategoryList] = useState([]);
  const OnBlur = (e) => {
    const val = e.target.value;
    const res = CategoryList.filter((el) => el.name === val);
    if (res.length === 0 && val !== "") {
      console.warn("Tu veux Rajouter un element", res, val);
    }
  };
  useEffect(() => {
    AxiosWithAuth({
      url: `/api/private/projects/categories`,
    }).then((res) => {
      SetCategoryList(res.data);
    });
  }, []);

  return (
    <div className="" name="Categories ">
      <label
        htmlFor="Categories"
        className="block text-sm font-medium text-gray-700"
      >
        Catégorie <IsRequired />
      </label>
      <div className="   w-full max-w-full mt-1 flex rounded-md shadow-sm">
        <Combobox
          as="div"
          className="w-full relative "
          onChange={(e) => onChange(e)}
          value={value}
        >
          <div className="">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => onChange(event.target.value)}
              displayValue={value}
              onBlur={OnBlur}
              placeholder="Category"
            />
            <Combobox.Options className=" z-50 max-h-20 overflow-y-scroll absolute w-full mt-1  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {CategoryList.filter((el) =>
                el.name.match(new RegExp(`${value}`, "i"))
              ).map((el) => (
                <Combobox.Option
                  key={el.id}
                  value={el.name}
                  className=" cursor-default select-none py-2 pl-3 pr-9 bg-white  hover:bg-slate-200"
                >
                  {el.name}
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

Category.propTypes = FormType;
