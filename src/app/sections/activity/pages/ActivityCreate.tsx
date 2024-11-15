import {KTCard, KTCardBody, KTCardFooter, KTCardHeader, KTSVG} from '../../../helpers/components'
import React, {useEffect, useRef, useState} from 'react'
import clsx from 'clsx'
import {ActivityFormContext} from '../core/contexts/ActivityFormContext'
import {Form, Formik} from 'formik'
import {GeneralDetail} from '../partials/activity-create-steps/GeneralDetail'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {activityCreateWizardSchema} from '../core/validation/ActivitySchema'
import {GameDetail} from '../partials/activity-create-steps/GameDetails'
import {jsonToFormData, updateData} from '../../../helpers/form/FormHelper'
import {ActivityForm, initialActivityForm} from '../../../models/activity/ActivityForm'
import {ACTIVITY_CREATE_STEPPER_NAV} from '../core/_consts'
import {ScheduleDetailForm} from '../partials/activity-create-steps/ScheduleDetailForm'
import {TeamDetailForm} from '../partials/activity-create-steps/TeamDetailForm'
import {GameMode} from '../../../models/game/GameMode'
import {EntryFeeDetail} from '../partials/activity-create-steps/EntryFeeDetail'
import {LocationDetail} from '../partials/activity-create-steps/LocationDetail'
import {createActivity} from '../core/requests/ActivityRequests'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {extractErrors} from '../../../requests/helpers'
import FormErrors from '../../../components/form/FormErrors'

export const ActivityCreate = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)

  const [activityForm, setActivityForm] = useState<ActivityForm>(initialActivityForm())
  const [gameModes, setGameModes] = useState<GameMode[]>()
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [submitButton, setSubmitButton] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(activityCreateWizardSchema[0])
  const navigate = useNavigate()

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()
    setCurrentSchema(activityCreateWizardSchema[stepper.current.currentStepIndex - 1])
    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber)
  }

  const submitStep = () => {
    if (!stepper.current) {
      return
    }

    nextStep(stepper)
  }

  const nextStep = (stepper: any) => {
    if (stepper.current.currentStepIndex < stepper.current.totalStepsNumber) {
      stepper.current.goNext()
      setCurrentSchema(activityCreateWizardSchema[stepper.current.currentStepIndex - 1])
      setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber)
    } else {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  const handleOnChange = (event: any) => {
    let targetName = event.target.name
    let targetValue = event.target.value

    if (targetName === 'location.locate') {
      updateData(
        {
          location: {
            ...activityForm?.location,
            ...{locate: targetValue},
          },
        },
        setActivityForm,
        activityForm
      )
    } else if (targetName === 'is_cross_play') {
      updateData(
        {is_cross_play: !activityForm?.is_cross_play, platform_ids: []},
        setActivityForm,
        activityForm
      )
    } else if (targetName === 'playoff.is_enabled') {
      let updateObject
      if (!activityForm?.playoff?.is_enabled) {
        updateObject = {
          is_enabled: !activityForm?.playoff?.is_enabled,
          playoff_dates: {
            ...activityForm?.playoff?.playoff_dates,
            ...{start_date: 0, end_date: 0},
          },
          teams: 2,
        }
      } else {
        updateObject = {
          is_enabled: !activityForm?.playoff?.is_enabled,
        }
      }
      updateData({playoff: updateObject}, setActivityForm, activityForm)
    } else {
      if (targetName !== '') {
        updateData({[targetName]: targetValue}, setActivityForm, activityForm)
      }
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    let data = jsonToFormData(activityForm)
    createActivity(data)
      .then((response) => {
        setIsSubmitting(false)
        toast.success('Activity Created Successfully')

        if (response) {
          navigate(`/activities/${response.id}`)
        }
      })
      .catch((error) => {
        setIsSubmitting(false)
        if (error.response) {
          // let obj = error.response.data.error.validation;
          setFormErrors(extractErrors(error))
        }
      })
  }

  return (
    <KTCard>
      <KTCardHeader text={'Create Activity'} bg='mc-secondary' text_color='white' />
      <div ref={stepperRef} className='stepper stepper-links d-flex flex-column'>
        <KTCardBody className='border-bottom'>
          <div className='stepper-nav'>
            {ACTIVITY_CREATE_STEPPER_NAV.map((singleStep, index) => (
              <div
                key={`activity-create-stepper-${index}`}
                className={clsx('stepper-item', {current: index === 0})}
                data-kt-stepper-element='nav'
                onClick={() => {
                  if (!stepper.current) return
                  stepper.current.goto(index + 1)
                }}>
                <div className='stepper-label'>
                  <div className='stepper-icon'>
                    <i className={`${singleStep?.icon} fs-2x`}></i>
                  </div>
                  <h3 className='stepper-title'>{singleStep?.title}</h3>
                </div>
                {singleStep?.has_next && (
                  <div className='stepper-arrow'>
                    <KTSVG path='/media/icons/duotune/arr064.svg' className='svg-icon-2x' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </KTCardBody>

        <ActivityFormContext.Provider
          value={{
            activityForm,
            setActivityForm,
            gameModes,
            setGameModes,
            method: 'create',
          }}>
          <Formik
            validationSchema={currentSchema}
            initialValues={activityForm}
            onSubmit={submitStep}
            enableReinitialize>
            {() => (
              <Form onChange={handleOnChange} className='form' autoComplete='off'>
                <KTCardBody className='pb-0'>
                  <FormErrors errorMessages={formErrors} />
                </KTCardBody>
                <KTCardBody>
                  <div className='current' data-kt-stepper-element='content'>
                    <GeneralDetail />
                  </div>
                  <div data-kt-stepper-element='content'>
                    <GameDetail />
                  </div>
                  <div data-kt-stepper-element='content'>
                    <TeamDetailForm />
                  </div>
                  <div data-kt-stepper-element='content'>
                    <ScheduleDetailForm />
                  </div>
                  <div data-kt-stepper-element='content'>
                    <EntryFeeDetail />
                  </div>
                  <div data-kt-stepper-element='content'>
                    <LocationDetail />
                  </div>
                </KTCardBody>
                <KTCardFooter className='d-flex justify-content-end py-6 px-9'>
                  <button
                    onClick={prevStep}
                    type='button'
                    className='btn btn-sm btn-light-mc-secondary me-3'
                    data-kt-stepper-action='previous'>
                    Back
                  </button>

                  <button
                    type='submit'
                    className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'
                    disabled={isSubmitting}>
                    <span className='indicator-label'>
                      {isSubmitting ? 'Submitting' : submitButton ? 'Submit' : 'Continue'}
                    </span>
                    {isSubmitting && (
                      <span className='indicator-progress' style={{display: 'inline-block'}}>
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </KTCardFooter>
              </Form>
            )}
          </Formik>
        </ActivityFormContext.Provider>
      </div>
    </KTCard>
  )
}
