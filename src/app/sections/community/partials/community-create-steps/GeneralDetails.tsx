import React, {FC} from 'react'
import {ErrorMessage, Field} from 'formik'
import {LogoImage} from '../../components/LogoImage'
import {BannerImage} from '../../components/BannerImage'
import {useCommunityForm} from '../../core/CommunityFormContext'

const GeneralDetails: FC = () => {
  const {communityForm, setCommunityForm} = useCommunityForm()

  return (
    <div className='d-flex flex-column pt-5 w-100'>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Logo</label>
        <div className='col-lg-8 fv-row'>
          <LogoImage community={communityForm} setCommunity={setCommunityForm} />
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='name'
            placeholder='Community Name'
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
          <Field
            as='textarea'
            name='description'
            className='form-control mb-3 mb-lg-0'
            placeholder='Community Description'
            rows={8}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='description' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Banner Image</label>
        <div className='col-lg-8 fv-row'>
          <BannerImage community={communityForm} setCommunity={setCommunityForm} />
        </div>
      </div>
    </div>
  )
}

export {GeneralDetails}
