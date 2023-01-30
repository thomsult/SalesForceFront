import React, { useState, useContext, useEffect } from "react";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { NavigationDashboardContext } from "../../../components/Dashboard/navigation";
import EditText from "../../../components/utils/EditText";
import EditPhoto from "../../../components/utils/EditPhoto";
import EditCompany from "../../../components/utils/EditCompany";

import { AuthContext } from "../../../services/AuthContext";
import NotificationContext from "../../../components/Notification/NotificationContext";
import NotificationRemoveAccount from "../../../components/Notification/Notification/NotificationRemoveAccount";

function Profil() {
  const { CreateNewModal, CreateNewNotificationPush } =
    useContext(NotificationContext);
  const { user, UpdateUser, UpdateStateUser, DeleteUser } =
    useContext(AuthContext);
  const {
    projects: [projects],
  } = useContext(NavigationDashboardContext);

  const [userPlus] = useState({
    ...user,
    rank: "12",
    location: "Toulouse, Occitanie, France",
    success: {
      project: ["# Projets à foison"],
      idée: [
        "# Les idées fusent",
        "# Encore une petite",
        "# Reflechissons ensemble",
      ],
    },
    Stat: {
      project: (projects && projects.length) || 4,
      commentaires: 312,
      invitations: 18,
    },
  });

  useEffect(() => {
    if (user) {
      UpdateUser();
    }
  }, [user]);
  // todo Changer le entreprise en Company et changer l'input en select
  const handleChangeVal = (label, value) => {
    UpdateStateUser({ ...user, [label]: value });
  };
  const handleBlur = () => {
    CreateNewNotificationPush({
      Headers: "Modification",
      Icon: CheckCircleIcon,
      color: "text-[#449c23]",
      Message: "votre profil a été modifié",
    });
  };
  return (
    user !== undefined && (
      <div className=" flex flex-col mt-7 pt-14 px-5  w-screen lg:w-full h-screen  ">
        <div className="self-start bg-slate-300 px-20  py-2 rounded-t-lg">
          Mon Profil
        </div>
        <div className="w-full min-h-[50vh]  pt-8 mb-14  flex flex-col  bg-slate-300 p-4 rounded-b-lg rounded-tr-lg relative z-0 ">
          <section className=" overflow-scroll md:h-screen pb-8 md:max-h-[80vh] bg-white shadow-sm rounded-lg  my-1 py-7    flex flex-col md:flex-row items-start justify-between">
            <div className=" w-full h-full md:ml-10 px-4  md:pl-8  flex flex-col">
              <div className="max-h-[300px] pb-12">
                <EditPhoto
                  src={user.profilePicture}
                  alt={`${user.firstName} ${user.lastName} `}
                  label={userPlus.rank}
                  OnUpload={(e) => {
                    handleChangeVal("profilePicture", e);
                  }}
                  onBlur={handleBlur}
                />
              </div>
              <div className="">
                <h2 className="text-5xl font-semibold capitalize">
                  {`${user.firstName} ${user.lastName} `}
                </h2>
                <h3 className="text-3xl font-thin pb-8 ">{user.email}</h3>
              </div>
              <EditText
                readOnly={false}
                label="A propos de moi"
                value={user.description || "Je suis une libélule"}
                onChange={(e) => handleChangeVal("description", e)}
                onBlur={handleBlur}
              />
              <div className="flex flex-col md:flex-row md:gap-8 gap-2 w-full  mb-[4vmin] mt-auto pt-4 justify-around  ">
                <EditCompany
                  readOnly={false}
                  label="Entreprise"
                  value={user.companyName}
                  onChange={(e) => handleChangeVal("companyName", e)}
                  onBlur={handleBlur}
                />
                <EditText
                  readOnly={false}
                  label="Localité"
                  value={userPlus.location}
                  onChange={(e) => handleChangeVal("Location", e)}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="md:invisible self-center   text-gray-600 mt-16 h-[1px] flex items-center justify-center bg-gray-400 w-4/5 md:w-0">
              <p className="bg-white p-4">Privée</p>
            </div>
            <div className=" h-full md:border-l border-gray-300  sm:w-4/5  md:ml-10 px-4 md:w-2/4 md:pl-8  flex flex-col">
              <div className=" pt-8  ">
                <p className="text-gray-500 mb-4">Succès débloqués</p>
                <ul className="flex whitespace-nowrap mt-2 gap-4  flex-wrap ">
                  <li className="bg-blue-400 rounded-full px-3  border-2 border-blue-300">
                    {userPlus.success.idée[0]}
                  </li>
                  <li className="bg-orange-400 rounded-full px-3  border-2 border-orange-300">
                    {userPlus.success.project[0]}
                  </li>
                  <li className="bg-blue-400 rounded-full px-3  border-2 border-blue-300">
                    {userPlus.success.idée[1]}
                  </li>
                  <li className="bg-blue-400 rounded-full px-3  border-2 border-blue-300">
                    {userPlus.success.idée[2]}
                  </li>
                </ul>
              </div>
              <div className="  mt-auto pt-4 ">
                <p className="text-gray-500 mb-1">Statistiques</p>
                <ul className="pt-4 space-y-1">
                  <li className="flex justify-between">
                    <span>Projets</span>
                    <span>{userPlus.Stat.project}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Commentaires postés</span>
                    <span>{userPlus.Stat.commentaires}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Invitations reçues</span>
                    <span>{userPlus.Stat.invitations} </span>
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    CreateNewModal(NotificationRemoveAccount, () => {
                      DeleteUser(user.id);
                    });
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 text-sm w-full border-2 border-red-300 mt-4"
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  );
}

export default Profil;
