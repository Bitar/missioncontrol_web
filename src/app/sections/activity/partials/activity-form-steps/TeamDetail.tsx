import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {activityDetailsSchema} from '../../models/Activity'
import React from 'react'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {Form, Formik} from 'formik'
import {TeamDetailForm} from '../activity-create-steps/TeamDetailForm'
import {FormAction} from '../../../../helpers/form/FormAction'
import {jsonToFormData} from '../../../../helpers/form/FormHelper'
import {updateActivity} from '../../core/requests/ActivityRequests'
import toast from 'react-hot-toast'
import {useActivity} from '../../core/contexts/ActivityContext'
import { updateTeam } from "../../core/requests/ActivitySettingsRequests";

export const TeamDetail = () => {
  const {activity, setActivity} = useActivity()
  const {activityForm} = useActivityForm()

  const handleOnChange = async () => {}

  const handleSubmit = async () => {
    let data = jsonToFormData(activityForm)

    await updateTeam(activity?.id, data)
      .then((response) => {
        toast.success('Activity updated Successfully!')
        setActivity(response)
      })
      .catch(function (e) {
        if (e.response) {
        }
      })
  }

  return (
    <KTCard border={true}>
      <KTCardHeader text={'General Details'} bg='mc-primary' text_color='white' />

      <Formik
        validationSchema={activityDetailsSchema}
        initialValues={activityForm!}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({isSubmitting}) => (
          <Form onChange={handleOnChange} className='form' autoComplete='off'>
            <KTCardBody>
              <TeamDetailForm />
            </KTCardBody>
            <FormAction text={'Update Activity'} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}
