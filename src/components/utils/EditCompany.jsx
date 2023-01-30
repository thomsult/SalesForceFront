import PropTypes from "prop-types";
import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import CompanySelect from "./CompanySelect";

export default function EditCompany({
  label,
  value,
  onChange,
  readOnly = true,
  onBlur,
}) {
  const [edit, SetEdit] = useState(false);
  return (
    <div className="flex md:w-full  ">
      <div className="grow ">
        {!edit ? (
          <>
            <p className="text-gray-500 mb-3">{label}</p>
            <p className="">{value}</p>
          </>
        ) : (
          <CompanySelect
            classNameLabel="text-gray-500 mb-3"
            value={value}
            onChange={(e) => edit && onChange(e.target.value)}
            onBlur={() => {
              SetEdit(false);
              onBlur();
            }}
          />
        )}
      </div>
      {!readOnly && (
        <button
          className="w-5"
          type="button"
          onClick={() => {
            SetEdit((bool) => !bool);
          }}
        >
          <PencilSquareIcon className="text-gray-400 h-5 w-8 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
}
EditCompany.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
};
