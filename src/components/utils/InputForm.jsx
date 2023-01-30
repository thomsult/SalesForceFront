import PropTypes from "prop-types";
import React, { useState } from "react";

const requireInput = (className) =>
  `${className} after:content-['*'] after:ml-1 after:text-red-500`;

export default function InputForm({
  text,
  label,
  type,
  required,
  classLabel,
  classInput,
  value,
  onChange,
  isInvalid,
  errorMessage,
}) {
  const [stateValue, setStateValue] = useState(value || "");

  const handleChange = (e) => {
    const { valid } = e.target.validity;
    setStateValue(e.target.value);
    try {
      if (valid) {
        onChange(e.target.value);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  const pattern = {
    password: "\\w{6,16}",
    text: "\\w{3,16}",
    email: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{1,63}$",
  };
  const classInvalid = "border-pink-500 ";
  return (
    <div>
      <label
        htmlFor={label}
        className={required ? requireInput(classLabel) : classLabel}
      >
        {text}
      </label>
      <div className="mt-1">
        <input
          placeholder={text}
          value={stateValue}
          pattern={pattern[type]}
          id={label}
          name={label}
          type={type}
          onChange={(e) => handleChange(e)}
          autoComplete={label}
          required={stateValue !== "" && required}
          className={(isInvalid && classInvalid) + classInput}
        />
        {isInvalid && (
          <small className="block text-red-600 text-sm pt-1">
            {errorMessage}
          </small>
        )}
        {required && (
          <small className="invisible peer-invalid:visible text-red-600 text-sm pt-1">
            Invalide : {type === "password" ? "6" : "3"} - 16 caractère"
          </small>
        )}
      </div>
    </div>
  );
}
InputForm.defaultProps = {
  value: "",
  isInvalid: "",
  errorMessage: "",
  onChange: () => {},
  classLabel: "block text-sm font-medium text-gray-700",
  classInput: `peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none`,
};
InputForm.propTypes = {
  classInput: PropTypes.string,
  classLabel: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  isInvalid: PropTypes.string,
  errorMessage: PropTypes.string,
};
