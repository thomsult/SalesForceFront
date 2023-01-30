/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { useState, Fragment, useEffect, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import ArchiveItem from "./components/ArchiveItem";
import { NavigationDashboardContext } from "../../../components/Dashboard/navigation";
import NotificationContext from "../../../components/Notification/NotificationContext";

import { ButtonMenu } from "./components/utils";
import NotificationHashTags from "../../../components/Notification/Notification/NotificationHashTags";
import {
  GetHashtagsArchiverByUser,
  DeleteHashtagsById,
  AddHashtagsByProject,
} from "../../../hooks/Crud/Hashtags";

export default function Archives() {
  const [search, SetSearch] = useState("");
  const [SortState, SetSortState] = useState("NoSort");
  const [data, SetData] = useState([]);

  const { CreateNewNotificationPush, CreateNewModal } =
    useContext(NotificationContext);
  const SendNotification = () => {
    CreateNewNotificationPush({
      Headers: "Htag Supprimé",
      Icon: CheckCircleIcon,
      color: "text-[#3a9718]",
      Message: "votre Htag à bien été Supprimé.",
      times: 1,
    });
    /* onClick(); */
  };

  const SortPeopleByHashtag = (arr, sens = "default") => {
    const SortArray = (x, y) => {
      if (sens === "HashtagInverse") {
        if (x.hashtag_name < y.hashtag_name) {
          return 1;
        }
        if (x.hashtag_name > y.hashtag_name) {
          return -1;
        }
        return 0;
      }
      if (sens === "HashtagDefault") {
        if (x.hashtag_name < y.hashtag_name) {
          return -1;
        }
        if (x.hashtag_name > y.hashtag_name) {
          return 1;
        }
        return 0;
      }
      return 0;
    };

    return arr.sort(SortArray);
  };

  const FilterHashtags = () => {
    return SortPeopleByHashtag(
      data.filter(
        (el) => el.hashtag_name.match(new RegExp(`${search}`, "i")) !== null
      ),
      SortState !== "SortByDate" ? SortState : "NoSort"
    );
  };

  const HandelRemove = (id) => {
    DeleteHashtagsById(id, () => {
      SendNotification();
      SetData(data.filter((el) => el.id !== id));
    });
  };
  const AddProject = (htagId) => {
    const Htag = data.find((el) => el.id === htagId);
    CreateNewModal(NotificationHashTags, (project) => {
      AddHashtagsByProject(project.id, Htag, () => {
        CreateNewNotificationPush({
          Headers: null,
          Icon: CheckCircleIcon,
          color: "text-[#3a9718]",
          Message: `${Htag.hashtag_name} a ete ajouter au projet : ${project.name}`,
          times: 1,
        });
        SetData(data.filter((el) => el.id !== htagId));
      });
    });
  };

  const FormatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  const { SetNavigation } = useContext(NavigationDashboardContext);

  useEffect(() => {
    GetHashtagsArchiverByUser((res) => {
      SetNavigation((nav) =>
        nav.map((el) => {
          if (el.name === "Mes Archives") {
            el.count = res.length;
          }
          return el;
        })
      );

      SetData(res);
    });
  }, []);

  return (
    <div className="flex flex-col mt-7 pt-14 px-5  w-screen lg:w-full h-screen  ">
      <div className="self-start bg-slate-300 px-20  py-2 rounded-t-lg">
        Archives
      </div>
      <div className="w-full  min-h-[50vh] pt-8 mb-14  flex flex-col  bg-slate-300 p-4 rounded-b-lg rounded-tr-lg relative z-0 ">
        <header className="mb-5 flex flex-col md:flex-row text-zinc-300 bg-[#364559] items-center justify-between px-4 py-2 rounded-lg ">
          <div className="text-center ml-2 whitespace-nowrap mr-5">
            <p>Retrouver une idée </p>
          </div>
          <div className="flex gap-6   justify-center items-center flex-row  w-full md:w-[25em] ">
            <div className="relative w-full max-w-xs  ">
              <div className="absolute z-10 inset-y-0 left-0 flex  items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 h-9"
                placeholder="HashTag"
                onChange={(event) => {
                  SetSearch(event.target.value);
                }}
              />
            </div>
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className=" flex text-sm rounded-full">
                  <EllipsisVerticalIcon className="  h-full w-10 " />
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
                <Menu.Items className="right-0 absolute z-50  mt-5  w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <ButtonMenu
                    Action={SetSortState}
                    defaultState="HashtagDefault"
                    curentState={SortState}
                    description="Ordre de A à Z"
                  />
                  <ButtonMenu
                    Action={SetSortState}
                    defaultState="HashtagInverse"
                    curentState={SortState}
                    description="Ordre de Z à A"
                  />
                  <div className="h-[1px] w-full bg-gray-50 px-10" />
                  <ButtonMenu
                    Action={SetSortState}
                    defaultState="SortByDateInverse"
                    curentState={SortState}
                    description="Plus resents"
                  />
                  <ButtonMenu
                    Action={SetSortState}
                    defaultState="SortByDate"
                    curentState={SortState}
                    description="Plus anciens"
                  />
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
        <section className="flex  relative  shadow  flex-col  overflow-scroll  rounded-lg  ">
          <header className="absolute flex shadow-sm  w-full rounded-t-lg   px-10  py-3 bg-gray-200 font-medium text-gray-500 ">
            <button
              type="button"
              className="w-[20vw] flex items-center uppercase tracking-wider"
              onClick={() => {
                if (SortState === "HashtagDefault") {
                  SetSortState("HashtagInverse");
                }
                if (SortState === "HashtagInverse") {
                  SetSortState("NoSort");
                }
                if (
                  SortState === "NoSort" ||
                  SortState === "SortByDate" ||
                  SortState === "SortByDateInverse"
                ) {
                  SetSortState("HashtagDefault");
                }
              }}
            >
              Hashtag
              {SortState === "HashtagDefault" && (
                <ArrowDownIcon className="h-5 pl-2 " />
              )}
              {SortState === "HashtagInverse" && (
                <ArrowUpIcon className="h-5 pl-2 " />
              )}
            </button>
            <p className="invisible md:visible md:w-1/2 uppercase tracking-wider mr-auto">
              infos
            </p>
            <button
              type="button"
              className=" whitespace-nowrap flex items-center uppercase tracking-wider"
              onClick={() => {
                if (SortState === "SortByDate") {
                  SetSortState("SortByDateInverse");
                }
                if (SortState === "SortByDateInverse") {
                  SetSortState("NoSort");
                }
                if (
                  SortState === "NoSort" ||
                  SortState === "HashtagDefault" ||
                  SortState === "HashtagInverse"
                ) {
                  SetSortState("SortByDate");
                }
              }}
            >
              <span className="pr-2">Date modification</span>
              <span className="w-8">
                {SortState === "SortByDateInverse" && (
                  <ArrowDownIcon className="h-5" />
                )}
                {SortState === "SortByDate" && <ArrowUpIcon className="h-5 " />}
              </span>
            </button>
          </header>
          <ul className=" overflow-scroll pt-[4em] gap-2 rounded-b-lg  flex flex-col h-screen  w-full py-3 bg-white divide-y divide-gray-200   ">
            {FilterHashtags().map(({ hashtag_name, fileList, id }) => (
              <ArchiveItem
                Hashtag={hashtag_name}
                infos={fileList}
                date={FormatDate(new Date())}
                key={id}
                remove={HandelRemove}
                index={id}
                addProject={AddProject}
              />
            ))}
            {FilterHashtags().length === 0 && (
              <div className="px-10 w-full py-3 text-sm text-gray-700">
                Aucun Résultat
              </div>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
