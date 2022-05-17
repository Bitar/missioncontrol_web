import React, {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import clsx from "clsx";
import {getAdminCommunities} from "./_requests";
import {Community} from "../../../models/community/Community";

const CommunityPicker: FC = () => {
    // const {communities} = useCommunityAdmin()
    // console.log(communities)
    const [communityAdmin, setCommunityAdmin] = useState<Community[] | undefined>();

    const isActive = false;

    // const
    useEffect(() => {
        getAdminCommunities().then(response => {
            setCommunityAdmin(response.data)
        })
    }, []);

    return (
        <div className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'>

            <div
                className="btn btn-icon btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
                data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="bottom">
                <i className="fa-solid fa-sun fs-2"/>
            </div>


            <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-bold py-4 fs-6 w-200px"
                data-kt-menu="true">
                {communityAdmin && communityAdmin?.length > 0 ? (
                    communityAdmin?.map((community, i) => {
                        return (
                            <div className="menu-item px-3 my-1" key={`row-${i}-${community.id}`}>
                                <Link className={clsx('menu-link px-3', {active: isActive})} to="/light">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-sun fs-2"/>
                                        </span>
                                    <span className="menu-title">{community.name}</span>
                                </Link>
                            </div>
                        )
                    })
                ) : (
                    <span className="menu-title">NoCommunity Admins</span>
                )}

                {/*{communityAdmin.length > 0 ? (*/}
                {/*    // communityAdmin.map((community, i) => {*/}
                {/*    //     console.log(community)*/}
                {/*    //     console.log(i)*/}
                {/*    //     // prepareRow(row)*/}
                {/*    //     // return <CustomRow row={row} key={`row-${i}-${row.id}`}/>*/}
                {/*    // })*/}
                {/*    <span className="menu-title">Community Admins</span>*/}
                {/*) : (*/}
                {/*    <span className="menu-title">No Community Admin</span>*/}
                {/*)}*/}


                {/*<div className="menu-item px-3 my-1">*/}
                {/*    <Link className={clsx('menu-link px-3', {active: isActive})} to="/light">*/}
                {/*        <span className="menu-icon">*/}
                {/*            <i className="fa-solid fa-sun fs-2"/>*/}
                {/*        </span>*/}
                {/*        <span className="menu-title">Light</span>*/}
                {/*    </Link>*/}
                {/*</div>*/}

                {/*<div className="menu-item px-3 my-1">*/}
                {/*    <Link className={clsx('menu-link px-3', {active: isActive})} to="/dark">*/}
                {/*        <span className="menu-icon">*/}
                {/*            <i className="fa-solid fa-moon fs-2"/>*/}
                {/*        </span>*/}
                {/*        <span className="menu-title">Dark</span>*/}
                {/*    </Link>*/}
                {/*</div>*/}

            </div>

        </div>
    )
}

export {CommunityPicker}
