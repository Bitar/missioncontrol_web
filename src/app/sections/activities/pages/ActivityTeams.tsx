import React, { Dispatch, FC, SetStateAction } from "react";
import { Activity } from "../models/Activity";
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
        <div className='card-header'>
          <div className='card-title'>
            <h3 className='card-label'>Teams</h3>
          </div>
        </div>
        <KTCardBody className='py-4'>
          <div className='row g-6 g-xl-9'>
          {activity?.standings?.map((standing) => (
            <div key={standing.team.id} className='col-md-6 col-xl-4'>
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

export {ActivityTeams}