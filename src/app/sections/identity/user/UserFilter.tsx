import {KTCard} from '../../../helpers/components/KTCard'
import {KTCardBody} from '../../../helpers/components/KTCardBody'
import React, {FC, useState} from 'react'
import {KTCardHeader} from '../../../helpers/components/KTCardHeader'
import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import {useQueryResponse} from '../../../modules/table/QueryResponseProvider'
import {Field, Form, Formik} from 'formik'
import {initialQueryState} from '../../../helpers/crud-helper/models'

const initUser = {
  first_name: '',
  last_name: '',
  email: '',
}

const UserFilter: FC<{ref: any}> = ({ref}) => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [firstName, setFirstName] = useState<string | undefined>()
  const [lastName, setLastName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()

  const filterData = () => {
    let filter: any = {}

    if (firstName) {
      filter.first_name = firstName
    }
    if (lastName) {
      filter.last_name = lastName
    }
    if (email) {
      filter.email = email
    }

    updateState({
      filter: filter,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    if (targetName === 'first_name') {
      setFirstName(targetValue)
    }
    if (targetName === 'last_name') {
      setLastName(targetValue)
    }
    if (targetName === 'email') {
      setEmail(targetValue)
    }
  }
  return (
    <KTCard ref={ref} id='filter-container' className='bg-transparent' shadow={false} border={true}>
      <KTCardHeader text={'Filters'} />
      <Formik initialValues={initUser} onSubmit={filterData} enableReinitialize>
        {({isSubmitting}) => {
          return (
            <Form onChange={handleOnChange} className='form'>
              <KTCardBody>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

                  <div className='col-lg-8'>
                    <div className='row'>
                      <div className='col-lg-6 fv-row'>
                        <Field
                          type='text'
                          name='first_name'
                          placeholder='First Name'
                          className={'form-control mb-3 mb-lg-0'}
                          autoComplete='off'
                        />
                      </div>

                      <div className='col-lg-6 fv-row'>
                        <Field
                          type='text'
                          name='last_name'
                          placeholder='Last Name'
                          className={'form-control mb-3 mb-lg-0'}
                          autoComplete='off'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>

                  <div className='col-lg-8'>
                    <Field
                      type='text'
                      name='email'
                      placeholder='Email'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                  </div>
                </div>
              </KTCardBody>
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  type='submit'
                  className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'
                >
                  <span className='indicator-label'>Filter</span>
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </KTCard>
  )
}

export { UserFilter };