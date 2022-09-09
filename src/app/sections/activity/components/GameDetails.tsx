import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react'
import {getAllGameModes, getAllGamePlatforms, getAllGames} from '../../games/core/GameRequests'
import {updateData} from '../../../helpers/form/FormHelper'
import {ErrorMessage} from 'formik'
import { Activity, ActivityForm } from "../models/Activity";
import FormControl from '@mui/material/FormControl'
import {MenuItem, Select, InputLabel, Switch, Autocomplete, TextField} from '@mui/material'
import Box from '@mui/material/Box'
import {Platform} from '../../../models/game/Platform'
import {Game} from '../../../models/game/Game'
import {GameMode} from '../../../models/game/GameMode'

type Props = {
  activity: ActivityForm | undefined
  setActivity: Dispatch<SetStateAction<ActivityForm>>
}

const GameDetails: FC<Props> = ({activity, setActivity}) => {
  // const [rounds, setRounds] = useState('')
  const platformsObj = useRef<Platform[] | undefined>([])
  // const [platforms, setPlatforms] = useState<Platform[]>([])



  // const [selectedModes, setSelectedModes] = useState('')
  // const [modes, setModes] = useState<GameMode[]>()

  // const populatePlatforms = (gameId: number) => {
  //   getAllGamePlatforms(gameId).then((response) => {
  //     platformsObj.current = response?.data
  //   })
  // }



  // useEffect(() => {
  //   if (activity?.game?.id) {
  //     setSelectedModes('')
  //     getAllGameModes(activity?.game?.id).then((response) => {
  //       setModes(response.data)
  //     })
  //
  //     populatePlatforms(activity?.game?.id)
  //     setPlatforms([])
  //   }
  // }, [activity?.game?.id])

  return (
    <>





    </>
  )
}

export {GameDetails}
