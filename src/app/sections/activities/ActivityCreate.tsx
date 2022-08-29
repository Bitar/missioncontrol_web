import React, {FC, useState} from 'react'
import { Activity, activitySchema, formOnChange, initialActivity, prepareForStore } from "./models/Activity";
import {useNavigate} from 'react-router-dom'
import {jsonToFormData} from '../../helpers/form/FormHelper'
import {createActivity} from './core/ActivityRequests'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {Form, Formik} from 'formik'
import {FormAction} from '../../helpers/form/FormAction'
import {ActivityForm} from './ActivityForm'

const ActivityCreate: FC<React.PropsWithChildren<unknown>> = () => {
  const [activity, setActivity] = useState<Activity>(initialActivity)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    prepareForStore(activity, setActivity);
    let data = jsonToFormData(activity)
    await createActivity(data).then((response) => navigate('/activities/' + response?.id))
  }

  const handleOnChange = (e: any) => formOnChange(e, activity, setActivity)

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <span className='card-icon'>
              <i className='las la-plus fs-2' />
            </span>
            <h3 className='card-label'>Add Activity</h3>
          </div>
        </div>
        <Formik initialValues={activity} onSubmit={handleSubmit} validationSchema={activitySchema}>
          {({isSubmitting, isValid, touched}) => (
            <Form onChange={handleOnChange} className='form'>
              <KTCardBody className='py-4'>
                <div className='d-flex flex-column pt-5'>
                  <ActivityForm activity={activity} setActivity={setActivity}></ActivityForm>
                </div>
              </KTCardBody>
              <FormAction text={'Add Activity'} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  )
}

export {ActivityCreate}
