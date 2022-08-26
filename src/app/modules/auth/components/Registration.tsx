/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {ErrorMessage, Field, Form, Formik, useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import {communitySchema} from '../../../sections/community/models/Community'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

const Registration = () => {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  const handleSubmit = async (values: any) => {
    try {
      const {data: auth} = await register(
        values.email,
        values.firstname,
        values.lastname,
        values.password,
        values.changepassword
      )
      saveAuth(auth)
      const {data: profile} = await getUserByToken(auth.api_token)
      setCurrentUser(profile.user)
      // console.log(user);
      // console.log('registration')
      // setCurrentUser(user)
    } catch (error) {
      console.error(error)
      saveAuth(undefined)
      // setStatus('The registration details is incorrect')
      // setSubmitting(false)
      setLoading(false)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema}
      >
        {({isSubmitting, isValid, touched}) => (
          <Form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'>
            {/* begin::Heading */}
            <div className='mb-10 text-center'>
              {/* begin::Title */}
              <h1 className='text-dark mb-3'>Create an Account</h1>
              {/* end::Title */}

              {/* begin::Link */}
              <div className='text-gray-400 fw-bold fs-4'>
                Already have an account?
                <Link
                  to='/auth/login'
                  className='link-primary fw-bolder'
                  style={{marginLeft: '5px'}}
                >
                  Forgot Password ?
                </Link>
              </div>
              {/* end::Link */}
            </div>

            {/* begin::Form group Firstname */}
            <div className='row fv-row mb-7'>
              <div className='col-xl-6'>
                <label className='class="form-label fw-bolder text-dark fs-6'>First name</label>
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
                {/* begin::Form group Lastname */}
                <div className='fv-row mb-5'>
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
                {/* end::Form group */}
              </div>
            </div>
            {/* end::Form group */}

            {/* begin::Form group Email */}
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
            {/* end::Form group */}

            {/* begin::Form group Password */}
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
                {/* begin::Meter */}
                <div
                  className='d-flex align-items-center mb-3'
                  data-kt-password-meter-control='highlight'
                >
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
                </div>
                {/* end::Meter */}
              </div>
              <div className='text-muted'>
                Use 8 or more characters with a mix of letters, numbers & symbols.
              </div>
            </div>
            {/* end::Form group */}

            {/* begin::Form group Confirm password */}
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
            {/* end::Form group */}

            <div className='fv-row mb-10'>
              <div className='form-check form-check-custom form-check-solid form-switch'>
                <Field
                  className='form-check-input w-45px h-30px'
                  type='checkbox'
                  name={'acceptTerms'}
                />
                <label className='form-check-label fw-bold text-gray-700 fs-6'>
                  I agree the{' '}
                  <Link to='/auth/terms' className='ms-1 link-primary'>
                    terms and conditions
                  </Link>
                  .
                </label>
              </div>
              <div className='text-danger mt-2'>
                <ErrorMessage name='is_cross_play' />
              </div>
            </div>

            <div className='text-center'>
              <button type='submit' className='btn btn-lg btn-mc-secondary w-100 mb-5'>
                <span className='indicator-label'>Register</span>
                {isSubmitting && (
                  <span className='indicator-progress'>
                    Please wait...{' '}
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
