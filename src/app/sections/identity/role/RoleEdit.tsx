import React, {FC, useEffect, useState} from 'react'
import {Role, roleInitial, roleSchema} from './models/Role'
import {useNavigate, useParams} from 'react-router-dom'
import {Field, Form, Formik} from 'formik'
import {getRoleById, updateRole} from './core/RoleRequests'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import clsx from 'clsx'
import {jsonToFormData, updateData} from '../../../helpers/form/FormHelper'
import {Switch} from '@mui/material'
import {Permission} from '../permission/models/Permission'
import {getAllPermissions} from '../permission/core/PermissionRequests'

const RoleEdit: FC = () => {
  const [role, setRole] = useState<Role | undefined>()
  const [permissions, setPermissions] = useState<Permission[] | undefined>([])
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    getAllPermissions().then((response) => {
      setPermissions(response.data)
    })
  }, [])

  useEffect(() => {
    const updatedSelected: any[] = []

    role?.permissions?.forEach((value) => {
      if (value?.id && !selectedPermissions.includes(value?.id)) {
        updatedSelected.push(value?.id)
      }
    })

    setSelectedPermissions(updatedSelected)
  }, [role?.permissions])

  const isChecked = (value: any) => {
    return selectedPermissions?.includes(value)
  }

  useEffect(() => {
    getRoleById(params.id).then((response) => {
      setRole(response)
    })
  }, [params.id])

  const handleSubmit = async () => {
    let data = jsonToFormData({
      name: role?.name,
      permissions: selectedPermissions,
      ready_to_submit: true,
      _method: 'PUT',
    })
    await updateRole(params.id, data).then((response) =>
      navigate('/roles/' + response?.id + '/edit')
    )
  }

  const handleOnChange = (event: any) => {
    updateData({[event.target.name]: event.target.value}, setRole, role)
  }

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <span className='card-icon'>
              <i className='las la-plus fs-2' />
            </span>
            <h3 className='card-label'>Edit Role</h3>
          </div>
        </div>
        <Formik
          initialValues={roleInitial(role)}
          onSubmit={handleSubmit}
          validationSchema={roleSchema}
          enableReinitialize
        >
          {({isSubmitting, isValid, touched, errors}) => (
            <>
              <Form onChange={handleOnChange} className='form'>
                <KTCardBody className='py-4'>
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
                </KTCardBody>
                <KTCardBody>
                  <div className='d-flex flex-column pt-5'>
                    <div className='row'>
                      <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                        Permissions
                      </label>
                    </div>
                    <div className='row'>
                      {permissions?.map((permission, index) => (
                        <div className='col-md-4 mb-3' key={index}>
                          <div className='form-check form-check-custom form-check-solid form-switch'>
                            <Switch
                              checked={isChecked(permission.id)}
                              value={permission?.id}
                              onChange={(e: any) => {
                                let targetValue = parseInt(e.target.value)

                                if (selectedPermissions?.includes(targetValue)) {
                                  setSelectedPermissions(
                                    selectedPermissions.filter((itemId) => itemId !== targetValue)
                                  )
                                } else {
                                  const updatedSelected = [...selectedPermissions]
                                  updatedSelected.push(targetValue)
                                  setSelectedPermissions(updatedSelected)
                                }
                              }}
                            />
                            {permission.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </KTCardBody>
                <div className='card-footer d-flex justify-content-end py-6 px-9'>
                  <button
                    type='submit'
                    className='btn btn-light-mc-secondary btn-active-mc-secondary btn-sm'
                    data-kt-users-modal-action='submit'
                    disabled={isSubmitting || !isValid || !touched}
                  >
                    <span className='indicator-label'>Update Role</span>
                    {isSubmitting && (
                      <span className='indicator-progress'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </KTCard>
    </>
  )
}

export {RoleEdit}
