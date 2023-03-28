import React, { FC } from "react";
import { ErrorMessage, Field } from "formik";
import { useCommunityForm } from "../../core/CommunityFormContext";
import { ImageCrop } from "../../components/ImageCrop";

const GeneralDetails: FC = () => {
  const { communityForm, setCommunityForm } = useCommunityForm();

  return (
    <div className="d-flex flex-column pt-5 w-100">
      <div className="row mb-6">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Logo</label>
        <div className="col-lg-8 fv-row">
          <ImageCrop
            isSquare={true}
            model={communityForm}
            setModel={setCommunityForm}
            ratio={1}
            name="logo"
          />
          <div className="text-muted fw-semibold">Recommended Image Size: Square</div>
          <div className="text-danger mt-2">
            <ErrorMessage name="logo" />
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
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Description</label>
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

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Banner Image</label>
        <div className="col-lg-6 fv-row">
          <ImageCrop
            aspectRatioClass={"ratio ratio-1-91x1"}
            model={communityForm}
            setModel={setCommunityForm}
            ratio={1.91}
            name="banner_image"
          />
          <div className="text-muted fw-semibold">
            Recommended Image Ratio: 1.91:1 (1900px x 1000px)
          </div>
          <div className="text-danger mt-2">
            <ErrorMessage name="banner_image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { GeneralDetails };
