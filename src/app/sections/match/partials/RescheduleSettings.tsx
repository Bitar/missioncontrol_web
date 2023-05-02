import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import {ErrorMessage, Form, Formik} from 'formik'
import {jsonToFormData, updateData} from '../../../helpers/form/FormHelper'
import {FormAction} from '../../../helpers/form/FormAction'
import React, {useEffect, useState} from 'react'
import {useMatch} from '../core/MatchContext'
import {DatePicker} from 'rsuite'
import {shiftDateToUtc} from '../../../helpers/ActivityHelper'
import {defaultTime} from '../../../models/activity/ActivityForm'
import moment from 'moment/moment'
import * as Yup from 'yup'
import {useActivity} from '../../activity/core/contexts/ActivityContext'
import {rescheduleMatch} from '../core/MatchRequests'
import {useMcApp} from '../../../modules/general/McApp'
import {AlertMessageGenerator} from '../../../helpers/AlertMessageGenerator'
import {Actions, ToastType} from '../../../helpers/variables'

type matchForm = {
  start_date: number
  time: number
}

export const matchDateSchema = Yup.object().shape({
  time: Yup.number().moreThan(0, 'Time is required').required('Time is required'),
  start_date: Yup.number().moreThan(0, 'Start Date is required').required('Start Date is required'),
})

export const RescheduleSettings = () => {
  const mcApp = useMcApp()
  const [matchForm, setMatchForm] = useState<matchForm>({start_date: 0, time: 0})
  const {match, setMatch} = useMatch()
  const {activity} = useActivity()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [timeValue, setTimeValue] = useState<Date | null>(defaultTime(new Date()))
  const [startDateDisabledDate, setStartDateDisabledDate] = useState<Date>(new Date())

  const handleSubmit = async () => {
    let data = jsonToFormData(matchForm)
    rescheduleMatch(match?.id, data).then((response) => {
      setMatch(response)
      mcApp.setAlert({
        message: new AlertMessageGenerator('match schedule', Actions.EDIT, ToastType.SUCCESS)
          .message,
        type: ToastType.SUCCESS,
      })
    })
  }

  const handleDateChange = (value: Date | null) => {
    if (value?.getTime()) {
      let startDate: any = shiftDateToUtc(value.getTime() / 1000)
      updateData({start_date: startDate.getTime() / 1000}, setMatchForm, matchForm)
      setStartDate(value)
    }
  }

  useEffect(() => {
    if (match?.start_date && activity?.settings?.timezone?.value) {
      let startDate = shiftDateToUtc(match?.start_date, activity?.settings?.timezone?.value)

      setTimeValue(startDate)
      setStartDate(startDate)
      updateData({start_date: match?.start_date, time: match?.start_date}, setMatchForm, matchForm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.start_date])

  useEffect(() => {
    if (activity?.matchplay_dates?.end_date) {
      let endDate = shiftDateToUtc(
        activity?.matchplay_dates?.end_date,
        activity?.settings?.timezone?.value
      )
      let disabledEndDate = new Date(endDate)
      disabledEndDate.setDate(endDate.getDate() + 1)

      setStartDateDisabledDate(disabledEndDate)
    }
  }, [activity?.matchplay_dates?.end_date])

  return (
    <KTCard border={true}>
      <KTCardHeader text={'Reschedule'} bg='mc-primary' text_color='white' />
      <Formik
        validationSchema={matchDateSchema}
        initialValues={matchForm!}
        onSubmit={handleSubmit}
        enableReinitialize>
        {({isSubmitting}) => (
          <Form className='form' autoComplete='off'>
            <KTCardBody className='py-4'>
              <div className='d-flex flex-column pt-5'>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Match Start Date</label>
                  <div className='col-lg-8 fv-row'>
                    <DatePicker
                      disabled={activity?.type?.id !== 1 || match?.status === 3}
                      format='yyyy-MM-dd'
                      cleanable={false}
                      value={startDate}
                      id='start_date'
                      appearance='default'
                      placeholder='Registration Dates'
                      className='w-100'
                      ranges={[]}
                      onChange={handleDateChange}
                      shouldDisableDate={(date) =>
                        !(date && date.valueOf() < startDateDisabledDate.valueOf())
                      }
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='start_date' />
                    </div>
                  </div>
                </div>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Time</label>
                  <div className='col-lg-8 fv-row'>
                    <DatePicker
                      disabled={activity?.type?.id !== 1 || match?.status === 3}
                      cleanable={false}
                      value={timeValue}
                      format='hh:mm aa'
                      placement={'topStart'}
                      ranges={[]}
                      hideMinutes={(minute) => minute % 5 !== 0}
                      className='w-100'
                      placeholder='Select Time'
                      showMeridian={true}
                      onChange={(value) => {
                        if (value?.getTime()) {
                          let time = moment(value.getTime()).utc(true).unix()
                          updateData({time: time}, setMatchForm, matchForm)
                          setTimeValue(value)
                        }
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='schedule.settings.time' />
                    </div>
                  </div>
                </div>
              </div>
            </KTCardBody>
            <FormAction text={'Update Match'} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}
