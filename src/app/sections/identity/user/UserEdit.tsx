import React, {FC} from 'react'
import {Form, Formik} from 'formik'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {useNavigate, useParams} from 'react-router-dom'
import {updateUser} from './core/UserRequests'
import {jsonToFormData} from '../../../helpers/form/FormHelper'
import {User, initialUser, userSchema, formOnChange} from './models/User'
import {AvatarImage} from './partials/AvatarImage'
import {UserForm} from './UserForm'

type Props = {
  user: User | undefined
  setUser: any
}

const UserEdit: FC<Props> = ({user, setUser}) => {
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async () => {
    let data = jsonToFormData(user)
    data.append('_method', 'PUT')

    await updateUser(params.id, data).then((response) => {
      setUser(response)
      navigate('/users/' + response?.id)
    })
  }

  const handleOnChange = (e: any) => formOnChange(e, user, setUser)

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <h3 className='card-label'>Update User</h3>
          </div>
        </div>
        <Formik
          initialValues={initialUser(user)}
          onSubmit={handleSubmit}
          validationSchema={userSchema}
          enableReinitialize={true}
        >
          {({isSubmitting, isValid, touched}) => (
            <Form onChange={handleOnChange} className='form' encType='multipart/form-data'>
              <KTCardBody className='py-4'>
                <div className='d-flex flex-column pt-5'>
                  <AvatarImage user={user} setUser={setUser} />

                  <UserForm method={'edit'} user={user} setUser={setUser} />
                </div>
              </KTCardBody>
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  type='submit'
                  className='btn btn-light-mc-secondary btn-active-mc-secondary btn-sm'
                  disabled={isSubmitting || !isValid || !touched}
                >
                  <span className='indicator-label'>Save Changes</span>
                  {isSubmitting && (
                    <span className='indicator-progress'>
                      Please wait...{' '}
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

export {UserEdit}
