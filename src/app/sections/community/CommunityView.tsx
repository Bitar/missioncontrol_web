import React, {useEffect, useState} from "react"
import {KTSVG,} from "../../../_metronic/helpers"
import {PageTitle} from "../../../_metronic/layout/core"
import {getCommunityById} from "./core/_requests"
import {Community} from "../../models/community/Community"
import {Link, Navigate, Outlet, Route, Routes, useParams} from "react-router-dom"
import {CommunityFollower} from "./CommunityFollowers"
import {CommunityInfo} from "./CommunityInfo";

const CommunityView: React.FC = () => {
    const [community, setCommunity] = useState<Community | undefined>();
    const params = useParams()

    useEffect(() => {
        const query = 'include=contact,address'
        getCommunityById(params.id, query).then(response => {
            setCommunity(response)
        })
    }, [params.id]);

    return (
        <Routes>
            <Route
                element={
                    <>
                        <CommunityInfo community={community}/>
                        <Outlet/>
                    </>
                }
            >
                <Route
                    path='overview'
                    element={
                        <>
                            <PageTitle breadcrumbs={[]}>Overview</PageTitle>
                            {/*<Overview />*/}
                        </>
                    }
                />
                <Route
                    path='members'
                    element={
                        <>
                            <PageTitle breadcrumbs={[]}>Members</PageTitle>
                            <CommunityFollower/>
                        </>
                    }
                />
                <Route
                    path='settings'
                    element={
                        <>
                            <PageTitle breadcrumbs={[]}>Settings</PageTitle>
                            {/*<Settings />*/}
                        </>
                    }
                />
                <Route index element={<Navigate to={'/communities/' + community?.id + '/overview'}/>}/>
            </Route>
        </Routes>
        // <>
        //     <PageTitle breadcrumbs={[]}>{'Community Details'}</PageTitle>
        //     <CommunityInfo community={community}/>
        //
        //     <div className='card mb-5 mb-xl-10'>
        //         <CommunityFollower/>
        //     </div>
        //
        // </>

    )
}

export {CommunityView}