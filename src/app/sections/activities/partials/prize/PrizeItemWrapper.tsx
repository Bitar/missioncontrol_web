import React, {FC, useState} from 'react'
import {Activity} from '../../models/Activity'
import {Dispatch, SetStateAction} from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import {InputLabel, MenuItem, Select} from '@mui/material'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const PrizeItemWrapper: FC<Props> = ({activity, setActivity}) => {
  const [prizeTypes, setPrizeTypes] = useState('')

  return (
    <>
      <Box sx={{minWidth: 120}}>
        <FormControl fullWidth size='small'>
          <InputLabel id='timezone-select-label'>Prize Type</InputLabel>
          <Select
            labelId='timezone-select-label'
            id='timezone-select'
            value={prizeTypes}
            label='Prize Type'
            onChange={(e) => {
              setPrizeTypes(e.target.value as string)
            }}
          >
            <MenuItem value={1}>Cash</MenuItem>
            <MenuItem value={2}>Voucher</MenuItem>
            <MenuItem value={3}>Gift Card</MenuItem>
            <MenuItem value={4}>Collectible</MenuItem>
            <MenuItem value={5}>Other</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export {PrizeItemWrapper}
