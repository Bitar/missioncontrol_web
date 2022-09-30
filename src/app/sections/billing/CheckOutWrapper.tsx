import React, {FC, useEffect} from 'react'
import {subscriptionRequest} from './core/BillingRequests'
import {Plan} from '../../models/billing/Plan'

type Props = {
  plan: Plan
  paymentTerms: number
}

const CheckOutWrapper: FC<React.PropsWithChildren<Props>> = ({plan, paymentTerms}) => {
  useEffect(() => {
    subscriptionRequest(plan, paymentTerms).then((response) => {
      if (response?.url) {
        window.location.href = response?.url
      }
    })
  }, [paymentTerms, plan])

  return <></>
}

export {CheckOutWrapper}
