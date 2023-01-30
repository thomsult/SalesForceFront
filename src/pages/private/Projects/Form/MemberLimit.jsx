import React from "react";
import PropTypes from "prop-types";

export default function MemberLimit({ value, onChange }) {
  return (
    <div className="" name="membreLimit">
      <label
        htmlFor="membreLimit"
        className="block text-sm font-medium text-gray-700"
      >
        Limite de membres
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="number"
          name="membreLimit"
          id="membreLimit"
          className="block w-full p-2 flex-1 rounded border  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="15"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        />
      </div>
    </div>
  );
}
MemberLimit.defaultProps = {
  value: 15,
};

MemberLimit.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
