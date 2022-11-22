import { useCommunityForm } from "../../core/CommunityFormContext";
import { KTCardHeader } from "../../../../helpers/components/KTCardHeader";
import { Form, Formik } from "formik";
import { communitySchema } from "../../models/Community";
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
import { updateAdminCommunity, updateCommunity } from "../../core/CommunityRequests";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCommunity } from "../../CommunityContext";

export const SubscriptionDetail = () => {
  const { communityForm, setCommunityForm } = useCommunityForm();
  const { currentUser } = useAuth();
  const { community, setCommunity } = useCommunity();
  const [plans, setPlans] = useState<Plan[] | undefined>();
  const params = useParams();

  useEffect(() => {
    getPlans().then((response) => {
      console.log(response?.data);
      setPlans(response?.data);
    });
  }, []);

  const handleSubmit = async () => {
    let data = jsonToFormData(communityForm);
    data.append("_method", "PUT");

    if (params?.communityId) {
      await updateCommunity(params.communityId, data).then((response) => {
        toast.success("Community Subscription Updated Successfully");
        setCommunity(response);
      });
    }
  };

  return (
    <KTCard border={true}>
      <KTCardHeader text={"Subscription"} bg="mc-primary" text_color="white" />
      <Formik
        validationSchema={communitySchema}
        initialValues={communityForm!}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="form" autoComplete="off">
            <KTCardBody className="py-4">
              <div className="d-flex flex-column pt-5">
                <div className="row mb-6">
                  <div className="col-12">
                    <span>
                      Current Plan: {community?.subscription?.plan?.name}
                    </span>
                  </div>
                </div>

                {currentUser && isSuperAdmin(currentUser) &&
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">Subscription</label>
                    <div className="col-lg-8 fv-row">
                      <Select
                        placeholder={"Choose a Plan"}
                        options={plans}
                        defaultValue={community?.subscription?.plan}
                        getOptionLabel={(plan) => plan?.name}
                        getOptionValue={(plan) => plan?.id?.toString() || ""}
                        onChange={(e) => {
                          updateData(
                            {
                              subscription_id: e?.id
                            },
                            setCommunityForm,
                            communityForm
                          );
                        }}
                      />
                    </div>
                  </div>
                }
              </div>
            </KTCardBody>
            <FormAction text={"Update Subscription"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};