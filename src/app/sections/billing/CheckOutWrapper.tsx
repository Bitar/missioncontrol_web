import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import React, {FC, useEffect, useState} from 'react'
import {subscriptionRequest} from './core/BillingRequests'
import {loadStripe} from '@stripe/stripe-js'
import {ID, KTCard, KTCardBody, KTSVG} from '../../../_metronic/helpers'
import {useCheckoutModal} from './core/CheckoutModal'
import {Plan} from '../../models/billing/Plan'
import {useNavigate} from 'react-router-dom'

const API_URL = process.env.REACT_APP_URL

const stripePromise = loadStripe('pk_test_F0GQZPtb2QFxhRVRoKKAsnf3')

type CheckOutProps = {
  plan: Plan
  paymentReq: ID
}

const CheckOut: FC<React.PropsWithChildren<CheckOutProps>> = ({plan, paymentReq}) => {
  const stripe = useStripe()
  const elements = useElements()

  const {setShowCheckout} = useCheckoutModal()
  const [message, setMessage] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${API_URL}/billing/` + paymentReq + '/complete',
      },
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className='modal fade show d-block' role='dialog' tabIndex={-1} aria-modal='true'>
        <div className='modal-dialog modal-dialog-centered mw-850px'>
          <div className='modal-content'>
            {/* begin::Close */}
            <div
              className='btn btn-icon btn-sm btn-active-icon-primary'
              onClick={() => setShowCheckout(false)}
              style={{cursor: 'pointer'}}
            >
              <KTSVG path='/media/icons/duotune/arr061.svg' className='svg-icon-1' />
            </div>
            {/* end::Close */}

            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <KTCard className='card-bordered py-4 flex-row-fluid mb-7'>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2>Payment Details</h2>
                  </div>
                </div>

                <KTCardBody className='pt-0'>
                  <div className='table-responsive'>
                    <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                      <tbody className='fw-bold text-gray-600'>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <KTSVG
                              path='/media/icons/duotune/fil002.svg'
                              className='svg-icon-2 me-2'
                            />
                            Plan
                          </div>
                        </td>
                        <td className='fw-bolder text-end'>{plan.name}</td>
                      </tr>

                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <KTSVG
                              path='/media/icons/duotune/fin008.svg'
                              className='svg-icon-2 me-2'
                            />
                            Recurring Amount
                          </div>
                        </td>
                        <td className='fw-bolder text-end'>
                          ${(plan.price_per_member * plan.max_members * 1.1).toFixed(2)}
                        </td>
                      </tr>

                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <KTSVG
                              path='/media/icons/duotune/ecm006.svg'
                              className='svg-icon-2 me-2'
                            />
                            Launch Cost
                          </div>
                        </td>
                        <td className='fw-bolder text-end'>
                          $
                          {(
                            plan.price_per_member *
                            plan.max_members *
                            12 *
                            (plan.launch_percentage / 100)
                          ).toFixed(2)}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </KTCardBody>
              </KTCard>

              <KTCard className='card-bordered py-4 flex-row-fluid'>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2>Checkout</h2>
                  </div>
                </div>

                <form className='form' id='payment-form' onSubmit={handleSubmit}>
                  <KTCardBody>
                    <PaymentElement id='payment-element' />
                  </KTCardBody>
                  <div className='card-footer'>
                    <button
                      className='btn btn-primary m-0 '
                      disabled={isLoading || !stripe || !elements}
                      id='submit'
                    >
                      <span id='button-text'>
                        Pay now
                        {/*{isLoading ? <div className="spinner" id="spinner"/> : "Pay now"}*/}
                      </span>
                    </button>
                    {/* Show any error or success messages */}
                    {message && <div id='payment-message'>{message}</div>}
                  </div>
                </form>
              </KTCard>
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show' />
    </>
  )
}

type Props = {
  plan: Plan
  paymentTerms: number
}

const CheckOutWrapper: FC<React.PropsWithChildren<Props>> = ({plan, paymentTerms}) => {
  const [clientSecret, setClientSecret] = useState<string | undefined>()
  const [paymentReq, setPaymentReq] = useState<ID | undefined>()

  useEffect(() => {
    if (!clientSecret) {
      subscriptionRequest(plan, paymentTerms).then((response) => {
        if (response?.url) {
          window.location.href = response?.url
        }
        // setPaymentReq(response?.id)
        // setClientSecret(response?.stripe_pi_secret)
      })
    }
  }, [plan, clientSecret])

  const options = {
    clientSecret,
  }

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOut plan={plan} paymentReq={paymentReq} />
        </Elements>
      )}
    </>
  )
}

export { CheckOutWrapper };
