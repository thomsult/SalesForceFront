/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import React, { useState, useEffect, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DeleteHashtagsOnProjectById,
  GetHashtagsByProject,
} from "../../../hooks/Crud/Hashtags";
import VoteDisplay from "./VoteDisplay";
import { LobbyContext } from "./LobbyContext";

export default function LobbySideBar({ children }) {
  const context = useContext(LobbyContext);
  const [showSideBar, setShowSideBar] = context.sidebar;
  const [currentProject, setCurrentProject] = context.project;
  const [htags, setHtags] = context.htags;
  const [vote, setVote] = useState([]);
  onclose = () => {
    // show.callBack();
    setShowSideBar(false);
    context.openMenu(false);
  };
  const getVote = () =>
    htags.filter((ht) => ht.hashtag_name === showSideBar.data);

  function CurrentHashtag() {
    return (
      htags.find(
        (ht) =>
          ht.idUser === context.currentUser.id &&
          ht.hashtag_name === showSideBar.data
      ) || null
    );
  }

  useEffect(() => {
    if (currentProject) {
      setVote(getVote());
    }
  }, [showSideBar.data, currentProject]);

  const ArchiveHtag = () => {
    const ht = CurrentHashtag();
    const newHtags = htags.filter((h) => h.id !== ht.id);
    setHtags(newHtags);
    DeleteHashtagsOnProjectById(ht.id, currentProject.id, () => {
      setShowSideBar(false);
    });
  };

  return (
    <>
      {currentProject && (
        <Transition
          show={showSideBar.data !== undefined}
          className="bg-[#1a202c1f] "
        >
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-[100%] xl:translate-x-[55%] opacity-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom=" translate-x-[100%] xl:translate-x-[55%]  opacity-100"
            leaveTo="-translate-x-full opacity-0"
            className="translate-x-[100] sm:translate-x-[50%] xl:translate-x-[65%]"
          >
            <div className=" fixed z-50 w-screen md:w-[50%] xl:w-[35%]  mr-4 bg-white border-l shadow-md ">
              <div className="flex items-center my-4">
                <button type="button" onClick={onclose}>
                  <XMarkIcon className="h-8  ml-4" />
                </button>
                <h3 className="text-2xl ml-4 ">
                  <strong>#</strong>Htag:
                  <span className="font-light text-gray-600">
                    {showSideBar.data}
                  </span>
                </h3>
              </div>
              <div className=" w-auto  h-screen overflow-scroll pb-40     ">
                <div className=" flex flex-col  pt-2   ">
                  <VoteDisplay Htags={vote} currentProject={currentProject} />
                  {CurrentHashtag() && (
                    <button
                      type="button"
                      onClick={ArchiveHtag}
                      className=" border border-red-500 hover:border-red-700 text-red-500 font-bold py-2 px-4 rounded w-fit ml-auto mr-4 "
                    >
                      Archiver mon <strong>#</strong>Htag du projet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </Transition>
      )}
      {children}
    </>
  );
}

LobbySideBar.propTypes = {
  children: PropTypes.node.isRequired,
};
