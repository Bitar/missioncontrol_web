import React, {useState} from 'react'
import {Form, Formik} from 'formik'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {createUser} from './core/UserRequests'
import {jsonToFormData} from '../../../helpers/form/FormHelper'
import {User, initialUser, userSchema, formOnChange} from './models/User'
import {AvatarImage} from './partials/AvatarImage'
import {UserForm} from './UserForm'
import {FormAction} from '../../../helpers/form/FormAction'

const UserCreate = () => {
  const [user, setUser] = useState<User>(initialUser)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    let data = jsonToFormData(user)
    await createUser(data).then((response) => navigate('/users/' + response?.id))
  }

  const handleOnChange = (e: any) => formOnChange(e, user, setUser)

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <span className='card-icon'>
              <i className='las la-plus fs-2' />
            </span>
            <h3 className='card-label'>Add User</h3>
          </div>
        </div>
        <Formik initialValues={user} onSubmit={handleSubmit} validationSchema={userSchema(true)}>
          {({isSubmitting, isValid, touched}) => {
            return (
              <>
                <Form onChange={handleOnChange} className='form' encType='multipart/form-data'>
                  <KTCardBody className='py-4'>
                    <div className='d-flex flex-column pt-5'>
                      <AvatarImage user={user} setUser={setUser} />

                      <UserForm method={'create'} user={user} setUser={setUser} />
                    </div>
                  </KTCardBody>
                  <FormAction text={'Add User'} isSubmitting={isSubmitting} />
                </Form>
              </>
            )
          }}
        </Formik>
      </KTCard>
    </>
  )
}

export {UserCreate}