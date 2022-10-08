import {KTCard} from '../../../helpers/components/KTCard'
import {KTCardBody} from '../../../helpers/components/KTCardBody'
import React, {FC, useState} from 'react'
import {KTCardHeader} from '../../../helpers/components/KTCardHeader'
import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import {Field, Form, Formik} from 'formik'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import {updateData} from '../../../helpers/form/FormHelper'

const initUser = {
  first_name: '',
  last_name: '',
  email: '',
}

type UserFilterObj = {
  first_name: string
  last_name: string
  email: string
}

const UserFilter: FC = () => {
  const {updateState} = useQueryRequest()

  const [userFilters, setUserFilters] = useState<UserFilterObj>(initUser)

  const filterData = () => {
    updateState({
      filter: userFilters,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) =>
    updateData({[e.target.name]: e.target.value}, setUserFilters, userFilters)

  return (
    <KTCard id='filter-container' className='bg-transparent mb-10' shadow={false} border={true}>
      <KTCardHeader text={'Filters'} bg={'info'} text_color={'white'} />
      <Formik initialValues={userFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className='form'>
          <KTCardBody>
            <div className='row'>
              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>

              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='last_name'
                  placeholder='Last Name'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>

              <div className='col-lg-4'>
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
            <button type='submit' className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'>
              <span className='indicator-label'>Filter</span>
            </button>
          </div>
        </Form>
      </Formik>
    </KTCard>
  )
}

export { UserFilter };