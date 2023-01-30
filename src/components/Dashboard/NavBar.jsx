import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { PlusSmallIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { capitalise, classNames } from "../utils/Utils";
import { NavigationDashboardContext } from "./navigation";
import useNavigationCurrent from "../../hooks/useNavigationCurrent";
import { AuthContext } from "../../services/AuthContext";
import NotificationManager from "../Notification/NotificationManager";

export default function NavBar() {
  const { CurrentNav } = useNavigationCurrent();
  const { user, disconnect } = useContext(AuthContext);
  const { navigation, userNavigation } = useContext(NavigationDashboardContext);
  const routerNav = useNavigate();
  const handleClick = (path) => {
    if (path !== "Logout") {
      routerNav(path);
    } else {
      disconnect();
    }
  };

  return (
    user && (
      <Disclosure
        as="nav"
        className="bg-gray-800 fixed z-50 top-0 w-full shadow-md"
      >
        {({ open }) => (
          <>
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                    <p className="font-semibold text-4xl text-white pl-3 mb-1">
                      Cells<span className="text-indigo-500">Force</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link
                      to={`${window.location.pathname}?NewProject=0`}
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    >
                      <PlusSmallIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <span>Nouveau Projet</span>
                    </Link>
                  </div>
                  <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                    <NotificationManager />

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8  object-cover rounded-full"
                            src={user.profilePicture}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "../../../public/templateAccount.png";
                            }}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => handleClick(item.href)}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                  )}
                                >
                                  {item.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation &&
                  navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className={classNames(
                        CurrentNav(item.href)
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={CurrentNav(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5 sm:px-6">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.profilePicture}
                    alt=""
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "../../../public/templateAccount.png";
                    }}
                  />
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {capitalise(user.firstName)} {capitalise(user.lastName)}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <div className="self-end ml-auto">
                    <NotificationManager />
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1 sm:px-3">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="button"
                      onClick={() => handleClick(item.href)}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  );
}
