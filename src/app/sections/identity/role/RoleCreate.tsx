import React, {useEffect, useState} from 'react'
import {Form, Field, Formik} from 'formik'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Role, roleInitial, roleSchema} from './models/Role'
import {createRole} from './core/RoleRequests'
import { jsonToFormData, updateData } from "../../../helpers/form/FormHelper";
import {getAllPermissions} from '../permission/core/PermissionRequests'
import {Permission} from '../permission/models/Permission'
import {Switch} from '@mui/material'

const RoleCreate = () => {
  const [role, setRole] = useState<Role>(roleInitial)
  const [permissions, setPermissions] = useState<Permission[] | undefined>([])
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllPermissions().then((response) => {
      setPermissions(response.data)
    })
  }, [])

  const handleSubmit = async () => {
    let data = jsonToFormData(role)
    await createRole(data).then((response) => navigate('/roles/' + response?.id + '/edit'))
  }

  useEffect(() => {
    updateData({
      permissions: selectedPermissions
    }, setRole, role)
  }, [selectedPermissions])

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
            <h3 className='card-label'>Add Role</h3>
          </div>
        </div>
        <Formik initialValues={role} onSubmit={handleSubmit} validationSchema={roleSchema}>
          {({isSubmitting, isValid, touched}) => (
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
                          className='form-control mb-3 mb-lg-0'
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
                              value={permission?.id}
                              onChange={(e: any) => {
                                let targetValue = e.target.value

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
                    <span className='indicator-label'>Add Role</span>
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

export { RoleCreate };
