import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, BuildingOfficeIcon } from "@heroicons/react/20/solid";
import AxiosWithAuth from "../../services/axiosRequest";

export default function CompanySelect({ onChange, value, classNameLabel }) {
  // eslint-disable-next-line no-unused-vars
  const [company, setCompany] = useState([{ id: 0, name: "CellsForce" }]);
  const [query, setQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState({ name: value });
  useEffect(() => {
    AxiosWithAuth({
      url: `/api/companies`,
      method: "get",
    }).then((res) => {
      setCompany(res.data);
    });
  }, []);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const filteredCompany = () => {
    if (query === "") {
      return company;
    }
    if (
      company.filter((companyEl) => {
        return companyEl.name.toLowerCase().includes(query.toLowerCase());
      })
    ) {
      return company.filter((companyEl) => {
        return companyEl.name.toLowerCase().includes(query.toLowerCase());
      });
    }
    return query;
  };
  return (
    <Combobox
      as="div"
      onChange={(e) => {
        if (typeof e === "string") {
          const result = { id: company.length + 1, name: e };
          setSelectedCompany(result);
          onChange(result);
        } else {
          setSelectedCompany(e);
          onChange(e);
        }
      }}
      value={selectedCompany.name}
    >
      <Combobox.Label
        className={`${classNameLabel} block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500`}
      >
        Entreprise
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={query}
        />
        <Combobox.Button className="absolute z-20 inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <BuildingOfficeIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {company && filteredCompany().length >= 0 && (
          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Option
              key={100}
              value={query}
              className={({ active }) =>
                classNames(
                  "relative cursor-default select-none py-2 pl-3 pr-9",
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={classNames(
                      "block truncate",
                      selected && "font-semibold"
                    )}
                  >
                    {query}
                  </span>

                  {selected && (
                    <span
                      className={classNames(
                        "absolute z-20 inset-y-0 right-0 flex items-center pr-4",
                        active ? "text-white" : "text-indigo-600"
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
            {filteredCompany().map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {person.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute z-20 inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

CompanySelect.defaultProps = {
  classNameLabel: "",
};
CompanySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  classNameLabel: PropTypes.string,
};
