import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import React, {FC, useEffect, useState} from 'react'
import {RoundBlock} from './RoundBlock'
import {Form, Formik} from 'formik'
import {FormAction} from '../../../helpers/form/FormAction'
import {useActivity} from '../../activity/core/contexts/ActivityContext'
import {RoundScoreObject, setUpScoringFields} from '../../../models/activity/matches/Score'
import {jsonToFormData} from '../../../helpers/form/FormHelper'
import {updateScores} from '../core/ScoreRequests'
import toast from 'react-hot-toast'
import {useMatch} from '../core/MatchContext'
import * as Yup from 'yup'

export const ScoreSettings: FC = () => {
  const {activity} = useActivity()
  const {match, setMatch} = useMatch()

  const [rounds, setRounds] = useState<RoundScoreObject[]>([])

  useEffect(() => {
    if (activity && match) {
      setRounds(setUpScoringFields(activity, match))
    }
  }, [activity, match])

  const handleSubmit = () => {
    let dataObj = {
      rounds: rounds,
    }
    let data = jsonToFormData(dataObj)

    updateScores(match?.id, data).then((response) => {
      toast.success('Match Updated')
      setMatch(response)
    })
  }

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    let tempRounds = [...rounds]
    let fieldName = targetName.split('.')

    let existingValue = {...tempRounds[fieldName[1]].scores[fieldName[3]].keys[fieldName[5]]}
    existingValue.value = targetValue

    tempRounds[fieldName[1]].scores[fieldName[3]].keys[fieldName[5]] = existingValue

    setRounds(tempRounds)
  }

  const scoreUpdateValidation = Yup.object().shape({})

  return (
    <KTCard className='mb-5 mb-xl-10 overflow-hidden'>
      <KTCardHeader
        text={'Update Scores'}
        bg={'warning'}
        text_color={'white'}
        collapse={true}
        target_id='update-scores-wrapper'
      />

      <Formik
        initialValues={{rounds: rounds}}
        validationSchema={scoreUpdateValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form
            onChange={handleOnChange}
            className='form collapse show'
            autoComplete='off'
            id='update-scores-wrapper'
          >
            <KTCardBody className='pb-0 pt-5'>
              {rounds?.map((round, roundIndex) => (
                <RoundBlock
                  round={round}
                  roundIndex={roundIndex}
                  key={`round-block-${round?.round}`}
                />
              ))}
            </KTCardBody>
            <FormAction text={'Update Scores'} isSubmitting={false} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}
