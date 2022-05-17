import React, {useEffect} from 'react'
import {useAuth} from "../../../../app/modules/auth";
import {getActiveAdminCommunity} from "../../../../app/layout/partials/community-picker/_requests";

export function MenuInner() {
    const {communityAdmin, setCommunityAdmin} = useAuth()

    useEffect(() => {
        getActiveAdminCommunity().then(response => {
            setCommunityAdmin(response)
        })
    }, [setCommunityAdmin])

    return (
        <>
            <div className='menu-item me-lg-1'>
                <h5 className="py-3 mb-0">
                    <img src={communityAdmin?.logo} alt="" className="w-40px me-2"/>
                    <span>{communityAdmin?.name}</span>
                </h5>
            </div>
        </>
    )
}
