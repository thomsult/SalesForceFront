import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function MenuButton({ children, titleComposant }) {
  return (
    <Menu as="div" className="ml-3  ">
      <Menu.Button className="  text-indigo-600 hover:text-indigo-900">
        {titleComposant}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="relative">
          <Menu.Items className=" absolute z-10 right-0 bottom-0 mt-2 w-48 rounded-md shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {children}
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
}

MenuButton.propTypes = {
  children: PropTypes.node.isRequired,
  titleComposant: PropTypes.node.isRequired,
};
