import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import {Activity} from '../../models/Activity'
import FormControl from '@mui/material/FormControl'
import {
  AccordionSummary,
  Accordion,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  AccordionDetails,
} from '@mui/material'
import Box from '@mui/material/Box'
import {Prizes} from './Prizes'
import {ActivityPrize, initialActivityPrize} from '../../models/ActivityPrize'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const PrizeWrapper: FC<Props> = ({activity, setActivity}) => {
  const [winningWay, setWinningWay] = useState('')
  const [activityPrize, setActivityPrize] = useState<ActivityPrize[]>([initialActivityPrize()])

  const addRank = () => {
    setActivityPrize([...activityPrize, initialActivityPrize()])
  }

  const removeRank = (index: number) => {
    let newFormValues = [...activityPrize]
    newFormValues.splice(index, 1)
    setActivityPrize(newFormValues)
  }

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
                <MenuItem value={'3'}>Per Rank</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      {winningWay === '2' && (
        <>
          <Prizes activity={activity} setActivity={setActivity} />
        </>
      )}

      {winningWay === '3' && (
        <>
          <div className='row mb-6'>
            <div className='col-lg-4'>
              <span className='required fw-bold fs-6'>Rank</span>
            </div>
            <div className='col-lg-8'>
              <button
                className='btn btn-icon btn-sm btn-light-success'
                onClick={() => addRank()}
                type='button'
              >
                <i className='fa fa-plus'></i>
              </button>

              <Box sx={{mt: 1}}>
                {activityPrize?.map((el, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                      sx={{borderBottom: 1, borderColor: '#ff9933'}}
                    >
                      <Typography>Rank {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{pt: 2}}>
                      <Prizes
                        hasDelete={true}
                        activityPrize={el}
                        index={index}
                        key={index}
                        activity={activity}
                        setActivity={setActivity}
                        removeRank={removeRank}
                        disableDelete={activityPrize.length <= 1}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export {PrizeWrapper}
