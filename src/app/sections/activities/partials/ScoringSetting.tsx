import {Box, List, ListItem, ListItemText} from '@mui/material'
import React, {FC} from 'react'
import {ScoringSettings} from '../../../models/game/scoring/ScoringSettings'

type Props = {
  settings: ScoringSettings
}

const ScoringSetting: FC<Props> = ({settings}) => {
  // console.log(settings);

  function ordinal(n: number) {
    let s = ['th', 'st', 'nd', 'rd']
    let v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  return (
    <>
      {settings?.key?.type === 1 ? (
        <>
          <Box>
            <div>
              <h6>
                {settings?.key?.key} Point worth {settings?.values[0].value}
              </h6>
            </div>
          </Box>
        </>
      ) : (
        <>
          <Box>
            <div>
              <h6>{settings?.key?.key} Points</h6>
            </div>
            <List
              className={'border border-1'}
              dense={true}
              sx={{
                width: '100%',
                maxWidth: 360,
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
              }}
            >
              {settings?.values?.map((value) => (
                <ListItem key={value.id}>
                  <ListItemText
                    primary={ordinal(value.key) + ' ' + settings?.key?.key + ': ' + value.value}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}
      <br />
    </>
  )
}

export {ScoringSetting}
