import React, {useEffect, useState} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {useNavigate} from 'react-router-dom'
import {createUser} from '../core/Requests'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {formOnChange, UserDetailsSchema} from '../../../../models/iam/User'
import {FormAction} from '../../../../helpers/form/FormAction'
import {defaultUserForm, UserForm} from '../core/UserForm'
import {Role} from '../../../../models/iam/Role'
import {Community} from '../../../../models/community/Community'
import {getAllRoles} from '../../role/core/Requests'
import {getAllCommunities} from '../../../community/core/CommunityRequests'
import Select from 'react-select'
import {DatePicker} from 'rsuite'
import FormErrors from '../../../../components/form/FormErrors'
import {extractErrors} from '../../../../requests/helpers'
import {useMcApp} from '../../../../modules/general/McApp'
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator'
import {Sections} from '../../../../helpers/sections'
import {Actions, PageTypes, ToastType} from '../../../../helpers/variables'
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator'
import {ImageCrop} from '../../../community/components/ImageCrop'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'

const UserCreate = () => {
  const mcApp = useMcApp()

  const [userForm, setUserForm] = useState<UserForm>(defaultUserForm)

  const [roles, setRoles] = useState<Role[]>()
  const [communities, setCommunities] = useState<Community[]>()
  const [dateOfBirthValue, setDateOfBirthValue] = useState<Date | null>()

  const [formErrors, setFormErrors] = useState<string[]>([])
  const [hasCommunityAdminRole, setHasCommunityAdminRole] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleSubmit = (e: any, fns: any) => {
    let data = jsonToFormData(userForm)
    createUser(data)
      .then((response) => {
        mcApp.setAlert({
          message: new AlertMessageGenerator('user', Actions.CREATE, ToastType.SUCCESS).message,
          type: ToastType.SUCCESS,
        })
        navigate('/iam/users/' + response?.id)
        setFormErrors([])
      })
      .catch((error) => {
        setFormErrors(extractErrors(error))
      })
      .finally(() => {
        fns.setSubmitting(false)
      })
  }

  const handleOnChange = (e: any) => formOnChange(e, userForm, setUserForm)

  const handleRoleChange = (e: any) => {
    e.find((e: any) => e?.id === 3)
      ? setHasCommunityAdminRole(true)
      : setHasCommunityAdminRole(false)

    let roleIds = e.map((role: any) => role.id)
    updateData({role_ids: roleIds, community_admin: []}, setUserForm, userForm)
  }

  const handleCommunityChange = (e: any) => {
    let communityAdmins: any[]

    communityAdmins = e.map((community: any) => community.id)

    updateData({community_admin: communityAdmins}, setUserForm, userForm)
  }

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.CREATE))

    getAllRoles().then((response) => {
      setRoles(response.data)
    })

    getAllCommunities().then((response) => {
      setCommunities(response.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const updateImageStuff = (imageToSave?: any) => {
    updateData(
      {
        meta: {...userForm?.meta, ...{image: imageToSave}},
      },
      setUserForm,
      userForm
    )
  }

  return (
    <KTCard>
      <KTCardHeader
        text='Create New User'
        icon='fa-regular fa-plus'
        icon_style='fs-3 text-success'
      />
      <Formik
        initialValues={userForm}
        onSubmit={handleSubmit}
        validationSchema={UserDetailsSchema}
        enableReinitialize>
        {({isSubmitting}) => {
          return (
            <Form
              onChange={handleOnChange}
              className='form'
              encType='multipart/form-data'
              autoComplete='off'>
              <KTCardBody className='py-4'>
                <FormErrors errorMessages={formErrors} />

                <div className='d-flex flex-column pt-5'>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Logo</label>
                    <div className='col-lg-8 fv-row'>
                      <ImageCrop
                        defaultImage={toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                        isSquare={true}
                        model={userForm}
                        setModel={setUserForm}
                        ratio={1}
                        name='logo'
                        updateStuff={updateImageStuff}
                      />
                      <div className='text-muted fw-semibold'>Recommended Image Size: Square</div>
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='logo' />
                      </div>
                    </div>
                  </div>

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
                        placeholder='Select Date'
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
              <FormAction text={'Add User'} isSubmitting={isSubmitting} />
            </Form>
          )
        }}
      </Formik>
    </KTCard>
  )
}

export default UserCreate
