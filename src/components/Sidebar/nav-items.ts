import type { ComponentType } from "react";
import { FolderIcon, HomeIcon, UserIcon } from "./icons";

export type NavItem = {
  id: "dashboard" | "files" | "profile";
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  end: boolean;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "dashboard", label: "Início", path: "/", icon: HomeIcon, end: true },
  {
    id: "files",
    label: "Meus arquivos",
    path: "/arquivos",
    icon: FolderIcon,
    end: false,
  },
  {
    id: "profile",
    label: "Meu perfil",
    path: "/perfil",
    icon: UserIcon,
    end: false,
  },
];
