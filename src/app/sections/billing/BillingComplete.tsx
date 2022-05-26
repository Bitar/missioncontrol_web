import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPaymentResponse} from "./core/_requests";
import {PaymentResponse} from "../../models/billing/PaymentResponse";
import {CodeBlock} from "../../../_metronic/partials";

const BillingComplete = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [paymentRes, setPaymentRes] = useState<PaymentResponse | undefined>()

    useEffect(() => {
        getPaymentResponse(params.id).then(response => {
            if (response?.status === 1) {
                navigate('/community/create')
            } else {
                setPaymentRes(response)
            }
        })
    }, [params, navigate])

    return (
        <>
            {paymentRes?.status !== 1 &&
                <div>
                    Error Happened with Payment

                    <code className={'language-json'}>
                        <pre className={'language-json'}>
                            {JSON.stringify(paymentRes, null, '\t')}
                        </pre>
                    </code>
                </div>
            }
        </>
    )
}

export {BillingComplete}