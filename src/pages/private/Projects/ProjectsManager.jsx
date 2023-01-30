import PropTypes from "prop-types";
import {
  FolderIcon,
  PlusSmallIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RemoveProject } from "../../../hooks/Crud/Projects";
import ProfilSideBar from "../Profil/ProfilSideBar";
import MenuButton from "../../../components/utils/ContextMenu/MenuButtonEditRemove";
import { NavigationDashboardContext } from "../../../components/Dashboard/navigation";
import { AuthContext } from "../../../services/AuthContext";
import NotificationContext from "../../../components/Notification/NotificationContext";

export default function ProjectsManager({ projects }) {
  const [search, SetSearch] = useState("");
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { user } = useContext(AuthContext);
  const context = useContext(NavigationDashboardContext);

  const { CreateNewNotificationPush } = useContext(NotificationContext);
  const SendNotification = () => {
    CreateNewNotificationPush({
      Headers: "Project Supprimé",
      Icon: CheckCircleIcon,
      color: "text-[#3a9718]",
      Message: "votre Htag à bien été Supprimé.",
    });
    /* onClick(); */
  };
  const handleRemove = (id) =>
    RemoveProject(id, () => {
      SendNotification();
      context.reload();
    });

  return (
    <>
      <header className="flex flex-col md:flex-row bg-[#364559] items-center  px-4 py-4 rounded-lg  ">
        <FolderIcon className="  h-full w-10 text-zinc-200 " />
        <p className="text-left text-zinc-200 flex-1 ml-4">
          Liste de mes projets
        </p>
        <div className="flex flex-col items-center md:flex-row gap-3 w-full md:max-w-sm ">
          {projects && projects.length > 0 && (
            <>
              <div className=" w-full  ">
                <Link
                  to="/dashboard/Projects?NewProject=0"
                  type="button"
                  className="relative w-full md:max-w-[15em] inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  <PlusSmallIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span>Nouveau projet</span>
                </Link>
              </div>

              <div className="relative w-full   ">
                <div className="absolute inset-y-0 left-0 flex  items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 h-9"
                  placeholder="Nom du Projects"
                  onChange={(event) => {
                    SetSearch(event.target.value);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </header>
      <ul className=" bg-gray-200 border border-gray-300  h-screen overflow-auto  mt-5 rounded-xl shadow-md">
        {projects && projects.length > 0 ? (
          projects
            .filter(
              (el) => el.name.match(new RegExp(`${search}`, "i")) !== null
            )
            .map((project) => (
              <li
                key={project.id}
                className="  border-slate-300 mx-2 hover:bg-slate-200"
              >
                <div className="flex bg-white rounded-md justify-between    hover:bg-slate-200 mt-2 mx-2 px-2 py-4 ">
                  <Link
                    to={`/dashboard/Projects/${project.name}`}
                    className="truncate flex flex-col w-full h-full px-4"
                  >
                    <div className="flex text-sm ">
                      <h5 className="capitalize font-medium text-indigo-600 text-3xl truncate">
                        {`"${project.name}"`}
                        <small className="ml-2 font-light text-sm text-gray-800">
                          by{" "}
                          {project.idAuthor !== user.id
                            ? project.users.find(
                                (el) => el.id === project.idAuthor
                              )?.userName || "inconnu"
                            : "Vous"}
                        </small>
                      </h5>
                    </div>
                    <div className="flex flex-row justify-between w-full mt-2 ">
                      {" "}
                      <p>
                        Date :{" "}
                        {new Date(project.date).toLocaleDateString(
                          "fr-FR",
                          dateOptions
                        )}
                      </p>
                    </div>
                    <div className=" flex mt-auto mb-4">
                      <div className="flex flex-col space-y-1 mt-4 text-sm text-gray-500">
                        <p>
                          {project.users.length}{" "}
                          {project.users.length > 1 ? "membres" : "membre"}
                        </p>
                        <p>
                          {" "}
                          Remplaçant:{" "}
                          <span className="text-indigo-600 font-light">
                            {project.users.find((el) => el.id === project.idSub)
                              ?.userName || "inconnu"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col  items-end mt-4 md:mt-0 mr-2   ">
                    <div className="flex md:w-40 items-center justify-end  ">
                      Statut: {project.status}
                      <MenuButton
                        titleComposant={
                          <EllipsisVerticalIcon
                            className="h-5 w-5 text-gray-400 mt-2"
                            aria-hidden="true"
                          />
                        }
                      >
                        <button
                          onClick={() => handleRemove(project.id)}
                          type="button"
                          className="hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex w-full"
                        >
                          {project.idAuthor !== user.id
                            ? "Quitter le projet"
                            : "Supprimer le projet"}
                        </button>
                        {project.idAuthor !== user.id ? null : (
                          <button
                            type="button"
                            className="hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex w-full"
                          >
                            Modifier le projet
                          </button>
                        )}
                      </MenuButton>
                    </div>
                    <div className="mt-auto mb-4 ml-2">
                      <div className="flex  ">
                        {project.users.map((userEl, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <ProfilSideBar
                            user={userEl}
                            key={userEl.id}
                            index={index}
                          >
                            <img
                              className={userEl.isPending ? "opacity-80" : ""}
                              src={
                                userEl.profilePicture || "/templateAccount.png"
                              }
                              alt={userEl.email}
                            />
                          </ProfilSideBar>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-fit mx-auto ">
            <h1 className="text-2xl font-semibold text-gray-600 ">
              Vous n'avez pas encore de projet
            </h1>
            {projects && projects.length === 0 && (
              <div className="mt-3  w-full ">
                <Link
                  to="/dashboard/Projects?NewProject=0"
                  type="button"
                  className="relative w-full  inline-flex items-center justify-center  py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  <PlusSmallIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span>Nouveau Projet</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </ul>
    </>
  );
}
ProjectsManager.defaultProps = {
  projects: [],
};

ProjectsManager.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})),
};
