/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid position-x-center bgi-no-repeat bgi-size-cover'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/dashboard/16_9.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/mc_logo.png')} className='h-125px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/*/!* begin::Footer *!/*/}
      {/*<div className='d-flex flex-center flex-column-auto p-10'>*/}
      {/*  <div className='d-flex align-items-center fw-bold fs-6'>*/}
      {/*    <a href='#' className='text-muted text-hover-primary px-2'>*/}
      {/*      About*/}
      {/*    </a>*/}

      {/*    <a href='#' className='text-muted text-hover-primary px-2'>*/}
      {/*      Contact*/}
      {/*    </a>*/}

      {/*    <a href='#' className='text-muted text-hover-primary px-2'>*/}
      {/*      Contact Us*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*/!* end::Footer *!/*/}
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
