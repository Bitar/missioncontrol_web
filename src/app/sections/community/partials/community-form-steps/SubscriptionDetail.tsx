import {useCommunityForm} from '../../core/CommunityFormContext'
import {KTCard, KTCardBody, KTCardFooter, KTCardHeader} from '../../../../helpers/components'
import {Field, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useAuth} from '../../../../modules/auth'
import {Plan} from '../../../../models/billing/Plan'
import {updateData} from '../../../../helpers/form/FormHelper'
import {useCommunity} from '../../core/CommunityContext'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Timezone from 'dayjs/plugin/timezone'
import axios, {AxiosResponse} from 'axios'
import {getPlans} from '../../../billing/plan/core/BillingPlanRequest'
import {isSuperAdmin} from '../../../../models/iam/User'
import Select from 'react-select'
import {PlanOption} from '../../../../models/billing/PlanOption'
import PlanCard from '../../components/PlanCard'
import {getBillingPlanOptions} from '../../../misc/core/_requests'
import ScheduleDetailSuperAdmin from '../../../activity/partials/activity-form-steps/ScheduleDetailSuperAdmin'

dayjs.extend(utc)
dayjs.extend(Timezone)

type SubscriptionObject = {
  plan_id: number | undefined
  payment_method?: number
  payment_term?: number
}

export const getCustomerPortal = (currentLink: string): Promise<any> => {
  const API_URL = process.env.REACT_APP_API_URL
  const ENDPOINT = `${API_URL}/billing/customer-portal`
  let url = `${ENDPOINT}?current=${currentLink}`

  return axios.get(url).then((response: AxiosResponse<any>) => response.data)
}

