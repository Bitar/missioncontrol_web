import {Form, Formik, FormikValues} from 'formik'
import React, {useEffect, useRef, useState} from 'react'
import {ScrollTopComponent, StepperComponent} from '../../../_metronic/assets/ts/components'
import {
  communityCreateWizardSchema,
  CommunityFormType,
  formOnChange,
  initialCommunityFormTypeByCommunity,
} from '../community/models/Community'
import {GeneralDetails} from '../community/partials/community-create-steps/GeneralDetails'
import {KTCard, KTCardBody, KTCardHeader, KTSVG} from '../../helpers/components'
import {ContactDetails} from '../community/partials/community-create-steps/ContactDetails'
import {AddressDetails} from '../community/partials/community-create-steps/AddressDetails'
import {AccessDetail} from '../community/partials/community-create-steps/AccessDetail'
import {BillingPlanWrapper} from '../billing/BillingPlanWrapper'
import {ReviewDetails} from '../community/partials/community-create-steps/ReviewDetails'
import {CommunityFormContext} from '../community/core/CommunityFormContext'
import {State} from '../../models/misc/State'
import {getStates} from '../misc/core/_requests'
import {getPlans} from '../billing/plan/core/_requests'
import {Plan} from '../../models/billing/Plan'
import {createSubscription} from '../billing/core/BillingRequests'
import {jsonToFormData} from '../../helpers/form/FormHelper'
import {FormErrorAlert} from '../../modules/errors/partials/FormErrorAlert'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import {useAuth} from '../../modules/auth'
import {FormAction} from '../../helpers/form/FormAction'
import {createAdminCommunity} from '../community/core/CommunityRequests'

