import React, {useEffect, useState} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {getUserByToken, register} from '../core/_requests'
import {Link, useNavigate} from 'react-router-dom'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import {FormErrorAlert} from '../../errors/partials/FormErrorAlert'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const registrationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Minimum 3 letters')
    .max(50, 'Maximum 50 letters')
    .required('First name is required'),
  email: Yup.string().email('Wrong email format').required('Email is required'),
  last_name: Yup.string()
    .min(3, 'Minimum 3 letters')
    .max(50, 'Maximum 50 letters')
    .required('Last name is required'),
  password: Yup.string()
    .min(8, 'Minimum length: 8')
    .max(50, 'Maximum length: 50')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

const Registration = () => {
  const navigate = useNavigate()
  const {saveAuth, setCurrentUser, setCommunityAdmin} = useAuth()
  const [hasErrors, setHasErrors] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  const handleSubmit = async (values: any) => {
    setHasErrors(false)
    await register(
      values.email,
      values.first_name,
      values.last_name,
      values.password,
      values.password_confirmation
    )
      .then((response) => {
        saveAuth(response.data)
        getUserByToken(response.data.token).then((response) => {
          setCurrentUser(response.data.user)
          setCommunityAdmin(response.data.admin)
          navigate('/')
        })
      })
      .catch((error) => {
        saveAuth(undefined)
        setHasErrors(true)
        if (error.response) {
          if (error.response.data.error.validation?.email) {
            setAlertMessage(error.response.data.error.validation?.email[0])
          }
        }
      })
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema}
      >
        {({isSubmitting}) => (
          <Form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'>
            <div className='mb-10 text-center'>
              <h1 className='text-dark mb-3'>Create an Account</h1>

              <div className='text-gray-400 fw-bold fs-4'>
                Already have an account?
                <Link
                  to='/auth/login'
                  className='link-primary fw-bolder'
                  style={{marginLeft: '5px'}}
                >
                  Login
                </Link>
              </div>
            </div>

            <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />

            <div className='row fv-row mb-7'>
              <div className='col-xl-6'>
                <label className='form-label fw-bolder text-dark fs-6'>First name</label>
                <Field
                  type='text'
                  name='first_name'
                  placeholder='First name'
                  className='form-control form-control-lg form-control-solid'
                  autoComplete='off'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='first_name' />
                </div>
              </div>
              <div className='col-xl-6'>
                <label className='form-label fw-bolder text-dark fs-6'>Last name</label>
                <Field
                  type='text'
                  name='last_name'
                  placeholder='Last name'
                  className='form-control form-control-lg form-control-solid'
                  autoComplete='off'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='last_name' />
                </div>
              </div>
            </div>

            <div className='fv-row mb-7'>
              <label className='form-label fw-bolder text-dark fs-6'>Email</label>
              <Field
                type='text'
                name='email'
                placeholder='Email'
                className='form-control form-control-lg form-control-solid'
                autoComplete='off'
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='email' />
              </div>
            </div>

            <div className='mb-10 fv-row' data-kt-password-meter='true'>
              <div className='mb-1'>
                <label className='form-label fw-bolder text-dark fs-6'>Password</label>
                <div className='position-relative mb-3'>
                  <Field
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='form-control form-control-lg form-control-solid'
                    autoComplete='off'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='password' />
                  </div>
                </div>
                <div
                  className='d-flex align-items-center mb-3'
                  data-kt-password-meter-control='highlight'
                >
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
                </div>
              </div>
              <div className='text-muted'>
                Use 8 or more characters with a mix of letters, numbers & symbols.
              </div>
            </div>

            <div className='fv-row mb-5'>
              <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
              <Field
                type='password'
                name='password_confirmation'
                placeholder='Password Confirmation'
                className='form-control form-control-lg form-control-solid'
                autoComplete='off'
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='password_confirmation' />
              </div>
            </div>

            <div className='fv-row mb-10'>
              <div className='form-check form-check-custom form-check-solid form-switch'>
                <span className='form-check-label fw-bold text-gray-700 fs-6'>
                  By signing up, you agree with the
                  <a
                    rel={'noreferrer'}
                    href='https://app.termly.io/document/terms-of-use-for-website/15087e11-678e-49c8-9fb9-feff372268de'
                    target='_blank'
                    className='ms-1 link-primary'
                  >
                    Terms of Service
                  </a>{' '}
                  and
                  <a
                    rel={'noreferrer'}
                    href='https://app.termly.io/document/privacy-policy/61d2c399-55ab-4ba8-b7bf-9c704dd6330c'
                    target='_blank'
                    className='ms-1 link-primary'
                  >
                    Private Policy
                  </a>
                  .
                </span>
              </div>
            </div>

            <div className='text-center'>
              <button
                type='submit'
                className='btn btn-lg btn-mc-secondary w-100 mb-5'
                disabled={isSubmitting}
              >
                <span className='indicator-label'>Register</span>
                {isSubmitting && (
                  <span className='indicator-progress float-end' style={{display: 'inline-block'}}>
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                )}
              </button>
              <Link to='/auth/login'>
                <button
                  type='button'
                  id='kt_login_signup_form_cancel_button'
                  className='btn btn-lg btn-light-primary w-100 mb-5'
                >
                  Cancel
                </button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export {Registration}
