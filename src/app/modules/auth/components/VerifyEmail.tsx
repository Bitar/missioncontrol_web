import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useAuth} from '../core/Auth'
import axios from 'axios'
import {FormErrorAlert} from '../../errors/partials/FormErrorAlert'
import toast from 'react-hot-toast'

export function VerifyEmail() {
  const [hasErrors, setHasErrors] = useState<boolean>(false)
  const [searchParams] = useSearchParams()
  const verifyLink = searchParams.get('verify_url')
  const {currentUser} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (verifyLink) {
      axios
        .get(verifyLink)
        .then(() => {
          toast.success('Email verified Successfully', {
            position: 'top-center',
          })
          navigate('/')
        })
        .catch(() => {
          setHasErrors(true)
        })
    }
  }, [currentUser, verifyLink, navigate])

  return (
    <>
      {hasErrors && <FormErrorAlert hasErrors={hasErrors} message={'Invalid Verification Link'} />}
    </>
  )
}
