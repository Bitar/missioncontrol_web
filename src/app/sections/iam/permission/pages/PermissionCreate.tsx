import React, {useState} from 'react'
import {Field, Form, Formik} from 'formik'
import {Permission, permissionInitial, permissionSchema} from '../../../../models/iam/Permission'
import {KTCard, KTCardBody} from '../../../../helpers/components'
import clsx from 'clsx'
import {createPermission} from '../core/PermissionRequests'
import {useNavigate} from 'react-router-dom'
import {submitForm, updateData} from '../../../../helpers/form/FormHelper'

const PermissionCreate = () => {
  const [permission, setPermission] = useState<Permission>(permissionInitial)

  const navigate = useNavigate()

  const toIndex = () => {
    navigate('/permissions')
  }

  const handleSubmit = async () => {
    await submitForm(createPermission, permission, toIndex)
  }

  const handleOnChange = (event: any) => {
    updateData({[event.target.name]: event.target.value}, setPermission, permission)
  }

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <span className='card-icon'>
              <i className='las la-plus fs-2' />
            </span>
            <h3 className='card-label'>Add Permission</h3>
          </div>
        </div>
        <KTCardBody className='py-4'>
          <Formik
            initialValues={permission}
            onSubmit={handleSubmit}
            validationSchema={permissionSchema}
          >
            {({isSubmitting, isValid, touched, errors}) => (
              <Form onChange={handleOnChange} className='form'>
                <div className='d-flex flex-column pt-5'>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        type='text'
                        name='name'
                        placeholder='Name'
                        className={clsx(
                          'form-control mb-3 mb-lg-0',
                          {'is-invalid': touched.name && errors.name},
                          {'is-valid': touched.name && !errors.name}
                        )}
                        autoComplete='off'
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className='py-5'>
                  <button
                    type='reset'
                    onClick={() => toIndex()}
                    className='btn btn-light me-3'
                    data-kt-users-modal-action='cancel'
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>

                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-users-modal-action='submit'
                    disabled={isSubmitting || !isValid || !touched}
                  >
                    <span className='indicator-label'>Submit</span>
                    {isSubmitting && (
                      <span className='indicator-progress'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {PermissionCreate}
