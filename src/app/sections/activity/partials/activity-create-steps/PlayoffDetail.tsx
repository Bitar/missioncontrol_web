import {ErrorMessage} from 'formik'
import React, {FC, useEffect, useState} from 'react'
import {SwitchInput} from '../../../../components/SwitchInput/SwitchInput'
import {DateRangePicker} from 'rsuite'
import {DateRange} from 'rsuite/esm/DateRangePicker/types'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {updateData} from '../../../../helpers/form/FormHelper'
import InputMask from 'react-input-mask'
import {Badge} from 'react-bootstrap'
import {
  handlePlayoffsChange,
  onInputMaskChange,
  resetPlayoffDates, updatePlayoffDates
} from "../../../../helpers/PlayoffHelper";

const {before} = DateRangePicker

type Props = {
  playoffDisabledDate: Date
}

export const PlayoffDetail: FC<Props> = ({playoffDisabledDate}) => {
  const {activityForm, setActivityForm} = useActivityForm()
  const [enablePlayoffs, setEnablePlayoffs] = useState<boolean>(false)
  const [playoffsRange, setPlayoffsRange] = useState<DateRange | null>()
  const [showErrors, setShowErrors] = useState<boolean>(false)

  const onPlayoffsChange = (e: any) => {
    handlePlayoffsChange(e, activityForm, setActivityForm, setShowErrors, setPlayoffsRange)
  }

  useEffect(() => {
    updatePlayoffDates(activityForm, setPlayoffsRange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForm?.playoff?.playoff_dates]);

  useEffect(() => {
    resetPlayoffDates(activityForm, setActivityForm, setPlayoffsRange)
  }, [activityForm?.schedule?.matchplay_dates])

  const onMaskedStateChange = ({nextState}: any) => {
    return onInputMaskChange({nextState}, activityForm)
  }

  return (
    <div className='d-flex flex-column pt-5 w-100'>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Enable Playoffs</label>
        <div className='col-lg-8 fv-row'>
          <SwitchInput
            id={'enable_playoff_switch'}
            name='playoff.is_enabled'
            isOn={enablePlayoffs}
            handleToggle={(e: any) => {
              setEnablePlayoffs(!enablePlayoffs)
              updateData(
                {
                  playoff: {
                    ...activityForm?.playoff,
                    ...{
                      is_enabled: !enablePlayoffs,
                      teams: e.target.checked ? 2 : undefined,
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

      {enablePlayoffs && (
        <>
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
                className='w-100'
                character={' - '}
                ranges={[]}
                onChange={onPlayoffsChange}
                disabledDate={before && before(playoffDisabledDate)}
              />
              <div className='text-danger mt-2'>{showErrors && 'Invalid Playoff dates'}</div>
              <div className='form-text'>
                {activityForm?.playoff?.teams ? (
                  <>
                    <Badge bg='warning' text='dark'>
                      {' '}
                      You need at least {Math.ceil(Math.log2(activityForm?.playoff?.teams))} playable days of
                      playoffs{' '}
                    </Badge>{' '}
                    The playoffs dates highly depends on the number of teams. <br />
                    Make sure the number of teams is enough for the dates to generate enough matches
                    for the whole tournament.
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className='text-danger mt-2'>
                <ErrorMessage name='playoff.playoff_dates.start_date' />
              </div>
              <div className='text-danger mt-2'>
                <ErrorMessage name='playoff.playoff_dates.end_date' />
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'># of Teams</label>
            <div className='col-lg-8 fv-row'>
              <InputMask
                mask='999'
                defaultValue={activityForm?.playoff?.teams || 2}
                className='form-control mb-3 mb-lg-0'
                placeholder='Teams count'
                maskPlaceholder={null}
                name='playoff.teams'
                beforeMaskedStateChange={onMaskedStateChange}
                onChange={() => {
                  resetPlayoffDates(activityForm, setActivityForm, setPlayoffsRange)
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='playoff.teams' />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
