import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  PlusSmallIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function UserCard({ user, onClick }) {
  const { profilePicture, email, userName, companyName } = user;
  return (
    <div className=" hover:bg-gray-50">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full"
              src={profilePicture || "/templateAccount.png"}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="text-sm font-medium text-indigo-600 truncate">
                {userName}
              </p>
              <div className="flex flex-col-reverse">
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <EnvelopeIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="truncate">{email}</span>
                </p>
                <p className="mt-2 flex items-center text-xs text-gray-600">
                  <BuildingOfficeIcon
                    className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="truncate">{companyName}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Menu as="div" className="ml-3 relative ">
          <Menu.Button className=" text-indigo-600 hover:text-indigo-900">
            <PlusSmallIcon
              className="h-7 w-7 text-gray-400"
              aria-hidden="true"
            />
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
            <Menu.Items className=" absolute z-50 top-5 right-0 mt-2 w-48 rounded-md shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <button
                onClick={onClick}
                type="button"
                className="hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex w-full"
              >
                Envoyer une invitation
              </button>
              <button
                type="button"
                className="hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex w-full"
              >
                Voir le profil
              </button>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }).isRequired,
};
