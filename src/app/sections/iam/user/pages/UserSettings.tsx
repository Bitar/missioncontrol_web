import React, {FC, useEffect, useState} from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import {KTCard, KTCardBody} from '../../../../helpers/components'
import {useParams} from 'react-router-dom'
import {updateUser} from '../core/UserRequests'
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import { formOnChange, UserEditSchema } from "../../../../models/iam/User";
import {AvatarImage} from '../partials/AvatarImage'
import {initUserForm, UserForm} from '../../../../models/iam/UserForm'
import {useUser} from '../core/UserContext'
import toast from 'react-hot-toast'
import { Role } from "../../../../models/iam/Role";
import { Community } from "../../../../models/community/Community";
import { getRoles } from "../../role/core/RoleRequests";
import { getAllCommunities } from "../../../community/core/CommunityRequests";
import FormErrors from "../../../../components/form/FormErrors";
import Select from "react-select";
import { DatePicker } from "rsuite";
import { FormAction } from "../../../../helpers/form/FormAction";
import { extractErrors } from "../../../../requests/helpers";

const UserSettings: FC = () => {
  const {user, setUser} = useUser()
  const [userForm, setUserForm] = useState<UserForm>(initUserForm(user))

  const [roles, setRoles] = useState<Role[]>()
  const [communities, setCommunities] = useState<Community[]>()

  const [dateOfBirthValue, setDateOfBirthValue] = useState<Date | null>()
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [hasCommunityAdminRole, setHasCommunityAdminRole] = useState<boolean>(false)

  const params = useParams()

  useEffect(() => {
    getRoles().then((response) => {
      setRoles(response.data)
    })

    getAllCommunities().then((response) => {
      setCommunities(response.data)
    })
  }, [])

  useEffect(() => {
    user?.roles?.find((e: any) => e?.id === 3) ? setHasCommunityAdminRole(true) : setHasCommunityAdminRole(false)
  }, [user])

  useEffect(() => {
    if (userForm?.meta?.date_of_birth) {
      const utcDate = new Date(userForm?.meta?.date_of_birth * 1000)
      const actualDate = new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
      )

      setDateOfBirthValue(actualDate)
    }
  }, [userForm?.meta?.date_of_birth])

  const handleSubmit = (e: any, fns: any) => {
    let data = jsonToFormData(userForm)
    data.append('_method', 'PUT')

    updateUser(params.id, data).then((response) => {
      setFormErrors([])
      setUser(response)
      toast.success('User updated Successfully!')
      fns.setSubmitting(false);
    }).catch((error) => {
      setFormErrors(extractErrors(error))
      fns.setSubmitting(false);
    })
  }

  const handleOnChange = (e: any) => formOnChange(e, userForm, setUserForm)

  const handleRoleChange = (e: any) => {
    e.find((e: any) => e?.id === 3) ? setHasCommunityAdminRole(true) : setHasCommunityAdminRole(false)

    let roleIds = e.map((role: any) => role.id)
    updateData({role_ids: roleIds, community_admin: []}, setUserForm, userForm)
  }

  const handleCommunityChange = (e:any) => {
    let communityAdmins = []

    communityAdmins = e.map((community: any) => community.id)

    updateData({community_admin: communityAdmins}, setUserForm, userForm);
  }

  useEffect(() => {
    if (userForm?.meta?.date_of_birth) {
      const utcDate = new Date(userForm?.meta?.date_of_birth * 1000)
      const actualDate = new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
      )

      setDateOfBirthValue(actualDate)
    }
  }, [userForm?.meta?.date_of_birth])

  return (
    <KTCard>
      <div className='card-header'>
        <div className='card-title'>
          <h3 className='card-label'>Update User</h3>
        </div>
      </div>
      <Formik
        initialValues={userForm}
        onSubmit={handleSubmit}
        validationSchema={UserEditSchema}
        enableReinitialize
      >
        {({isSubmitting}) => (
          <Form
            onChange={handleOnChange}
            className='form'
            encType='multipart/form-data'
            autoComplete='off'
          >
            <KTCardBody className='py-4'>
              <FormErrors errorMessages={formErrors} />

              <div className='d-flex flex-column pt-5'>
                <AvatarImage user={userForm} setUser={setUserForm} />

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    Full Name
                  </label>

                  <div className='col-lg-8'>
                    <div className='row'>
                      <div className='col-lg-6 fv-row'>
                        <Field
                          type='text'
                          name='first_name'
                          placeholder='First Name'
                          className={'form-control mb-3 mb-lg-0'}
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='first_name' />
                        </div>
                      </div>

                      <div className='col-lg-6 fv-row'>
                        <Field
                          type='text'
                          name='last_name'
                          placeholder='Last Name'
                          className={'form-control mb-3 mb-lg-0'}
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='last_name' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      type='text'
                      name='email'
                      placeholder='Email'
                      className={'form-control mb-3 mb-lg-0'}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='email' />
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Roles</label>
                  <div className='col-lg-8 fv-row'>
                    <Select
                      name='role_ids'
                      placeholder={'Choose a Role'}
                      isMulti
                      defaultValue={user?.roles}
                      options={roles}
                      getOptionLabel={(role) => role?.name}
                      getOptionValue={(role) => role?.id?.toString() || ''}
                      onChange={handleRoleChange}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='role_ids' />
                    </div>
                  </div>
                </div>

                {hasCommunityAdminRole && (
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Community
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Select
                        name='community_id'
                        placeholder={'Choose a Community'}
                        defaultValue={user?.community_admin}
                        options={communities}
                        getOptionLabel={(community) => community?.name}
                        isMulti
                        getOptionValue={(community) => community?.id?.toString() || ''}
                        onChange={handleCommunityChange}
                      />
                    </div>
                  </div>
                )}

                <div className='separator separator-dashed my-6'></div>

                <div className='row mb-6'>
                  <div className='col-12'>
                    <h4 className='text-dark'>Update Password:</h4>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Password</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      type='password'
                      name='password'
                      placeholder='Password'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='new-password'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='password' />
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    Password Confirmation
                  </label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      type='password'
                      name='password_confirmation'
                      placeholder='Password'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='password_confirmation' />
                    </div>
                  </div>
                </div>

                <div className='separator separator-dashed my-6'></div>

                <div className='row mb-6'>
                  <div className='col-12'>
                    <h4 className='text-dark'>Profile Details</h4>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Username</label>
                  <div className='col-lg-8 fv-row'>
                    <div className='input-group mb-3'>
                      <Field
                        type='text'
                        name='meta.username'
                        placeholder='Username'
                        className={'form-control mb-3 mb-lg-0'}
                        autoComplete='off'
                      />
                      <span className='input-group-text'>#{userForm?.meta?.rng}</span>
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Date of Birth</label>
                  <div className='col-lg-8 fv-row'>
                    <DatePicker
                      value={dateOfBirthValue}
                      ranges={[]}
                      placement='topStart'
                      className='w-100'
                      placeholder='Select Time'
                      showMeridian={true}
                      onChange={(value) => {
                        if (value) {
                          let dateOfBirth = new Date(value).getTime() / 1000

                          updateData(
                            {
                              meta: {
                                ...userForm?.meta,
                                ...{
                                  date_of_birth: dateOfBirth,
                                },
                              },
                            },
                            setUserForm,
                            userForm
                          )
                        }
                      }}
                    />
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>City</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      type='text'
                      name='meta.city'
                      placeholder='City'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                  </div>
                </div>
              </div>
            </KTCardBody>
            <FormAction text={'Update User'} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}

export { UserSettings };
