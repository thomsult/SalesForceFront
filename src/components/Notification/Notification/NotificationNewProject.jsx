import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

export default function NotificationNewProject({ onClose }) {
  return (
    <Dialog.Panel className="w-full flex  max-w-md md:-translate-x-[40vw] -translate-x-[5vw] translate-y-[35vh] overflow-hidden rounded-2xl bg-white p-6  shadow-xl transition-all">
      <FolderPlusIcon className="  h-full w-10 mr-5 text-zinc-400" />
      <div className="">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Création de projet
        </Dialog.Title>

        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Voulez vous démarrer un nouveau projet?
          </p>
        </div>

        <div className="mt-4 flex justify-between w-4/5">
          <button
            type="button"
            className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
            onClick={() => onClose({ to: "/dashboard/Projects/Template" })}
          >
            Accepter
          </button>
          <button
            type="button"
            className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800"
            onClick={() => onClose({ to: -1 })}
          >
            Annuler
          </button>
        </div>
      </div>
    </Dialog.Panel>
  );
}

NotificationNewProject.propTypes = {
  onClose: PropTypes.func.isRequired,
};
