import React, {FC, useEffect, useState} from 'react'
import {Role, RoleForm, roleFormInitial, roleSchema} from '../../../../models/iam/Role'
import {useNavigate, useParams} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {getRole, updateRole} from '../core/RoleRequests'
import {KTCard, KTCardBody, KTCardFooter, KTCardHeader} from '../../../../helpers/components'
import {jsonToFormData} from '../../../../helpers/form/FormHelper'
import {Permission} from '../../../../models/iam/Permission'
import {getAllPermissions} from '../../permission/core/PermissionRequests'
import axios from 'axios'
import {extractErrors} from '../../../../helpers/requests'
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form'
import FormErrors from '../../../../components/form/FormErrors'
import {Col, Row} from 'react-bootstrap'
import McFormLabel from '../../../../components/form/McFormLabel'
import McFormFooter from '../../../../components/form/McFormFooter'
import {useMcApp} from '../../../../modules/general/McApp'
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator'
import {Sections} from '../../../../helpers/sections'
import {Actions, PageTypes, ToastType} from '../../../../helpers/variables'
import MultiSelect from '../../../../components/form/MultiSelect'
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator'

const RoleEdit: FC = () => {
  const mcApp = useMcApp()
  const [role, setRole] = useState<Role | null>(null)
  const [roleForm, setRoleForm] = useState<RoleForm>(roleFormInitial)

  const [formErrors, setFormErrors] = useState<string[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    if (role) {
      setIsResourceLoaded(true)
    }
    mcApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.EDIT))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  useEffect(() => {
    if (id) {
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

      getRole(id).then((response) => {
        if (axios.isAxiosError(response)) {
          navigate('/error/404')
        } else if (response === undefined) {
          navigate('/error/400')
        } else if (response) {
          // if we were able to get the list of permissions, then we fill our state with them
          setRole(response)

          const {permissions, ...currentRole} = response

          setRoleForm({
            ...currentRole,
            permissions: response.permissions.map((permission) => permission.id),
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSubmit = () => {
    let data = jsonToFormData(roleForm)
    data.append('_method', 'PUT')

    updateRole(id, data).then((response) => {
      if (axios.isAxiosError(response)) {
        // we need to show the errors
        setFormErrors(extractErrors(response))
      } else if (response === undefined) {
        // show generic error message
        setFormErrors([GenericErrorMessage])
      } else {
        mcApp.setAlert({
          message: new AlertMessageGenerator('role', Actions.EDIT, ToastType.SUCCESS).message,
          type: ToastType.SUCCESS,
        })
        navigate('/iam/roles/')
      }
    })
  }

  const handleOnChange = (e: any) => {
    genericOnChangeHandler(e, roleForm, setRoleForm)
  }

  return (
      <KTCard>
        <KTCardHeader text='Edit Role' icon='fa-regular fa-pencil' icon_style='fs-3 text-warning' />

        <Formik
          initialValues={roleForm}
          onSubmit={handleSubmit}
          validationSchema={roleSchema}
          enableReinitialize
        >
          <Form onChange={handleOnChange} className='form'>
            <KTCardBody className='py-4'>
              <FormErrors errorMessages={formErrors} />

              <Row className={'mb-7'}>
                <Col>
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
                </Col>
              </Row>
              <Row className={'mb-7'}>
                <Col>
                  <McFormLabel text={'Permissions'} isRequired={true} />

                  <MultiSelect
                    isResourceLoaded={isResourceLoaded}
                    options={permissions}
                    defaultValue={role?.permissions}
                    form={roleForm}
                    setForm={setRoleForm}
                    name={'permissions'}
                  />

                  <div className='text-danger mt-2'>
                    <ErrorMessage name='permissions' />
                  </div>
                </Col>
              </Row>
            </KTCardBody>
            <KTCardFooter>
              <McFormFooter cancelUrl={'/iam/roles'} />
            </KTCardFooter>
          </Form>
        </Formik>
      </KTCard>
  )
}

export {RoleEdit}
