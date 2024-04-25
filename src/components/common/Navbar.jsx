import React, { useEffect, useState } from 'react'
import { Link, matchPath ,useLocation} from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import ProfileDropdown from '../auth/ProfileDropdown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { IoIosArrowUp } from "react-icons/io";


// const sublinks = [
//     {
//         "_id": "66240b9b5e613e2307a356ac",
//         "name": "Devops",
//         "desciption": "Python is a Famous Programming Language",
//         "link":"/Devops"
//     },
//     {
//         "_id": "66240c155e613e2307a356ae",
//         "name": "Web Developement",
//         "desciption": "Web Developement can make you Job ready ..",
//         "link":"/Devops"
//     },
//     {
//         "_id": "66240c565e613e2307a356b0",
//         "name": "Java DSA",
//         "desciption": "Java + DSA for FANG company.",
//         "link":"/Devops"
//     }
// ]

const Navbar = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route} , location.pathname);
    }
    const [sublinks, setSublinks] = useState([]);

    const fetchCatalog = async()=>{
        try {
            let result = await apiConnector("GET",categories.CATEGORIES_API);
            setSublinks(result?.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchCatalog();
    },[])

  return (
    <div className='flex h-14 item-center justify-center border-b-[1px] border-b-richblack-700 '>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to="/" >
                <img src={logo} width={160} height={43} loading='lazy' alt="logo-img" />
            </Link>

            <nav className=''>
                <ul className='flex gap-3 text-richblack-25 '>
                    {
                        NavbarLinks.map((link,index) => {
                            return (
                                <li key={index}>
                                    {  
                                        link.title === 'Catalog' ? (
                                        <div className='flex group relative gap-1 cursor-pointer justify-center items-center'>
                                            <p> {link.title}</p>
                                            <IoIosArrowUp />
                                            <div className='  z-50 font-semibold invisible absolute top-10
                                            flex flex-col rounded-md bg-richblack-5 p-4
                                            text-richblack-900 opacity-0 transition-all
                                            duration-200 group-hover:visible group-hover:opacity-100
                                            w-[250px] '>
                                            
                                                <div className='absolute left-[50%] top-0 invisible
                                                translate-x-[80%] translate-y-[-30%] 
                                                h-6 w-6 rotate-45 rounded bg-richblack-5 
                                                group-hover:visible opacity-0 group-hover:opacity-100
                                                transition-all duration-200'>
                                                </div>
                                                {
                                                    sublinks.map((sublink,index) => (
                                                        <Link to={`${sublink.link}`} key={index}>
                                                            {sublink.name}
                                                        </Link>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                                                    ) :
                                        (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? " text-yellow-50 " : " text-richblack-25"}`}>{link.title}</p>
                                                
                                            </Link>
                                        )
                                    }
                                </li>)
                                }
                        )
                    }
                </ul>
            </nav>

            <div className='flex justify-center gap-4  items-center text-richblack-50'>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                    <PiShoppingCartSimpleBold />
                                    {
                                        totalItems > 0 && (
                                            <span>{totalItems}</span>
                                        )
                                    }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='bg-richblack-800 px-2 py-1 rounded-md hover:bg-richblack-700 transition-all duration-200 ease-linear '>Login</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='bg-richblack-800 px-2 py-1 rounded-md hover:bg-richblack-700 transition-all duration-200 ease-linear '>Signup</button>
                            </Link>
                        )
                    }
                    {
                        (token !== null) && <ProfileDropdown/>
                    }
                    {
                        token !== null && (
                            <Link to="/logout">
                                <button  className='bg-richblack-800 px-2 py-1 rounded-md hover:bg-richblack-700 transition-all duration-200 ease-linear '>Logout</button>
                            </Link>
                        )
                    }
            </div>

        </div>
      
    </div>
  )
}

export default Navbar
