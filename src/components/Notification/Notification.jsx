/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React, {
  useState,
  Fragment,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useNavigate, useSearchParams } from "react-router-dom";
import NotificationContext from "./NotificationContext";
import NotificationProject from "./Notification/NotificationProject";
import NotificationNewProject from "./Notification/NotificationNewProject";
import NotificationPush from "./Notification/NotificationPush";
import { NavigationDashboardContext } from "../Dashboard/navigation";
import { UpdateUserByProject } from "../../hooks/Crud/UsersByProject";

export default function Notification({ children }) {
  const { projectsPending, reload } = useContext(NavigationDashboardContext);
  const [projectsPendingData] = projectsPending;
  const [searchParams] = useSearchParams();

  const [notificationPending, addNotificationPending] = useState([]);
  const [NotificationChild, SetNotificationChild] = useState({
    isOpen: false,
    components: [],
    overlay: false,
    push: false,
    index: 0,
  });

  const navigate = useNavigate();
  const handleCloseModal = ({ info, index }) => {
    SetNotificationChild((Notify) => {
      return {
        isOpen: Notify.components.length > 1,
        push: false,
        overlay: false,
        components:
          (Notify.components &&
            Notify.components.length > 1 &&
            Notify.components.filter((item, indexEl) => indexEl !== index)) ||
          [],
      };
    });

    if (typeof info.to !== "object" && info && info.to) {
      navigate(info.to);
    }
  };

  const DisplayNotificationPending = (NotificationState) => {
    if (NotificationState.length > 0) {
      SetNotificationChild(() => {
        return {
          isOpen: true,
          push: false,
          overlay: false,
          components: NotificationState.map((project, index) => {
            return (
              <NotificationProject
                invitationData={project}
                accept={project.OnAccept}
                decline={project.OnDecline}
                key={project.id}
                index={index}
                onClose={() => handleCloseModal({ info: { to: false }, index })}
              />
            );
          }),
        };
      });
    }
  };

  const CreateNewNotificationPush = (data) => {
    SetNotificationChild(() => {
      return {
        isOpen: true,
        components: (
          <NotificationPush
            onClose={() => handleCloseModal({ info: { to: false }, index: 0 })}
            data={data}
          />
        ),
        overlay: false,
        push: true,
        index: 0,
      };
    });
  };

  const CreateNewModal = (data, callBack) => {
    const Component = data;
    // eslint-disable-next-line no-param-reassign
    /* data.props = {
      onClose: () => ,
    }; */
    SetNotificationChild(() => {
      return {
        isOpen: true,
        components: (
          <Component
            onClose={() => handleCloseModal({ info: { to: false }, index: 0 })}
            OnOK={(e) => callBack(e)}
          />
        ),
        overlay: true,
        push: false,
        index: 0,
      };
    });
  };
  useEffect(() => {
    if (projectsPendingData) {
      addNotificationPending(
        projectsPendingData
          .map((project, index) => {
            if (project.isPending) {
              return {
                projectName: project.name,
                projectId: project.id,
                Author: project.users.filter(
                  (el) => el.id === project.idAuthor
                )[0].userName,
                id: index,
                OnAccept: () =>
                  UpdateUserByProject(0, project.id, () => {
                    reload((i) => !i);
                    handleCloseModal({ info: { to: false }, index });
                  }),
                OnDecline: () =>
                  UpdateUserByProject(null, project.id, () => {
                    reload((i) => !i);
                    handleCloseModal({ info: { to: false }, index });
                  }),
              };
            }
            return null;
          })
          .filter((el) => el !== null)
      );
    }
  }, [projectsPendingData]);

  const contextValue = useMemo(
    () => ({
      DisplayNotificationPending,
      CreateNewNotificationPush,
      CreateNewModal,
    }),
    []
  );

  const TransitionInit = {
    as: Fragment,
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-out duration-1000 transition",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
  };
  const TransitionPush = {
    as: Fragment,
    enter: "transform ease-out duration-1000 transition",
    enterFrom: "translate-y-0 translate-x-full opacity-0",
    enterTo: "translate-y-0 translate-x-0 opacity-100",
    leave: "transform ease-out duration-1000 transition",
    leaveFrom: "translate-y-0 translate-x-0 opacity-100",
    leaveTo: "translate-y-0 translate-x-full opacity-0",
  };

  useEffect(() => {
    if (searchParams.get("NewProject")) {
      SetNotificationChild(() => {
        return {
          isOpen: true,
          push: false,
          overlay: true,
          index: 0,
          components: [
            <NotificationNewProject
              key={0}
              onClose={(info) => handleCloseModal({ info, index: 0 })}
            />,
          ],
        };
      });
    }
  }, [searchParams]);
  return (
    <NotificationContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...contextValue,
        Pending: [notificationPending, addNotificationPending],
      }}
    >
      {children}
      <Transition appear show={NotificationChild.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-scroll"
          onClose={() =>
            handleCloseModal({
              info: searchParams.get("NewProject") ? { to: -1 } : { to: false },
              index: 0,
            })
          }
        >
          {NotificationChild.overlay && (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-20" />
            </Transition.Child>
          )}
          {/* */}
          <div className=" absolute w-full min-h-full overflow-hidden ">
            <Transition.Child
              {...(NotificationChild.push ? TransitionPush : TransitionInit)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 w-[25em] pt-[5em]">
                  {NotificationChild.components}
                </div>
              </Transition.Child>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </NotificationContext.Provider>
  );
}

Notification.propTypes = {
  children: PropTypes.node.isRequired,
};
