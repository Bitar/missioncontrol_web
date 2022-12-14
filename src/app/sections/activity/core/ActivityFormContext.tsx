import {ActivityForm} from '../models/Activity'
import {createContext, Dispatch, SetStateAction, useContext} from 'react'

type ActivityFormContextProps = {
  activityForm: ActivityForm | undefined
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>
}

const initActivityFormContext = {
  activityForm: undefined,
  setActivityForm: () => {},
}

export const ActivityFormContext = createContext<ActivityFormContextProps>(initActivityFormContext)

export const useActivityForm = () => {
  return useContext(ActivityFormContext)
}
