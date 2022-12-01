import React, { FC } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { communitySchema } from "../../models/Community";
import { useCommunity } from "../../CommunityContext";
import { KTCard } from "../../../../helpers/components/KTCard";
import { KTCardBody } from "../../../../helpers/components/KTCardBody";
import { KTCardHeader } from "../../../../helpers/components/KTCardHeader";
import { LogoImage } from "../LogoImage";
import { BannerImage } from "../BannerImage";
import { FormAction } from "../../../../helpers/form/FormAction";
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import { updateAdminCommunity, updateCommunity } from "../../core/CommunityRequests";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCommunityForm } from "../../core/CommunityFormContext";
import { useAuth } from "../../../../modules/auth";
import { isSuperAdmin } from "../../../identity/user/models/User";
import { SwitchInput } from "../../../../components/SwitchInput/SwitchInput";
import Select from "react-select";

const GeneralDetail: FC = () => {
  const { communityForm, setCommunityForm } = useCommunityForm();
  const { currentUser } = useAuth();
  const { setCommunity } = useCommunity();
  const params = useParams();

  const handleSubmit = async () => {
    let data = jsonToFormData(communityForm);
    data.append("_method", "PUT");

    if (params?.communityId) {
      await updateCommunity(params.communityId, data).then((response) => {
        toast.success("Community Updated Successfully");
        setCommunity(response);
      });
    } else {
      await updateAdminCommunity(data).then((response) => {
        toast.success("Community Updated Successfully");
        setCommunity(response);
      });
    }
  };
  const handleOnChange = (e: any) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;

    if (targetName === "is_featured") {
      updateData({ is_featured: !communityForm?.is_featured }, setCommunityForm, communityForm);
    } else {
      if (targetName === "logo" || targetName === "banner_image") {
        targetValue = e.target.files[0];
      } else {
        targetValue = e.target.value;
      }
      updateData({ [targetName]: targetValue }, setCommunityForm, communityForm);
    }
  };

  return (
    <KTCard border={true}>
      <KTCardHeader text={"General Details"} bg="mc-primary" text_color="white" />
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
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Images</label>

                  <div className="col-lg-8">
                    <div className="row">
                      <LogoImage community={communityForm} setCommunity={setCommunityForm} />

                      <BannerImage community={communityForm} setCommunity={setCommunityForm} />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Community Name"
                      className="form-control mb-3 mb-lg-0"
                      autoComplete="off"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Description</label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control mb-3 mb-lg-0"
                      placeholder="Community Description"
                      rows={8}
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                </div>

                {currentUser && isSuperAdmin(currentUser) && (
                  <>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Status</label>
                      <div className="col-lg-8 fv-row">
                        <Select
                          name="status"
                          placeholder={"Choose a State"}
                          options={[{ value: "1", label: "Pending" }, { value: "2", label: "Active" }]}
                          onChange={(e) => {
                            updateData(
                              {
                                status: e?.value
                              },
                              setCommunityForm,
                              communityForm
                            );
                          }}
                        />
                        <div className="text-danger mt-2">
                          <ErrorMessage name="status" />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Featured</label>
                      <div className="col-lg-8 fv-row">
                        <SwitchInput
                          name="is_featured"
                          isOn={communityForm?.is_featured}
                          handleToggle={() => {
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </KTCardBody>
            <FormAction text={"Update Community"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};

export { GeneralDetail };
