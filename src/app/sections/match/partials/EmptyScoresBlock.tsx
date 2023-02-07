import {TextImageCell} from '../../../modules/table/columns/TextImageCell'
import {ErrorMessage, Field, useFormikContext} from 'formik'
import React, {FC} from 'react'
import {Team} from '../../../models/squad/Team'
import {useActivity} from '../../activity/core/contexts/ActivityContext'
import InputMask from 'react-input-mask'

type Props = {
  roundIndex: number
  team: Team
  teamScoreIndex: number
}

export const EmptyScoresBlock: FC<Props> = ({roundIndex, team, teamScoreIndex}) => {
  const {activity} = useActivity()
  const {setFieldValue} = useFormikContext()

  return (
    <div>
      <TextImageCell dImage={team?.image} dText={team?.name} size={'30'} />

      <div>
        {activity?.game_mode?.scoring_settings.map((settings, index) => {
          return (
            <div className='row mb-6' key={`empty-scoresheet-${index}`}>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {settings?.key?.key}
              </label>
              <div className='col-lg-8 fv-row'>
                <Field
                  type='text'
                  name={`rounds.${roundIndex}.scores.${teamScoreIndex}.keys.${index}.value`}
                  className='form-control form-control-sm mb-3 mb-lg-0'
                />

                <div className='text-danger mt-2'>
                  <ErrorMessage
                    name={`rounds.${roundIndex}.scores.${teamScoreIndex}.keys.${index}.value`}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
