import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import {Activity} from '../../models/Activity'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import {Grid, InputLabel, MenuItem, Select} from '@mui/material'
import {PrizeItemSingle} from './PrizeItemSingle'
import {initialPrizeItem, PrizeItem as PrizeItemModel} from '../../models/PrizeItem'
import TextField from '@mui/material/TextField'
import {ActivityPrize} from '../../models/ActivityPrize'

type Props = {
  hasDelete?: boolean
  disableDelete?: boolean
  removeRank?: any
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
  activityPrize?: ActivityPrize
  index?: number
}

const Prizes: FC<Props> = ({
  hasDelete,
  index,
  disableDelete,
  activity,
  setActivity,
  removeRank,
}) => {
  const [prizeType, setPrizeType] = useState('')
  const [prizes, setPrizes] = useState<PrizeItemModel[]>([initialPrizeItem()])

  const addItem = () => {
    setPrizes([...prizes, initialPrizeItem()])
  }

  const removeItem = (index: number) => {
    let newFormValues = [...prizes]
    newFormValues.splice(index, 1)
    setPrizes(newFormValues)
  }

  // console.log(prizes);

  return (
    <>
      <div className='row mb-6'>
        <div className='col-lg-4'>
          <span className='required fw-bold fs-6'>Type</span>
        </div>
        <div className='col-lg-8'>
          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth size='small'>
              <InputLabel id='timezone-select-label'>Type</InputLabel>
              <Select
                labelId='timezone-select-label'
                id='timezone-select'
                value={prizeType}
                label='Type'
                onChange={(e) => {
                  setPrizeType(e.target.value as string)
                  // updateData({
                  //   settings: {
                  //     ...activity?.settings,
                  //     ...{
                  //       frequency: e.target.value
                  //     },
                  //   },
                  // }, setActivity, activity)
                }}
              >
                <MenuItem value={'1'}>Single</MenuItem>
                <MenuItem value={'2'}>Bundle</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      {prizeType === '1' && (
        <>
          <div className='row mb-6'>
            <div className='col-lg-4'>
              <span className='required fw-bold fs-6'>Item</span>
            </div>
          </div>

          <PrizeItemSingle activity={activity} setActivity={setActivity} removeItem={removeRank} />
        </>
      )}

      {prizeType === '2' && (
        <>
          <div className='row mb-6'>
            <div className='col-lg-4'>
              <span className='required fw-bold fs-6'>Bundle</span>
            </div>
            <div className='col-lg-8'>
              <TextField
                label='Name'
                variant='outlined'
                name='name'
                className='w-100'
                size='small'
              />
            </div>
          </div>

          <div className='row mb-6'>
            <div className='col-lg-4'>
              <span className='required fw-bold fs-6'>Item</span>
            </div>
            <div className='col-lg-8'>
              <button
                className='btn btn-icon btn-sm btn-light-success'
                onClick={() => addItem()}
                type='button'
              >
                <i className='fa fa-plus'></i>
              </button>
            </div>
          </div>

          {prizes?.map((el, index) => (
            <PrizeItemSingle
              hasDelete={true}
              prizeItem={el}
              index={index}
              key={index}
              activity={activity}
              setActivity={setActivity}
              removeItem={removeItem}
              disableDelete={prizes.length <= 1}
            />
          ))}
        </>
      )}

      {hasDelete && (
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{textAlign: 'right'}}>
            <button
              type='button'
              disabled={disableDelete}
              className='btn btn-icon btn-sm btn-light-danger'
              onClick={() => removeRank(index)}
            >
              <i className='fa fa-trash'></i>
            </button>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export {Prizes}
