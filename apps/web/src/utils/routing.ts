import { HomeIcon, CogIcon, CreditCardIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

type Icon = typeof HomeIcon;
export interface IRoute {
  path: string;
  name: string;
  sidebar: boolean;
  icon?: Icon;
}
type SecuredRoutes = typeof securedRoutes;
const securedRoutes = {
  DASHBOARD: {
    path: "/dashboard",
    name: "Dashboard",
    sidebar: true,
    icon: HomeIcon,
  },
  PLAN: {
    path: "/plan",
    name: "Plan",
    sidebar: true,
    icon: CreditCardIcon,
  },
  EDITOR: {
    path: "/editor",
    name: "Editor",
    sidebar: true,
    icon: PencilSquareIcon,
  },
  SETTINGS: {
    path: "/settings",
    name: "Settings",
    sidebar: true,
    icon: CogIcon,
  },
} as const;

export const publicRoutes = {
  HOME: {
    path: "/",
  },
  SIGN_IN: {
    path: "/sign-in",
  },
  SIGN_UP: {
    path: "/sign-up",
  },
} as const;

export const getSecuredRoutes = (): {
  [key in keyof SecuredRoutes]: IRoute;
} => {
  return securedRoutes;
};

export const getSecuredRoutesPaths = (): string[] => {
  return Object.values(securedRoutes).map((route) => route.path);
};

export const isPathnameInSecuredRoutes = (pathname: string) => {
  return getSecuredRoutesPaths()
    .map((route) => pathname.includes(route))
    .includes(true);
};

export const getSidebarRoutes = (): IRoute[] => {
  return Object.values(securedRoutes).filter((route) => route.sidebar);
};

export default securedRoutes;
