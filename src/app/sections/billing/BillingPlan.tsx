/* eslint-disable jsx-a11y/anchor-is-valid */
import {PageTitle} from "../../../_metronic/layout/core";
import React, {useState} from "react";
import {KTSVG, toAbsoluteUrl} from "../../../_metronic/helpers";
import clsx from "clsx";

const BillingPlan = () => {
    const [plan, setPlan] = useState(0)
    const [paymentTerms, setPaymentTerms] = useState(1)

    const selectPlan = (planId: number) => {
        setPlan(planId)
        console.log(planId);
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Billing Plan'}</PageTitle>

            <div className="post d-flex flex-column-fluid" id="kt_post">
                <div id="kt_content_container" className="container-xxl">

                    <div className="card" id="kt_pricing">

                        <div className="card-body p-lg-17">

                            <div className="d-flex flex-column">

                                <div className="mb-13 text-center">
                                    <h1 className="fs-2hx fw-bolder mb-5">Choose Your Plan</h1>
                                    <div className="text-gray-400 fw-bold fs-5">If you need more info about our pricing,
                                        please check
                                        <a href="#" className="link-primary fw-bolder ms-1">Pricing Guidelines</a>.
                                    </div>
                                </div>

                                <div className="nav-group nav-group-outline mx-auto mb-15" data-kt-buttons="true">
                                    <button
                                        className={clsx('btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2', {active: paymentTerms === 1})}
                                        onClick={() => {
                                            setPaymentTerms(1)
                                        }}
                                        data-kt-plan="month">Monthly
                                    </button>
                                    <button
                                        className={clsx('btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2', {active: paymentTerms === 2})}
                                        onClick={() => {
                                            setPaymentTerms(2)
                                        }}
                                        data-kt-plan="annual">Annual
                                    </button>
                                </div>

                                <div className="row g-10 mb-7">

                                    <div className="col-xl-4">
                                        <div className="d-flex h-100 align-items-center">

                                            <div
                                                className="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">

                                                <div className="mb-7 text-center">

                                                    <h1 className="text-dark mb-5 fw-boldest">Basic</h1>

                                                    <div className="text-gray-400 fw-bold mb-5">Optimal for 10+ team size
                                                        <br/>and new startup
                                                    </div>

                                                    <div className="text-center">
                                                        <span className="mb-2 text-primary">$</span>
                                                        <span className="fs-3x fw-bolder text-primary">0</span>
                                                        <span className="fs-7 fw-bold opacity-50">/
																	<span data-kt-element="period">Mon</span></span>
                                                    </div>

                                                </div>
                                                <div className="w-100 mb-10">

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Up to 30 Registrations</span>
                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Transaction Cost 30%</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Technical Support</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Launch</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen040.svg')}
                                                            className='svg-icon-1'
                                                        />
                                                    </div>

                                                </div>

                                                <a href="#" className="btn btn-sm btn-primary" onClick={(e) => {
                                                    e.preventDefault()
                                                    selectPlan(1)
                                                }}>Select</a>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="d-flex h-100 align-items-center">

                                            <div
                                                className="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">

                                                <div className="mb-7 text-center">

                                                    <h1 className="text-dark mb-5 fw-boldest">Pro</h1>

                                                    <div className="text-gray-400 fw-bold mb-5">Optimal for 100+ team
                                                        size
                                                        <br/>and grown company
                                                    </div>

                                                    <div className="text-center">
                                                        <span className="mb-2 text-primary">$</span>
                                                        {paymentTerms === 1 ? (
                                                            <span>
                                                                <span className="fs-3x fw-bolder text-primary">200</span>
                                                                <span className="fs-7 fw-bold opacity-50">/{" "}<span data-kt-element="period">Mon</span></span>
                                                            </span>
                                                        ) : (
                                                            <span>
                                                            <span className="fs-3x fw-bolder text-primary">2400</span>
                                                                <span className="fs-7 fw-bold opacity-50">/{" "}<span data-kt-element="period">Yr</span></span>
                                                            </span>
                                                        )}
                                                    </div>

                                                </div>

                                                <div className="w-100 mb-10">

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Up to 100 Registrations</span>
                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Transaction Cost 30%</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Chat Support</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Launch</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-warning'
                                                        />
                                                    </div>

                                                </div>
                                                <a href="#" className="btn btn-sm btn-primary" onClick={(e) => {
                                                    e.preventDefault()
                                                    selectPlan(2)
                                                }}>Select</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="d-flex h-100 align-items-center">

                                            <div
                                                className="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">

                                                <div className="mb-7 text-center">

                                                    <h1 className="text-dark mb-5 fw-boldest">Business</h1>

                                                    <div className="text-gray-400 fw-bold mb-5">Optimal for 500+ team
                                                        size
                                                        <br/>and grown company
                                                    </div>

                                                    <div className="text-center">
                                                        <span className="mb-2 text-primary">$</span>
                                                        {paymentTerms === 1 ? (
                                                            <span>
                                                                <span className="fs-3x fw-bolder text-primary">500</span>
                                                                <span className="fs-7 fw-bold opacity-50">/{" "}<span data-kt-element="period">Mon</span></span>
                                                            </span>
                                                        ) : (
                                                            <span>
                                                            <span className="fs-3x fw-bolder text-primary">6000</span>
                                                                <span className="fs-7 fw-bold opacity-50">/{" "}<span data-kt-element="period">Yr</span></span>
                                                            </span>
                                                        )}
                                                    </div>

                                                </div>

                                                <div className="w-100 mb-10">

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Up to 250 Registrations</span>
                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Transaction Cost 15%</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Dedicated Support</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                    <div className="d-flex align-items-center mb-5">
                                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Launch</span>

                                                        <KTSVG
                                                            path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                            className='svg-icon-1 svg-icon-success'
                                                        />
                                                    </div>

                                                </div>
                                                <a href="#" className="btn btn-sm btn-primary" onClick={(e) => {
                                                    e.preventDefault()
                                                    selectPlan(2)
                                                }}>Select</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row g-100">

                                    <div className="col-xl-12">
                                        <div className="d-flex h-100 align-items-center">
                                            <div
                                                className="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">
                                                <div className="mb-7 text-center">

                                                    <h1 className="text-dark mb-5 fw-boldest">Enterprise</h1>

                                                    <div className="text-gray-400 fw-bold mb-5">Optimal for 1000+ team and enterprise
                                                    </div>
                                                </div>
                                                <div className="w-100 mb-10">
                                                    <div className="w-100 mb-10">

                                                        <div className="d-flex align-items-center mb-5">
                                                            <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Unlimited Registrations</span>
                                                            <KTSVG
                                                                path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                                className='svg-icon-1 svg-icon-success'
                                                            />
                                                        </div>

                                                        <div className="d-flex align-items-center mb-5">
                                                            <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Transaction Cost 10%</span>

                                                            <KTSVG
                                                                path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                                className='svg-icon-1 svg-icon-success'
                                                            />
                                                        </div>

                                                        <div className="d-flex align-items-center mb-5">
                                                            <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Permium Support</span>

                                                            <KTSVG
                                                                path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                                className='svg-icon-1 svg-icon-success'
                                                            />
                                                        </div>

                                                        <div className="d-flex align-items-center mb-5">
                                                            <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Launch</span>

                                                            <KTSVG
                                                                path={toAbsoluteUrl('/media/icons/duotune/general/gen043.svg')}
                                                                className='svg-icon-1 svg-icon-success'
                                                            />
                                                        </div>

                                                    </div>

                                                </div>
                                                <a href="#" className="btn btn-sm btn-primary" onClick={(e) => {
                                                    e.preventDefault()
                                                    selectPlan(4)
                                                }}>Contact Sales</a>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export {BillingPlan}