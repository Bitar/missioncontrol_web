import {useEffect, useState} from "react"
import {KTSVG,} from "../../../_metronic/helpers"
import {PageTitle} from "../../../_metronic/layout/core"
import {getCommunityById} from "./core/_requests"
import {Community} from "../../models/community/Community"
import {Link, useParams} from "react-router-dom"
import {CommunityFollower} from "./CommunityFollowers"

const CommunityView = () => {
    const [community, setCommunity] = useState<Community | undefined>();
    const params = useParams()

    useEffect(() => {
        const query = 'include=contact,address'
        getCommunityById(params.id, query).then(response => {
            setCommunity(response)
        })
    }, [params.id]);



    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Community Details'}</PageTitle>
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                        <div className='me-7 mb-4'>
                            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                                <img src={community?.logo} alt=""/>
                            </div>
                        </div>
                        

                        <div className='flex-grow-1'>
                            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center mb-2'>
                                        <div className='text-gray-800 fs-2 fw-bolder me-1'>
                                            {community?.name}
                                        </div>
                                    </div>

                                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                                        <div className='d-flex align-items-center text-gray-400 me-5 mb-2'>
                                            <KTSVG
                                                path='/media/icons/duotune/communication/com006.svg'
                                                className='svg-icon-4 me-1'
                                            />
                                            {community?.contact?.name}
                                        </div>
                                        <div

                                            className='d-flex align-items-center text-gray-400  me-5 mb-2'
                                        >
                                            <KTSVG
                                                path='/media/icons/duotune/general/gen018.svg'
                                                className='svg-icon-4 me-1'
                                            />
                                            {community?.address?.city}

                                        </div>
                                        <a
                                            href='mailto:`{community.contact?.email}`'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                                        >
                                            <KTSVG
                                                path='/media/icons/duotune/communication/com011.svg'
                                                className='svg-icon-4 me-1'
                                            />
                                            {community?.contact?.email}
                                        </a>
                                    </div>

                                </div>
                                <div className='card-toolbar'>
                                 <Link className='btn btn-sm btn-primary' to='/activities/create'>
                            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                            New Activity
                        </Link>
                    </div>
                            </div>

                            <div className='d-flex flex-wrap flex-stack'>
                                <div className='d-flex flex-column flex-grow-1 pe-8'>
                                    <div className='d-flex flex-wrap'>
                                        <div className='d-flex text-gray-600  mb-1'>{community?.description}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                        <li className="nav-item mt-2">
                            <span className='nav-link text-active-primary ms-0 me-10 py-5 active'>Members</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card mb-5 mb-xl-10'>
                <CommunityFollower/>
            </div>

        </>

    )
}

export {CommunityView}