import React, {FC} from 'react'
import {Team} from '../../models/squad/Team'
import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../_metronic/helpers'
import { ActivityStanding } from "../../sections/activities/models/ActivityStanding";

type Props = {
  standing?: ActivityStanding
  team: Team
}

const TeamCard: FC<Props> = ({standing, team}) => {
  return (
    <>
      <KTCard className='border border-2 border-gray-300 border-hover'>
        <KTCardBody className='p-9'>
          <div
            className='bgi-no-repeat bgi-size-cover rounded min-h-250px mb-5'
            style={{
              backgroundImage: `url('${team.image}')`,
            }}
          ></div>
          <div className='fs-3 fw-bolder text-dark mb-7'>{team.name}</div>
          <div className='d-flex flex-wrap mb-5'>
            <div className='border bg-light-success border-success rounded min-w-125px py-3 px-4 me-7 mb-3'>
              <div className='fs-3 text-grey-800 fw-bolder'>{standing?.score.win || 0}</div>
              <div className='fw-bold text-gray-400'>Wins</div>
            </div>

            <div className='border bg-light-danger border-danger rounded min-w-125px py-3 px-4 mb-3'>
              <div className='fs-3 text-gray-800 fw-bolder'>{standing?.score.lose || 0}</div>
              <div className='fw-bold text-gray-400'>Loses</div>
            </div>
          </div>


          <div className='d-flex flex-wrap mb-5'>
            <div className='symbol-group symbol-hover'>
              {team.users?.map((user) => (
                <div
                  className='symbol symbol-35px symbol-circle'
                  data-bs-toggle='tooltip'
                  title={user.name}
                  key={user.id}
                >
                  {team.captain_id === user.id && (
                    <span className="position-absolute w-100 text-center fs-6" style={{top: "-15px"}}>
                      <i className='fas fa-crown text-warning'></i>
                    </span>
                  )}
                  {user.meta?.image ? (
                    <img alt='Pic' src={toAbsoluteUrl(user.meta?.image)} />
                  ) : (
                    <img alt='Pic' src={toAbsoluteUrl('/media/avatars/blank.png')} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { TeamCard };
