/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from "../../../../_metronic/helpers";
import {ErrorMessage, Field} from 'formik'

const Step1: FC = () => {

  // TODO: Get Types from API


  return (
      <div className='w-100'>
        <div className='pb-10 pb-lg-15'>
          <h2 className='fw-bolder d-flex align-items-center text-dark'>
            Choose Activity Type
            <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='Activity Matches are issued based on your selected activity type'
            />
          </h2>

          <div className='text-gray-400 fw-bold fs-6'>
            If you need more info, please check out
            <a href='/dashboard' className='link-primary fw-bolder' target={'_blank'}>
              {' '}
              Help Page
            </a>
            .
          </div>
        </div>

        <div className='fv-row'>
          <div className='row'>
            <div className='col-lg-6'>
              <Field
                  type='radio'
                  className='btn-check'
                  name='activityType'
                  value='personal'
                  id='mc_create_activity_form_type_league'
              />
              <label
                  className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
                  htmlFor='mc_create_activity_form_type_league'
              >
                <KTSVG
                    path='/media/icons/duotune/communication/com005.svg'
                    className='svg-icon-3x me-5'
                />

                <span className='d-block fw-bold text-start'>
                <span className='text-dark fw-bolder d-block fs-4 mb-2'>League</span>
                <span className='text-gray-400 fw-bold fs-6'>
                  Ladder based Activity
                </span>
              </span>
              </label>
            </div>

            <div className='col-lg-6'>
              <Field
                  type='radio'
                  className='btn-check'
                  name='activityType'
                  value='corporate'
                  id='mc_create_activity_form_type_tournament'
              />
              <label
                  className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
                  htmlFor='mc_create_activity_form_type_tournament'
              >
                <KTSVG path='/media/icons/duotune/finance/fin006.svg' className='svg-icon-3x me-5'/>

                <span className='d-block fw-bold text-start'>
                <span className='text-dark fw-bolder d-block fs-4 mb-2'>Tournament</span>
                <span className='text-gray-400 fw-bold fs-6'>
                  Bracket based Activity
                </span>
              </span>
              </label>
            </div>

            <div className='text-danger mt-2'>
              <ErrorMessage name='activityType'/>
            </div>
          </div>
        </div>
      </div>
  )
}

export {Step1}
