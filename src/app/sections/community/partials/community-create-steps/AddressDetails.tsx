import React, {FC} from 'react'
import {ErrorMessage, Field, useFormikContext} from 'formik'
import {updateData} from '../../../../helpers/form/FormHelper'
import Select from 'react-select'
import {useCommunityForm} from '../../core/CommunityFormContext'
import InputMask from 'react-input-mask'

const AddressDetails: FC = () => {
  const {communityForm, setCommunityForm, states} = useCommunityForm()
  const {setFieldValue} = useFormikContext()

  return (
    <div className='d-flex flex-column pt-5 w-100'>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Address One</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='address.address_one'
            placeholder='ex: 420 Broadway'
            className='form-control mb-3 mb-lg-0'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.address_one' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Address Two</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='address.address_two'
            className='form-control mb-3 mb-lg-0'
            placeholder='ex: Unit 134'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.address_two' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='address.city'
            className='form-control mb-3 mb-lg-0'
            placeholder='ex: Boston'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.city' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>State</label>
        <div className='col-lg-8 fv-row'>
          <Select
            name='address.state'
            placeholder={'Choose a State'}
            options={states}
            getOptionLabel={(state) => state?.name}
            getOptionValue={(state) => state?.id?.toString() || ''}
            onChange={(e) => {
              setFieldValue('address.state', e?.id?.toString())
              updateData(
                {
                  address: {...communityForm?.address, ...{state: e?.id}},
                },
                setCommunityForm,
                communityForm
              )
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.state' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Postal Code</label>
        <div className='col-lg-8 fv-row'>
          <InputMask
            mask='99999'
            className='form-control mb-3 mb-lg-0'
            placeholder='Zip Code'
            maskPlaceholder={null}
            name='address.postal_code'
            onChange={(e) => {
              setFieldValue('address.postal_code', e.target.value)
            }}
          />

          {/*  <Field*/}
          {/*    type='text'*/}
          {/*    name='address.postal_code'*/}
          {/*    className='form-control mb-3 mb-lg-0'*/}
          {/*    placeholder='ex: 95125'*/}
          {/*  />*/}
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.postal_code' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {AddressDetails}
