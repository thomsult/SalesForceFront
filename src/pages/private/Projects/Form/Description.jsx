import React from "react";
import IsRequired from "./IsRequired";
import FormType from "./PropsTypeForm";

export default function Description({ value, onChange }) {
  return (
    <div className=" " name="Description">
      <label
        htmlFor="Description"
        className="block text-sm font-medium text-gray-700"
      >
        Description <IsRequired />
      </label>
      <textarea
        id="Description"
        name="Description"
        className="mt-1 h-[15em] resize-none border  p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Décrivez votre projet d'idéation"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

Description.propTypes = FormType;
