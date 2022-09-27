/* eslint-disable jsx-a11y/anchor-is-valid */
import { CheckoutModalProvider, useCheckoutModal } from "./core/CheckoutModal";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import { CheckOutWrapper } from "./CheckOutWrapper";
import { getPlans } from "./plan/core/_requests";
import { getOption, Plan } from "../../models/billing/Plan";
import { PlanCard } from "./PlanCard";
import { useAuth } from "../../modules/auth";
import { useNavigate } from "react-router-dom";
import { KTCard } from "../../helpers/components/KTCard";
import { KTCardBody } from "../../helpers/components/KTCardBody";
import { PlanOption } from "../../models/billing/PlanOption";
import { getBillingPlanOptions } from "../misc/core/_requests";

type Props = {
  plan: Plan | undefined
  plans: Plan[] | undefined
  setPlan: Dispatch<SetStateAction<Plan | undefined>>
}


const BillingPlan: FC<Props> = ({ plan, plans, setPlan }) => {
  const { showCheckout, setShowCheckout } = useCheckoutModal();
  const [paymentTerms, setPaymentTerms] = useState(1);


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
      <KTCardBody className="p-lg-17">
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

        {showCheckout && plan !== undefined && <CheckOutWrapper plan={plan} paymentTerms={paymentTerms} />}
      </KTCardBody>

    </>
  );
};

const BillingPlanWrapper = () => {
  const { subscription } = useAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan | undefined>();
  const [plans, setPlans] = useState<Plan[] | undefined>();
  const [planOptions, setPlanOptions] = useState<PlanOption[] | undefined>();

  useEffect(() => {
    getPlans().then((response) => {
      setPlans(response?.data);
    });

    getBillingPlanOptions().then((response) => {
      setPlanOptions(response?.data);
    });
  }, []);

  if (subscription) {
    navigate("/");
  }

  return (
    <>
      <KTCard>
        <CheckoutModalProvider>
          <BillingPlan plan={plan} setPlan={setPlan} plans={plans} />
        </CheckoutModalProvider>

        <KTCardBody>
          <div className="text-center mw-650px mx-auto">
            <h1 className="display-6">Features</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam animi
              aperiam aut, dolorem doloremque ducimus earum ex incidunt ipsum labore, nisi officiis
              perspiciatis quibusdam, quidem quos ratione repellat sit? Architecto assumenda aut,
              dolorem doloremque enim excepturi harum ipsa, quae quisquam quo quos ratione
              reprehenderit, voluptates. Consequatur qui quos tempora.
            </p>
          </div>
          <div className="table-responsive mt-20">
            <table className="table table-rounded table-striped align-middle gy-7">
              <thead>
              <tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
                <th className="p-0 min-w-130px"></th>
                {plans?.map((plan) => (
                  <th key={`plan-table-header-${plan?.id}`} className="fs-4 fw-bolder text-center">
                    {plan.name}
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {planOptions?.map((planOption) => (
                <tr key={`plan-option-${planOption?.id}`}>
                  <td className="ps-5 fs-4 mw-150px">{planOption.label ?? planOption.name}</td>
                  {plans?.map((plan) => (
                    <td key={`plan-table-body-${plan?.id}`} className="text-center">
                      {planOption?.is_boolean ? (
                        getOption(plan, planOption?.id)?.value === "true" ? (
                          <i className="fs-2 fa fa-check-circle text-success"></i>
                        ) : (
                          "-"
                        )
                      ) : (
                        <span className="fw-bold">{getOption(plan, planOption?.id)?.value ?? "-"}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export { BillingPlanWrapper };
