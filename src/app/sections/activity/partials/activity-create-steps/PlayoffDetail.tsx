import {ErrorMessage} from 'formik'
import React, {useEffect, useState} from 'react'
import {SwitchInput} from '../../../../components/SwitchInput/SwitchInput'
import {DateRangePicker} from 'rsuite'
import {DateRange} from 'rsuite/esm/DateRangePicker/types'
import dayjs from 'dayjs'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {updateData} from '../../../../helpers/form/FormHelper'
import InputMask from 'react-input-mask'

const {before} = DateRangePicker

export const PlayoffDetail = () => {
  const {activityForm, setActivityForm} = useActivityForm()
  const [enablePlayoffs, setEnablePlayoffs] = useState<boolean>(false)
  const [playoffDisabledDate, setPlayoffDisabledDate] = useState<Date>(new Date(new Date()))
  const [playoffsRange, setPlayoffsRange] = useState<DateRange | null>()

  useEffect(() => {
    if (activityForm?.schedule?.matchplay_dates?.end_date) {
      let disabledEndDate = new Date(activityForm?.schedule?.matchplay_dates?.end_date * 1000)
      disabledEndDate.setDate(disabledEndDate.getDate() + 1)

      setPlayoffDisabledDate(disabledEndDate)
    }
  }, [activityForm?.schedule?.matchplay_dates?.end_date])

  const handlePlayoffsChange = (e: any) => {
    if (e) {
      let startDate = dayjs(new Date(e[0]).setHours(0, 0)).utc(true).tz('utc').unix()
      let endDate = dayjs(new Date(e[1]).setHours(0, 0)).utc(true).tz('utc').unix()

      updateData(
        {
          playoffs: {
            ...activityForm?.playoffs,
            ...{
              playoff_dates: {
                ...activityForm?.playoffs?.playoff_dates,
                ...{start_date: startDate, end_date: endDate},
              },
              teams: 0,
            },
          },
        },
        setActivityForm,
        activityForm
      )

      setPlayoffsRange(e)
    }

    // updateData(
    //   {
    //     schedule: {
    //       ...activityForm?.schedule,
    //       ...{
    //         registration_dates: {
    //           ...activityForm?.schedule.registration_dates,
    //           ...{start_date: startDate, end_date: endDate},
    //         },
    //         matchplay_dates: {
    //           ...activityForm?.schedule.matchplay_dates,
    //           ...{start_date: 0, end_date: 0},
    //         },
    //       },
    //     },
    //   },
    //   setActivityForm,
    //   activityForm
    // )
  }

  return (
    <>
      <div className='d-flex flex-column pt-5 w-100'>
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Playoffs</label>
          <div className='col-lg-8 fv-row'>
            <SwitchInput
              id={'enable_playoff_switch'}
              name='playoff.enabvl'
              isOn={enablePlayoffs}
              handleToggle={() => {
                //Clear teams and PlayoffDates when disabled
                setEnablePlayoffs(!enablePlayoffs)
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='is_cross_play' />
            </div>
          </div>
        </div>

        {enablePlayoffs && (
          <>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Playoff Dates</label>
              <div className='col-lg-8 fv-row'>
                <DateRangePicker
                  cleanable={false}
                  value={playoffsRange}
                  id='registration_dates'
                  appearance='default'
                  placeholder='Playoff Dates'
                  className='w-100'
                  character={' - '}
                  ranges={[]}
                  onChange={handlePlayoffsChange}
                  disabledDate={before && before(playoffDisabledDate)}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='schedule.registration_dates' />
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'># of Teams</label>
              <div className='col-lg-8 fv-row'>
                <InputMask
                  mask='999'
                  className='form-control mb-3 mb-lg-0'
                  placeholder='Teams count'
                  maskPlaceholder={null}
                  name='playoffs.teams'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='description' />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
