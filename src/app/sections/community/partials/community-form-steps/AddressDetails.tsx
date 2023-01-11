import { communitySchema } from "../../models/Community";
import React, { FC, useEffect, useState } from "react";
import { useCommunity } from "../../CommunityContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { KTCard, KTCardBody, KTCardHeader } from "../../../../helpers/components";
import { useParams } from "react-router-dom";
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import { updateAdminCommunity, updateCommunity } from "../../core/CommunityRequests";
import toast from "react-hot-toast";
import { FormAction } from "../../../../helpers/form/FormAction";
import { getStates } from "../../../misc/core/_requests";
import { State } from "../../../../models/misc/State";
import Select from "react-select";
import { useCommunityForm } from "../../core/CommunityFormContext";

const AddressDetails: FC = () => {
  const { communityForm, setCommunityForm } = useCommunityForm();
  const { community, setCommunity } = useCommunity();
  const params = useParams();
  const [states, setStates] = useState<State[]>();

  useEffect(() => {
    getStates().then((response) => {
      setStates(response.data);
    });
  }, []);

  const handleSubmit = async () => {
    let data = jsonToFormData(communityForm);
    data.append("_method", "PUT");

    if (params?.communityId) {
      await updateCommunity(params.communityId, data).then((response) => {
        toast.success("Community Address Updated Successfully");
        setCommunity(response);
      });
    } else {
      await updateAdminCommunity(data).then((response) => {
        toast.success("Community Address Updated Successfully");
        setCommunity(response);
      });
    }
  };

  const handleOnChange = (e: any) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;

    let address_field = targetName.split("address.")[1];

    if (address_field) {
      updateData(
        {
          address: { ...communityForm?.address, ...{ [address_field]: targetValue } }
        },
        setCommunityForm,
        communityForm
      );
    }
  };

  return (
    <KTCard border={true}>
      <KTCardHeader text={"Address Info"} bg="mc-primary" text_color="white" />
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
                    Address One
                  </label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="address.address_one"
                      placeholder="ex: 420 Broadway"
                      className="form-control mb-3 mb-lg-0"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="address.address_one" />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Address Two</label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="address.address_two"
                      className="form-control mb-3 mb-lg-0"
                      placeholder="ex: Unit 134"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="address.address_two" />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">City</label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="address.city"
                      className="form-control mb-3 mb-lg-0"
                      placeholder="ex: Boston"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="address.city" />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">State</label>
                  <div className="col-lg-8 fv-row">
                    <Select
                      name="address.state"
                      placeholder={"Choose a State"}
                      options={states}
                      defaultValue={community?.address?.state}
                      getOptionLabel={(state) => state?.name}
                      getOptionValue={(state) => state?.id?.toString() || ""}
                      onChange={(e) => {
                        updateData(
                          {
                            address: { ...communityForm?.address, ...{ state: e?.id } }
                          },
                          setCommunityForm,
                          communityForm
                        );
                      }}
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="address.state" />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Postal Code
                  </label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="address.postal_code"
                      className="form-control mb-3 mb-lg-0"
                      placeholder="ex: 95125"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="address.postal_code" />
                    </div>
                  </div>
                </div>
              </div>
            </KTCardBody>
            <FormAction text={"Update Contact"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};

export { AddressDetails };
