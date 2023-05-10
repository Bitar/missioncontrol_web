import {useCommunityForm} from '../../core/CommunityFormContext'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {ErrorMessage, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useAuth} from '../../../../modules/auth'
import {Plan} from '../../../../models/billing/Plan'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {useParams} from 'react-router-dom'
import {useCommunity} from '../../core/CommunityContext'
import * as Yup from 'yup'
import {updateCommunitySubscription} from '../../core/CommunityRequests'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Timezone from 'dayjs/plugin/timezone'
import axios, {AxiosResponse} from 'axios'
import {getPlans} from '../../../billing/plan/core/BillingPlanRequest'
import {isSuperAdmin} from '../../../../models/iam/User'
import Select from 'react-select'
import {DatePicker} from 'rsuite'
import AutoResizableTextarea from '../../../../components/form/AutoResizableTextarea'
import {FormAction} from '../../../../helpers/form/FormAction'

dayjs.extend(utc)
dayjs.extend(Timezone)

type SubscriptionObject = {
  plan_id: string | number | undefined
  status: string | number | undefined
  end_date?: string | undefined
  notes: string
}

const subscriptionUpdateSchema = Yup.object().shape({
  plan_id: Yup.string().required('Subscription is required'),
  status: Yup.string().required('Status is required'),
  end_date: Yup.string().required('End Date is required'),
})

export const getCustomerPortal = (currentLink: string): Promise<any> => {
  const API_URL = process.env.REACT_APP_API_URL
  const ENDPOINT = `${API_URL}/billing/customer-portal`
  let url = `${ENDPOINT}`

  return axios.get(url).then((response: AxiosResponse<any>) => response.data)
}

export const SubscriptionDetail = () => {
  const {communityForm} = useCommunityForm()
  const {currentUser, communityAdmin} = useAuth()
  const {community, updateCommunity} = useCommunity()
  const [plans, setPlans] = useState<Plan[] | undefined>()
  const params = useParams()
  const [subscriptionForm, setSubscriptionForm] = useState<SubscriptionObject>({
    plan_id: communityForm?.plan_id,
    status: communityForm?.status,
    notes: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [endDate, setEndDate] = useState<Date>(new Date())

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
    getPlans().then((response) => {
      setPlans(response?.data)
    })
  }, [])

  const handleSubmit = async () => {
    let data = jsonToFormData(subscriptionForm)
    data.append('_method', 'PUT')

    if (params?.communityId) {
      await updateCommunitySubscription(params.communityId, data).then(() => {
        toast.success('Community Subscription Updated Successfully')
        updateCommunity()
      })
    }
  }

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
                community?.subscription?.is_stripe && (
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
              {currentUser && isSuperAdmin(currentUser) && (
                <div className='col-12'>
                  <h3>Notes</h3>
                  <p>{community?.subscription?.notes}</p>
                </div>
              )}
            </div>
          </div>
        </KTCardBody>
      </KTCard>

      {currentUser && isSuperAdmin(currentUser) && (
        <KTCard border={true} className='mt-5'>
          <KTCardHeader text={'Offline Subscription'} bg='mc-primary' text_color='white' />
          <Formik
            validationSchema={subscriptionUpdateSchema}
            initialValues={subscriptionForm}
            onSubmit={handleSubmit}
            enableReinitialize>
            {({isSubmitting}) => (
              <Form className='form' autoComplete='off'>
                <KTCardBody className='py-4'>
                  <div className='d-flex flex-column pt-5'>
                    <>
                      <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label fw-bold fs-6'>Subscription</label>
                        <div className='col-lg-8 fv-row'>
                          <Select
                            name='plan_id'
                            placeholder={'Choose a Community'}
                            options={plans}
                            getOptionLabel={(plan) => plan?.name}
                            getOptionValue={(plan) => plan?.id?.toString() || ''}
                            onChange={(e) => {
                              updateData(
                                {plan_id: e?.id || ''},
                                setSubscriptionForm,
                                subscriptionForm
                              )
                            }}
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name='plan_id' />
                          </div>
                        </div>
                      </div>

                      <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label fw-bold fs-6'>Ends On</label>
                        <div className='col-lg-8 fv-row'>
                          <DatePicker
                            format='MM-dd-yyyy'
                            className='w-100'
                            name='end_date'
                            placeholder='Select End Date'
                            placement={'topStart'}
                            onChange={(value) => {
                              updateData(
                                {
                                  end_date: value?.valueOf(),
                                },
                                setSubscriptionForm,
                                subscriptionForm
                              )
                            }}
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name='end_date' />
                          </div>
                        </div>
                      </div>

                      <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label fw-bold fs-6'>Notes</label>
                        <div className='col-lg-8 fv-row'>
                          <AutoResizableTextarea
                            name='notes'
                            value={subscriptionForm.notes}
                            placeholder='Notes'
                            onChange={(e: any) => {
                              updateData(
                                {notes: e.target.value},
                                setSubscriptionForm,
                                subscriptionForm
                              )
                            }}
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name='notes' />
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </KTCardBody>
                <FormAction text={'Update Subscription'} isSubmitting={isSubmitting} />
              </Form>
            )}
          </Formik>
        </KTCard>
      )}
    </>
  )
}
