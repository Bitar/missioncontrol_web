import React, {Dispatch, FC, useEffect, useState} from 'react'
import {SetStateAction} from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import {PrizeItemWrapper} from './PrizeItemWrapper'
import {ActivityPrize} from '../../../../models/activity/ActivityPrize'
import {initialPrizeItem, PrizeItem} from '../../../../models/activity/PrizeItem'
import {InputLabel, MenuItem, Select} from '@mui/material'
import {updateData} from '../../../../helpers/form/FormHelper'

type Props = {
  index?: number
  removeItem?: any
  hasDelete?: boolean
  disableDelete?: boolean
  activityPrize: ActivityPrize
  setActivityPrize: Dispatch<SetStateAction<ActivityPrize>>
}

const PrizeSingle: FC<Props> = ({
  index,
  removeItem,
  hasDelete = false,
  disableDelete = false,
  activityPrize,
  setActivityPrize,
}) => {
  const [valueSuffix, setValueSuffix] = useState('')
  const [prizeItem, setPrizeItem] = useState<PrizeItem>(initialPrizeItem)

  useEffect(() => {
    updateData(
      {
        type: 1,
        item: prizeItem,
      },
      setActivityPrize,
      activityPrize
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prizeItem])

  return (
    <>
      <div className='row mb-6'>
        <div className='col-lg-11'>
          <div className='row'>
            <div className='col-lg-3'>
              <Box sx={{minWidth: 120}}>
                <FormControl fullWidth size='small'>
                  <PrizeItemWrapper prizeItem={prizeItem} setPrizeItem={setPrizeItem} />
                </FormControl>
              </Box>
            </div>
            <div className='col-lg-3'>
              <TextField
                required
                label='Name'
                variant='outlined'
                name='prizes.name'
                className='w-100'
                size='small'
                onChange={(e) => updateData({name: e.target.value}, setPrizeItem, prizeItem)}
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
                onChange={(e) =>
                  updateData({value: parseInt(e.target.value)}, setPrizeItem, prizeItem)
                }
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
                    updateData(
                      {
                        value_type: e.target.value,
                      },
                      setPrizeItem,
                      prizeItem
                    )
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

export {PrizeSingle}
