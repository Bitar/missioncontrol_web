import React from 'react'
import * as Yup from 'yup'
import {Link} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const {saveAuth, setCurrentUser, setSubscription, setCommunityAdmin} = useAuth()

  const handleSubmit = async (values: any, {setStatus, setSubmitting}: any) => {
    try {
      const {data: auth} = await login(values.email, values.password)
      saveAuth(auth)
      const {data} = await getUserByToken(auth.token)

      if (data) {
        setSubscription(data.subscription)
        setCurrentUser(data.user)
        setCommunityAdmin(data.admin)
      }
      // setCurrentUser(profile.user)
    } catch (error) {
      console.error(error)
      saveAuth(undefined)
      setStatus('The login detail is incorrect')
      setSubmitting(false)
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
        {({isSubmitting}) => (
          <Form className='form w-100'>
            <div className='text-center mb-10'>
              <h1 className='text-dark mb-3'>Sign In to Mission Control</h1>
              <div className='text-gray-400 fw-bold fs-4'>
                New Here?{' '}
                <Link to='/auth/registration' className='link-primary fw-bolder'>
                  Create an Account
                </Link>
              </div>
            </div>

            <div className='fv-row mb-10'>
              <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
              <Field
                type='email'
                name='email'
                placeholder='Email'
                className='form-control form-control-lg form-control-solid'
                autoComplete='off'
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='email' />
              </div>
            </div>

            <div className='fv-row mb-10'>
              <div className='d-flex justify-content-between mt-n5'>
                <div className='d-flex flex-stack mb-2'>
                  <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                  <Link
                    to='/auth/forgot-password'
                    className='link-primary fs-6 fw-bolder'
                    style={{marginLeft: '5px'}}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
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

            <div className='text-center'>
              <button type='submit' className='btn btn-lg btn-primary w-100 mb-5'>
                <span className='indicator-label'>Login</span>
                {isSubmitting && (
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export {Login}
