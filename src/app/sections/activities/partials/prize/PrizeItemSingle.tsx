import React, {Dispatch, FC, useState} from 'react'
import {SetStateAction} from 'react'
import {Activity} from '../../models/Activity'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import {InputLabel, MenuItem, Select} from '@mui/material'
import {PrizeItem} from '../../models/PrizeItem'
import {PrizeItemWrapper} from './PrizeItemWrapper'

type Props = {
  index?: number
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
  removeItem?: any
  prizeItem?: PrizeItem
  hasDelete?: boolean
  disableDelete?: boolean
}

const PrizeItemSingle: FC<Props> = ({
  prizeItem,
  index,
  activity,
  setActivity,
  removeItem,
  hasDelete = false,
  disableDelete = false,
}) => {
  const [valueSuffix, setValueSuffix] = useState('')

  return (
    <>
      <div className='row mb-6'>
        <div className='col-lg-11'>
          <div className='row'>
            <div className='col-lg-3'>
              <Box sx={{minWidth: 120}}>
                <FormControl fullWidth size='small'>
                  <PrizeItemWrapper activity={activity} setActivity={setActivity} />
                </FormControl>
              </Box>
            </div>
            <div className='col-lg-3'>
              <TextField
                label='Name'
                variant='outlined'
                name='name'
                className='w-100'
                size='small'
                // onChange={(e) => prizeItem.name = e.target.value }
              />
            </div>
            <div className='col-lg-3'>
              <TextField
                type={'number'}
                label='Amount'
                variant='outlined'
                name='amount'
                className='w-100'
                size='small'
              />
            </div>
            <div className='col-lg-3'>
              <FormControl fullWidth size='small'>
                <InputLabel id='timezone-select-label'>Amount Suffix</InputLabel>
                <Select
                  labelId='timezone-select-label'
                  id='timezone-select'
                  value={valueSuffix}
                  label='Amount Suffix'
                  onChange={(e) => {
                    setValueSuffix(e.target.value as string)
                  }}
                >
                  <MenuItem value={1}>($) Dollars </MenuItem>
                  <MenuItem value={2}>(%) Percentage</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        {hasDelete && (
          <div className='col-lg-1'>
            <button
              type='button'
              disabled={disableDelete}
              className='btn btn-icon btn-sm btn-light-danger'
              onClick={() => removeItem(index)}
            >
              <i className='fa fa-trash'></i>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export {PrizeItemSingle}
