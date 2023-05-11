import React, {FC, useMemo} from 'react'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {useCommunityForm} from '../../core/CommunityFormContext'
import {getOption} from '../../../../models/billing/Plan'
import {Field} from 'formik'

export const ReviewDetails: FC = () => {
  const {communityForm, states, plans} = useCommunityForm()

  const plan = useMemo(
    () => plans?.filter((plan) => plan?.id === communityForm?.plan_id)[0],
    [communityForm?.plan_id, plans]
  )

  const annualPrice = useMemo(() => plan?.price_per_member! * plan?.max_members! * 12, [plan])
  const monthlyPrice = useMemo(() => plan?.price_per_member! * plan?.max_members! * 1.1, [plan])

  return (
    <div className='w-100'>
      <div className='row'>
        <div className='col-md-6'>
          <KTCard shadow={false}>
            <KTCardHeader text={'Community Overview'} bg={'mc-primary'} text_color={'white'} />
            <KTCardBody>
              <div className='row mb-5'>
                <label className='col-lg-4 fw-bolder text-dark fs-5'>General Details</label>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>Name</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>{communityForm?.name}</span>
                </div>
              </div>

              {communityForm?.description && (
                <div className='row mb-5'>
                  <label className='col-lg-4 fw-bold text-muted'>Description</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{communityForm.description}</span>
                  </div>
                </div>
              )}

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bolder text-dark fs-5'>Contact</label>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>Name</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>{communityForm?.contact?.name}</span>
                </div>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>Email</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>{communityForm?.contact?.email}</span>
                </div>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>Phone Number</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {communityForm?.contact?.phone_number}
                  </span>
                </div>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bolder text-dark fs-5'>Address</label>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>Address One</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {communityForm?.address?.address_one}
                  </span>
                </div>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>Address Two</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {communityForm?.address?.address_two}
                  </span>
                </div>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>City</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>{communityForm?.address?.city}</span>
                </div>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>State</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {
                      states?.filter((state) => state?.id === communityForm?.address?.state)[0]
                        ?.name
                    }
                  </span>
                </div>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>Postal Code / Zipcode</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {communityForm?.address?.postal_code}
                  </span>
                </div>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bolder text-dark fs-5'>Address</label>
              </div>

              <div className='row mb-5'>
                <label className='col-lg-4 fw-bold text-muted'>Visibility</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {communityForm?.access?.type === 1 ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
            </KTCardBody>
          </KTCard>
        </div>
        <div className='col-md-6'>
          {plan && (
            <KTCard shadow={false}>
              <KTCardHeader text={'Billing Summary'} bg={'mc-primary'} text_color={'white'} />
              <KTCardBody>
                <div className='plan-card'>
                  <div className='h-100 w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-10 px-5'>
                    <div className='mb-7 text-center'>
                      <h1 className='text-dark mb-5 fw-boldest'>{plan?.name}</h1>

                      <div className='text-gray-400 fw-bold mb-5'>{plan?.description}</div>

                      {plan?.contact_type === 1 && (
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
                                {plan?.max_members.toLocaleString()}
                                {plan?.contact_type === 2 && '+'}
                              </td>
                            </tr>
                            {plan?.contact_type === 1 && (
                              <>
                                <tr>
                                  <td className='fw-bold'>Price per member</td>
                                  <td className='text-end'>
                                    ${plan?.price_per_member.toFixed(2).toLocaleString()}
                                  </td>
                                </tr>
                                <tr>
                                  <td className='fw-bold'>Launch Fee</td>
                                  <td className='text-end'>
                                    $
                                    {Math.round(
                                      annualPrice * (plan?.launch_percentage! / 100)
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              </>
                            )}
                            <tr>
                              <td className='fw-bold'>Transaction Fee</td>
                              <td className='text-end'>{plan?.transaction_fee}%</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Business Reviews</td>
                              <td className='text-end'>{getOption(plan!, 1)?.value}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </KTCardBody>
            </KTCard>
          )}
          {communityForm?.plan_id && communityForm?.plan_id !== 1 && (
            <KTCard shadow={false}>
              <KTCardHeader text={'Payment Method'} bg={'mc-primary'} text_color={'white'} />
              <KTCardBody>
                {communityForm?.plan_id < 4 && (
                  <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap mb-2'>
                    <label className='cursor-pointer d-flex w-100 p-6 flex-stack'>
                      <div className='d-flex flex-column py-2'>
                        <div className='d-flex align-items-center fs-4 fw-bold'>
                          Credit Card
                          <i
                            className='ms-2 fas fa-credit-card'
                            style={{
                              color: '#110055',
                              fontSize: '2rem',
                            }}></i>
                          <i
                            className='ms-2 fab fa-cc-visa'
                            style={{
                              color: '#110055',
                              fontSize: '2rem',
                            }}></i>
                          <i
                            className='ms-2 fab fa-cc-mastercard'
                            style={{
                              color: '#110055',
                              fontSize: '2rem',
                            }}></i>
                        </div>
                      </div>

                      <div className='d-flex align-items-center py-2'>
                        <Field
                          className='form-check-input'
                          type='radio'
                          name='payment_method'
                          value={1}
                          checked={communityForm?.payment_method === '1'}
                        />
                      </div>
                    </label>
                  </div>
                )}
                <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap'>
                  <label className='cursor-pointer d-flex w-100 p-6 flex-stack'>
                    <div className='d-flex flex-column py-2'>
                      <div className='d-flex align-items-center fs-4 fw-bold'>Contact Sales</div>
                    </div>

                    <div className='d-flex align-items-center py-2'>
                      <Field
                        className='form-check-input'
                        type='radio'
                        name='payment_method'
                        value={2}
                        checked={communityForm?.payment_method === '2'}
                      />
                    </div>
                  </label>
                </div>
              </KTCardBody>
            </KTCard>
          )}
        </div>
      </div>
    </div>
  )
}
