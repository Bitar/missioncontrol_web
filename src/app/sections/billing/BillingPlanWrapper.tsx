import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import clsx from 'clsx'
import {getOption, Plan} from '../../models/billing/Plan'
import {PlanCard} from './PlanCard'
import {KTCardBody} from '../../helpers/components'
import {PlanOption} from '../../models/billing/PlanOption'
import {getBillingPlanOptions} from '../misc/core/_requests'
import {updateData} from '../../helpers/form/FormHelper'
import {useCommunityForm} from '../community/core/CommunityFormContext'

type Props = {
  plans: Plan[] | undefined
  setPlan: Dispatch<SetStateAction<Plan | undefined>>
}

const BillingPlan: FC<Props> = ({plans, setPlan}) => {
  const {communityForm, setCommunityForm} = useCommunityForm()

  const selectPlan = (plan: Plan) => {
    setPlan(plan)
  }

  return (
    <>
      <KTCardBody className='p-lg-17'>
        <div className='d-flex flex-column'>
          <div className='mb-13 text-center'>
            <h1 className='fs-2hx fw-bolder mb-5'>Choose Your Tier</h1>
            <div className='text-gray-400 fw-bold fs-5'>
              Pick the plan that suits your community's needs. Each plan includes a recurring software fee, a one-time launch fee, and a transaction fee on any paid activities that your community hosts
            </div>
          </div>

          <div className='nav-group nav-group-outline mx-auto mb-15' data-kt-buttons='true'>
            <button
              type={'button'}
              className={clsx(
                'btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2',
                {active: communityForm?.payment_term === 1}
              )}
              onClick={() => {
                updateData(
                  {
                    payment_term: 1,
                  },
                  setCommunityForm,
                  communityForm
                )
              }}
              data-kt-plan='month'>
              Monthly
            </button>
            <button
              type={'button'}
              className={clsx(
                'btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2',
                {active: communityForm?.payment_term === 2}
              )}
              onClick={() => {
                updateData(
                  {
                    payment_term: 2,
                  },
                  setCommunityForm,
                  communityForm
                )
              }}
              data-kt-plan='annual'>
              Annual
            </button>
          </div>

          <div className='row g-10 mb-7'>
            {plans?.map((plan: Plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selectPlan={setPlan}
                communityForm={communityForm}
              />
            ))}
          </div>
        </div>
      </KTCardBody>
    </>
  )
}

const BillingPlanWrapper: FC = () => {
  const {communityForm, setCommunityForm, plans} = useCommunityForm()
  const [plan, setPlan] = useState<Plan | undefined>()
  const [planOptions, setPlanOptions] = useState<PlanOption[] | undefined>()

  useEffect(() => {
    getBillingPlanOptions().then((response) => {
      setPlanOptions(response?.data)
    })
  }, [])

  useEffect(() => {
    updateData({plan_id: plan?.id}, setCommunityForm, communityForm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan])

  return (
    <>
      <div className='w-100'>
        <BillingPlan setPlan={setPlan} plans={plans} />

        <KTCardBody>
          <div className='text-center mw-650px mx-auto'>
            <h1 className='display-6'>Tier Features</h1>
          </div>
          <div className='table-responsive mt-20'>
            <table className='table table-rounded table-striped align-middle gy-7'>
              <thead>
                <tr className='fw-semibold fs-6 text-gray-800 border-bottom border-gray-200'>
                  <th className='p-0 min-w-130px'></th>
                  {plans?.map((plan) => (
                    <th
                      key={`plan-table-header-${plan?.id}`}
                      className='fs-4 fw-bolder text-center'>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='ps-5 fs-4 mw-150px'>Members</td>
                  {plans?.map((plan) => (
                    <td key={`plan-table-body-${plan?.id}`} className='text-center'>
                      {plan.max_members.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className='ps-5 fs-4 mw-150px'>Transaction Fee</td>
                  {plans?.map((plan) => (
                    <td key={`plan-table-body-${plan?.id}`} className='text-center'>
                      {plan.transaction_fee}%
                    </td>
                  ))}
                </tr>
                {planOptions
                  ?.filter((planOption) => planOption.category_id !== 8)
                  .map((planOption) => (
                    <tr key={`plan-option-${planOption?.id}`}>
                      <td className='ps-5 fs-4 mw-150px'>{planOption.label ?? planOption.name}</td>
                      {plans?.map((plan) => (
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
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </KTCardBody>

        <KTCardBody>
          <div className='text-center mw-650px mx-auto'>
            <h1 className='display-6'>Launch Features</h1>
          </div>
          <div className='table-responsive mt-20'>
            <table className='table table-rounded table-striped align-middle gy-7'>
              <thead>
                <tr className='fw-semibold fs-6 text-gray-800 border-bottom border-gray-200'>
                  <th className='p-0 min-w-130px'></th>
                  {plans?.map((plan) => (
                    <th
                      key={`plan-table-header-${plan?.id}`}
                      className='fs-4 fw-bolder text-center'>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planOptions
                  ?.filter((planOption) => planOption.category_id === 8)
                  .map((planOption) => (
                    <tr key={`plan-option-${planOption?.id}`}>
                      <td className='ps-5 fs-4 mw-150px'>{planOption.label ?? planOption.name}</td>
                      {plans?.map((plan) => (
                        <td key={`plan-table-body-${plan?.id}`} className='text-center'>
                          {planOption?.is_boolean ? (
                            getOption(plan, planOption?.id)?.value === 'true' ? (
                              <i className='fs-2 fa fa-check-circle text-success'></i>
                            ) : (
                              '-'
                            )
                          ) : (
                            <span className='fw-bold'>
                              {planOption.id === 11
                                ? getOption(plan, planOption?.id)?.value
                                  ? getOption(plan, planOption?.id)?.value + ' days'
                                  : '-'
                                : getOption(plan, planOption?.id)?.value ?? '-'}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </div>
    </>
  )
}

export {BillingPlanWrapper}
