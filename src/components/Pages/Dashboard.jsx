import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../common/Loading';
import Slidebar from '../dashboard/Slidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading){
        return (
            <Loading/>
        )
    }
    return (
        <div className='flex items-center justify-center'>
            <Slidebar/>
            <div className='h-[calc(100vh-3.5rem)] w-full   overflow-auto'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10 '>
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
