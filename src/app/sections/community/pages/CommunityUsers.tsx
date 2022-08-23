import {FC, useEffect, useState} from 'react'
import {KTCard} from '../../../../_metronic/helpers'
import {Community} from '../models/Community'
import {User} from '../../identity/user/models/User'
import {TextImageCell} from '../../../modules/table/columns/TextImageCell'

type Props = {
  community: Community | undefined
}

const CommunityUsers: FC<React.PropsWithChildren<Props>> = ({community}) => {
  const [members, setMembers] = useState<User[] | undefined>([])

  useEffect(() => {
    setMembers(community?.users)
  }, [community])

  return (
    <>
      <KTCard>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Community Members</span>
          </h3>
          {/*<div className='card-toolbar'>*/}
          {/*  <a*/}
          {/*    href='src/app/sections/community/pages/CommunityFollowers#CommunityUsers.tsx'*/}
          {/*    className='btn btn-sm btn-light-primary'*/}
          {/*  >*/}
          {/*    <KTSVG path='/media/icons/duotune/arr075.svg' className='svg-icon-2' />*/}
          {/*    New Member*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table align-middle gs-0 gy-4 table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'>
              <thead>
                <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                  <th className='ps-4 min-w-325px rounded-start'>Members</th>
                  <th className='min-w-125px'>username</th>
                  {/*<th className='min-w-125px'>activities</th>*/}
                  {/*<th className='min-w-200px text-end rounded-end' />*/}
                </tr>
              </thead>
              <tbody className='text-gray-600 fw-bold role=rowgroup'>
                {members?.map((member) => (
                  <tr key={member.id} role='row'>
                    <td role='cell'>
                      <TextImageCell
                        dImage={member.meta?.image}
                        dText={member.name}
                        dExtraText={member.email}
                        link={''}
                      ></TextImageCell>
                    </td>
                    <td>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {member.meta?.username}#{member?.meta?.rng}
                      </span>
                    </td>
                    {/*<td>*/}
                    {/*  <span className='text-muted fw-bold text-muted d-block fs-7'>*/}
                    {/*    {member.email}*/}
                    {/*  </span>*/}
                    {/*</td>*/}

                    {/*<td className='text-end'>*/}
                    {/*  <span className='text-muted fw-bold text-muted d-block fs-7'>*/}
                    {/*    {member.email}*/}
                    {/*  </span>*/}
                    {/*</td>*/}
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

export {CommunityUsers}
