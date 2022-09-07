import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Grid} from '@mui/material'
import {PrizeSingle} from './PrizeSingle'
import {initialPrizeItem, PrizeItem as PrizeItemModel} from '../../models/PrizeItem'
import TextField from '@mui/material/TextField'
import {ActivityPrize, initialActivityPrize} from '../../models/ActivityPrize'
import {updateData} from '../../../../helpers/form/FormHelper'

type Props = {
  hasDelete?: boolean
  disableDelete?: boolean
  removeRank?: any
  index?: number
  activityPrizes: ActivityPrize[]
  setActivityPrizes: Dispatch<SetStateAction<ActivityPrize[]>>
}

const Prizes: FC<Props> = ({
  hasDelete,
  index,
  disableDelete,
  removeRank,
  setActivityPrizes,
  activityPrizes,
}) => {
  const [prizeType, setPrizeType] = useState('1')
  const [prizes, setPrizes] = useState<PrizeItemModel[]>([initialPrizeItem()])
  const [activityPrize, setActivityPrize] = useState<ActivityPrize>(initialActivityPrize)

  useEffect(() => {
    updateData(
      {
        ...activityPrizes,
        ...[activityPrize],
      },
      setActivityPrizes,
      activityPrizes
    )
  }, [activityPrize])

  const addItem = () => {
    setPrizes([...prizes, initialPrizeItem()])
  }

  const removeItem = (index: number) => {
    let newFormValues = [...prizes]
    newFormValues.splice(index, 1)
    setPrizes(newFormValues)
  }

  return (
    <>
      {/*<div className='row mb-6'>*/}
      {/*  <div className='col-lg-4'>*/}
      {/*    <span className='required fw-bold fs-6'>Type</span>*/}
      {/*  </div>*/}
      {/*  <div className='col-lg-8'>*/}
      {/*    <Box sx={{minWidth: 120}}>*/}
      {/*      <FormControl fullWidth size='small'>*/}
      {/*        <InputLabel id='timezone-select-label'>Type</InputLabel>*/}
      {/*        <Select*/}
      {/*          labelId='timezone-select-label'*/}
      {/*          id='timezone-select'*/}
      {/*          value={prizeType}*/}
      {/*          label='Type'*/}
      {/*          onChange={(e) => {*/}
      {/*            let targetValue = e.target.value as string*/}
      {/*            setPrizeType(targetValue)*/}
      {/*            updateData(*/}
      {/*              {*/}
      {/*                type: targetValue,*/}
      {/*              },*/}
      {/*              setActivityPrize,*/}
      {/*              activityPrize*/}
      {/*            )*/}
      {/*            // updateData({*/}
      {/*            //   settings: {*/}
      {/*            //     ...activity?.settings,*/}
      {/*            //     ...{*/}
      {/*            //       frequency: e.target.value*/}
      {/*            //     },*/}
      {/*            //   },*/}
      {/*            // }, setActivity, activity)*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <MenuItem value={'1'}>Single</MenuItem>*/}
      {/*          <MenuItem value={'2'}>Bundle</MenuItem>*/}
      {/*        </Select>*/}
      {/*      </FormControl>*/}
      {/*    </Box>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {prizeType === '1' && (
        <>
          <div className='row mb-6'>
            <div className='col-lg-4'>
              <span className='required fw-bold fs-6'>Item</span>
            </div>
          </div>

          <PrizeSingle
            activityPrize={activityPrize}
            setActivityPrize={setActivityPrize}
            removeItem={removeRank}
          />
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
            <PrizeSingle
              hasDelete={true}
              index={index}
              key={index}
              removeItem={removeItem}
              disableDelete={prizes.length <= 1}
              activityPrize={activityPrize}
              setActivityPrize={setActivityPrize}
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
