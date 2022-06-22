import { useEffect, useState } from "react"
import { PageTitle } from "../../../_metronic/layout/core"
import { getCommunityFollowers } from "./core/_requests"
import { CommunityFollowers } from "../../models/community/CommunityFollowers"
import { useParams } from "react-router-dom"
import { KTCardBody, KTCard, KTSVG } from "../../../_metronic/helpers"


const CommunityFollower = () => {
     const [members,setMembers] = useState<CommunityFollowers[] | undefined>([]);
     const params = useParams()

     useEffect(() => {
        getCommunityFollowers(params.id).then(response => {
            setMembers(response.data)
        })
    }, [params.id]);


     return (
        <>
        <PageTitle breadcrumbs={[]}>{'Community Members'}</PageTitle>
        <KTCardBody >
        <KTCard>
        <div className="card">
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Community Members</span>
            </h3>
            <div className='card-toolbar'>
            <a href='#' className='btn btn-sm btn-light-primary'>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                New Member
            </a>
            </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
            {/* begin::Table */}
            
            <table className='table align-middle gs-0 gy-4 table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'>
                {/* begin::Table head */}
                <thead>
                <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                    <th className='ps-4 min-w-325px rounded-start'>Members</th>
                    <th className='min-w-125px colspan=1 role=columnheader'>username</th>
                    <th className='min-w-125px colspan=1 role=columnheader'>email</th>
                    {/* <th className='min-w-200px'>Agent</th>
                    <th className='min-w-150px'>Status</th> */}
                    <th className='min-w-200px text-end rounded-end'></th>
                </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody className="text-gray-600 fw-bold role=rowgroup">   
                    {members?.map((member) => ( 
                    <tr key={member.id} role="row">
                    <td role="cell">
                    <div className='d-flex align-items-center'>
                        <div className='symbol symbol-50px me-5'>
                        <img
                            src={member.meta?.image}
                            className=''
                            alt=''
                        />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                            {member.name}
                        </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {member.name}
                        </span>
                        </div>
                    </div>
                    </td>
                    <td>
                    {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    {member.meta?.username}
                    </a> */}
                    <span className='text-muted fw-bold text-muted d-block fs-7'>{member.meta?.username}</span>
                    </td>
                    <td>
                    {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    {member.meta?.username}
                    </a> */}
                    <span className='text-muted fw-bold text-muted d-block fs-7'>{member.email}</span>
                    </td>
                    {/* <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    {member.meta?.username}
                    </a>
                    <span className='text-muted fw-bold text-muted d-block fs-7'>Insurance</span>
                    </td> */}
                    
                    <td className='text-end'>
                    {/* <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                        <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                    </a> */}
                    {/* <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a> */}
                    <a href='#' className="btn btn-icon btn-sm btn-active-light-warning">
                    <i className="fa-solid fa-eye text-warning"/>
                    </a>
                    </td>
                </tr>
                
                ))}
                </tbody>
                {/* end::Table body */}
            
            </table>
            {/* end::Table */}
            
            </div>
            {/* end::Table container */}
        </div>
        {/* begin::Body */}
        </div>
        </KTCard>
    </KTCardBody>                                
        </>
    )
}

export {CommunityFollower}