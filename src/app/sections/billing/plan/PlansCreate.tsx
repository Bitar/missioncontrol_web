import {ErrorMessage, Field, Form, Formik} from 'formik'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import React, {useState} from 'react'
import {initialPlan, Plan, planSchema} from '../../../models/billing/Plan'
import {useNavigate} from 'react-router-dom'
import {createPlan} from './core/BillingPlanRequest'
import {KTCardHeader} from '../../../helpers/components'
import {jsonToFormData} from '../../../helpers/form/FormHelper'
import AutoResizableTextarea from '../../../components/form/AutoResizableTextarea'

const PlansCreate = () => {
  const navigate = useNavigate()

  const [planForEdit] = useState<Plan>(initialPlan)

  const handleSubmit = () => {
    let data = jsonToFormData(planForEdit)

    createPlan(data).then((response) => {})
  }

  const handleOnChange = () => {}

  return (
    <>
      <KTCard>
        <KTCardHeader
          text='Create New Billing Plan'
          icon='fa-regular fa-plus'
          icon_style='fs-3 text-success'
        />
        <KTCardBody className='py-4'>
          <Formik
            validationSchema={planSchema}
            initialValues={planForEdit}
            onSubmit={handleSubmit}
            enableReinitialize>
            <Form onChange={handleOnChange} className='form' autoComplete='off'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
                <div className='col-lg-8 fv-row'>
                  <Field
                    type='text'
                    name='Name'
                    placeholder='Name'
                    className='form-control mb-3 mb-lg-0'
                    autoComplete='off'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='name' />
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
                <div className='col-lg-8 fv-row'>
                  <AutoResizableTextarea name='description' value={planForEdit.description} />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='description' />
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {PlansCreate}
