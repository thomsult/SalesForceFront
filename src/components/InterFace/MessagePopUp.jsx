import React from "react";
import PropTypes from "prop-types";

// ------------------- Popup ------------------- //
function MessagePopUp({ message, type, icon, activated, colorMessage }) {
  return activated ? (
    <div
      className={`opacity-0 animate-popUp fixed right-[15%] top-[15%] bg-${colorMessage}-400 text-red-900 text-md py-4 px-4 rounded-lg flex items-center gap-4 max-w-sm`}
    >
      {icon}
      <p>
        <span className="font-bold text-lg">{type}! </span>
        {message}
      </p>
    </div>
  ) : null;
}

export default MessagePopUp;

MessagePopUp.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activated: PropTypes.bool.isRequired,
  colorMessage: PropTypes.string.isRequired,
};
