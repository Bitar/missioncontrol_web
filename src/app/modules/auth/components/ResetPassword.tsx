import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Field, Form, Formik} from 'formik'
import {resetPassword} from '../core/_requests'
import {jsonToFormData} from '../../../helpers/form/FormHelper'
import * as Yup from 'yup'

// const forgotPasswordSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Wrong email format')
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Email is required'),
// })

const initialValues = {
  email: '',
  token: '',
  password: '',
  password_confirmation: '',
}

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

const ResetPassword = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)

  const handleSubmit = async (values: any) => {
    values.token = params.token
    let data = jsonToFormData(values)

    await resetPassword(data)
      .then(() => {
        setHasErrors(false)
        navigate('/')
      })
      .catch(() => {
        setHasErrors(true)
      })
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={resetPasswordSchema}
        enableReinitialize>
        {/*{({isSubmitting, isValid, touched}) => (*/}
        <Form className='form w-100'>
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark mb-3'>Reset Password</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-gray-400 fw-bold fs-4'>
              Enter your email to reset your password.
            </div>
          </div>

          {/* begin::Title */}
          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>
                Sorry, looks like there are some errors detected, please try again.
              </div>
            </div>
          )}

          {hasErrors === false && (
            <div className='mb-10 bg-light-info p-8 rounded'>
              <div className='text-info'>Sent password reset. Please check your email</div>
            </div>
          )}
          {/* end::Title */}

          <div className='fv-row mb-10'>
            <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
            <Field
              type='text'
              name='email'
              placeholder='Email'
              className={'form-control mb-3 mb-lg-0'}
              autoComplete='off'
            />
            <Field
              type='text'
              name='token'
              value={params.token}
              className={'form-control mb-3 mb-lg-0'}
              autoComplete='off'
              hidden={true}
            />
          </div>

          <div className='fv-row mb-10'>
            <label className='form-label fw-bolder text-gray-900 fs-6'>Password</label>
            <Field
              type='password'
              name='password'
              placeholder='Password'
              className={'form-control mb-3 mb-lg-0'}
              autoComplete='off'
            />
          </div>
          <div className='fv-row mb-10'>
            <label className='form-label fw-bolder text-gray-900 fs-6'>Password Confirmation</label>
            <Field
              type='password'
              name='password_confirmation'
              placeholder='Password'
              className={'form-control mb-3 mb-lg-0'}
              autoComplete='off'
            />
          </div>

          <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
            <button
              type='submit'
              id='kt_password_reset_submit'
              className='btn btn-lg btn-primary fw-bolder'>
              <span className='indicator-label'>Submit</span>
              {/*{loading && (*/}
              {/*  <span className='indicator-progress'>*/}
              {/*    Please wait...*/}
              {/*    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>*/}
              {/*  </span>*/}
              {/*)}*/}
            </button>
          </div>
          {/* end::Form group */}
        </Form>
        {/*)}*/}
      </Formik>
    </>
  )
}

export {ResetPassword}

// export function ForgotPassword() {
//   const [loading, setLoading] = useState(false)
//   const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
//   const formik = useFormik({
//     initialValues,
//     validationSchema: forgotPasswordSchema,
//     onSubmit: (values, {setStatus, setSubmitting}) => {
//       setLoading(true)
//       setHasErrors(undefined)
//       setTimeout(() => {
//         requestPassword(values.email)
//           .then(({data: {result}}) => {
//             setHasErrors(false)
//             setLoading(false)
//           })
//           .catch(() => {
//             setHasErrors(true)
//             setLoading(false)
//             setSubmitting(false)
//             setStatus('The login detail is incorrect')
//           })
//       }, 1000)
//     },
//   })
// }
