import {getOption, Plan} from '../../../models/billing/Plan'
import React, {FC, useEffect, useState} from 'react'
import clsx from 'clsx'
import {KTCardBody} from '../../../helpers/components'
import {PlanOption} from '../../../models/billing/PlanOption'

type Props = {
  plan: Plan | undefined
  planOptions: PlanOption[] | undefined
  paymentTerm?: number
}

const PlanCard: FC<Props> = ({plan, planOptions, paymentTerm}) => {
  const [annualPrice, setAnnualPrice] = useState<number>(0)
  const [monthlyPrice, setMonthlyPrice] = useState<number>(0)

  useEffect(() => {
    if (plan && plan?.id && plan?.id !== 1 && plan?.id < 4) {
      setAnnualPrice(plan?.price_per_member * plan?.max_members * 12)
      setMonthlyPrice(plan?.price_per_member * plan?.max_members * 1.1)
    }
  }, [plan])

  return (
    <div>
      {plan && (
        <div className='plan-card'>
          <div className='h-100 w-100 d-flex flex-column rounded-3 bg-light bg-opacity-75 py-10 px-5'>
            <h1 className='text-dark mb-5 fw-boldest text-center'>{plan.name}</h1>

            {plan?.description && (
              <div className='text-gray-400 fw-bold mb-5'>{plan.description}</div>
            )}

            {plan?.id && plan?.id !== 1 && plan?.id < 4 && (
              <>
                {paymentTerm === 1 && (
                  <div className='text-center'>
                    <span className='mb-2 text-mc-secondary'>USD </span>
                    <span>
                      <span className='fs-3x fw-bolder text-mc-secondary'>
                        {monthlyPrice.toLocaleString()}
                      </span>
                      <span className='fs-7 fw-bold opacity-50'>
                        / <span data-kt-element='period'>month</span>
                      </span>
                    </span>
                  </div>
                )}

                {paymentTerm === 2 && (
                  <div className='text-center'>
                    <span>
                      <span className='mb-2 text-mc-secondary'>USD </span>
                      <span className='fs-3x fw-bolder text-mc-secondary'>
                        {annualPrice.toLocaleString()}
                      </span>
                      <span className='fs-7 fw-bold opacity-50'>
                        / <span data-kt-element='period'>year</span>
                      </span>
                    </span>
                    {plan?.id && plan?.id > 1 && (
                      <div>
                        <span className='text-danger ms-2'>You will be saving 10%</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-3 table-bordered border-1 mb-0'>
                <tbody className='fs-4'>
                  <tr>
                    <td className='text-start fw-bold'>Max Members</td>
                    <td className='text-end'>
                      {plan.max_members.toLocaleString()}
                      {plan.contact_type === 2 && '+'}
                    </td>
                  </tr>
                  {plan.contact_type === 1 && (
                    <>
                      <tr>
                        <td className='text-start fw-bold'>Price per member</td>
                        <td className='text-end'>
                          ${plan.price_per_member.toFixed(2).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className='text-start fw-bold'>Launch Fee</td>
                        <td className='text-end'>
                          $
                          {Math.round(
                            annualPrice * (plan.launch_percentage / 100)
                          ).toLocaleString()}
                        </td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td className='text-start fw-bold'>Transaction Fee</td>
                    <td className='text-end'>{plan.transaction_fee}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <KTCardBody>
              <div className='text-center mw-650px mx-auto'>
                <h1 className='display-6'>Tier Features</h1>
              </div>
              <div className='table-responsive mt-20'>
                <table className='table table-rounded table-striped align-middle gy-7'>
                  <tbody>
                    {planOptions &&
                      plan &&
                      planOptions
                        ?.filter((planOption) => planOption.category_id !== 8)
                        .map((planOption) => (
                          <tr key={`plan-option-${planOption?.id}`}>
                            <td className='ps-5 fs-4 mw-150px'>
                              {planOption.label ?? planOption.name}
                            </td>
                            <td key={`plan-table-body-${plan?.id}`} className='text-center'>
                              {planOption?.is_boolean ? (
                                getOption(plan, planOption?.id)?.value === 'true' ? (
                                  <i className='fs-2 fa fa-check-circle text-success'></i>
                                ) : (
                                  '-'
                                )
                              ) : (
                                <span className='fw-bold'>
                                  {getOption(plan, planOption?.id)?.value ?? '-'}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </KTCardBody>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanCard
