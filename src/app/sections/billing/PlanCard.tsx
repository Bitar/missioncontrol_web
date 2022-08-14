/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import React, {FC} from 'react'
import {Plan} from '../../models/billing/Plan'

type Props = {
  plan: Plan
  selectPlan: any
  paymentTerms: number
}

const PlanCard: FC<Props> = ({plan, selectPlan, paymentTerms}) => {
  return (
    <>
      <div className={plan.type === 1 ? 'col-xl-4' : 'col-xl-12'}>
        <div className='d-flex h-100 align-items-center'>
          <div className='w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10'>
            <div className='mb-7 text-center'>
              <h1 className='text-dark mb-5 fw-boldest'>{plan.name}</h1>

              <div className='text-gray-400 fw-bold mb-5'>{plan.description}</div>

              {plan.type === 1 && (
                <div className='text-center'>
                  <span className='mb-2 text-primary'>$</span>
                  {paymentTerms === 1 && (
                    <span>
                      <span className='fs-3x fw-bolder text-primary'>{plan.price.toFixed(2)}</span>
                      <span className='fs-7 fw-bold opacity-50'>
                        /<span data-kt-element='period'>Mon</span>
                      </span>
                    </span>
                  )}
                  {paymentTerms === 2 && (
                    <span>
                      <span className='fs-3x fw-bolder text-primary'>
                        {(plan.price * 12).toFixed(2)}
                      </span>
                      <span className='fs-7 fw-bold opacity-50'>
                        /<span data-kt-element='period'>Yr</span>
                      </span>
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className='w-100 mb-10'>
              <div className='d-flex align-items-center mb-5'>
                <span className='fw-bold fs-6 text-gray-800 flex-grow-1 pe-3'>
                  Up to 30 Registrations
                </span>
                <KTSVG
                  path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                  className='svg-icon-1 svg-icon-success'
                />
              </div>

              <div className='d-flex align-items-center mb-5'>
                <span className='fw-bold fs-6 text-gray-800 flex-grow-1 pe-3'>
                  Transaction Cost 30%
                </span>

                <KTSVG
                  path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                  className='svg-icon-1 svg-icon-success'
                />
              </div>

              <div className='d-flex align-items-center mb-5'>
                <span className='fw-bold fs-6 text-gray-800 flex-grow-1 pe-3'>
                  Technical Support
                </span>

                <KTSVG
                  path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                  className='svg-icon-1 svg-icon-success'
                />
              </div>

              <div className='d-flex align-items-center mb-5'>
                <span className='fw-bold fs-6 text-gray-800 flex-grow-1 pe-3'>Launch</span>

                <KTSVG
                  path={toAbsoluteUrl('/media/icons/duotune/general/gen040.svg')}
                  className='svg-icon-1'
                />
              </div>
            </div>

            {plan.type === 1 && (
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
            {plan.type === 2 && (
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
