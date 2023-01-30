import React from "react";
import FormType from "./PropsTypeForm";

export default function LinksVideo({ value, onChange }) {
  return (
    <div className="" name="LienVisio">
      <label
        htmlFor="LienVisio"
        className="block text-sm font-medium text-gray-700"
      >
        Lien vidéo-conférence
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
          http://
        </span>
        <input
          type="text"
          name="LienVisio"
          id="LienVisio"
          className="block w-full p-2 flex-1 rounded-none border rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="www.exemple.com"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
LinksVideo.propTypes = FormType;
