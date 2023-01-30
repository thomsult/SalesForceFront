import React, { useState, useMemo, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Projects from "./private/Projects/Projects";
import Archives from "./private/Archives/Archives";
import Profil from "./private/Profil/Profil";
import NewProjects from "./private/Projects/NewProjectTemplate/NewProjects";

import { DashboardPanel, NotFound } from "./private/Dashboard";
import Sidebar from "../components/Dashboard/SideBar/Sidebar";
import NavBar from "../components/Dashboard/NavBar";
import {
  NavigationDashboardContext,
  NavigationInitial,
  userNavigation,
} from "../components/Dashboard/navigation";
import InterFaceCreation from "./private/InterFace/InterFaceCreation";

import AxiosWithAuth from "../services/axiosRequest";
import Notification from "../components/Notification/Notification";
import { AuthContext } from "../services/AuthContext";

function ProtectedRoutes() {
  const user = useContext(AuthContext);
  const Navigate = useNavigate();
  const [projects, setProjects] = useState();
  // eslint-disable-next-line no-unused-vars
  const [projectsPending, setProjectsPending] = useState();
  const [reload, setReload] = useState(false);
  const [navigation, SetNavigation] = useState(NavigationInitial);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  useEffect(() => {
    AxiosWithAuth({ url: `/api/private/projects/` })
      .then((res) => {
        if (res.status === 200) {
          setProjects(
            res.data.filter(
              (pro) => pro.isPending === 0 || pro.isPending === null
            )
          );
          setProjectsPending(res.data.filter((pro) => pro.isPending === 1));
          SetNavigation((nav) =>
            nav.map((el) => {
              if (el.name === "Projects") {
                // eslint-disable-next-line no-param-reassign
                el.count = res.data.filter((pro) => pro.isPending !== 1).length;
              }
              return el;
            })
          );
        }
      })
      .catch((err) => {
        console.warn(err);
        Navigate("/login");
      });
  }, [reload, isLogin]);

  const navigationContext = useMemo(() => {
    return {
      navigation,
      SetNavigation,
      userNavigation,
    };
  }, []);

  return (
    <NavigationDashboardContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...navigationContext,
        projects: [projects, setProjects],
        projectsPending: [projectsPending, setProjectsPending],
        reload: setReload,
      }}
    >
      <Notification>
        <div className="flex h-screen  md:overflow-hidden ">
          <Sidebar className=" invisible lg:visible  flex flex-col flex-grow  shadow-xl bg-white  pb-4 overflow-y-auto  h-full mt-[3em] z-50" />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardPanel />} />
              <Route path="/Interface" element={<InterFaceCreation />} />
              <Route
                path="/Projects/*"
                element={<Projects projects={projects} />}
              />
              <Route path="/Projects/Template" element={<NewProjects />} />
              <Route path="/Archives/" element={<Archives />} />
              <Route path="/Profil" element={<Profil />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <NavBar />
      </Notification>
    </NavigationDashboardContext.Provider>
  );
}

export default ProtectedRoutes;
