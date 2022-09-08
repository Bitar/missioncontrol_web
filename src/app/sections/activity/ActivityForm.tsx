import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Activity} from './models/Activity'
import {ErrorMessage} from 'formik'
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
}

const ActivityForm: FC<React.PropsWithChildren<Props>> = ({activity, setActivity}) => {
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [communities, setCommunities] = useState<Community[]>()
  const {currentUser, communityAdmin} = useAuth()

  useEffect(() => {

    if(currentUser && isUserCommunityAdmin(currentUser) && communityAdmin) {
      updateData(
        {
          community_id: communityAdmin?.id,
        },
        setActivity,
        activity
      )
    }

  }, [communityAdmin, currentUser])

  const ActivityProps = {
    activity: activity,
    setActivity: setActivity,
  }

  useEffect(() => {
    getAllCommunities().then((response) => {
      setCommunities(response.data)
    })
  }, [])

  return (
    <>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
        <div className='col-lg-8 fv-row'>
          <TextField label='Title' variant='outlined' name='title' className='w-100' size='small' />
          <TextField
            label='Type'
            variant='outlined'
            name='type_id'
            className='w-100'
            size='small'
            value={1}
            hidden={true}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='title' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
        <div className='col-lg-8 fv-row'>
          <TextField
            label='Description'
            variant='outlined'
            multiline
            name='description'
            className='w-100'
            size='small'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='description' />
          </div>
        </div>
      </div>

      {currentUser && !isUserCommunityAdmin(currentUser) && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Community</label>
          <div className='col-lg-8 fv-row'>
            <Box sx={{minWidth: 120}}>
              <FormControl fullWidth size='small'>
                <InputLabel id='communities-select-label'>Community</InputLabel>
                <Select
                  labelId='communities-select-label'
                  id='communities-select'
                  value={selectedCommunity}
                  label='Community'
                  MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                  onChange={(e) => {
                    setSelectedCommunity(e.target.value as string)

                    updateData(
                      {
                        community_id: e.target.value,
                      },
                      setActivity,
                      activity
                    )
                  }}
                >
                  {communities &&
                    communities?.length > 0 &&
                    communities?.map((community: any) => (
                      <MenuItem key={community.id} value={community.id}>
                        {community.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      )}

      <div className='separator separator-dashed my-6'></div>

      <GameDetails {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      <Schedule {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      {activity?.game_mode && (
        <>
          <Scoring {...ActivityProps} />

          <div className='separator separator-dashed my-6'></div>
        </>
      )}

      <TeamDetails {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      <EntryFee {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      <Location {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      <PrizeWrapper {...ActivityProps} />

      {/*<div className='separator separator-dashed my-6'></div>*/}
      {/*<Prizes {...ActivityProps} />*/}
      {/*  Prize  */}
    </>
  )
}

export {ActivityForm}
