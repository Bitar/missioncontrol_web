import {KTCard, KTCardBody, KTCardFooter, KTCardHeader, KTSVG} from '../../../helpers/components'
import React, {useEffect, useRef, useState} from 'react'
import clsx from 'clsx'
import {ActivityFormContext} from '../core/contexts/ActivityFormContext'
import {Form, Formik, FormikValues} from 'formik'
import {FormErrorAlert} from '../../../modules/errors/partials/FormErrorAlert'
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

export const ActivityCreate = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)

  const [activityForm, setActivityForm] = useState<ActivityForm>(initialActivityForm())
  const [gameModes, setGameModes] = useState<GameMode[]>()
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)
  const [isSubmitButton, setSubmitButton] = useState(false)
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

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber! - 1)

    stepper.current.goPrev()

    setCurrentSchema(activityCreateWizardSchema[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values: ActivityForm, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    nextStep(stepper)
  }

  const nextStep = (stepper: any) => {
    // console.log('next step: ' + stepper.current.currentStepIndex);
    if (stepper.current.currentStepIndex < stepper.current.totalStepsNumber) {
      setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber! - 1)

      setCurrentSchema(activityCreateWizardSchema[stepper.current.currentStepIndex])

      if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
        // console.log('am i here');
        stepper.current.goNext()
      } else {
        handleSubmit()
      }
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
    } else {
      updateData({[targetName]: targetValue}, setActivityForm, activityForm)
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
          // console.log((error.response.data.error.validation))
          // console.log(obj.stringify())
          setAlertMessage('Error occurred!')
          setHasErrors(true)
        }
      })
  }

  return (
    <KTCard>
      <KTCardHeader text={'Create Activity'} bg='mc-secondary' text_color='white' />
      <div ref={stepperRef} className='stepper stepper-links d-flex flex-column'>
        <KTCardBody className='border-bottom'>
          <div className='stepper-nav'>
            {ACTIVITY_CREATE_STEPPER_NAV.map((stepper, index) => (
              <div
                key={`activity-create-stepper-${index}`}
                className={clsx('stepper-item', {current: index === 0})}
                data-kt-stepper-element='nav'
              >
                <div className='stepper-label'>
                  <div className='stepper-icon'>
                    <i className={`${stepper?.icon} fs-2x`}></i>
                  </div>
                  <h3 className='stepper-title'>{stepper?.title}</h3>
                </div>
                {stepper?.has_next && (
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
          }}
        >
          <Formik
            validationSchema={currentSchema}
            initialValues={activityForm}
            onSubmit={submitStep}
            enableReinitialize
          >
            {() => (
              <Form onChange={handleOnChange} className='form' autoComplete='off'>
                <KTCardBody>
                  <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />
                  <div className='current' data-kt-stepper-element='content'>
                    <GeneralDetail />
                  </div>
                  <div data-kt-stepper-element='content'>
                    <GameDetail />
                  </div>
                  <div data-kt-stepper-element='content'>
                    <ScheduleDetailForm />
                  </div>
                  <div data-kt-stepper-element='content'>
                    <TeamDetailForm />
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
                    data-kt-stepper-action='previous'
                  >
                    Back
                  </button>

                  <button
                    type='submit'
                    className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'
                    disabled={isSubmitting}
                  >
                    <span className='indicator-label'>
                      {isSubmitting ? 'Submitting' : isSubmitButton ? 'Submit' : 'Continue'}
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
