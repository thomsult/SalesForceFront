import React from "react";
import IsRequired from "./IsRequired";
import FormType from "./PropsTypeForm";

export default function ProjectName({ value, onChange }) {
  return (
    <div name="ProjectName">
      <label
        htmlFor="ProjectName"
        className="block text-sm font-medium text-gray-700"
      >
        Nom du projet <IsRequired />
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          name="ProjectName"
          id="ProjectName"
          className="block w-full p-2 flex-1 rounded border  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
ProjectName.propTypes = FormType;
