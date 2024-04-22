import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowRedoOutline } from "react-icons/io5";


const Button = ({children,active,link}) => {
  return (
    <Link to={link}>
        <div className={`px-4 py-3 border rounded-lg hover:scale-95 transition-all duration-200 ease-linear text-sm 
        ${ active ? "bg-yellow-300 text-black flex justify-center items-center gap-2 " : " bg-richblack-800 shadow-lg stroke-white "}`}>
            {children}
            {
              active?<IoArrowRedoOutline />:""
            }
        </div>
    </Link>
  )
}

export default Button