const AdminCommunityCreate = () => {
  const {updateAuth} = useAuth()
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(communityCreateWizardSchema[0])
  const [communityForm, setCommunityForm] = useState<CommunityFormType>(
    initialCommunityFormTypeByCommunity
  )
  const [isSubmitButton, setSubmitButton] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [states, setStates] = useState<State[]>()
  const [plans, setPlans] = useState<Plan[] | undefined>()
  const [paymentTerm, setPaymentTerm] = useState(1)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    getStates().then((response) => {
      setStates(response.data)
    })

    getPlans('include=options').then((response) => {
      setPlans(response?.data)
    })
  }, [])

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber! - 1)

    stepper.current.goPrev()

    setCurrentSchema(communityCreateWizardSchema[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values: CommunityFormType, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    // nextStep(stepper);

    if (stepper.current?.currentStepIndex === 5) {
      if (communityForm?.plan_id) {
        setAlertMessage('')
        setHasErrors(false)
        nextStep(stepper)
      } else {
        setAlertMessage('Please choose a Plan')
        setHasErrors(true)
        ScrollTopComponent.goTop()
      }
    } else if (stepper.current?.currentStepIndex === 6) {
      if (communityForm?.plan_id !== 1) {
        if (!communityForm?.payment_method) {
          setAlertMessage('Please choose a Payment Method')
          setHasErrors(true)
          ScrollTopComponent.goTop()
        }
      } else {
        setAlertMessage('')
        setHasErrors(false)
        nextStep(stepper)
      }
    } else {
      nextStep(stepper)
    }
  }

  const nextStep = (stepper: any) => {
    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber! - 1)

    setCurrentSchema(communityCreateWizardSchema[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
      stepper.current.goNext()
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

  const handleOnChange = (e: any) => formOnChange(e, communityForm, setCommunityForm)

  const handleSubmit = () => {
    let data = jsonToFormData(communityForm)
    setIsSubmitting(true)

    if (communityForm?.plan_id !== 1) {
      if (communityForm?.payment_method === '1') {
        createSubscriptionApi(data)
      } else if (communityForm?.payment_method === '2') {
        createAdminCommunityApi(data)
      }
    } else {
      createAdminCommunityApi(data)
    }
  }

  function createSubscriptionApi(data: any) {
    createSubscription(data)
      .then((response) => {
        if (response?.url) {
          window.location.href = response?.url
        } else {
          toast.success('Community created Successfully')
          updateAuth()

          navigate('/')
          setIsSubmitting(false)
        }
      })
      .catch(function (e) {
        setIsSubmitting(false)
        if (e.response) {
          setAlertMessage(e.response.data.message)
          setHasErrors(true)
        }
      })
  }

  function createAdminCommunityApi(data: any) {
    createAdminCommunity(data)
      .then((response) => {
        setIsSubmitting(false)

        toast.success('Community created Successfully')

        updateAuth()

        navigate('/')
      })
      .catch(function (e) {
        setIsSubmitting(false)
        if (e.response) {
          setAlertMessage(e.response.data.message)
          setHasErrors(true)
        }
      })
  }

  return (
    <KTCard>
      <KTCardHeader text={'Create Community'} bg='mc-secondary' text_color='white' />
      <div ref={stepperRef} className='stepper stepper-links d-flex flex-column'>
        <KTCardBody className='border-bottom'>
          <div className='stepper-nav'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-label'>
                <div className='stepper-icon'>
                  <KTSVG path='/media/icons/duotune/abs021.svg' className='svg-icon-3x' />
                </div>
                <h3 className='stepper-title'>Basic Details</h3>
              </div>
              <div className='stepper-arrow'>
                <KTSVG path='/media/icons/duotune/arr064.svg' className='svg-icon-2x' />
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-label'>
                <div className='stepper-icon'>
                  <i className='fa-duotone fa-phone-arrow-down-left fs-3x'></i>
                </div>
                <h3 className='stepper-title'>External Contact</h3>
              </div>
              <div className='stepper-arrow'>
                <KTSVG path='/media/icons/duotune/arr064.svg' className='svg-icon-2x' />
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-label'>
                <div className='stepper-icon'>
                  <i className='fa-duotone fa-location-dot fs-3x'></i>
                </div>
                <h3 className='stepper-title'>Address</h3>
              </div>
              <div className='stepper-arrow'>
                <KTSVG path='/media/icons/duotune/arr064.svg' className='svg-icon-2x' />
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-label'>
                <div className='stepper-icon'>
                  <i className='fa-duotone fa-key fs-3x'></i>
                </div>
                <h3 className='stepper-title'>Access</h3>
              </div>
              <div className='stepper-arrow'>
                <KTSVG path='/media/icons/duotune/arr064.svg' className='svg-icon-2x' />
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-label'>
                <div className='stepper-icon'>
                  <i className='fa-duotone fa-dollar-sign fs-3x'></i>
                </div>
                <h3 className='stepper-title'>Payment</h3>
              </div>
              <div className='stepper-arrow'>
                <KTSVG path='/media/icons/duotune/arr064.svg' className='svg-icon-2x' />
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-label'>
                <div className='stepper-icon'>
                  <i className='fa-duotone fa-check-double fs-3x'></i>
                </div>
                <h3 className='stepper-title'>Review</h3>
              </div>
            </div>
          </div>
        </KTCardBody>

        <CommunityFormContext.Provider
          value={{
            communityForm: communityForm,
            setCommunityForm: setCommunityForm,
            plans: plans,
            states: states,
            paymentTerm: paymentTerm,
            setPaymentTerm: setPaymentTerm,
          }}
        >
          <Formik
            validationSchema={currentSchema}
            initialValues={communityForm}
            onSubmit={submitStep}
          >
            {() => (
              <Form onChange={handleOnChange}>
                <KTCardBody>
                  <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />
                  <div className='current' data-kt-stepper-element='content'>
                    <GeneralDetails />
                  </div>

                  <div data-kt-stepper-element='content'>
                    <ContactDetails />
                  </div>

                  <div data-kt-stepper-element='content'>
                    <AddressDetails />
                  </div>

                  <div data-kt-stepper-element='content'>
                    <AccessDetail />
                  </div>

                  <div data-kt-stepper-element='content'>
                    <BillingPlanWrapper />
                  </div>

                  <div data-kt-stepper-element='content'>
                    <ReviewDetails />
                  </div>

                  <div className='d-flex flex-stack pt-15'>
                    <div className='mr-2'>
                      <button
                        onClick={prevStep}
                        type='button'
                        className='btn btn-lg btn-light-mc-secondary me-3'
                        data-kt-stepper-action='previous'
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </KTCardBody>
                <FormAction
                  text={isSubmitting ? 'Submitting' : isSubmitButton ? 'Submit' : 'Continue'}
                  isSubmitting={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </CommunityFormContext.Provider>
      </div>
    </KTCard>
  )
}

export {AdminCommunityCreate}
