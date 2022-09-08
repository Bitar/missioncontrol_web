import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Activity} from './models/Activity'
import { ErrorMessage, FormikErrors, FormikTouched, FormikValues } from "formik";
import {updateData} from '../../helpers/form/FormHelper'
import {getAllCommunities} from '../community/core/CommunityRequests'
import {GameDetails, Location, EntryFee, Schedule, TeamDetails, Scoring} from './components'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import {InputLabel, MenuItem, Select} from '@mui/material'
import Box from '@mui/material/Box'
import {Community} from '../community/models/Community'
import {PrizeWrapper} from './components/prize/PrizeWrapper'
import {isUserCommunityAdmin} from '../identity/user/models/User'
import {useAuth} from '../../modules/auth'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
  isValid: boolean
  touched: FormikTouched<FormikValues>
  errors: FormikErrors<FormikValues>
}

const ActivityForm: FC<React.PropsWithChildren<Props>> = ({activity, setActivity, isValid, touched, errors}) => {









  return (
    <>

    </>
  )
}

export {ActivityForm}
