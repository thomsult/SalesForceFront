import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProjectsManager from "./ProjectsManager";
import Lobby from "../Lobby/Lobby";

import { GetProjectByUser } from "../../../hooks/Crud/Projects";

function Projects() {
  // const [projects, setprojects] = useState([]);
  const [projectsInvited, setprojectsInvited] = useState([]);

  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    GetProjectByUser((res) => {
      setprojectsInvited(
        res.filter((pro) => pro.isPending === 0 || pro.isPending === null)
      );
      setIsLoading(true);
    });
  }, []);

  const pathname = useLocation().pathname.match(/Projects\/(.*)/);
  const projectName = pathname ? pathname[1] : null;
  // const IdProject = null;
  if (isloading) {
    return !projectName ? (
      <div className=" flex flex-col mt-7 pt-14 px-5   w-full h-screen md:pr-10  ">
        <div className="self-start bg-slate-300 px-20  py-2 rounded-t-lg">
          Projets
        </div>
        <div className="w-full min-h-[50vh] pt-8 mb-14  flex flex-col  bg-slate-300 p-4 rounded-b-lg rounded-tr-lg relative z-0 ">
          <ProjectsManager projects={projectsInvited} />
          <div />
        </div>
      </div>
    ) : (
      <Lobby
        projects={projectsInvited.filter(
          (el) => el.name === projectName.replaceAll(/%20/g, " ")
        )}
      />
    );
  }
}

export default Projects;
