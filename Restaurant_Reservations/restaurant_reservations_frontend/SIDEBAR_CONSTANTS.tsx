import { BsHouseDoor, BsListUl } from "react-icons/bs";
import { MdStarBorderPurple500 } from "react-icons/md";
import { SideNavItem } from "./types/types";
import { IoSettingsOutline } from "react-icons/io5";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/employee",
    icon: <BsHouseDoor size={20}/>,
  },
  {
    title:"Settings",
    path:"employee/settings",
    icon:<IoSettingsOutline size={20}/>,
    submenu:true,
    subMenuItems:[
      {title:"password",path:"employee/settings/psw"},
      {title:"User",path:"employee/settings/datauser"},
   ]},
   {
    title: "Orders",
    path: "employee/orders",
    icon: <MdStarBorderPurple500 size={20}/>,
  },
];
