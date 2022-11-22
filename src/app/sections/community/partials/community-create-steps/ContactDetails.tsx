import { ErrorMessage, Field } from "formik";
import React, { FC } from "react";


const ContactDetails: FC = () => {
  return (
    <div className="d-flex flex-column pt-5 w-100">
      <div className="row mb-6">
        <div className="alert alert-info d-flex align-items-center p-5 mb-10">
          <span className="svg-icon svg-icon-2hx svg-icon-info me-3">
            <i className="text-info fas fa-warning"></i>
          </span>

          <div className="d-flex flex-column">
            <span>
              This information is what will be displayed to your community members in case they need
              to contact you.
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
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Phone Number</label>
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
  );
};

export { ContactDetails };
