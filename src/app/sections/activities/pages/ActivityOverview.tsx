import React, { Dispatch, FC, SetStateAction } from "react";
import {Activity} from '../models/Activity'
import { ActivityStandings } from "../partials/ActivityStandings";
import { ActivityMatches } from "./ActivityMatches";
// import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
}

const ActivityOverview: FC<Props> = ({activity, setActivity}) => {
  return (
    <>
      <div className='row g-5 g-xxl-8'>
        <div className='col-lg-4 col-md-12'>
          <ActivityStandings activity={activity}/>
        </div>
        <div className='col-lg-4 col-md-12'>
          <ActivityMatches activity={activity} setActivity={setActivity}/>
        </div>
      </div>
    </>
  )
}

export {ActivityOverview}