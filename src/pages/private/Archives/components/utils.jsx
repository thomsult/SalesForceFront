import PropTypes from "prop-types";
import React from "react";
import { Menu } from "@headlessui/react";

function Dot({ count }) {
  return (
    <span className="   px-2 mx-1   rounded-full bg-gray-300 text-white h-full">
      {count}
    </span>
  );
}

function ButtonMenu({ Action, defaultState, curentState, description }) {
  return (
    <Menu.Item>
      <button
        onClick={() => Action(defaultState)}
        type="button"
        className={`${
          curentState === defaultState ? "bg-gray-100" : ""
        } hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex w-full`}
      >
        {description}
      </button>
    </Menu.Item>
  );
}

ButtonMenu.defaultProps = {
  Action: () => {},
  curentState: "",
  defaultState: "",
  description: "",
};
Dot.defaultProps = {
  count: 0,
};

ButtonMenu.propTypes = {
  Action: PropTypes.func,
  curentState: PropTypes.string,
  defaultState: PropTypes.string,
  description: PropTypes.string,
};
Dot.propTypes = {
  count: PropTypes.number,
};
export { Dot, ButtonMenu };
