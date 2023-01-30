/* eslint-disable camelcase */
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProfilsPictures from "./components/ProfilsPictures";

// to={`./${project.id}/Users/${user.id}`}
export default function ProfilSideBar({ user, children, index }) {
  const [showSideBar, setShowSideBar] = useState(false);
  const {
    rank = 0,
    firstName,
    lastName,
    email,
    description,
    profilePicture,
    companyName,
    isOnline,
    isPending,
    location = "Non communiquée",
  } = user;

  return (
    <>
      <button
        type="button"
        onClick={() => setShowSideBar((isShowing) => !isShowing)}
      >
        <div
          className={`h-9 w-9 rounded-full  overflow-hidden ring-2  hover:scale-110 hover:transition-none 
          ${isOnline ? "ring-green-500" : "ring-red-500"}
          ${isPending ? "opacity-80" : "opacity-100"}
          ${`z-[${index}]`}
          `}
        >
          {children}
        </div>
      </button>
      <Transition
        show={showSideBar}
        enter=" transform-y-0 transition-all duration-100"
        enterFrom=" transform-y-50"
        enterTo="transform-y-full"
        leave="transform-y-full transition-all duration-100"
        leaveFrom=" opacity-100 transform-y-full"
        leaveTo=" transform-y-0 opacity-0"
      >
        <div className="fixed border-l border-gray-500 shadow-xl right-0 z-[100] min-h-full w-full max-w-xl md:max-w-md top-0 bg-white mt-[4em] flex flex-col items-start  ">
          <button
            type="button"
            onClick={() => setShowSideBar((isShowing) => !isShowing)}
          >
            <XMarkIcon className="h-8 mt-4 ml-4" />
          </button>

          <div className="h-full overflow-hidden mx-auto  flex flex-col">
            <ProfilsPictures
              user={{ firstName, lastName }}
              profilePicture={profilePicture}
              rank={rank}
              isOnline={isOnline === 0}
            />
            <div className="pb-4 pt-8 self-start">
              <h2 className="text-5xl font-semibold">
                {`${firstName} ${lastName} `}
              </h2>
              <h3 className="text-3xl font-thin ">{email}</h3>
            </div>
            <div>
              <p className="text-gray-500 mb-1 capitalize">A propos de moi</p>
              <p>{description}</p>
            </div>

            <div className="flex  w-full pt-8 mt-auto justify-between  ">
              <div>
                <p className="text-gray-500 mb-1 capitalize">Entreprise</p>
                <p>{companyName}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 capitalize">Localité</p>
                <p>{location}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

ProfilSideBar.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.shape({
    companyName: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    isOnline: PropTypes.number,
    isPending: PropTypes.number || null,
    lastName: PropTypes.string,
    location: PropTypes.string,
    profilePicture: PropTypes.string,
    rank: PropTypes.number,
  }).isRequired,
};
