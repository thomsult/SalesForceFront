import PropTypes from "prop-types";
import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function EditText({
  label,
  value,
  onChange,
  readOnly = true,
  onBlur,
}) {
  const [edit, SetEdit] = useState(false);
  return (
    <div className="flex md:w-full ">
      <div className="grow">
        <p className="text-gray-500 mb-1">{label}</p>
        {!edit ? (
          <p className="">{value}</p>
        ) : (
          <textarea
            ref={(e) => {
              if (edit && e) {
                e.focus();
              }
            }}
            className="w-full border p-1 rounded-md border-gray-400"
            name="edt"
            id={`edt-${label}`}
            defaultValue={value}
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
EditText.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
};
