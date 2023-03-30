import React, {useEffect, useState} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {KTCard, KTCardBody, KTCardFooter, KTCardHeader} from '../../../../helpers/components'
import {useNavigate} from 'react-router-dom'
import {Role, roleInitial, roleSchema} from '../../../../models/iam/Role'
import {createRole} from '../core/Requests'
import {jsonToFormData} from '../../../../helpers/form/FormHelper'
import {getAllPermissions} from '../../permission/core/Requests'
import {Permission} from '../../../../models/iam/Permission'
import Select from 'react-select'
import {
  GenericErrorMessage,
  genericMultiSelectOnChangeHandler,
  genericOnChangeHandler,
} from '../../../../helpers/form'
import {useMcApp} from '../../../../modules/general/McApp'
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator'
import {Sections} from '../../../../helpers/sections'
import {Actions, PageTypes, ToastType} from '../../../../helpers/variables'
import McFormLabel from '../../../../components/form/McFormLabel'
import McFormFooter from '../../../../components/form/McFormFooter'
import axios from 'axios'
import {extractErrors} from '../../../../helpers/requests'
import FormErrors from '../../../../components/form/FormErrors'
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator'

const RoleCreate = () => {
  const mcApp = useMcApp()
  const [role, setRole] = useState<Role>(roleInitial)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.CREATE))

    getAllPermissions().then((response) => {
      if (axios.isAxiosError(response)) {
        setFormErrors(extractErrors(response))
      } else if (response === undefined) {
        setFormErrors([GenericErrorMessage])
      } else if (response.data) {
        // if we were able to get the list of permissions, then we fill our state with them
        setPermissions(response.data)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = () => {
    let data = jsonToFormData(role)
    createRole(data).then((response) => {
      if (axios.isAxiosError(response)) {
        // we need to show the errors
        setFormErrors(extractErrors(response))
      } else if (response === undefined) {
        // show generic error message
        setFormErrors([GenericErrorMessage])
      } else {
        // it's permission for sure
        mcApp.setAlert({
          message: new AlertMessageGenerator('role', Actions.CREATE, ToastType.SUCCESS).message,
          type: ToastType.SUCCESS,
        })
        navigate('/iam/roles/')
      }
    })
  }

  const multiSelectChangeHandler = (e: any) => {
    genericMultiSelectOnChangeHandler(e, role, setRole, 'permissions')
  }

  const handleOnChange = (e: any) => {
    genericOnChangeHandler(e, role, setRole)
  }

  return (
    <>
      <KTCard>
        <KTCardHeader
          text='Create New Role'
          icon='fa-regular fa-plus'
          icon_style='fs-3 text-success'
        />

        <Formik
          initialValues={role}
          onSubmit={handleSubmit}
          validationSchema={roleSchema}
          enableReinitialize>
          <Form onChange={handleOnChange} className='form'>
            <KTCardBody className='py-4'>
              <FormErrors errorMessages={formErrors} />

              <div className={'mb-7'}>
                <McFormLabel text={'Name'} isRequired={true} />

                <Field
                  type='text'
                  name='name'
                  placeholder='Name'
                  className='form-control mb-3 mb-lg-0'
                  autoComplete='off'
                />

                <div className='text-danger mt-2'>
                  <ErrorMessage name='name' />
                </div>
              </div>
              <div className={'mb-7'}>
                <McFormLabel text={'Permissions'} isRequired={true} />

                <Select
                  isMulti
                  name='permissions'
                  options={permissions}
                  getOptionLabel={(permission) => permission.name}
                  getOptionValue={(permission) => permission.id.toString()}
                  onChange={multiSelectChangeHandler}
                  placeholder='Select one or more permissions'
                />

                <div className='text-danger mt-2'>
                  <ErrorMessage name='permissions' />
                </div>
              </div>
            </KTCardBody>
            <KTCardFooter>
              <McFormFooter cancelUrl={'/iam/roles'} />
            </KTCardFooter>
          </Form>
        </Formik>
      </KTCard>
    </>
  )
}

export default RoleCreate
