import { useCommunityForm } from "../../core/CommunityFormContext";
import { KTCardHeader } from "../../../../helpers/components/KTCardHeader";
import { ErrorMessage, Form, Formik } from "formik";
import { KTCardBody } from "../../../../helpers/components/KTCardBody";
import { FormAction } from "../../../../helpers/form/FormAction";
import { KTCard } from "../../../../helpers/components/KTCard";
import React, { useEffect, useState } from "react";
import { isSuperAdmin } from "../../../identity/user/models/User";
import { useAuth } from "../../../../modules/auth";
import Select from "react-select";
import { getPlans } from "../../../billing/plan/core/_requests";
import { Plan } from "../../../../models/billing/Plan";
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import { useParams } from "react-router-dom";
import { useCommunity } from "../../CommunityContext";
import { DatePicker } from "rsuite";
import * as Yup from "yup";
import { updateCommunitySubscription } from "../../core/CommunityRequests";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Timezone from "dayjs/plugin/timezone";
dayjs.extend(utc)
dayjs.extend(Timezone)

type SubscriptionObject = {
  plan_id: string | number | undefined,
  status: string | number | undefined,
  end_date?: string | undefined
}

const subscriptionUpdateSchema = Yup.object().shape({
  plan_id: Yup.string().required("Subscription is required"),
  status: Yup.string().required("Status is required"),
  end_date: Yup.string().required("End Date is required")
});

export const SubscriptionDetail = () => {
  const { communityForm, setCommunityForm } = useCommunityForm();
  const { currentUser } = useAuth();
  const { community, setCommunity, updateCommunity } = useCommunity();
  const [plans, setPlans] = useState<Plan[] | undefined>();
  const params = useParams();
  const [subscriptionForm, setSubscriptionForm] = useState<SubscriptionObject>({
    plan_id: communityForm?.plan_id,
    status: communityForm?.status
  });

  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    if (community?.subscription?.ends_at) {
      setEndDate(
        dayjs(new Date(community?.subscription?.ends_at * 1000))
          .utc(false)
          .toDate()
      );
    }
  }, [community?.subscription?.ends_at])

  useEffect(() => {
    getPlans().then((response) => {
      setPlans(response?.data);
    });
  }, []);

  const handleSubmit = async () => {
    let data = jsonToFormData(subscriptionForm);
    data.append("_method", "PUT");

    if (params?.communityId) {
      await updateCommunitySubscription(params.communityId, data).then((response) => {
        toast.success("Community Subscription Updated Successfully");
        updateCommunity()
      });
    }
  };

  return (
    <KTCard border={true}>
      <KTCardHeader text={"Subscription"} bg="mc-primary" text_color="white" />
      <Formik
        validationSchema={subscriptionUpdateSchema}
        initialValues={subscriptionForm}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="form" autoComplete="off">
            <KTCardBody className="py-4">
              <div className="d-flex flex-column pt-5">
                <div className="row mb-6">
                  <div className="col-12">
                    <p>Current Plan: {community?.subscription?.plan?.name}</p>
                    <p>Payment Status: {community?.subscription?.status === 2 ? (
                      <span className={"badge badge-success"}>Paid</span>
                    ) : (
                      <span className={"badge badge-danger"}>Unpaid</span>
                    )}</p>
                    <p>End Date: {endDate.toDateString()}</p>
                  </div>
                </div>

                {currentUser && isSuperAdmin(currentUser) && (
                  <>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Subscription</label>
                      <div className="col-lg-8 fv-row">
                        <Select
                          placeholder={"Choose a Plan"}
                          name="plan_id"
                          options={plans}
                          defaultValue={community?.subscription?.plan}
                          getOptionLabel={(plan) => plan?.name}
                          getOptionValue={(plan) => plan?.id?.toString() || ""}
                          onChange={(e) => {
                            updateData(
                              {
                                plan_id: e?.id
                              },
                              setSubscriptionForm,
                              subscriptionForm
                            );
                          }}
                        />
                        <div className="text-danger mt-2">
                          <ErrorMessage name="plan_id" />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Payment Status</label>
                      <div className="col-lg-8 fv-row">
                        <Select
                          name="status"
                          placeholder={"Choose a State"}
                          options={[{ value: "2", label: "Paid" }, { value: "7", label: "Unpaid" }]}
                          onChange={(e) => {
                            updateData(
                              {
                                status: e?.value
                              },
                              setSubscriptionForm,
                              subscriptionForm
                            );
                          }}
                        />
                        <div className="text-danger mt-2">
                          <ErrorMessage name="status" />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Ends On</label>
                      <div className="col-lg-8 fv-row">
                        <DatePicker
                          format="MM-dd-yyyy"
                          className="w-100"
                          name="end_date"
                          placeholder="Select End Date"
                          placement={"topStart"}
                          onChange={(value) => {
                            updateData(
                              {
                                end_date: value?.valueOf()
                              },
                              setSubscriptionForm,
                              subscriptionForm
                            );
                            // setTimeValue(value);
                          }}
                        />
                        <div className="text-danger mt-2">
                          <ErrorMessage name="end_date" />
                        </div>
                      </div>
                    </div>

                  </>
                )}
              </div>
            </KTCardBody>
            <FormAction text={"Update Subscription"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};
