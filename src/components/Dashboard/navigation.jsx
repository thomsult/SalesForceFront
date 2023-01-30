import { createContext } from "react";

import {
  PlusIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";

export const NavigationInitial = [
  { name: "Dashboard", icon: HomeIcon, href: "/dashboard" },
  {
    name: "Créer une idée",
    icon: PlusIcon,
    href: "/dashboard/Interface",
    img: "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
    message: "Créez une idée sans la rattacher à un projet.",
    count: null,
  },
  {
    name: "Créer un projet",
    icon: FolderPlusIcon,
    message: "Débutez un processus d'idéation.",
    href: "/dashboard/Projects?NewProject=0",
  },
  {
    name: "Mes projets",
    icon: FolderIcon,
    href: "/dashboard/Projects",
    count: null,
    message: "Accédez à vos projets personnels ou collaboratifs.",
  },
  {
    name: "Mes archives",
    icon: InboxIcon,
    href: "/dashboard/Archives",
    count: null,
    message: "Accédez à toutes vos idées.",
  },
  {
    name: "Mon profil",
    icon: UserIcon,
    href: "/dashboard/Profil",
    message: "Affichez votre profil et éditez le.",
  },
];
export const userNavigation = [
  { name: "Mon profil", href: "/dashboard/Profil" },
  { name: "Déconnexion", href: "Logout" },
];
export const NavigationDashboardContext = createContext({});
