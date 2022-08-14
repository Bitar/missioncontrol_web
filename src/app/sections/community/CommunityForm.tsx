import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {ErrorMessage, Field} from 'formik'
import {updateData} from '../../helpers/form/FormHelper'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons'
import {Community} from './models/Community'
import {getCountries, getStates} from '../misc/core/_requests'
import Select from 'react-select'

type Props = {
  method: string
  community: Community | undefined
  setCommunity: Dispatch<SetStateAction<Community>>
}

let statesOptions: any[] = []
let countriesOptions: any[] = []

const CommunityForm: FC<Props> = ({method, community, setCommunity}) => {
  const [roleSelected, setRoleSelected] = useState<any | null>(null)
  const [countrySelected, setCountrySelected] = useState<any | null>(null)
  const [rolesLoaded, setRolesLoaded] = useState(false)
  const [countriesLoaded, setCountriesLoaded] = useState(false)

  useEffect(() => {
    getStates().then((response) => {
      response?.data?.forEach(function (value) {
        let option = {
          value: value.id,
          label: value.name,
          code: value.code,
          isSelected: false,
        }
        statesOptions.push(option)
      })
    })

    getCountries().then((response) => {
      response?.data?.forEach(function (value) {
        let option = {
          value: value.id,
          label: value.name,
          code: value.code,
          isSelected: false,
        }
        countriesOptions.push(option)
      })
    })
  }, [])

  useEffect(() => {
    if (community?.address?.state) {
      let stateObject = community?.address?.state
      let selectedOption = statesOptions.find(
        (element) => element.value === community?.address?.state?.id
      )
      if (selectedOption) {
        selectedOption.isSelected = true
      }

      setRoleSelected({
        value: stateObject?.id,
        label: stateObject?.name,
        code: stateObject?.code,
        isSelected: true,
      })
      setRolesLoaded(true)
    }

    if (community?.address?.country) {
      let countryObject = community?.address?.country
      let selectedOption = statesOptions.find(
        (element) => element.value === community?.address?.country?.id
      )
      if (selectedOption) {
        selectedOption.isSelected = true
      }

      setCountrySelected({
        value: countryObject?.id,
        label: countryObject?.name,
        code: countryObject?.code,
        isSelected: true,
      })
      setCountriesLoaded(true)
    }
  }, [community])

  const handleRoleChange = (selectedOption: any) => {
    setRoleSelected(selectedOption)

    let stateObject = {
      id: selectedOption.value,
      name: selectedOption.label,
      code: selectedOption.code,
    }

    updateData(
      {
        address: {...community?.address, ...{state: stateObject}},
      },
      setCommunity,
      community
    )
  }

  const handleCountryChange = (selectedOption: any) => {
    setRoleSelected(selectedOption)

    let countryObject = {
      id: selectedOption.value,
      name: selectedOption.label,
      code: selectedOption.code,
    }

    updateData(
      {
        address: {...community?.address, ...{country: countryObject}},
      },
      setCommunity,
      community
    )
  }

  return (
    <>
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
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Phone Number</label>
        <div className='col-lg-8 fv-row'>
          <Field
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
          {(rolesLoaded || method === 'create') && (
            <Select
              isSearchable
              defaultValue={roleSelected}
              options={statesOptions}
              onChange={handleRoleChange}
            />
          )}
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.state_province' />
          </div>
        </div>
      </div>

      <div className='row mb-6 d-none'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Country</label>
        <div className='col-lg-8 fv-row'>
          {(countriesLoaded || method === 'create') && (
            <Select
              defaultValue={countrySelected}
              options={countriesOptions}
              onChange={handleCountryChange}
            />
          )}
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.state_province' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Postal Code</label>
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
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Visibility</label>
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
                    checked={community?.access?.type === 1}
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
                    checked={community?.access?.type === 2}
                  />
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {community?.access?.type === 2 && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Entry Access</label>
          <div className='col-lg-8 fv-row'>
            <div className='row'>
              <div className='col-lg-6'>
                <label className='d-flex flex-stack cursor-pointer mb-5'>
                  <span className='d-flex align-items-center me-2'>
                    <span className='symbol symbol-50px me-6'>
                      <span className='symbol-label bg-light-mc-primary'>
                        <i className='fab fa-html5 text-warning fs-2x'></i>
                        <FontAwesomeIcon icon={faEnvelope} className='text-mc-secondary fs-2x' />
                      </span>
                    </span>

                    <span className='d-flex flex-column'>
                      <span className='fw-bolder fs-6'>Email</span>

                      <span className='fs-7 text-muted'>
                        Based on email's domain '@example.com'
                      </span>
                    </span>
                  </span>

                  <span className='form-check form-check-custom form-check-solid'>
                    <Field
                      className='form-check-input'
                      type='radio'
                      name='access.key'
                      value={1}
                      checked={community?.access?.key === 1}
                    />
                  </span>
                </label>
              </div>
              <div className='col-lg-6'>
                <label className='d-flex flex-stack cursor-pointer mb-5'>
                  <span className='d-flex align-items-center me-2'>
                    <span className='symbol symbol-50px me-6'>
                      <span className='symbol-label bg-light-mc-primary'>
                        <i className='fab fa-react text-success fs-2x'></i>
                        <FontAwesomeIcon icon={faKey} className='text-mc-secondary fs-2x' />
                      </span>
                    </span>

                    <span className='d-flex flex-column'>
                      <span className='fw-bolder fs-6'>Passcode</span>
                      <span className='fs-7 text-muted'>Good ol' fashion password</span>
                    </span>
                  </span>

                  <span className='form-check form-check-custom form-check-solid'>
                    <Field
                      className='form-check-input'
                      type='radio'
                      name='access.key'
                      value={2}
                      checked={community?.access?.key === 2}
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {community?.access?.key === 1 && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>
          <div className='col-lg-8 fv-row'>
            <Field
              type='text'
              name='access.value'
              className='form-control mb-3 mb-lg-0'
              placeholder='Email Address'
              value={
                community?.access?.type === 2 && community?.access?.key === 1
                  ? community?.access?.value
                  : ''
              }
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='access.value' />
            </div>
          </div>
        </div>
      )}

      {community?.access?.key === 2 && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Passcode</label>
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
    </>
  )
}

export {CommunityForm}
