import {useFormik} from 'formik'
import {isNotEmpty, KTCard, KTCardBody} from '../../../../_metronic/helpers'
import React, {useState} from 'react'
import {initialPlan, Plan, planSchema} from '../../../models/billing/Plan'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import {createPlan} from './core/_requests'

const PlansCreate = () => {
  const navigate = useNavigate()

  const cancel = () => {
    navigate('/plans')
  }

  const [planForEdit] = useState<Plan>(initialPlan)

  const formik = useFormik({
    initialValues: planForEdit,
    validationSchema: planSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          // await updateUser(values)
        } else {
          await createPlan(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel()
      }
    },
  })

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <span className='card-icon'>
              <i className='las la-plus fs-2' />
            </span>
            <h3 className='card-label'>Add Plan</h3>
          </div>
        </div>
        <KTCardBody className='py-4'>
          <form className='form' onSubmit={formik.handleSubmit} noValidate>
            {/* begin::Scroll */}
            <div
              className='d-flex flex-column scroll-y pt-5'
              id='kt_modal_add_user_scroll'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_modal_add_user_header'
              data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
              data-kt-scroll-offset='300px'
            >
              {/* begin::Input group */}
              <div className='fv-row mb-7'>
                {/* begin::Label */}
                <label className='required fw-bold fs-6 mb-2'>Name</label>
                {/* end::Label */}

                {/* begin::Input */}
                <input
                  placeholder='Name'
                  {...formik.getFieldProps('name')}
                  type='text'
                  name='name'
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.name && formik.errors.name},
                    {
                      'is-valid': formik.touched.name && !formik.errors.name,
                    }
                  )}
                  autoComplete='off'
                  disabled={formik.isSubmitting}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.name}</span>
                    </div>
                  </div>
                )}
                {/* end::Input */}
              </div>
              {/* end::Input group */}
              {/* begin::Input group */}
              <div className='fv-row mb-7'>
                {/* begin::Label */}
                <label className='required fw-bold fs-6 mb-2'>Description</label>
                {/* end::Label */}

                {/* begin::Input */}
                <textarea
                  placeholder='Description'
                  {...formik.getFieldProps('description')}
                  name='description'
                  rows={7}
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {
                      'is-invalid': formik.touched.description && formik.errors.description,
                    },
                    {
                      'is-valid': formik.touched.description && !formik.errors.description,
                    }
                  )}
                  autoComplete='off'
                  disabled={formik.isSubmitting}
                  style={{resize: 'none'}}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.description}</span>
                    </div>
                  </div>
                )}
                {/* end::Input */}
              </div>
              {/* end::Input group */}
              {/* begin::Input group */}
              {/*<div className='fv-row mb-7'>*/}
              {/*  /!* begin::Label *!/*/}
              {/*  <label className='required fw-bold fs-6 mb-2'>Price</label>*/}
              {/*  /!* end::Label *!/*/}

              {/*  /!* begin::Input *!/*/}
              {/*  <input*/}
              {/*    placeholder='Price'*/}
              {/*    {...formik.getFieldProps('price')}*/}
              {/*    type='text'*/}
              {/*    name='price'*/}
              {/*    className={clsx(*/}
              {/*      'form-control form-control-solid mb-3 mb-lg-0',*/}
              {/*      {'is-invalid': formik.touched.price && formik.errors.price},*/}
              {/*      {*/}
              {/*        'is-valid': formik.touched.price && !formik.errors.price,*/}
              {/*      }*/}
              {/*    )}*/}
              {/*    autoComplete='off'*/}
              {/*    disabled={formik.isSubmitting}*/}
              {/*  />*/}
              {/*  {formik.touched.price && formik.errors.price && (*/}
              {/*    <div className='fv-plugins-message-container'>*/}
              {/*      <div className='fv-help-block'>*/}
              {/*        <span role='alert'>{formik.errors.price}</span>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  )}*/}
              {/*  /!* end::Input *!/*/}
              {/*</div>*/}
              {/*/!* end::Input group *!/*/}
              {/*/!* begin::Input group *!/*/}
              {/*<div className='fv-row mb-7'>*/}
              {/*  /!* begin::Label *!/*/}
              {/*  <label className='required fw-bold fs-6 mb-2'>Launch</label>*/}
              {/*  /!* end::Label *!/*/}

              {/*  /!* begin::Input *!/*/}
              {/*  <input*/}
              {/*    placeholder='Launch'*/}
              {/*    {...formik.getFieldProps('launch')}*/}
              {/*    type='text'*/}
              {/*    name='launch'*/}
              {/*    className={clsx(*/}
              {/*      'form-control form-control-solid mb-3 mb-lg-0',*/}
              {/*      {*/}
              {/*        'is-invalid': formik.touched.launch && formik.errors.launch,*/}
              {/*      },*/}
              {/*      {*/}
              {/*        'is-valid': formik.touched.launch && !formik.errors.launch,*/}
              {/*      }*/}
              {/*    )}*/}
              {/*    autoComplete='off'*/}
              {/*    disabled={formik.isSubmitting}*/}
              {/*  />*/}
              {/*  {formik.touched.launch && formik.errors.launch && (*/}
              {/*    <div className='fv-plugins-message-container'>*/}
              {/*      <div className='fv-help-block'>*/}
              {/*        <span role='alert'>{formik.errors.launch}</span>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  )}*/}
              {/*  /!* end::Input *!/*/}
              {/*</div>*/}
              {/* end::Input group */}
            </div>
            {/* end::Scroll */}

            {/* begin::Actions */}
            <div className='py-5'>
              <button
                type='reset'
                onClick={() => cancel()}
                className='btn btn-light me-3'
                data-kt-users-modal-action='cancel'
                disabled={formik.isSubmitting}
              >
                Cancel
              </button>

              <button
                type='submit'
                className='btn btn-primary'
                data-kt-users-modal-action='submit'
                disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
              >
                <span className='indicator-label'>Submit</span>
                {formik.isSubmitting && (
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                )}
              </button>
            </div>
            {/* end::Actions */}
          </form>
          {formik.isSubmitting}
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {PlansCreate}
