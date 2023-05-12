import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {ErrorMessage, Form, Formik} from 'formik'
import Select from 'react-select'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {DatePicker} from 'rsuite'
import AutoResizableTextarea from '../../../../components/form/AutoResizableTextarea'
import {FormAction} from '../../../../helpers/form/FormAction'
import React, {FC, useState} from 'react'
import * as Yup from 'yup'
import {Plan} from '../../../../models/billing/Plan'
import {updateCommunitySubscription} from '../../../community/core/CommunityRequests'
import toast from 'react-hot-toast'
import {useCommunityForm} from '../../../community/core/CommunityFormContext'
import {useCommunity} from '../../../community/core/CommunityContext'
import {useParams} from 'react-router-dom'

type SubscriptionObject = {
  plan: Plan | undefined
  plan_id: number | undefined
  end_date?: string | undefined
  notes: string
  payment_method?: number
}

const subscriptionUpdateSchema = Yup.object().shape({
  plan_id: Yup.string().required('Subscription is required'),
  end_date: Yup.string().required('End Date is required'),
})

type Props = {
  plans: Plan[] | undefined
}

const ScheduleDetailSuperAdmin: FC<Props> = ({plans}) => {
  const {communityForm} = useCommunityForm()
  const {community, updateCommunity} = useCommunity()
  const params = useParams()

  const [subscriptionForm, setSubscriptionForm] = useState<SubscriptionObject>({
    plan: community?.subscription?.plan,
    plan_id: communityForm?.plan_id,
    notes: '',
  })
  const handleSubmit = () => {
    let data = jsonToFormData(subscriptionForm)
    data.append('_method', 'PUT')

    if (params?.communityId) {
      updateCommunitySubscription(params.communityId, data).then(() => {
        toast.success('Community Subscription Updated Successfully')
        updateCommunity()
      })
    }
  }

  return (
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
                          updateData({plan_id: e?.id || ''}, setSubscriptionForm, subscriptionForm)
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
                          updateData({notes: e.target.value}, setSubscriptionForm, subscriptionForm)
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
  )
}

export default ScheduleDetailSuperAdmin
