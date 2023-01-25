/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {Plan} from '../../models/billing/Plan'
import {CommunityFormType} from '../community/models/Community'

type Props = {
  plan: Plan
  selectPlan: any
  communityForm: CommunityFormType | undefined
}

const PlanCard: FC<React.PropsWithChildren<Props>> = ({plan, selectPlan, communityForm}) => {
  const annualPrice = plan.price_per_member * plan.max_members * 12
  const monthlyPrice = plan.price_per_member * plan.max_members * 1.1

  return (
    <>
      <div className='col-xl-3'>
        <div className={clsx('plan-card', {active: communityForm?.plan_id === plan?.id})}>
          <div className='h-100 w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-10 px-5'>
            <div className='mb-7 text-center'>
              <h1 className='text-dark mb-5 fw-boldest'>{plan.name}</h1>

              <div className='text-gray-400 fw-bold mb-5'>{plan.description}</div>

              {plan.contact_type === 1 && (
                <div className='text-center'>
                  <span className='mb-2 text-mc-secondary'>USD </span>
                  {communityForm?.payment_term === 1 && (
                    <span>
                      <span className='fs-3x fw-bolder text-mc-secondary'>
                        {monthlyPrice.toLocaleString()}
                      </span>
                      <span className='fs-7 fw-bold opacity-50'>
                        / <span data-kt-element='period'>month</span>
                      </span>
                    </span>
                  )}
                  {communityForm?.payment_term === 2 && (
                    <span>
                      <span className='fs-3x fw-bolder text-mc-secondary'>
                        {annualPrice.toLocaleString()}
                      </span>
                      <span className='fs-7 fw-bold opacity-50'>
                        / <span data-kt-element='period'>year</span>
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
                  <tbody className='fs-4'>
                    <tr>
                      <td className='fw-bold'>Members</td>
                      <td className='text-end'>
                        {plan.max_members.toLocaleString()}
                        {plan.contact_type === 2 && '+'}
                      </td>
                    </tr>
                    {plan.contact_type === 1 && (
                      <>
                        <tr>
                          <td className='fw-bold'>Price per member</td>
                          <td className='text-end'>
                            ${plan.price_per_member.toFixed(2).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Launch Fee</td>
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
                      <td className='fw-bold'>Transaction Fee</td>
                      <td className='text-end'>{plan.transaction_fee}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </>
  )
}

export {PlanCard}
