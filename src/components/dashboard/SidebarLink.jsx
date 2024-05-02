import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link , iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route} , location.pathname);
    }

  return (
    <NavLink
    to={link.path}
    // onClick={}
    className={` relative   ${matchRoute(link.path) ? "bg-yellow-50 border-richblack-100 text-black border-2 " : " bg-opacity-0 "}`}
    >
        <span className={'absolute left-0 top-0 h-full w-4 bg-yellow-100 '+` ${matchRoute(link.path) ? " opacity-100 ":"  opacity-0"}`}></span>

        <div className='flex items-center gap-x-2 px-2 pl-6'>
            <Icon className="text-lg" />
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink
