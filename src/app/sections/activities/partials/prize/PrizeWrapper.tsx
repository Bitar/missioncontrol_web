import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Activity} from '../../models/Activity'
import FormControl from '@mui/material/FormControl'
import {
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import Box from '@mui/material/Box'
import {ActivityPrize, initialActivityPrize} from '../../models/ActivityPrize'
import {PrizeSingleWrapper} from './PrizeSingleWrapper'
import {PrizeBundleWrapper} from './PrizeBundleWrapper'
import { updateData } from '../../../../helpers/form/FormHelper'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const PrizeWrapper: FC<Props> = ({activity, setActivity}) => {
  const [winningWay, setWinningWay] = useState('')
  const [activityPrizes, setActivityPrizes] = useState<ActivityPrize[]>([])

  useEffect(() => {
    if(winningWay === '1') {
      updateData(
        {
          prize: {},
        },
        setActivity,
        activity
      )
    }
  }, [winningWay])

  useEffect(() => {
    updateData(
      {
        prize: {
          ...activity?.prize,
          ...activityPrizes,
        },
      },
      setActivity,
      activity
    )
  }, [activityPrizes])

  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Prizes</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <div className='col-lg-4'>
          <span className='required fw-bold fs-6'>Winning Way</span>
        </div>
        <div className='col-lg-8'>
          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth size='small'>
              <InputLabel id='winning-way-select-label'>Winning Way</InputLabel>
              <Select
                labelId='winning-way-select-label'
                id='winning-way-select'
                value={winningWay}
                label='Winning Way'
                onChange={(e) => {
                  setWinningWay(e.target.value as string)
                }}
              >
                <MenuItem value={'1'}>No Prize</MenuItem>
                <MenuItem value={'2'}>Sole Winner</MenuItem>
                {/*<MenuItem value={'3'}>Per Rank</MenuItem>*/}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      {winningWay === '2' && <PrizeSingleWrapper activityPrizes={activityPrizes} setActivityPrizes={setActivityPrizes}  />}

      {/*{winningWay === '3' && <PrizeBundleWrapper activityPrizes={activityPrizes} setActivityPrizes={setActivityPrizes} />}*/}
    </>
  )
}

export { PrizeWrapper };
