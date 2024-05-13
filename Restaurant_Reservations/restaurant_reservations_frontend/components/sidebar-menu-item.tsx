"use client";
import { SideNavItem } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

interface Props {
  item: SideNavItem;
}

export default function SideBarMenuItem({ item }: Props) {
  const linkStyle = "flex items-center min-h-[40px] h-full text-[#6e768e] py-2 px-4 hover:text-white rounded-md transition duration-200";
  const ddLinkStyle = linkStyle;
  const menuDropdownItem = "text-[#6e768e] py-2 px-4 hover:text-white transition duration-200";

  const pathName=usePathname()
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu=()=>{
    setSubMenuOpen(!subMenuOpen)
  }
  return (
    <>
      {item.submenu ? (
        <div className='rounded-md min-w-[18px]'>
          <a className={ddLinkStyle} onClick={toggleSubMenu}>
            {item.icon}
            <span className='ml-3 text-base leading-6 font-semibold'>{item.title}</span>
            <BsChevronRight className='ml-auto stroke-2 text-xs' />
          </a>
          {subMenuOpen && (
            <div className='bg-[#3a3f48] border-1-4'>
              <div className='grid gap-y-2 px-10 py-3 leading-5'>
                {item.subMenuItems?.map((subItem, index) => (
                  <Link key={index} href={subItem.path} className={menuDropdownItem}>
                    <span className=''>{subItem.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href={item.path} className={`${linkStyle} ${item.path===pathName?'':''}`}>
          {item.icon}
          <span className='ml-3 leading-6 font-semibold'>{item.title}</span>
        </Link>
      )}
    </>
  );
}
