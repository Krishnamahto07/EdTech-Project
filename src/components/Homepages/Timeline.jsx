import React from "react";
import TimeLineImage from "../../assets/Images/TimelineImage.png";
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg";


const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];


const Timeline = () => {
  return (
    <div>
        <div className="flex md:flex-row flex-col gap-15 items-center">

            {/* Left Part */}
            <div className="w-[45%] flex flex-col gap-5">
                {
                    TimeLine.map((ele,index)=>{
                        return (
                            <div className="flex flex-row gap-6 " key={index}>
                                <div className="w-[50px] h-[50px] flex items-center ">
                                    <img  src={ele.Logo}/>
                                </div>

                                <div>
                                    <h2 className="font-semibold text-[18px]"> {ele.Heading}</h2>
                                    <p className="text-base">{ele.Description}</p>
                                </div>
                            </div> 
                        )
                    })
                }
            </div>

            {/* Right Part */}
            <div className="relative shadow-blue-200">
                <img src={TimeLineImage}
                alt="photo"
                className="object-cover h-fit shadow-2xl shadow-blue-500/20 rounded-lg"/>


                <div className="absolute -bottom-[70px] left-6 lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 md:px-0 px-11">
                            {/* Section 1 */}
                            <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-10 lg:px-14 ">
                            <h1 className="text-3xl font-bold w-[75px]">10</h1>
                            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                Years experiences
                            </h1>
                            </div>

                            {/* Section 2 */}
                            <div className="flex gap-5 items-center lg:px-14 px-7">
                            <h1 className="text-3xl font-bold w-[75px]">250</h1>
                            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                types of courses
                            </h1>
                            </div>
                            <div></div>
                        </div>
                </div>
        </div>        
    </div>
  );
};

export default Timeline;
