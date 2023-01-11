import { communitySchema } from "../../models/Community";
import React, { FC } from "react";
import { useCommunity } from "../../CommunityContext";
import { useParams } from "react-router-dom";
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import { updateAdminCommunity, updateCommunity } from "../../core/CommunityRequests";
import toast from "react-hot-toast";
import { KTCard, KTCardHeader, KTCardBody } from "../../../../helpers/components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormAction } from "../../../../helpers/form/FormAction";
import { useCommunityForm } from "../../core/CommunityFormContext";

const AccessDetail: FC = () => {
  const { communityForm, setCommunityForm } = useCommunityForm();
  const { setCommunity } = useCommunity();
  const params = useParams();

  const handleSubmit = async () => {
    let data = jsonToFormData(communityForm);
    data.append("_method", "PUT");

    if (params?.communityId) {
      await updateCommunity(params.communityId, data).then((response) => {
        toast.success("Community Access Updated Successfully");
        setCommunity(response);
      });
    } else {
      await updateAdminCommunity(data).then((response) => {
        toast.success("Community Access Updated Successfully");
        setCommunity(response);
      });
    }
  };

  const handleOnChange = (e: any) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;

    let accessField = targetName.split("access.")[1];

    if (accessField === "type" || accessField === "key") {
      targetValue = +targetValue;
    }

    if (accessField === "type" && targetValue === 1) {
      updateData(
        {
          access: { type: targetValue, key: 0, value: "" }
        },
        setCommunityForm,
        communityForm
      );
    } else {
      let updateStuff;
      if (accessField !== "value") {
        updateStuff = { type: 2, key: 2, value: "" };
      } else {
        updateStuff = { type: 2, key: 2, value: targetValue };
      }

      updateData(
        {
          access: { ...communityForm?.access, ...updateStuff }
        },
        setCommunityForm,
        communityForm
      );
    }
  };

  return (
    <KTCard border={true}>
      <KTCardHeader text={"Access Details"} bg="mc-primary" text_color="white" />
      <Formik
        validationSchema={communitySchema}
        initialValues={communityForm!}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form onChange={handleOnChange} className="form" autoComplete="off">
            <KTCardBody className="py-4">
              <div className="d-flex flex-column pt-5">
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Visibility
                  </label>
                  <div className="col-lg-8 fv-row">
                    <div className="row">
                      <div className="col-lg-6">
                        <label className="d-flex flex-stack cursor-pointer mb-5">
                          <span className="d-flex align-items-center me-2">
                            <span className="symbol symbol-50px me-6">
                              <span className="symbol-label bg-light-warning">
                                <i className="fab fa-html5 text-warning fs-2x"></i>
                              </span>
                            </span>

                            <span className="d-flex flex-column">
                              <span className="fw-bolder fs-6">Public</span>

                              <span className="fs-7 text-muted">Anyone can join</span>
                            </span>
                          </span>

                          <span className="form-check form-check-custom form-check-solid">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="access.type"
                              value={1}
                              checked={communityForm?.access?.type === 1}
                            />
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-6">
                        <label className="d-flex flex-stack cursor-pointer mb-5">
                          <span className="d-flex align-items-center me-2">
                            <span className="symbol symbol-50px me-6">
                              <span className="symbol-label bg-light-success">
                                <i className="fab fa-react text-success fs-2x"></i>
                              </span>
                            </span>

                            <span className="d-flex flex-column">
                              <span className="fw-bolder fs-6">Private</span>
                              <span className="fs-7 text-muted">Only certain people</span>
                            </span>
                          </span>

                          <span className="form-check form-check-custom form-check-solid">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="access.type"
                              value={2}
                              checked={communityForm?.access?.type === 2}
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {communityForm?.access?.type === 2 && (
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      Entry Access
                    </label>
                    <div className="col-lg-8 fv-row">
                      <div className="row">
                        <div className="col-lg-6">
                          <label className="d-flex flex-stack mb-5">
                            <span className="d-flex align-items-center me-2">
                              <span className="symbol symbol-50px me-6">
                                <span className="symbol-label bg-mc-primary">
                                  <i className="fa fa-key text-mc-secondary fs-3"></i>
                                  <i className="fa fs-3"></i>
                                </span>
                              </span>

                              <span className="d-flex flex-column">
                                <span className="fw-bolder fs-6">Passcode</span>
                                <span className="fs-7 text-muted">Good ol' fashion password</span>
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {communityForm?.access?.key === 2 && (
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      Passcode
                    </label>
                    <div className="col-lg-8 fv-row">
                      <Field
                        type="password"
                        name="access.value"
                        className="form-control mb-3 mb-lg-0"
                        placeholder="Passcode"
                      />
                      <div className="text-danger mt-2">
                        <ErrorMessage name="access.value" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </KTCardBody>
            <FormAction text={"Update Access"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};

export { AccessDetail };
