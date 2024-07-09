import React, { useEffect, useState } from 'react'
import Footer from '../common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { getCatalogPageData } from '../../services/operations/pageAndComponentData';
import Course_Card from '../catalog/Course_Card';
import CourseSlider from '../catalog/CourseSlider';




const Catalog = () => {
    const {catalogName} = useParams();
    const [catalogPageData , setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");

    const [flag , setFlag] = useState(true);

    useEffect(()=>{
        const getCategories = async() =>{
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("getCategories response : ",res);

            const category_id = res?.data?.data.filter((ct)=> ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(()=>{

        const getCategoryDetails = async() =>{
            try {
                console.log('SECOND USEFFECT')
                const res = await getCatalogPageData(categoryId)
                console.log("getCatalogPageData response : ",res);
                setCatalogPageData(res);
                console.log(catalogPageData?.data?.selectedCategory?.name)

                console.log(catalogPageData?.data?.selectedCategory?.desciption)
            } catch (error) {
                console.log(error)
            }
        }
        getCategoryDetails();
    },[categoryId])

    console.log("DEKH : ",catalogPageData?.data?.differentCategories);
  return (
    <>
    {/* Hero section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div  className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">{`Home / Catalog /`} 
            <span className="text-yellow-25">{`${catalogPageData?.data?.selectedCategory?.name}`}</span>
          </p>
          <p className="text-3xl text-richblack-5">{`${catalogPageData?.data?.selectedCategory?.name}`} </p>
          <p className="max-w-[870px] text-richblack-200">{`${catalogPageData?.data?.selectedCategory?.desciption}`} </p>
        </div>

        {/* SECTION 1  */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">

              <p>Most Popular</p>
              <p>New</p>
            </div>
            <div>
              {/* COURSE SLIDER ADD KR */}
              <CourseSlider course={catalogPageData?.data?.mostSellingCourses}/>

            </div>
        </div>

        {/* SECTION 2 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div>
              {/* COURSE SLIDER */}
              {/* <CourseSlider course={catalogPageData?.data?.differentCategory}/> */}
              {/* <CourseSlider course={catalogPageData?.data?.differentCategories?.courses}/> */}
              {/* {
                catalogPageData?.data?.differentCategories?.map((catagory,i)=>{
                  if(data){
                    data.map((d,i)=>(
                      <CourseSlider course={d} />
                    ))
                  }
                })
              } */}
              {
                catalogPageData?.data?.differentCategories?.map((category,i)=>{
                  if(category?.courses?.length > 0){
                    return (
                      <CourseSlider course={category.courses} key={i}/>
                      )
                    }
                    
                  } 
                )
              }

            </div>
        </div>

        {/* SECTION 3 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
              <div className='py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2  gap-16'>
                  {
                    catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                    .map((course,i)=>(
                      <Course_Card course={course} key={i} Height={"h-[400px]"}/>
                    ))
                  }

                </div>
              </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Catalog
