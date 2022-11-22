import { KTCardHeader } from "../../../../helpers/components/KTCardHeader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { communitySchema } from "../../models/Community";
import { KTCardBody } from "../../../../helpers/components/KTCardBody";
import { KTCard } from "../../../../helpers/components/KTCard";
import React, { FC } from "react";
import { useCommunity } from "../../CommunityContext";
import { useParams } from "react-router-dom";
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import { updateAdminCommunity, updateCommunity } from "../../core/CommunityRequests";
import toast from "react-hot-toast";
import { FormAction } from "../../../../helpers/form/FormAction";
import { useCommunityForm } from "../../core/CommunityFormContext";

const ContactDetails: FC = () => {
  const { communityForm, setCommunityForm } = useCommunityForm();
  const { setCommunity } = useCommunity();
  const params = useParams();

  const handleSubmit = async () => {
    let data = jsonToFormData(communityForm);
    data.append("_method", "PUT");

    if (params?.communityId) {
      await updateCommunity(params.communityId, data).then((response) => {
        toast.success("Community Contact Updated Successfully");
        setCommunity(response);
      });
    } else {
      await updateAdminCommunity(data).then((response) => {
        toast.success("Community Contact Updated Successfully");
        setCommunity(response);
      });
    }
  };

  const handleOnChange = (e: any) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;

    let contact_field = targetName.split("contact.")[1];

    updateData(
      {
        contact: { ...communityForm?.contact, ...{ [contact_field]: targetValue } }
      },
      setCommunityForm,
      communityForm
    );
  };
  return (
    <KTCard border={true}>
      <KTCardHeader text={"External Contact"} bg="mc-primary" text_color="white" />
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
                  <div className="alert alert-info d-flex align-items-center p-5 mb-10">
                    <span className="svg-icon svg-icon-2hx svg-icon-info me-3">
                      <i className="text-info fas fa-warning"></i>
                    </span>

                    <div className="d-flex flex-column">
                      <span>
                        This information is what will be displayed to your community members in case
                        they need to contact you.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="contact.name"
                      placeholder="Contact Name"
                      className="form-control mb-3 mb-lg-0"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="contact.name" />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="contact.email"
                      placeholder="Contact Email"
                      className="form-control mb-3 mb-lg-0"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="contact.email" />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Phone Number
                  </label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="contact.phone_number"
                      placeholder="Phone Number..."
                      className="form-control mb-3 mb-lg-0"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="contact.phone_number" />
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

export { ContactDetails };
