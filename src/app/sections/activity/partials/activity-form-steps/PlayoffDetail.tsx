import {ErrorMessage, Field, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {SwitchInput} from '../../../../components/SwitchInput/SwitchInput'
import {DateRangePicker} from 'rsuite'
import {DateRange} from 'rsuite/esm/DateRangePicker/types'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {FormAction} from '../../../../helpers/form/FormAction'
import {updatePlayoffs} from '../../core/requests/ActivitySettingsRequests'
import toast from 'react-hot-toast'
import {useActivity} from '../../core/contexts/ActivityContext'
import {activityPlayoffSchema} from '../../core/validation/ActivitySchema'
import {handlePlayoffsChange, handleTeamChange} from '../../../../helpers/PlayoffHelper'
import {TournamentTeamCountText} from '../TournamentTeamCountText'
import {shiftDateToUtc} from '../../../../helpers/ActivityHelper'

const {before} = DateRangePicker

export const PlayoffDetail = () => {
  const {activity, setActivity} = useActivity()
  const {activityForm, setActivityForm} = useActivityForm()

  const [playoffDisabledDate, setPlayoffDisabledDate] = useState<Date>(new Date())
  const [playoffsRange, setPlayoffsRange] = useState<DateRange | null>()
  const [showErrors, setShowErrors] = useState<boolean>(false)
  const [teams, setTeams] = useState('')

  useEffect(() => {
    if (activityForm?.playoff?.teams) {
      setTeams(activityForm?.playoff?.teams?.toString())
    }
  }, [activityForm?.playoff?.teams])

  useEffect(() => {
    if (
      activity?.playoff?.playoff_dates?.start_date &&
      activity?.playoff?.playoff_dates?.end_date &&
      activity?.playoff?.playoff_dates?.start_date > 0 &&
      activity?.playoff?.playoff_dates?.end_date > 0 &&
      activity?.settings?.timezone?.value
    ) {
      let startDate = shiftDateToUtc(
        activity?.playoff?.playoff_dates?.start_date,
        activity?.settings?.timezone?.value
      )
      let endDate = shiftDateToUtc(
        activity?.playoff?.playoff_dates?.end_date,
        activity?.settings?.timezone?.value
      )

      setPlayoffsRange([startDate, endDate])
    } else {
      setPlayoffsRange(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity?.playoff?.playoff_dates, activity?.settings?.timezone?.value])

  useEffect(() => {
    if (activityForm?.schedule?.matchplay_dates?.end_date) {
      let disabledEndDate = new Date(activityForm?.schedule?.matchplay_dates?.end_date * 1000)

      disabledEndDate.setDate(disabledEndDate.getDate())
      disabledEndDate.setHours(0, 0, 0, 0)

      setPlayoffDisabledDate(disabledEndDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForm?.schedule?.matchplay_dates])

  const onPlayoffsChange = (e: any) => {
    handlePlayoffsChange(e, activityForm, setActivityForm, setShowErrors, setPlayoffsRange)
  }

  const handleSubmit = async () => {
    let data = jsonToFormData(activityForm)

    await updatePlayoffs(activity?.id, data)
      .then((response) => {
        toast.success('Activity updated Successfully!')
        setActivity(response)
      })
      .catch(function (e) {
        if (e.response) {
          let status = e.response.status

          if (status === 403) {
            toast.error('You are not allowed to do this update!')
          }
        }
      })
  }

  return (
    <KTCard border={true} className={'mt-8'}>
      <KTCardHeader text={'Playoffs'} bg='mc-primary' text_color='white' />

      <Formik
        validationSchema={activityPlayoffSchema}
        initialValues={activityForm!}
        onSubmit={handleSubmit}
        enableReinitialize>
        {({isSubmitting}) => (
          <Form className='form' autoComplete='off'>
            <KTCardBody className='py-4'>
              <div className='d-flex flex-column pt-5 w-100'>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Enable Playoffs</label>
                  <div className='col-lg-8 fv-row'>
                    <SwitchInput
                      id={'enable_playoff_switch'}
                      name='playoff.is_enabled'
                      isOn={activityForm?.playoff?.is_enabled}
                      handleToggle={(e: any) => {
                        const {checked} = e.target
                        updateData(
                          {
                            playoff: {
                              ...activityForm?.playoff,
                              ...{
                                is_enabled: checked,
                              },
                            },
                          },
                          setActivityForm,
                          activityForm
                        )
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='playoff.is_enabled' />
                    </div>
                  </div>
                </div>

                {activityForm?.playoff?.is_enabled && (
                  <>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'># of Teams</label>
                      <div className='col-lg-8 fv-row'>
                        <Field
                          id={'playoff_teams'}
                          value={teams}
                          type='text'
                          placeholder='Teams count'
                          className='form-control mb-3 mb-lg-0'
                          autoComplete='off'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleTeamChange(e, activityForm, setActivityForm, setTeams)
                          }}
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='playoff.teams' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Playoff Dates</label>
                      <div className='col-lg-8 fv-row'>
                        <DateRangePicker
                          name={'playoff.playoff_dates'}
                          cleanable={false}
                          value={playoffsRange}
                          id='playoff_dates'
                          appearance='default'
                          placeholder='Playoff Dates'
                          placement={'topStart'}
                          className='w-100'
                          character={' - '}
                          ranges={[]}
                          onChange={onPlayoffsChange}
                          shouldDisableDate={before && before(playoffDisabledDate)}
                        />
                        <div className='text-danger mt-2'>
                          {showErrors && 'Invalid Playoff dates'}
                        </div>
                        <div className='form-text'>
                          <TournamentTeamCountText teamCount={activityForm?.playoff?.teams!} />
                        </div>
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='playoff.playoff_dates.start_date' />
                        </div>
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='playoff.playoff_dates.end_date' />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </KTCardBody>
            <FormAction text={'Update'} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}
