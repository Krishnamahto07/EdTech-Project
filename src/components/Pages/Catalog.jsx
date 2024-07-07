import React, { useEffect, useState } from 'react'
import Footer from '../common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { getCatalogPageData } from '../../services/operations/pageAndComponentData';




const Catalog = () => {
    const {catalogName} = useParams();
    const [catalogPageData , setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");

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
            } catch (error) {
                console.log(error)
            }
        }
        getCategoryDetails();
    },[categoryId])


  return (
    <div className='text-white'>
      <div>
        <p>{`Home / Catalog /`}</p>
        <p></p>
        <p></p>
      </div>
      <Footer/>
    </div>
  )
}

export default Catalog
