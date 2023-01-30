import PropTypes from "prop-types";
import React from "react";

import { XMarkIcon, InboxIcon } from "@heroicons/react/24/solid";

export default function NotificationProject({
  invitationData,
  accept,
  decline,
  index,
  onClose,
}) {
  return (
    <div className="max-w-sm mb-2  right-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <InboxIcon className="h-10 w-10" aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {invitationData.Author}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              vous a envoyé une invitation pour le project :{" "}
              <strong className="text-sm font-medium text-gray-900 capitalize">
                {" "}
                {invitationData.projectName}
              </strong>
              .
            </p>
            <div className="mt-4 flex">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  accept({ index, id: invitationData.projectId });
                }}
              >
                Accepter
              </button>
              <button
                type="button"
                className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  decline(index);
                }}
              >
                Décliner
              </button>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => onClose({ to: false })}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

NotificationProject.propTypes = {
  invitationData: PropTypes.shape({
    projectName: PropTypes.string,
    Author: PropTypes.string,
    projectId: PropTypes.number,
  }).isRequired,
  accept: PropTypes.func.isRequired,
  decline: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
