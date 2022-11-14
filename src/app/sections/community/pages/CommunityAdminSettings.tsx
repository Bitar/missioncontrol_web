import React, {FC, useEffect, useState} from 'react'
import {
  CommunityFormType,
  communitySchema,
  initialCommunityFormTypeByCommunity,
} from '../models/Community'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {useCommunity} from '../CommunityContext'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {BannerImage} from '../partials/BannerImage'
import {LogoImage} from '../partials/LogoImage'
import Select from 'react-select'
import {State} from '../../../models/misc/State'
import {getStates} from '../../misc/core/_requests'
import {jsonToFormData, updateData} from '../../../helpers/form/FormHelper'
import {updateAdminCommunity} from '../core/CommunityRequests'
import toast from 'react-hot-toast'

const CommunityAdminSettings: FC = () => {
  const {community, setCommunity} = useCommunity()
  const [communityForm, setCommunityForm] = useState<CommunityFormType>(
    initialCommunityFormTypeByCommunity(community)
  )
  const [states, setStates] = useState<State[]>()

  useEffect(() => {
    getStates().then((response) => {
      setStates(response.data)
    })
  }, [])

  const handleSubmit = async () => {
    let data = jsonToFormData(communityForm)
    data.append('_method', 'PUT')

    await updateAdminCommunity(data).then((response) => {
      toast.success('Community Updated Successfully')
      setCommunity(response)
    })
  }

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    if (targetName.includes('address.')) {
      let address_field = targetName.split('address.')[1]

      updateData(
        {
          address: {...communityForm?.address, ...{[address_field]: targetValue}},
        },
        setCommunityForm,
        communityForm
      )
    } else if (targetName.includes('contact.')) {
      let contact_field = targetName.split('contact.')[1]

      updateData(
        {
          contact: {...communityForm?.contact, ...{[contact_field]: targetValue}},
        },
        setCommunityForm,
        communityForm
      )
    } else if (targetName.includes('access.')) {
      let accessField = targetName.split('access.')[1]
      if (accessField === 'type' || accessField === 'key') {
        targetValue = +targetValue
      }

      if (accessField === 'type' && targetValue === 1) {
        updateData(
          {
            access: {type: targetValue, key: 0, value: ''},
          },
          setCommunityForm,
          communityForm
        )
      } else {
        let updateStuff
        if (accessField !== 'value') {
          updateStuff = {type: 2, key: 2, value: ''}
        } else {
          updateStuff = {type: 2, key: 2, value: targetValue}
        }

        updateData(
          {
            access: {...communityForm?.access, ...updateStuff},
          },
          setCommunityForm,
          communityForm
        )
      }
    } else {
      if (targetName === 'logo' || targetName === 'banner_image') {
        targetValue = e.target.files[0]
      } else {
        targetValue = e.target.value
      }

      updateData({[targetName]: targetValue}, setCommunityForm, communityForm)
    }
  }

  return (
    <>
      <KTCard>
        <div className='card-header bg-mc-secondary'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Update Community</h3>
          </div>
        </div>
        <Formik
          initialValues={communityForm}
          onSubmit={handleSubmit}
          validationSchema={communitySchema}
          enableReinitialize
        >
          {({isSubmitting, isValid, touched}) => (
            <Form onChange={handleOnChange} className='form'>
              <KTCardBody className='py-4'>
                <div className='d-flex flex-column pt-5'>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Images</label>

                    <div className='col-lg-8'>
                      <div className='row'>
                        <LogoImage community={communityForm} setCommunity={setCommunityForm} />

                        <BannerImage community={communityForm} setCommunity={setCommunityForm} />
                      </div>
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
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Description</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        as='textarea'
                        name='description'
                        className='form-control mb-3 mb-lg-0'
                        placeholder='Community Description'
                        autoComplete='off'
                        rows={3}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='description' />
                      </div>
                    </div>
                  </div>

                  <div className='separator separator-dashed my-6'></div>

                  <div className='row mb-6'>
                    <div className='col-12'>
                      <h4 className='text-dark'>Contact Info:</h4>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        autoComplete='off'
                        type='text'
                        name='contact.name'
                        placeholder='Contact Name'
                        className='form-control mb-3 mb-lg-0'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='contact.name' />
                      </div>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        autoComplete='off'
                        type='text'
                        name='contact.email'
                        placeholder='Contact Email'
                        className='form-control mb-3 mb-lg-0'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='contact.email' />
                      </div>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Phone Number
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        autoComplete='off'
                        type='text'
                        name='contact.phone_number'
                        placeholder='Phone Number...'
                        className='form-control mb-3 mb-lg-0'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='contact.phone_number' />
                      </div>
                    </div>
                  </div>

                  <div className='separator separator-dashed my-6'></div>

                  <div className='row mb-6'>
                    <div className='col-12'>
                      <h4 className='text-dark'>Address:</h4>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Address One
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        autoComplete='off'
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
                        autoComplete='off'
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
                        autoComplete='off'
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
                        defaultValue={community?.address?.state}
                        getOptionLabel={(state) => state?.name}
                        getOptionValue={(state) => state?.id?.toString() || ''}
                        onChange={(e) => {
                          updateData(
                            {
                              address: {...communityForm?.address, ...{state_id: e?.id}},
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
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Postal Code
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        type='text'
                        name='address.postal_code'
                        className='form-control mb-3 mb-lg-0'
                        placeholder='ex: 95125'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='address.postal_code' />
                      </div>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-12'>
                      <h4 className='text-dark'>Access:</h4>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Visibility
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <label className='d-flex flex-stack cursor-pointer mb-5'>
                            <span className='d-flex align-items-center me-2'>
                              <span className='symbol symbol-50px me-6'>
                                <span className='symbol-label bg-light-warning'>
                                  <i className='fab fa-html5 text-warning fs-2x'></i>
                                </span>
                              </span>

                              <span className='d-flex flex-column'>
                                <span className='fw-bolder fs-6'>Public</span>

                                <span className='fs-7 text-muted'>Anyone can join</span>
                              </span>
                            </span>

                            <span className='form-check form-check-custom form-check-solid'>
                              <Field
                                className='form-check-input'
                                type='radio'
                                name='access.type'
                                value={1}
                                checked={communityForm?.access?.type === 1}
                              />
                            </span>
                          </label>
                        </div>
                        <div className='col-lg-6'>
                          <label className='d-flex flex-stack cursor-pointer mb-5'>
                            <span className='d-flex align-items-center me-2'>
                              <span className='symbol symbol-50px me-6'>
                                <span className='symbol-label bg-light-success'>
                                  <i className='fab fa-react text-success fs-2x'></i>
                                </span>
                              </span>

                              <span className='d-flex flex-column'>
                                <span className='fw-bolder fs-6'>Private</span>
                                <span className='fs-7 text-muted'>Only certain people</span>
                              </span>
                            </span>

                            <span className='form-check form-check-custom form-check-solid'>
                              <Field
                                className='form-check-input'
                                type='radio'
                                name='access.type'
                                value={2}
                                checked={communityForm?.access?.type === 2}
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {communityForm?.access?.type === 2 && (
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                        Entry Access
                      </label>
                      <div className='col-lg-8 fv-row'>
                        <div className='row'>
                          <div className='col-lg-6'>
                            <label className='d-flex flex-stack mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-mc-primary'>
                                    <i className='fa fa-key text-mc-secondary fs-3'></i>
                                    <i className='fa fs-3'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>Passcode</span>
                                  <span className='fs-7 text-muted'>Good ol' fashion password</span>
                                </span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {communityForm?.access?.key === 2 && (
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                        Passcode
                      </label>
                      <div className='col-lg-8 fv-row'>
                        <Field
                          type='password'
                          name='access.value'
                          className='form-control mb-3 mb-lg-0'
                          placeholder='Passcode'
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='access.value' />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </KTCardBody>
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  type='submit'
                  className='btn btn-light-mc-secondary btn-active-mc-secondary btn-sm'
                  data-kt-users-modal-action='submit'
                  disabled={isSubmitting || !isValid || !touched}
                >
                  <span className='indicator-label'>Save Changes</span>
                  {isSubmitting && (
                    <span className='indicator-progress' style={{display: 'inline-block'}}>
                      <span className='spinner-border spinner-border-sm align-middle ms-2' />
                    </span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  )
}

export {CommunityAdminSettings}
