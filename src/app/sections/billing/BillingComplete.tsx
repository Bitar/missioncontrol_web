import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getPaymentResponse} from './core/_requests'
import {PaymentResponse} from '../../models/billing/PaymentResponse'
import {useAuth} from '../../modules/auth'

const BillingComplete = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [paymentRes, setPaymentRes] = useState<PaymentResponse | undefined>()
  const {setSubscription} = useAuth()

  useEffect(() => {
    getPaymentResponse(params.id).then((response) => {
      if (response?.status === 1) {
        setSubscription(response?.subscription)
        navigate('/communities/create')
      } else {
        setPaymentRes(response?.payment_response)
      }
    })
  }, [params, navigate, setSubscription])

  return (
    <>
      {paymentRes && paymentRes?.status !== 1 && (
        <div>
          Error Happened with Payment
          <code className={'language-json'}>
            <pre className={'language-json'}>{JSON.stringify(paymentRes, null, '\t')}</pre>
          </code>
        </div>
      )}
    </>
  )
}

export {BillingComplete}
