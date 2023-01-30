import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import { NavigationDashboardContext } from "../navigation";

export default function Lobby({ projectName }) {
  const {
    projects: [projects],
  } = useContext(NavigationDashboardContext);
  const [currentProject, setCurrentProject] = useState({});
  const [host, setHost] = useState({});
  useEffect(() => {
    try {
      const proj = projects.filter(
        (el) =>
          el.name.replaceAll(/\s/g, "") === projectName.replaceAll(/%20/g, "")
      )[0];
      setCurrentProject(proj);
      setHost(proj.users.filter((el) => el.id === proj.idAuthor)[0]);
    } catch {
      setCurrentProject({});
    }
    return () => {
      setCurrentProject({});
    };
  }, [projectName, projects]);
  return (
    projectName !== null &&
    projectName !== "Template" &&
    currentProject?.name && (
      <>
        <div className="border-t mt-auto border-gray-300 mx-5" />
        <div className="   mb-14  ">
          <h2 className="text-4xl my-2  font-light text-center capitalize">
            {currentProject.name}
          </h2>
          <img
            className="mb-2 object-cover w-full h-48  "
            src={
              currentProject.projectPicture ||
              "https://random.imagecdn.app/400/350"
            }
            alt="projectPicture"
          />
          <div className=" max-h-24 p-2 overflow-scroll">
            <span className="font-medium mb-1 text-sm">Description</span>
            <p className="font-light text-sm">
              {currentProject.description || "Aucune Description"}
            </p>
          </div>
          <div className="flex items-center h-10 justify-around  w-full mt-4 ">
            <img
              className="rounded-full w-10 h-10"
              src={host.profilePicture}
              alt="usplatch"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "./../../../../public/templateAccount.png";
              }}
            />
            <div className="flex flex-col items-center  ">
              <p className="font-medium">
                {host.firstName}
                {host.lastName}
              </p>
              <p>{host.companyName}</p>
            </div>
            <div className="bg-orange-400 rounded-lg p-2">Hôte</div>
          </div>
        </div>
      </>
    )
  );
}
Lobby.defaultProps = {
  projectName: null,
};

Lobby.propTypes = {
  projectName: PropTypes.string,
};
