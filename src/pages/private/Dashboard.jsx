import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { NavigationDashboardContext } from "../../components/Dashboard/navigation";

export function DashboardPanel() {
  const { navigation } = useContext(NavigationDashboardContext);

  return (
    <div className=" flex flex-col mt-7 pt-14 px-5  w-screen lg:w-full min-h-screen ">
      <div className="self-start bg-slate-300 px-20  py-2 rounded-t-lg">
        <p>Dashboard</p>
      </div>
      <div className="w-full h-full pt-8 mb-20 flex flex-col  bg-slate-300 p-4 rounded-b-lg rounded-tr-lg">
        <h1 className="font-semibold text-5xl text-gray-800 pb-4">
          Cells<span className="text-indigo-500">Force</span>
        </h1>
        <p className="text-medium max-w-[65ch] pb-10">
          Bienvenue sur Cellsforce, plateforme collaborative d’idéation.
          <br /> <br />
          Créez un projet de réflexion, ajoutez vos collaborateurs et faites la
          sélection des meilleurs idées de manière ludique.
        </p>

        <div className=" border-t border-gray-400 px-4 flex items-center justify-between md:px-0" />

        <ul className="grid md:grid-cols-2 gap-4 py-5  my-2  ">
          {navigation
            .filter((el) => el.name !== "Dashboard")
            .map((item) => {
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className=" bg-white p-2 flex flex-row h-24 rounded-lg text-gray-800"
                  >
                    <div className=" h-full w-fit max-w-5xl  rounded-lg">
                      {item.img ? (
                        <img
                          className=" h-full  rounded-lg bg-slate-200 p-2 min-w-[80px]"
                          src={item.img}
                          alt="null"
                        />
                      ) : (
                        <item.icon className="h-full  rounded-lg p-4 min-w-[80px] self-center  bg-slate-200" />
                      )}
                    </div>
                    <div className=" ml-1 sm:ml2  ">
                      <div className=" text-xl inline-flex  ">
                        <span className=" font-medium">{item.name}</span>
                        <ArrowRightIcon className=" h-5 ml-2 mt-1 sef" />
                      </div>
                      <p className="mt-1">{item.message}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
        <div className=" border-t border-gray-400 px-4 flex items-center justify-between sm:px-0 mb-5 mt-auto" />
      </div>
    </div>
  );
}
export function NotFound() {
  return <div>NotFound</div>;
}
