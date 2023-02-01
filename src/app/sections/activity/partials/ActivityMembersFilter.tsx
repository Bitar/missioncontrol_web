import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import React, {useState} from 'react'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import {updateData} from '../../../helpers/form/FormHelper'
import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import {Field, Form, Formik} from 'formik'

const initActivityMembersFilter = {
  name: '',
}

type ActivityMembersFilterObj = {
  name: string
}

const ActivityMembersFilter = () => {
  const {updateState} = useQueryRequest()
  const [activityTeamFilters, setActivityTeamFilters] =
    useState<ActivityMembersFilterObj>(initActivityMembersFilter)

  const filterData = () => {
    updateState({
      filter: activityTeamFilters,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({[e.target.name]: e.target.value}, setActivityTeamFilters, activityTeamFilters)
    }
  }

  return (
    <KTCard id='filter-container' className='bg-transparent mb-10' shadow={false} border={true}>
      <KTCardHeader
        text={'Filters'}
        bg={'info'}
        text_color={'white'}
        collapse={true}
        target_id='filter-container-wrapper'
      />
      <Formik initialValues={activityTeamFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className='form collapse' id='filter-container-wrapper'>
          <KTCardBody>
            <div className='row mb-5'>
              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='teams.name'
                  placeholder='Team Name'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>
              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='first_name'
                  placeholder='User first name'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>
              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='last_name'
                  placeholder='User last name'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='email'
                  placeholder='User email'
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

export {ActivityMembersFilter}