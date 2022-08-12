/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from "react"
import {PageTitle} from "../../../../_metronic/layout/core"
import {getCommunityFollowers} from "../core/_requests"
import {CommunityFollowers} from "../../../models/community/CommunityFollowers"
import {useParams} from "react-router-dom"
import {KTCard, KTSVG} from "../../../../_metronic/helpers"

const CommunityFollower = () => {
    const [members, setMembers] = useState<CommunityFollowers[] | undefined>([]);
    const params = useParams()

    useEffect(() => {
        getCommunityFollowers(params.id).then(response => {
            setMembers(response.data)
        })
    }, [params.id]);


    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Members'}</PageTitle>
            <KTCard>
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bolder fs-3 mb-1'>Community Members</span>
                    </h3>
                    <div className='card-toolbar'>
                        <a href='src/app/sections/community/pages/CommunityFollowers#' className='btn btn-sm btn-light-primary'>
                            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                            New Member
                        </a>
                    </div>
                </div>
                <div className='card-body py-3'>
                    <div className='table-responsive'>

                        <table
                            className='table align-middle gs-0 gy-4 table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'>
                            <thead>
                            <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                                <th className='ps-4 min-w-325px rounded-start'>Members</th>
                                <th className='min-w-125px'>username</th>
                                <th className='min-w-125px'>email</th>
                                <th className='min-w-200px text-end rounded-end'/>
                            </tr>
                            </thead>
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
                                                <span
                                                    className='text-muted fw-bold text-muted d-block fs-7'>{member.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className='text-muted fw-bold text-muted d-block fs-7'>{member.meta?.username}</span>
                                    </td>
                                    <td>
                                        <span
                                            className='text-muted fw-bold text-muted d-block fs-7'>{member.email}</span>
                                    </td>

                                    <td className='text-end'>
                                        <a href='src/app/sections/community/pages/CommunityFollowers#' className="btn btn-icon btn-sm btn-active-light-warning">
                                            <i className="fa fa-solid fa-eye text-warning"/>
                                        </a>
                                    </td>
                                </tr>

                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </KTCard>
        </>
    )
}

export {CommunityFollower}