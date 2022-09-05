import React, {Dispatch, FC, SetStateAction} from 'react'
import {Activity} from '../models/Activity'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
// import {TeamCard} from '../partials/TeamCard'
import {TeamCard} from '../../../partials/team/TeamCard'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
}

const ActivityTeams: FC<Props> = ({activity, setActivity}) => {
  return (
    <>
      <KTCard>
        <div className='card-header bg-info'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Teams</h3>
          </div>
        </div>
        <KTCardBody className='py-4'>
          {/*<div className='row g-6 g-xl-9 row-cols-1 row-cols-sm-2 row-cols-xl-4 gy-10'>*/}
          <div className='row row-cols-1 row-cols-sm-2 row-cols-xl-5 gy-10'>
            {activity?.standings?.map((standing) => (
              <div key={standing.team.id} className='col text-center mb-9'>
                <div
                  className='octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-cover bgi-position-center'
                  style={{
                    backgroundImage: `url('${standing?.team.image}')`,
                  }}
                ></div>
                <div className='mb-0'>
                  <span className='text-dark fw-bold fs-3'>
                    {standing?.team?.name}
                  </span>
                  {/*<div className='text-muted fs-6 fw-semibold'>Development Lead</div>*/}
                </div>
                <TeamCard standing={standing} team={standing.team}></TeamCard>
                {/*<TeamCard team={team}></TeamCard>*/}
              </div>
            ))}
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { ActivityTeams };