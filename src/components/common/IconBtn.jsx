import React from 'react'

const IconBtn = ({
    text,onclick,children,disabled,
    outline = false,
    customClasses,
    type,
}) => {
  return (
    <button className={`${customClasses}` +`  text-richblack-800 bg-blue-100 px-3 py-2 rounded hover:scale-95 drop-shadow-xl duration-200 ease-linear`}
    disabled={disabled}
    onClick={onclick}
    type={type}
    >
    {
        children ? (
            <>
                <span>
                    {text}
                </span>
                {children}
            </>
        ):(text)
    }
    </button>
  )
}

export default IconBtn
