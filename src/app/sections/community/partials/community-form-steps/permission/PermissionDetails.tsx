import {KTCard, KTCardBody, KTCardHeader} from '../../../../../helpers/components'
import React, {useState} from 'react'
import {PermissionDetailTableWrapper} from './PermissionDetailTable'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {FormAction} from '../../../../../helpers/form/FormAction'
import {useCommunity} from '../../../core/CommunityContext'
import {SwitchInput} from '../../../../../components/SwitchInput/SwitchInput'
import {jsonToFormData, updateData} from '../../../../../helpers/form/FormHelper'
import {FormErrorAlert} from '../../../../../modules/errors/partials/FormErrorAlert'
import toast from 'react-hot-toast'
import {addCommunityPermissions} from '../../../core/CommunityPermissionRequests'
import {useAuth} from '../../../../../modules/auth'
import {isCommunityAdmin, isSuperAdmin} from '../../../../iam/user/core/User'

export const communityPermissionSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
})

type PermissionUserForm = {
  email: string
  is_owner?: boolean
}

const PermissionDetails = () => {
  const {currentUser, communityAdmin} = useAuth()
  const {community} = useCommunity()

  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)
  const [permissionUserForm, setPermissionUserForm] = useState<PermissionUserForm>({
    email: '',
    is_owner: false,
  })

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    if (targetName === 'is_owner') {
      updateData(
        {is_owner: !permissionUserForm?.is_owner},
        setPermissionUserForm,
        permissionUserForm
      )
    } else {
      updateData({[targetName]: targetValue}, setPermissionUserForm, permissionUserForm)
    }
  }

  const handleSubmit = async () => {
    let data = jsonToFormData(permissionUserForm)
    data.delete('is_owner')
    data.append('is_owner', (permissionUserForm.is_owner ? 1 : 0) + '')

    await addCommunityPermissions(community?.id, data)
      .then(() => {
        toast.success('Community admin added Successfully!')

        setPermissionUserForm({
          email: '',
          is_owner: false,
        })
        setAlertMessage('')
        setHasErrors(false)
      })
      .catch(function (e) {
        if (e.response) {
          let status = e.response.status

          if (status === 400) {
            setAlertMessage(e.response.data.errors)
            setHasErrors(true)
          } else if (status === 422) {
            let firstMessage = e.response.data.error.validation?.email[0]
            setAlertMessage(firstMessage)
            setHasErrors(true)
          }
        }
      })
  }

  return (
    <>
      <PermissionDetailTableWrapper />
      <KTCard border={true}>
        <KTCardHeader text={'Add Users'} bg='mc-primary' text_color='white' />

        <Formik
          validationSchema={communityPermissionSchema}
          initialValues={permissionUserForm}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({isSubmitting}) => (
            <Form onChange={handleOnChange} className='form' autoComplete='off'>
              <KTCardBody className='py-4'>
                <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />
                <div className='d-flex flex-column pt-5'>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      User Email
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='form-control mb-3 mb-lg-0'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='email' />
                      </div>
                    </div>
                  </div>

                  {currentUser &&
                    (isSuperAdmin(currentUser) ||
                      (isCommunityAdmin(currentUser) &&
                        community?.id === communityAdmin?.id &&
                        communityAdmin?.is_owner)) && (
                      <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label fw-bold fs-6'>Is Owner</label>
                        <div className='col-lg-8 fv-row'>
                          <SwitchInput
                            name='is_owner'
                            id={'permission_is_owner'}
                            isOn={permissionUserForm?.is_owner}
                            handleToggle={() => {}}
                          />
                        </div>
                      </div>
                    )}
                </div>
              </KTCardBody>
              <FormAction text={'Add User'} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  )
}

export {PermissionDetails}
