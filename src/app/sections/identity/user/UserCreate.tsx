import React, {useState} from 'react'
import {Form, Formik} from 'formik'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {createUser} from './core/UserRequests'
import {jsonToFormData} from '../../../helpers/form/FormHelper'
import {formOnChange, userSchema} from './models/User'
import {AvatarImage} from './partials/AvatarImage'
import {UserFormPage} from './UserFormPage'
import {FormAction} from '../../../helpers/form/FormAction'
import {initUserForm, UserForm} from './models/UserForm'

const UserCreate = () => {
  const [userForm, setUserForm] = useState<UserForm>(initUserForm())
  const navigate = useNavigate()

  const handleSubmit = () => {
    let data = jsonToFormData(userForm)
    createUser(data).then((response) => navigate('/users/' + response?.id))
  }

  const handleOnChange = (e: any) => formOnChange(e, userForm, setUserForm)

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
        <Formik
          initialValues={userForm}
          onSubmit={handleSubmit}
          validationSchema={userSchema(true)}
        >
          {({isSubmitting, isValid, touched}) => {
            return (
              <Form onChange={handleOnChange} className='form' encType='multipart/form-data'>
                <KTCardBody className='py-4'>
                  <div className='d-flex flex-column pt-5'>
                    <AvatarImage user={userForm} setUser={setUserForm} />

                    <UserFormPage method={'create'} user={userForm} setUser={setUserForm} />
                  </div>
                </KTCardBody>
                <FormAction text={'Add User'} isSubmitting={isSubmitting} />
              </Form>
            )
          }}
        </Formik>
      </KTCard>
    </>
  )
}

export {UserCreate}
