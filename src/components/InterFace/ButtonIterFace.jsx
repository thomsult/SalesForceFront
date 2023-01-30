import React from "react";
import PropTypes from "prop-types";
import { PlusSmallIcon } from "@heroicons/react/24/solid";

function ButtonInterFace({ name, method, icon, isActivated }) {
  let classButton = "";

  if (isActivated) {
    classButton = `flex h-12 w-fit items-center hover:bg-gray-200 rounded-lg px-1 hover:text-white text-gray-800 transition duration-300 ease-in-out`;
  } else {
    classButton = `flex h-12 w-fit items-center bg-gray-200 rounded-lg px-1 hover:text-white text-gray-300 cursor-not-allowed transition duration-300 ease-in-out`;
  }

  return (
    <button
      type="button"
      className={classButton}
      onClick={isActivated ? method : () => {}}
    >
      {icon}
      <span className="font-medium hidden md:block">{name}</span>
    </button>
  );
}

export default ButtonInterFace;

ButtonInterFace.propTypes = {
  name: PropTypes.string.isRequired,
  method: PropTypes.func.isRequired,
  icon: PropTypes.node,
  isActivated: PropTypes.bool.isRequired,
};

ButtonInterFace.defaultProps = {
  icon: <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />,
};
