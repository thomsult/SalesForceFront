/* eslint-disable no-param-reassign */
import React, { useContext } from "react";

import { PropTypes } from "prop-types";

import { AuthContext } from "../../../../services/AuthContext";

export default function NewProjectsFinal({ project }) {
  const { user } = useContext(AuthContext);
  const RootUser = user;
  const {
    description,
    visioLink,
    invitePending,
    projectPicture,
    category,
    memberLimit,
    timer,
  } = project;
  project.companyName = user.companyName;
  project.userAuthor = user;
  const GetSub = () => {
    if (
      invitePending.length > 0 &&
      invitePending.filter((userInvited) => userInvited.isSub)[0]
    ) {
      return invitePending.filter((userInvited) => userInvited.isSub)[0]
        .userName;
    }
    return "Vous n'avez pas de remplaçant";
  };

  return (
    <div className="flex flex-col overflow-auto ">
      <div className="md:flex    p-4">
        <div className=" md:w-1/2  md:mr-4 mr-0 rounded-lg overflow-hidden">
          <img
            className=" object-cover h-[20em] w-full"
            src={projectPicture}
            alt="usplatch"
          />
        </div>

        <div className="m-2 font-light flex mr-auto flex-col md:ml-auto md:space-y-7 md:gap-10 ">
          <div>
            <p className="text-gray-500 mb-1 font-medium">Limite de membres</p>
            <p>
              {memberLimit} {memberLimit > 1 ? "membres" : "membre"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1 font-medium">Catégorie</p>
            <p>{category || "Aucun catégorie"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1 font-medium">Remplaçant</p>
            <p>{GetSub()}</p>
          </div>
        </div>
        <div className="m-2 font-light flex flex-col md:gap-14">
          <div>
            <p className="text-gray-500 mb-1 font-medium">Date de création</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1 font-medium">Timer Phase 1</p>
            <p>{timer} Min</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1 font-medium">
              Lien vidéo-conférence
            </p>
            <a href={`http://${visioLink}`}>http://{visioLink}</a>
          </div>
        </div>
      </div>

      <div className="flex justify-between  flex-col md:flex-row font-light">
        <div className="m-2 w-full">
          <div className="flex  md:justify-around  pb-5 md:border-b border-gray-300">
            <div className="flex gap-5 w-full items-center ml-4">
              <img
                className="max-h-[5em]  rounded-full"
                src={RootUser.profilePicture}
                alt={RootUser.userName}
              />
              <div className="  font-normal">
                <p className="text-2xl font-medium">{RootUser.userName}</p>
                <p className="text-xl font-light">{RootUser.email}</p>
              </div>
              <p className="bg-red-400 rounded-2xl p-4 font-normal h-fit sm:flex hidden">
                Hote
              </p>
            </div>
          </div>
          <div className="md:p-4 ">
            <p className="text-gray-500 mb-1 font-medium">Description </p>
            <p className="mb-auto">
              {description || "Vous n'avez pas de description"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
NewProjectsFinal.propTypes = {
  project: PropTypes.shape({
    companyName: PropTypes.string,
    userAuthor: PropTypes.shape({}),
    category: PropTypes.string,
    description: PropTypes.string,
    projectPicture: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    invitePending: PropTypes.array,
    visioLink: PropTypes.string,
    memberLimit: PropTypes.number,
    name: PropTypes.string,
    timer: PropTypes.number || 0,
  }).isRequired,
};