export const SubscriptionDetail = () => {
  const {communityForm} = useCommunityForm()
  const {currentUser, communityAdmin} = useAuth()
  const {community} = useCommunity()
  const [plans, setPlans] = useState<Plan[] | undefined>()
  const [subscriptionForm, setSubscriptionForm] = useState<SubscriptionObject>({
    plan_id: communityForm?.plan_id,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPlans, setShowPlans] = useState<boolean>(false)

  const [endDate, setEndDate] = useState<Date>(new Date())

  const [planOptions, setPlanOptions] = useState<PlanOption[]>()
  const [activePlan, setActivePlan] = useState<Plan>()

  useEffect(() => {
    if ((showPlans && !planOptions) || (planOptions && planOptions.length === 0)) {
      getBillingPlanOptions().then((response) => {
        setPlanOptions(response?.data)
      })
    }
  }, [showPlans, planOptions])

  useEffect(() => {
    if (community?.subscription?.ends_at) {
      setEndDate(
        dayjs(new Date(community?.subscription?.ends_at * 1000))
          .utc(false)
          .toDate()
      )
    }
  }, [community?.subscription?.ends_at])

  useEffect(() => {
    getPlans('include=options').then((response) => {
      setPlans(response?.data)
    })
  }, [])

  const handleUpdateSubscription = () => {}

  const manageSubscription = () => {
    setIsLoading(true)
    getCustomerPortal(window.location.href)
      .then((response) => {
        if (response?.data?.customer_portal) {
          window.location.href = response?.data?.customer_portal
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    console.log(targetName)
    console.log(targetValue)

    updateData({[targetName]: parseInt(targetValue)}, setSubscriptionForm, subscriptionForm)
  }

  const paymentTerms = [
    {
      id: 1,
      name: 'Monthly',
    },
    {
      id: 2,
      name: 'Yearly',
    },
  ]

  return (
    <>
      <KTCard border={true}>
        <KTCardHeader text={'Subscription'} bg='mc-primary' text_color='white' />
        <KTCardBody className='py-4'>
          <div className='d-flex flex-column pt-5'>
            <div className='row mb-6'>
              <div className='col-12'>
                <p>Current Plan: {community?.subscription?.plan?.name}</p>
                {community?.subscription?.plan?.id !== 1 && (
                  <p>Ends On: {endDate.toDateString()}</p>
                )}
              </div>
              {currentUser &&
                communityAdmin &&
                communityAdmin?.id === community?.id &&
                communityAdmin?.is_owner &&
                communityAdmin?.subscription?.is_stripe && (
                  <div className='col-12 mb-5'>
                    <button
                      onClick={manageSubscription}
                      type='submit'
                      disabled={isLoading}
                      className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'>
                      <span className='indicator-label'>{'Manage Subscription'}</span>
                      {isLoading && (
                        <span className='indicator-progress' style={{display: 'inline-block'}}>
                          <span className='spinner-border spinner-border-sm align-middle ms-2' />
                        </span>
                      )}
                    </button>
                  </div>
                )}

              {currentUser &&
                communityAdmin &&
                communityAdmin?.subscription?.plan?.id &&
                !communityAdmin?.subscription?.is_stripe && (
                  <div className='col-12 mb-5'>
                    <button
                      onClick={() => setShowPlans(!showPlans)}
                      type='button'
                      className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'>
                      <span className='indicator-label'>{'Upgrade Subscription'}</span>
                    </button>

                    {showPlans && (
                      <div className='mt-10'>
                        <div className='row mb-6'>
                          <label className='col-lg-4 col-form-label fw-bold fs-6'>Plan</label>
                          <div className='col-lg-8 fv-row'>
                            {plans && (
                              <Select
                                name='plan_id'
                                placeholder={'Choose a Plan'}
                                defaultValue={
                                  community?.subscription?.plan?.id !== 1
                                    ? community?.subscription?.plan
                                    : null
                                }
                                options={plans.filter((plan) => plan?.id !== 1)}
                                getOptionLabel={(plan) => plan?.name}
                                getOptionValue={(plan) => plan?.id?.toString() || ''}
                                onChange={(e) => {
                                  if (e) {
                                    if (e?.id !== 1 || e?.id < 4) {
                                      updateData(
                                        {plan_id: e?.id || '', payment_term: 1},
                                        setSubscriptionForm,
                                        subscriptionForm
                                      )
                                    } else {
                                      updateData(
                                        {plan_id: e?.id || ''},
                                        setSubscriptionForm,
                                        subscriptionForm
                                      )
                                    }

                                    setActivePlan(e)
                                  }
                                }}
                              />
                            )}
                          </div>
                        </div>

                        {subscriptionForm?.plan_id &&
                          subscriptionForm?.plan_id !== 1 &&
                          subscriptionForm?.plan_id < 4 && (
                            <div className='row mb-6'>
                              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                Payment Terms
                              </label>
                              <div className='col-lg-8 fv-row'>
                                <Select
                                  name='payment_term'
                                  placeholder={'Choose a Payment Term'}
                                  defaultValue={paymentTerms[0]}
                                  options={paymentTerms}
                                  getOptionLabel={(paymentTerm) => paymentTerm?.name}
                                  getOptionValue={(paymentTerm) =>
                                    paymentTerm?.id?.toString() || ''
                                  }
                                  onChange={(e) => {
                                    if (e) {
                                      updateData(
                                        {payment_term: e?.id || ''},
                                        setSubscriptionForm,
                                        subscriptionForm
                                      )
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          )}

                        <div className='row mb-6'>
                          <div className='col-12'>
                            <Formik
                              initialValues={subscriptionForm}
                              onSubmit={handleUpdateSubscription}
                              enableReinitialize={true}>
                              {({isSubmitting}) => (
                                <Form onChange={handleOnChange} className='form' autoComplete='off'>
                                  <PlanCard
                                    plan={activePlan}
                                    planOptions={planOptions}
                                    paymentTerm={subscriptionForm?.payment_term}
                                  />

                                  {subscriptionForm?.plan_id && subscriptionForm?.plan_id !== 1 && (
                                    <KTCard shadow={false} className={'mt-5'}>
                                      <KTCardHeader
                                        text={'Payment Method'}
                                        bg={'mc-primary'}
                                        text_color={'white'}
                                      />

                                      <KTCardBody>
                                        {subscriptionForm?.plan_id &&
                                          subscriptionForm?.plan_id < 4 && (
                                            <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap mb-2'>
                                              <label className='cursor-pointer d-flex w-100 p-6 flex-stack'>
                                                <div className='d-flex flex-column py-2'>
                                                  <div className='d-flex align-items-center fs-4 fw-bold'>
                                                    Credit Card
                                                    <i
                                                      className='ms-2 fas fa-credit-card'
                                                      style={{
                                                        color: '#110055',
                                                        fontSize: '2rem',
                                                      }}></i>
                                                    <i
                                                      className='ms-2 fab fa-cc-visa'
                                                      style={{
                                                        color: '#110055',
                                                        fontSize: '2rem',
                                                      }}></i>
                                                    <i
                                                      className='ms-2 fab fa-cc-mastercard'
                                                      style={{
                                                        color: '#110055',
                                                        fontSize: '2rem',
                                                      }}></i>
                                                  </div>
                                                </div>

                                                <div className='d-flex align-items-center py-2'>
                                                  <Field
                                                    className='form-check-input'
                                                    type='radio'
                                                    name='payment_method'
                                                    value={1}
                                                    checked={subscriptionForm?.payment_method === 1}
                                                  />
                                                </div>
                                              </label>
                                            </div>
                                          )}
                                        <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap'>
                                          <label className='cursor-pointer d-flex w-100 p-6 flex-stack'>
                                            <div className='d-flex flex-column py-2'>
                                              <div className='d-flex align-items-center fs-4 fw-bold'>
                                                Contact Sales
                                              </div>
                                            </div>

                                            <div className='d-flex align-items-center py-2'>
                                              <Field
                                                className='form-check-input'
                                                type='radio'
                                                name='payment_method'
                                                value={2}
                                                checked={subscriptionForm?.payment_method === 2}
                                              />
                                            </div>
                                          </label>
                                        </div>
                                      </KTCardBody>
                                      {subscriptionForm?.payment_method && (
                                        <KTCardFooter className='d-flex justify-content-end py-6 px-9'>
                                          <button
                                            type='submit'
                                            className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'
                                            // disabled={isSubmitting}
                                          >
                                            <span className='indicator-label'>
                                              {subscriptionForm?.payment_method === 1 && 'Checkout'}
                                              {subscriptionForm?.payment_method === 2 && 'Contact'}
                                            </span>
                                            {isSubmitting && (
                                              <span
                                                className='indicator-progress'
                                                style={{display: 'inline-block'}}>
                                                <span className='spinner-border spinner-border-sm align-middle ms-2' />
                                              </span>
                                            )}
                                          </button>
                                        </KTCardFooter>
                                      )}
                                    </KTCard>
                                  )}
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              {currentUser && isSuperAdmin(currentUser) && community?.subscription?.notes && (
                <div className='col-12'>
                  <h3>Notes</h3>
                  <p>{community.subscription.notes}</p>
                </div>
              )}
            </div>
          </div>
        </KTCardBody>
      </KTCard>

      {currentUser && isSuperAdmin(currentUser) && <ScheduleDetailSuperAdmin plans={plans} />}
    </>
  )
}
