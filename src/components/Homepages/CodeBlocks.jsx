import React from 'react'
import Button from "./Button"
import { IoArrowRedoOutline } from "react-icons/io5";


import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({
    position , heading ,subheading , ctabtn1 , ctabtn2 ,
    codeblock ,  codeColor ,backgroundGradient
}) => {
  return (
    <div className={`flex  ${position} my-20 justify-between
    `}>

        {/* section 1 */}
        <div className='w-1/2 flex flex-col md:gap-4 gap-1 md:mx-auto mx-4'>
            <h1 className='md:text-3xl text-xl  font-semibold'>{heading}</h1>
            <p className='text-richblack-300 text-xs md:font-semibold md:pr-0 pr-2'>{subheading}</p>

            <div className='flex md:flex-row flex-col md:gap-10 gap-2'>
                <Button active={ctabtn1.active} link={ctabtn1.link}>
                        {ctabtn1.text}
                </Button>
                <Button active={ctabtn2.active} link={ctabtn2.link}>
                        {ctabtn2.text}
                </Button>
            </div>
        </div>


        {/* section 2 */}
        <div className= {`${backgroundGradient} h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-1/2 lg:w-[470px]`}>


    {/* bg-gradient-to-r from-fuchsia-500 to-cyan-500 */}
            <div  className="text-center flex flex-col  w-[10%] select-none text-richblack-400 font-inter font-bold ">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2
            font-bold font-mono ${codeColor} pr-2`}>

                <TypeAnimation 
                    sequence={[codeblock,10000,""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                
                />
                 
            </div>
        </div>
        
    </div>
  )
}

export default CodeBlocks
