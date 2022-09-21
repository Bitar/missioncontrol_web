/* eslint-disable jsx-a11y/anchor-is-valid */
import { CheckoutModalProvider, useCheckoutModal } from "./core/CheckoutModal";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { CheckOutWrapper } from "./CheckOutWrapper";
import { getPlans } from "./plan/core/_requests";
import { Plan } from "../../models/billing/Plan";
import { PlanCard } from "./PlanCard";
import { useAuth } from "../../modules/auth";
import { useNavigate } from "react-router-dom";

const BillingPlan = () => {
  const { showCheckout, setShowCheckout } = useCheckoutModal();
  const [paymentTerms, setPaymentTerms] = useState(1);
  const [plan, setPlan] = useState<Plan | undefined>();
  const [plans, setPlans] = useState<Plan[] | undefined>();

  useEffect(() => {
    getPlans().then((response) => {
      setPlans(response?.data);
    });
  }, []);

  const selectPlan = (plan: Plan) => {
    setPlan(plan);
    if (plan.contact_type === 1) {
      setShowCheckout(true);
    } else {
      // Navigate to Contact Sales Page and set stuff in DB.
    }
  };

  return (
    <>
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="card" id="kt_pricing">
            <div className="card-body p-lg-17">
              <div className="d-flex flex-column">
                <div className="mb-13 text-center">
                  <h1 className="fs-2hx fw-bolder mb-5">Choose Your Plan</h1>
                  <div className="text-gray-400 fw-bold fs-5">
                    If you need more info about our pricing, please check
                    <a href="#" className="link-primary fw-bolder ms-1">
                      Pricing Guidelines
                    </a>
                    .
                  </div>
                </div>

                <div className="nav-group nav-group-outline mx-auto mb-15" data-kt-buttons="true">
                  <button
                    className={clsx(
                      "btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2",
                      { active: paymentTerms === 1 }
                    )}
                    onClick={() => {
                      setPaymentTerms(1);
                    }}
                    data-kt-plan="month"
                  >
                    Monthly
                  </button>
                  <button
                    className={clsx(
                      "btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2",
                      { active: paymentTerms === 2 }
                    )}
                    onClick={() => {
                      setPaymentTerms(2);
                    }}
                    data-kt-plan="annual"
                  >
                    Annual
                  </button>
                </div>

                <div className="row g-10 mb-7">
                  {plans?.map((plan: Plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      selectPlan={selectPlan}
                      paymentTerms={paymentTerms}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && plan !== undefined && <CheckOutWrapper plan={plan} />}
    </>
  );
};

const BillingPlanWrapper = () => {
  const { subscription } = useAuth();
  const navigate = useNavigate();

  if (subscription) {
    navigate("/");
  }

  return (
    <>
      <CheckoutModalProvider>
        <BillingPlan />
      </CheckoutModalProvider>
    </>
  );
};

export { BillingPlanWrapper };
