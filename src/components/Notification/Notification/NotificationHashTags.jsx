/* eslint-disable react/no-array-index-key */
import PropTypes from "prop-types";

import React, { useState, useContext } from "react";

import { Dialog, RadioGroup } from "@headlessui/react";
import { NavigationDashboardContext } from "../../Dashboard/navigation";

export default function NotificationHashTags({ onClose, OnOK }) {
  const context = useContext(NavigationDashboardContext);
  const [project] = context.projects;
  const [plan, setPlan] = useState(null);

  const handleOnOK = () => {
    if (plan) {
      OnOK({
        id: plan,
        name: project.find((currentProject) => currentProject.id === plan).name,
      });
    }
  };

  return (
    <Dialog.Panel className=" p-4  rounded-md -translate-x-[7%] translate-y-[30vh] xl:-translate-x-[25vw] xl:translate-y-[30vh] overflow-hidden bg-white   shadow-xl transition-all">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Ajouter le hashtag à un Project
            </Dialog.Title>
            <div className=" pt-1 ">
              <div className="text-sm text-gray-500 w-full ">
                Sélectionner un project pour ajouter le hashtag :
                <RadioGroup
                  value={plan}
                  onChange={setPlan}
                  className=" flex flex-col mt-2 rounded-md shadow-sm -space-y-px overflow-hidden"
                >
                  {project.map((currentProject, index) => (
                    <RadioGroup.Option
                      key={index}
                      value={currentProject.id}
                      className="flex "
                    >
                      {({ checked }) => (
                        <div
                          className={
                            checked
                              ? "bg-gray-50 flex gap-2 flex-1  p-2"
                              : "flex gap-2 flex-1  p-2"
                          }
                        >
                          <input
                            type="checkbox"
                            name={currentProject.name}
                            id=""
                            defaultChecked={checked}
                          />
                          <p>{currentProject.name}</p>
                        </div>
                      )}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="mt-3 mr-auto w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleOnOK}
        >
          Ok
        </button>
      </div>
    </Dialog.Panel>
  );
}

NotificationHashTags.propTypes = {
  OnOK: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
