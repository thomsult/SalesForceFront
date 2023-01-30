/* eslint-disable react/no-array-index-key */
import React, { useState, useContext, useEffect } from "react";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { CreateProject } from "../../../../hooks/Crud/Projects";
import NewProjectsStep1 from "./NewProjectTemplateStep1";
import NewProjectsStep2 from "./NewProjectTemplateStep2";
import NewProjectsFinal from "./NewProjectsFinal";
import { NavigationDashboardContext } from "../../../../components/Dashboard/navigation";

import { GetAllUsers } from "../../../../hooks/Crud/Users";

export default function NewProjects() {
  const nav = useNavigate();
  const context = useContext(NavigationDashboardContext);

  const step = ["Etape 1", "Etape 2", "Etape 3"];
  const [curentStep, SetCurrentStep] = useState("Etape 1");
  const [projects, SetProject] = useState({
    name: "Nouveau projet",
    companyName: "",
    status: "En Cours",
    description: "",
    visioLink: "",
    sub: 1,
    invitePending: [],
    projectPicture: "",
    category: "",
    memberLimit: 15,
    timer: 0,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    users.length === 0 && GetAllUsers((res) => setUsers(res));
  }, []);

  const handleSubmit = () => CreateProject(projects, context, nav);

  const Tabs = (num) =>
    `${
      curentStep === num ? "bg-slate-300" : "bg-slate-100"
    }  rounded-t-lg py-2 hover:bg-slate-400 w-full`;
  return (
    <div className=" flex flex-col mt-7 pt-14 px-5   w-full h-screen md:pr-10 overflow-scroll ">
      <div className="flex gap-1 justify-between max-w-xl  text-gray-800 hover:text-gray-700">
        <Link
          to="/dashboard/Projects"
          type="button"
          className=" flex items-center mr-10 mb-2 "
        >
          <ArrowUturnLeftIcon className="mr-1.5 h-5 " />
          <span>Retour</span>
        </Link>
        {step.map((cur, index) => (
          <button
            key={index}
            type="button"
            className={Tabs(cur)}
            onClick={() => SetCurrentStep(cur)}
          >
            {cur}
          </button>
        ))}
      </div>

      <div className="w-full  flex flex-col  mb-14 bg-slate-300 p-4 rounded-b-lg rounded-tl-lg sm:rounded-tr-lg relative z-0 ">
        <header className="w-full flex flex-row ">
          <div className=" flex w-full">
            <h2 className=" px-10 mb-2 ml-3  text-xl font-medium text-gray-700 whitespace-nowrap">
              {projects.name}
            </h2>
            <div className=" h-full w-full flex justify-center align-center">
              <div className="bg-gray-700 h-[1px] self-center w-full" />
            </div>
          </div>
        </header>
        <section className=" flex-1 bg-white  shadow-sm rounded-lg  py-1     flex flex-col">
          {curentStep === "Etape 1" && (
            <NewProjectsStep1
              project={projects}
              update={SetProject}
              users={users}
            />
          )}
          {curentStep === "Etape 2" && (
            <NewProjectsStep2 project={projects} update={SetProject} />
          )}
          {curentStep === "Etape 3" && <NewProjectsFinal project={projects} />}

          <footer className="pt-4 mt-auto  mb-5">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center gap-20">
                <button
                  onClick={() =>
                    SetCurrentStep(
                      step[
                        step.indexOf(curentStep) - 1 !== -1
                          ? step.indexOf(curentStep) - 1
                          : step.indexOf(curentStep)
                      ]
                    )
                  }
                  type="button"
                  className={`${
                    step.indexOf(curentStep) === 0
                      ? " text-gray-400 cursor-default  focus:ring-transparent"
                      : " text-gray-700"
                  } inline-flex items-center shadow-sm px-4 py-1.5 border text-sm leading-5 font-medium rounded-full  border-gray-300  bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span>Precedent</span>
                </button>
                <button
                  onClick={() => {
                    if (curentStep === "Etape 3") {
                      handleSubmit();
                    }
                    SetCurrentStep(
                      step[
                        step.indexOf(curentStep) + 1 !== step.length
                          ? step.indexOf(curentStep) + 1
                          : step.indexOf(curentStep)
                      ]
                    );
                  }}
                  type="button"
                  className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span>
                    {step.indexOf(curentStep) === step.length - 1
                      ? "Terminer"
                      : "Suivant"}
                  </span>
                </button>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
