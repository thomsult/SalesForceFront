/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import ButtonInterFace from "@src/components/InterFace/ButtonIterFace";

import {
  TrashIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

import postNode from "./service/postNode";
import getUserData from "./service/getUserData";

function AlertMessage({ type, message, color, textColor }) {
  return (
    <div
      className={`animate-slideLeft ${textColor} animate-appear flex rounded-lg p-4 my-5 ${color} gap-4 items-center`}
    >
      <div>
        <ExclamationCircleIcon className="h-10 w-10" aria-hidden="true" />
      </div>
      <p>
        <span className="font-bold">{type}</span>! {message}
      </p>
    </div>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

// ------------------- NodeForNext ------------------- //
function NodeForNext({
  nodesToSendNext,
  removeAll,
  idProject,
  NextStep,
  noCurrent,
}) {
  const [validateChoice, setValidateChoice] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("alert");
  const [displayListHashtag, setDisplayListHashtags] = useState(true);
  /* map nodesToSendNext for req each obj */
  const sendAllNodes = (dataToSend, idUser, postMethod, project) => {
    dataToSend.map((el) =>
      postMethod(
        idUser,
        el,
        () => {
          console.warn("send into project");
          NextStep();
        },
        () => {
          console.error("error to sending all data");
        },
        project
      )
    );
  };

  return (
    <div className="flex gap-2">
      {validateChoice ? (
        <div className="animate-appear">
          <div
            role="button"
            aria-hidden="true"
            onClick={() => {
              setValidateChoice(false);
            }}
            className="fixed top-0 bottom-0 left-0 right-0 bg-gray-600 opacity-50"
          />
          <div className="animate-slideTop fixed top-[15vh] left-[5vw] right-[5vw]  lg:top-[40vh] lg:left-[33vw] lg:right-[33vw] bg-white p-4 rounded-lg flex flex-col items-center">
            <div className="flex gap-4 justify-between w-full mx-auto">
              <p className="text-lg font-bold text-gray-700 mx-10">
                Voulez-vous passez à l'étape de suivante?
              </p>
              <button
                onClick={() => {
                  setValidateChoice(false);
                }}
                type="button"
                className="rounded-full hover:bg-gray-200 h-fit w-fit p-1"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className=" w-2/3">
              {currentMessage === "validate" ? (
                <AlertMessage
                  type="Succes"
                  textColor="text-green-800"
                  color="bg-green-300"
                  message="Vos idées ont bien été envoyé, vous allez passez à l'étape suivante."
                />
              ) : (
                <AlertMessage
                  type="Attention"
                  textColor="text-red-800"
                  color="bg-red-300"
                  message="Aprés validation, le reste des idées seront supprimées.
        Archivez les idées que vous voulez gardez ou passez à l'étape suivante."
                />
              )}
            </div>
            <div className="flex justify-end gap-4 w-full">
              <button
                className="font-bold text-gray-700 hover:text-indigo-500 p-2 min-w-[100px] rounded-md"
                type="button"
                onClick={() => {
                  sendAllNodes(
                    nodesToSendNext,
                    getUserData().id,
                    postNode,
                    idProject
                  );
                  setCurrentMessage("validate");
                }}
              >
                Valider
              </button>
              <button
                className="font-bold text-gray-700 hover:text-red-700 p-2 min-w-[100px] rounded-md"
                type="button"
                onClick={() => {
                  setValidateChoice(false);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col px-2 py-1 border-[1px] rounded-lg text-sm text-gray-800 h-fit bg-white">
        <h2 className="font-medium">
          <span className="whitespace-nowrap">Idées sélectionnées</span>
        </h2>
        {nodesToSendNext.length > 0 && (
          <button
            type="button"
            className="border-[1px] rounded-full hover:bg-gray-200"
            onClick={() => {
              setDisplayListHashtags(!displayListHashtag);
            }}
          >
            {displayListHashtag ? "voir plus" : "cacher"}
          </button>
        )}
        <div className={displayListHashtag ? "hidden" : "block"}>
          {nodesToSendNext.length > 0 ? (
            <>
              <ul className=" mt-2 flex flex-col gap-4 h-full">
                {nodesToSendNext.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-2 items-center bg-gray-200 px-2 py-0.5 rounded-full"
                  >
                    <span className="max-w-[100px] truncate">#{item.name}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  removeAll([]);
                  d3.selectAll(".node-title").attr("isSelected", "false");
                  noCurrent("no current");
                }}
                type="button"
                className="hover:bg-gray-200 rounded-full flex items-center w-fit h-fit p-1.5 mx-auto mt-1.5 text-sm"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                supprimer
              </button>
            </>
          ) : (
            <p className="text-gray-600">3 maximum</p>
          )}
        </div>
      </div>
      <div
        className={
          nodesToSendNext.length !== 0
            ? "border-2 border-white hover:border-green-500 h-fit w-fit rounded-lg opacity-100"
            : "border-2 border-white hover:border-red-500 h-fit w-fit rounded-lg opacity-90"
        }
      >
        <ButtonInterFace
          method={() => {
            setValidateChoice(true);
            noCurrent("no current");
          }}
          isActivated={nodesToSendNext.length !== 0}
          name="Suivant"
          icon={
            <span className="mx-1.5 font-bold">{nodesToSendNext.length}/3</span>
          }
        />
      </div>
    </div>
  );
}

NodeForNext.propTypes = {
  nodesToSendNext: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  removeAll: PropTypes.func.isRequired,
  idProject: PropTypes.number.isRequired,
  noCurrent: PropTypes.func.isRequired,
  NextStep: PropTypes.func.isRequired,
};

export default NodeForNext;
