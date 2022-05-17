import React, {useEffect} from 'react'
import {useAuth} from "../../../../app/modules/auth";
import {getActiveAdminCommunity} from "../../../../app/layout/partials/community-picker/_requests";

export function MenuInner() {
    const {currentCommunityAdmin, setCommunityAdmin} = useAuth()

    useEffect(() => {
        getActiveAdminCommunity().then(response => {
            setCommunityAdmin(response)
        })
    }, [setCommunityAdmin])

    return (
        <>
            <div className='menu-item me-lg-1'>
                <h5 className="py-3 mb-0">
                    <img src={currentCommunityAdmin?.logo} alt="" className="w-40px me-2"/>
                    <span>{currentCommunityAdmin?.name}</span>
                </h5>
            </div>
        </>
    )
}
