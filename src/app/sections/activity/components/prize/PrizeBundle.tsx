import React, {Dispatch, FC, useState} from 'react'
import {SetStateAction} from 'react'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
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

const PrizeBundle: FC<Props> = ({
  index,
  removeItem,
  hasDelete = false,
  disableDelete = false,
  activityPrize,
  setActivityPrize,
}) => {
  const [valueSuffix, setValueSuffix] = useState('')
  const [prizeItem, setPrizeItem] = useState<PrizeItem[]>([initialPrizeItem()])

  // useEffect(() => {
  //   console.log(prizeItem);
  //   updateData({
  //     item: prizeItem
  //   }, setActivityPrize, activityPrize)
  // }, [prizeItem])

  return (
    <>
      <div className='row mb-6'>
        <div className='col-lg-11'>
          <div className='row'>
            <div className='col-lg-3'></div>

            {/*updateData({*/}
            {/*   settings: {*/}
            {/*     ...activity?.settings,*/}
            {/*     ...{*/}
            {/*       frequency: e.target.value*/}
            {/*     },*/}
            {/*   },*/}
            {/* }, setActivity, activity)*/}
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

export {PrizeBundle}
