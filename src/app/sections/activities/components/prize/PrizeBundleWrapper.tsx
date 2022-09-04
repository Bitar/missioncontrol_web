import Box from "@mui/material/Box";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Prizes } from "./Prizes";
import React, {Dispatch, SetStateAction, FC} from 'react'
import { ActivityPrize, initialActivityPrize } from "../../models/ActivityPrize";

type Props = {
  activityPrizes: ActivityPrize[],
  setActivityPrizes: Dispatch<SetStateAction<ActivityPrize[]>>
}

const PrizeBundleWrapper: FC<Props> = ({activityPrizes, setActivityPrizes}) => {

  const addRank = () => {
    setActivityPrizes([...activityPrizes, initialActivityPrize()])
  }

  const removeRank = (index: number) => {
    let newFormValues = [...activityPrizes]
    newFormValues.splice(index, 1)
    setActivityPrizes(newFormValues)
  }

  return (
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
            {activityPrizes?.map((el, index) => (
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
                    activityPrizes={activityPrizes}
                    setActivityPrizes={setActivityPrizes}
                    hasDelete={true}
                    index={index}
                    key={index}
                    removeRank={removeRank}
                    disableDelete={activityPrizes.length <= 1}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </div>
      </div>
    </>
  )
}

export {PrizeBundleWrapper}