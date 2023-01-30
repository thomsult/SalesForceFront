/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from "prop-types";
import React, { createContext, useEffect, useState, useContext } from "react";
import { GetHashtagsByProject } from "../../../hooks/Crud/Hashtags";
import { AuthContext } from "../../../services/AuthContext";
import NotificationContext from "../../../components/Notification/NotificationContext";

const LobbyContext = createContext();
function LobbyProvider({ children, projects, step }) {
  const { CreateNewNotificationPush } = useContext(NotificationContext);
  const { socket, user } = useContext(AuthContext);
  const [socketConnected] = useState(socket.connected);
  const [project, setProject] = useState({ ...projects[0] });
  const [htags, setHtags] = useState([]);
  const [users, setUsers] = useState([]);
  const [showSideBar, setShowSideBar] = useState(false);
  const ReloadState = () => {
    GetHashtagsByProject(project.id, (res) => {
      try {
        const currentProject = { ...projects[0], ...res.data.project };
        setProject(currentProject);
        setUsers(currentProject.users);
        setHtags(currentProject.hashtags);
        if (step.step >= 1) {
          step.setStep(3);
          setTimeout(() => {
            socket.emit("ReloadState", {
              room: project.id,
              data: { user: user.id, data: currentProject },
            });
          }, 500);
        }
      } catch (error) {
        console.warn(res.response.status);
      }
    });
  };
  useEffect(() => {
    if (step.step > 1) {
      ReloadState();
    }
  }, [step, showSideBar]);

  useEffect(() => {
    socket.on("user joined", (data) => {
      CreateNewNotificationPush({
        Headers: projects[0].name,
        Icon: null,
        color: null,
        time: 1,
        Message: (
          <p>
            <strong>{data}</strong> joined the project
          </p>
        ),
      });
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("user left");
      socket.off("user joined");
      socket.off("error");
    };
  }, []);

  useEffect(() => {
    if (project) {
      socket.emit("subscribe", { room: projects[0].id, user: user.email });

      return () => {
        socket.emit("unsubscribe", { room: projects[0].id, user: user.email });
      };
    }
    return () => {};
  }, [socketConnected]);

  return (
    <LobbyContext.Provider
      value={{
        project: [project, setProject],
        htags: [htags, setHtags],
        users,
        currentUser: user,
        sidebar: [showSideBar, setShowSideBar],
        openMenu: (e) => setShowSideBar(e),
      }}
    >
      {children}
    </LobbyContext.Provider>
  );
}

LobbyProvider.defaultProps = {
  children: null,
  projects: null,
  step: 1,
};

LobbyProvider.propTypes = {
  children: PropTypes.node,
  step: PropTypes.shape({
    step: PropTypes.number,
    setStep: PropTypes.func,
  }),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

export { LobbyContext, LobbyProvider };
