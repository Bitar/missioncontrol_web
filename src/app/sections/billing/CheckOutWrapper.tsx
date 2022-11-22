import React, { FC, useEffect } from "react";
import { subscriptionRequest } from "./core/BillingRequests";
import { Plan } from "../../models/billing/Plan";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth";

type Props = {
  plan: Plan
  paymentTerms: number
}

const CheckOutWrapper: FC<React.PropsWithChildren<Props>> = ({ plan, paymentTerms }) => {
  const navigate = useNavigate();
  const { updateAuth } = useAuth();

  useEffect(() => {
    subscriptionRequest(plan, paymentTerms).then((response) => {
      if (plan.id === 1) {
        toast.success("Commissioner subscription added successfully");
        updateAuth();
        navigate("/admin/communities/create");
      } else {
        if (response?.url) {
          window.location.href = response?.url;
        }
      }
    });
  }, [paymentTerms, plan]);

  return <></>;
};

export { CheckOutWrapper };
