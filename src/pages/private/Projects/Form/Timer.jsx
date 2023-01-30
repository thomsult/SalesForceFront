import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Timer({ value, onChange }) {
  const [IsEnable, SetIsEnable] = useState(false);
  return (
    <>
      <div className="flex items-center" name="TimerPhase1Toggles">
        <input
          id="TimerPhase1"
          name="TimerPhase1"
          type="checkbox"
          onClick={() => SetIsEnable((e) => !e)}
          className="h-4 w-4 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label
          htmlFor="TimerPhase1"
          className="ml-3 block text-sm font-medium text-gray-700 "
        >
          Timer phase 1
        </label>
      </div>
      {IsEnable && (
        <div className="" name="TimerLimit">
          <label
            htmlFor="TimerLimit"
            className="block text-sm font-medium text-gray-700"
          >
            Définir le Timer
          </label>
          <div className="mt-1 flex rounded-md shadow-sm relative">
            <input
              type="text"
              name="TimerLimit"
              id="TimerLimit"
              className=" block w-full p-2 flex-1 rounded border  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="15 min"
              defaultValue={value}
              onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
              <span className="text-gray-500">minutes</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
Timer.defaultProps = {
  value: "0",
};

Timer.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
