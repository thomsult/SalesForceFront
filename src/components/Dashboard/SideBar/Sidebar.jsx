import React, { useContext } from "react";

import { PropTypes } from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { NavigationDashboardContext } from "../navigation";
import useNavigationCurrent from "../../../hooks/useNavigationCurrent";
import Lobby from "./Lobby";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar({ className }) {
  const loc = useLocation();
  const child = loc.pathname.split("/")[3];
  const { CurrentNav, projectName } = useNavigationCurrent();
  const { navigation } = useContext(NavigationDashboardContext);
  return (
    navigation && (
      <aside className={`${className} max-w-xs lg:w-2/6 bg-white`}>
        <div className=" flex-grow flex flex-col  fixed w-[19.9em] h-screen  border-r bg-white border-gray-300">
          <nav
            className="  px-2 pt-8 bg-white space-y-2  "
            aria-label="Sidebar"
          >
            {navigation
              .filter((el) => el.name !== "Créer un Project")
              .map((item) => {
                // eslint-disable-next-line no-param-reassign
                item.current = CurrentNav(item.href);
                return (
                  <div
                    key={item.name}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center text-sm font-medium rounded-md py-2"
                    )}
                  >
                    <Link to={item.href} className="flex">
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-3 flex-shrink-0 h-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="">{item.name}</span>
                    </Link>
                    {item.child && (
                      <Link
                        to={`${item.href}/${child}`}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "text-sm font-medium mb-1 ml-1 rounded-md"
                        )}
                      >
                        / {child}
                      </Link>
                    )}
                    {item.count ? (
                      <span
                        className={classNames(
                          item.current
                            ? "bg-white"
                            : "bg-gray-100 group-hover:bg-gray-200",
                          "ml-auto py-0.5 px-3 text-xs font-medium rounded-full "
                        )}
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </div>
                );
              })}
          </nav>
          {projectName && <Lobby projectName={projectName} />}
        </div>
      </aside>
    )
  );
}
export default Sidebar;

Sidebar.propTypes = {
  className: PropTypes.string.isRequired,
};
