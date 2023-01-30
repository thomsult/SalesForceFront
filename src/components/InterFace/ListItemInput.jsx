import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import { PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/solid";

function ListItemInput({
  titleInput,
  valueInput,
  onChangeInput,
  onClickInput,
  deleteLienModal,
  listItem,
  placeholderExemple,
  limitAdd,
}) {
  let rangeUrl = 0;
  return (
    <div className="w-full lg:w-[45%]">
      <label htmlFor="liens" className="text-md font-medium text-gray-800">
        {titleInput} :{" "}
        <span
          id={`${titleInput.toLowerCase()}-error-message`}
          className="hidden text-sm text-red-500 font-light"
        >
          Vous ne pouvez pas ajouter plus de {limitAdd}{" "}
          {titleInput.toLowerCase()}
        </span>
      </label>
      <div className="flex gap-4 items-center">
        <input
          name="liens"
          className="peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 disabled:shadow-none text-gray-700"
          value={valueInput}
          onChange={onChangeInput}
          placeholder={placeholderExemple}
        />
        <button
          className="bg-white hover:bg-gray-200 rounded-lg border-2 h-fit w-fit hover:text-white"
          type="button"
          onClick={() => {
            rangeUrl = listItem.split(";").length;
            if (rangeUrl >= limitAdd) {
              d3.select(`#${titleInput.toLowerCase()}-error-message`).style(
                "display",
                "inline-block"
              );
            } else {
              onClickInput();
              d3.select(`#${titleInput.toLowerCase()}-error-message`).style(
                "display",
                "none"
              );
            }
          }}
        >
          <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      {/* fix key prop error */}
      {listItem
        ? listItem.split(";").map((el, i) =>
            el ? (
              <li
                key={el.id}
                className="flex bg-gray-200 w-full justify-between py-1.5 px-2 rounded-full mt-1 mx-auto"
              >
                <p className="w-[90%] truncate">{el}</p>
                <button
                  type="button"
                  onClick={() => {
                    deleteLienModal(
                      listItem
                        .split(";")
                        .filter((display, j) => (j !== i ? display : ""))
                        .join(";")
                    );

                    d3.select(
                      `#${titleInput.toLowerCase()}-error-message`
                    ).style("display", "none");
                  }}
                  className="text-gray-400 hover:bg-white hover:text-gray-600 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </li>
            ) : null
          )
        : null}
    </div>
  );
}

export default ListItemInput;

ListItemInput.propTypes = {
  titleInput: PropTypes.string.isRequired,
  valueInput: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onClickInput: PropTypes.func.isRequired,
  deleteLienModal: PropTypes.func.isRequired,
  listItem: PropTypes.string.isRequired,
  placeholderExemple: PropTypes.string.isRequired,
  limitAdd: PropTypes.number.isRequired,
};
