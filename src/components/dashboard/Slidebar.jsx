import React from 'react'
import slidebarlink from "../../data/dashboard-links"
import {logout} from "../../services/operations/authApi"
import { useSelector } from 'react-redux'
import Loading from '../common/Loading'
import sidebarLinks from '../../data/dashboard-links'
import SidebarLink from './SidebarLink'
const Slidebar = () => {
    const {user , loading : profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading){
        return (
            <Loading/>
        )
    }
    return(
        <div>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link , i) =>{
                            if(link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Slidebar
