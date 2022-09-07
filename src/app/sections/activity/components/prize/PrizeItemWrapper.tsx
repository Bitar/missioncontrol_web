import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import {InputLabel, MenuItem, Select} from '@mui/material'
import {PrizeItem} from '../../models/PrizeItem'
import {updateData} from '../../../../helpers/form/FormHelper'

type Props = {
  prizeItem: PrizeItem
  setPrizeItem: Dispatch<SetStateAction<PrizeItem>>
  // activity: Activity | undefined
  // setActivity: Dispatch<SetStateAction<Activity>>
}

const PrizeItemWrapper: FC<Props> = ({prizeItem, setPrizeItem}) => {
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
              updateData(
                {
                  type: e.target.value,
                },
                setPrizeItem,
                prizeItem
              )
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
