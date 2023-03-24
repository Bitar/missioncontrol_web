/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {ResetPassword} from './components/ResetPassword'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid position-x-center bgi-no-repeat bgi-size-cover bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/backgrounds/login_16_9.png')})`,
      }}>
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/mc_logo.png')} className='h-125px' />
        </a>
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password/:token' element={<ResetPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
