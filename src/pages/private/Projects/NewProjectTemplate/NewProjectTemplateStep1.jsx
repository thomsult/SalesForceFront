import React, { useState, useContext } from "react";
import { PropTypes } from "prop-types";

import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import UserCard from "./CardUserStep1";
import SendInvitation from "../Form/SendInvitation";
import { AuthContext } from "../../../../services/AuthContext";
import MenuButton from "../../../../components/utils/ContextMenu/MenuButtonEditRemove";

export default function NewProjectsStep1({ project, update, users }) {
  const userData = useContext(AuthContext).user;
  const [filterByCompany, setFilterByCompany] = useState(false);
  const [invite, setInvite] = useState(project.invitePending);
  const [search, SetSearch] = useState("");

  const handleInvite = (user) => {
    setInvite((el) => [...el, user]);
    update({ ...project, invitePending: [...project.invitePending, user] });
  };
  const handleRemoveInvite = (user) => {
    setInvite((el) => [...el.filter((items) => items.email !== user.email)]);
    update({
      ...project,
      invitePending: [
        ...project.invitePending.filter((items) => items.email !== user.email),
      ],
    });
  };

  return (
    <>
      <header className="flex  m-4 flex-col  md:flex-row justify-between px-4">
        <p className="max-w-md ">
          Ajoutez vos collaborateurs{" "}
          <span className="text-gray-600 font-light">
            (les utilisateurs doivent avoir un compte CellsForce pour pouvoir
            recevoir une invitation).
          </span>
        </p>
        <div className="flex flex-col">
          <div className="flex items-center gap-4 ">
            <div className="relative w-full md:max-w-md  self-center  ">
              <div className="absolute inset-y-0 left-0 flex  items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 h-9"
                placeholder="Email"
                onChange={(event) => {
                  SetSearch(event.target.value);
                }}
              />
            </div>
            <MenuButton
              titleComposant={
                <EllipsisVerticalIcon
                  className="h-5 w-5 text-gray-400 mt-2"
                  aria-hidden="true"
                />
              }
            >
              <button
                onClick={() => setFilterByCompany((el) => !el)}
                type="button"
                className="hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex w-full"
              >
                Filtrer par entreprise
              </button>
            </MenuButton>
          </div>

          <div className=" mt-3 mr-2 self-end  max-w-md">
            {invite.length === 0 ? (
              <p className="text-sm text-gray-600">
                Aucun invitation en attente
              </p>
            ) : (
              <div className="flex-shrink-0 py-2  ">
                <div className="flex overflow-hidden -space-x-1">
                  <p className=" text-sm text-gray-600 mr-3 self-end">
                    Invitation en attente :{" "}
                  </p>
                  {invite.map((user) => (
                    <button
                      key={user.email}
                      onClick={() => handleRemoveInvite(user)}
                      type="button"
                    >
                      <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src={user.profilePicture || "/templateAccount.png"}
                        alt={user.userName}
                        title={user.userName}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="mx-4 flex-1  flex overflow-auto flex-col  border border-gray-300 rounded-md  ">
        <ul className=" divide-y   divide-gray-200    rounded-md  px-2 min-h-5 h-[50vh] overflow-scroll  ">
          <FilterUser
            userData={filterByCompany ? userData : {}}
            handleInvite={handleInvite}
            search={search}
            invite={invite}
            users={users}
          />
        </ul>
      </div>
    </>
  );
}
function FilterUser({ handleInvite, search, invite, userData, users }) {
  const filter = users
    .filter((el) => !invite.includes(el))
    .sort((a, b) => a.id_company > b.id_company)
    .filter((el) => {
      return userData.id_company === undefined
        ? el
        : el.id_company === userData.id_company;
    })
    .filter((el) => el.email.match(new RegExp(`${search}`, "i")) !== null)
    .map((user, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index}>
        <UserCard user={user} onClick={() => handleInvite(user)} />
      </li>
    ));
  return filter.length > 0 ? (
    filter
  ) : (
    <SendInvitation handleInvite={handleInvite} search={search} />
  );
}

FilterUser.defaultProps = {
  users: [],
  search: "",
  invite: [],
  handleInvite: () => {},
  userData: {},
};
FilterUser.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()),
  handleInvite: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  invite: PropTypes.any,
  search: PropTypes.string,
  userData: PropTypes.shape({ id_company: PropTypes.number }),
};

NewProjectsStep1.defaultProps = {
  users: [],
};
NewProjectsStep1.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()),
  project: PropTypes.shape().isRequired,
  update: PropTypes.func.isRequired,
};
