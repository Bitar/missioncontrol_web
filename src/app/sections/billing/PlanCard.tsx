/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import { getOption, Plan } from "../../models/billing/Plan";

type Props = {
  plan: Plan
  selectPlan: any
  paymentTerms: number
}

const PlanCard: FC<React.PropsWithChildren<Props>> = ({plan, selectPlan, paymentTerms}) => {
  const annualPrice = plan.price_per_member * plan.max_members * 12
  const monthlyPrice = plan.price_per_member * plan.max_members * 1.1

  return (
    <>
      <div className='col-xl-3'>
        {/*{plan.contact_type === 1 ? 'col-xl-3' : 'col-xl-12'}*/}
        <div className='d-flex h-100 align-items-center bg-mc-secondary rounded-3'>
          <div className='h-100 w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-10 px-5'>
            <div className='mb-7 text-center'>
              <h1 className='text-dark mb-5 fw-boldest'>{plan.name}</h1>

              <div className='text-gray-400 fw-bold mb-5'>{plan.description}</div>

              {plan.contact_type === 1 && (
                <div className='text-center'>
                  <span className='mb-2 text-primary'>$</span>
                  {paymentTerms === 1 && (
                    <span>
                      <span className='fs-3x fw-bolder text-primary'>
                        {monthlyPrice.toFixed(0)}
                      </span>
                      <span className='fs-7 fw-bold opacity-50'>
                        /<span data-kt-element='period'>month</span>
                      </span>
                    </span>
                  )}
                  {paymentTerms === 2 && (
                    <span>
                      <span className='fs-3x fw-bolder text-primary'>{annualPrice.toFixed(0)}</span>
                      <span className='fs-7 fw-bold opacity-50'>
                        /<span data-kt-element='period'>year</span>
                      </span>
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className='w-100 mb-10'>
              <div className='table-responsive'>
                <table className='table align-middle gs-0 gy-3'>
                  <thead>
                  <tr>
                    <th className='p-0 min-w-130px'></th>
                    <th className='p-0 w-50px'></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className='fw-bold'>Members</td>
                    <td className='text-end'>{plan.max_members}</td>
                  </tr>
                  <tr>
                    <td className='fw-bold'>Price per member</td>
                    <td className='text-end'>${plan.price_per_member}</td>
                  </tr>
                  <tr>
                    <td className='fw-bold'>Launch Fee</td>
                    <td className='text-end'>${Math.round(annualPrice * (plan.launch_percentage / 100))}</td>
                  </tr>
                  <tr>
                    <td className='fw-bold'>Transaction Fee</td>
                    <td className='text-end'>{plan.transaction_fee}%</td>
                  </tr>
                  <tr>
                    <td className='fw-bold'>Technical Support</td>
                    <td className='text-end'>{getOption(plan,1)?.value}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {plan.contact_type === 1 && (
              <a
                href='#'
                className='btn btn-sm btn-primary'
                onClick={(e) => {
                  e.preventDefault()
                  selectPlan(plan)
                }}
              >
                Select
              </a>
            )}
            {plan.contact_type === 2 && (
              <a
                href='#'
                className='btn btn-sm btn-primary'
                onClick={(e) => {
                  e.preventDefault()
                  selectPlan(plan)
                }}
              >
                Contact Sales
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export {PlanCard}
