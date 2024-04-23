import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowRedoOutline } from "react-icons/io5";


const Button = ({children,active,link}) => {
  return (
    <Link to={link}>
        <div className={`px-4 py-3 border rounded-lg hover:scale-95 transition-all duration-200 ease-linear text-sm 
        ${ active ? "bg-[#76DBD1] text-black flex justify-center items-center gap-2 hover:bg-[#515585] hover:text-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] " : " bg-richblack-800 hover:bg-richblack-200 hover:text-black hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] "}`}>
            {children}
            {
              active?<IoArrowRedoOutline />:""
            }
        </div>
    </Link>
  )
}

export default Button
