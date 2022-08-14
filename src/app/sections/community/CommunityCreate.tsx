import { KTCard, KTCardBody } from "../../../_metronic/helpers";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Community, communitySchema, initialCommunity } from "../../models/community/Community";
import { createCommunity } from "./core/_requests";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCountries, getStates } from "../misc/core/_requests";
import { selectCustomStyles } from "../activities/core/_consts";
import Select from "react-select";
import { jsonToFormData, updateData } from "../../helpers/form/FormHelper";
import { LogoImage } from "./partials/LogoImage";
import { BannerImage } from "./partials/BannerImage";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const stateSelect: any[] = [];
const countrySelect: any[] = [];

const CommunityCreate = () => {
  const [community, setCommunity] = useState<Community>(initialCommunity);
  const navigate = useNavigate();

  useEffect(() => {
    getStates().then(response => {
      response?.data?.forEach(function(value) {
        stateSelect.push({ value: value.id, label: value.name, code: value.code });
      });
    });

    getCountries().then(response => {
      response?.data?.forEach(function(value) {
        countrySelect.push({ value: value.id, label: value.name, code: value.code });
      });
    });
  }, []);

  const handleSubmit = async () => {
    let data = jsonToFormData(community);
    await createCommunity(data)
      .then(response => navigate("/communities/" + response?.id));
  };

  const handleOnChange = (event: any) => {
    let targetName = event.target.name;
    let targetValue = event.target.value;

    if (targetName.includes("address.")) {
      let address_field = targetName.split("address.")[1];

      updateData({
        "address": { ...community.address, ...{ [address_field]: targetValue } }
      }, setCommunity, community);
    } else if (targetName.includes("contact.")) {
      let contact_field = targetName.split("contact.")[1];

      updateData({
        "contact": { ...community.contact, ...{ [contact_field]: targetValue } }
      }, setCommunity, community);
    } else if (targetName.includes("access.")) {
      let access_field = targetName.split("access.")[1];
      if (access_field === "type" || access_field === "key") {
        targetValue = +targetValue;
      }

      if (access_field === "type" && targetValue === 1) {
        updateData({
          "access": { type: targetValue }
        }, setCommunity, community);
      } else {
        let updateStuff = { [access_field]: targetValue }

        if(access_field !== 'value') {
          updateStuff = {...updateStuff, ...{value: ""}}
        }

        updateData({
          "access": { ...community.access, ...updateStuff }
        }, setCommunity, community);
      }
    } else {
      if (targetName === "logo" || targetName === "banner_image") {
        targetValue = event.target.files[0];
      } else {
        targetValue = event.target.value;
      }

      updateData({ [targetName]: targetValue }, setCommunity, community);
    }
  };

  return (
    <>
      <KTCard>

        <div className="card-header">
          <div className="card-title">
            <span className="card-icon">
              <i className="las la-plus fs-2" />
            </span>
            <h3 className="card-label">
              Add Community
            </h3>
          </div>
        </div>
        <Formik initialValues={community} onSubmit={handleSubmit}
                validationSchema={communitySchema}>
          {
            ({ isSubmitting, isValid, touched }) => (
              <Form onChange={handleOnChange} className="form">
                <KTCardBody className="py-4">
                  <div className="d-flex flex-column pt-5">
                    <div className="row mb-6">

                      <label className="col-lg-4 col-form-label required fw-bold fs-6">Images</label>

                      <div className="col-lg-8">
                        <div className="row">
                          <LogoImage community={community} setCommunity={setCommunity} />

                          <BannerImage community={community} setCommunity={setCommunity} />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
                      <div className="col-lg-8 fv-row">
                        <Field
                          type="text"
                          name="name"
                          placeholder="Community Name"
                          className="form-control mb-3 mb-lg-0"
                          autoComplete="off"
                          disabled={isSubmitting}
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
                          rows={3}
                        />
                        <div className="text-danger mt-2">
                          <ErrorMessage name="description" />
                        </div>
                      </div>
                    </div>

                    <div className="separator separator-dashed my-6"></div>

                    <div className="row mb-6">
                      <div className="col-12">
                        <h4 className="text-dark">Contact Info:</h4>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
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
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
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
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">Phone
                                                                                  Number</label>
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

                    <div className="separator separator-dashed my-6"></div>

                    <div className="row mb-6">
                      <div className="col-12">
                        <h4 className="text-dark">Address:</h4>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">Address
                                                                                  One</label>
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
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">Address
                                                                                  Two</label>
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
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">City</label>
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
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">State</label>
                      <div className="col-lg-8 fv-row">
                        <Select
                          className="basic-select"
                          isClearable={true}
                          isSearchable={true}
                          menuPlacement={"top"}
                          name="address.state_province"
                          onChange={(inputValue) => {
                            updateData({
                              "address": { ...community.address, ...{ state_province: inputValue.code } }
                            }, setCommunity, community);
                          }}
                          options={stateSelect}
                          styles={selectCustomStyles}
                        />
                        <div className="text-danger mt-2">
                          <ErrorMessage name="address.state_province" />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">Postal
                                                                                  Code</label>
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

                    <div className="row mb-6">
                      <div className="col-12">
                        <h4 className="text-dark">Access:</h4>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label
                        className="col-lg-4 col-form-label required fw-bold fs-6">Visibility</label>
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
                                  checked={community?.access?.type === 1}
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
                                  <span className="fs-7 text-muted">
                                    Only certain people
                                  </span>
                                </span>
                              </span>

                              <span className="form-check form-check-custom form-check-solid">
                                <Field
                                  className="form-check-input"
                                  type="radio"
                                  name="access.type"
                                  value={2}
                                  checked={community?.access?.type === 2}
                                />
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {community?.access?.type === 2 &&
                      <div className="row mb-6">
                        <label
                          className="col-lg-4 col-form-label required fw-bold fs-6">Entry Access</label>
                        <div className="col-lg-8 fv-row">
                          <div className="row">
                            <div className="col-lg-6">
                              <label className="d-flex flex-stack cursor-pointer mb-5">
                                <span className="d-flex align-items-center me-2">
                                  <span className="symbol symbol-50px me-6">
                                    <span className="symbol-label bg-light-mc-primary">
                                      <i className="fab fa-html5 text-warning fs-2x"></i>
                                      <FontAwesomeIcon icon={faEnvelope} className="text-mc-secondary fs-2x" />
                                    </span>
                                  </span>

                                  <span className="d-flex flex-column">
                                    <span className="fw-bolder fs-6">Email</span>

                                    <span className="fs-7 text-muted">Based on email's domain '@example.com'</span>
                                  </span>
                                </span>

                                <span className="form-check form-check-custom form-check-solid">
                                  <Field
                                    className="form-check-input"
                                    type="radio"
                                    name="access.key"
                                    value={1}
                                    checked={community?.access?.key === 1}
                                  />
                                </span>
                              </label>
                            </div>
                            <div className="col-lg-6">
                              <label className="d-flex flex-stack cursor-pointer mb-5">
                                <span className="d-flex align-items-center me-2">
                                  <span className="symbol symbol-50px me-6">
                                    <span className="symbol-label bg-light-mc-primary">
                                      <i className="fab fa-react text-success fs-2x"></i>
                                      <FontAwesomeIcon icon={faKey} className="text-mc-secondary fs-2x" />
                                    </span>
                                  </span>

                                  <span className="d-flex flex-column">
                                    <span className="fw-bolder fs-6">Passcode</span>
                                    <span className="fs-7 text-muted">
                                      Good ol' fashion password
                                    </span>
                                  </span>
                                </span>

                                <span className="form-check form-check-custom form-check-solid">
                                  <Field
                                    className="form-check-input"
                                    type="radio"
                                    name="access.key"
                                    value={2}
                                    checked={community?.access?.key === 2}
                                  />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    {community?.access?.key === 1 &&
                      <div className="row mb-6">
                        <label
                          className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
                        <div className="col-lg-8 fv-row">
                          <Field
                            type="text"
                            name="access.value"
                            className="form-control mb-3 mb-lg-0"
                            placeholder="Email Address"
                            value={community?.access?.type === 2 && community?.access?.key === 1 ? community?.access?.value : ""}
                          />
                          <div className="text-danger mt-2">
                            <ErrorMessage name="access.value" />
                          </div>
                        </div>
                      </div>
                    }

                    {community?.access?.key === 2 &&
                      <div className="row mb-6">
                        <label
                          className="col-lg-4 col-form-label required fw-bold fs-6">Passcode</label>
                        <div className="col-lg-8 fv-row">
                          <Field
                            type="password"
                            name="access.value"
                            className="form-control mb-3 mb-lg-0"
                            placeholder="Passcode"
                            value={community?.access?.type === 2 && community?.access?.key === 2 ? community?.access?.value : ""}
                          />
                          <div className="text-danger mt-2">
                            <ErrorMessage name="access.value" />
                          </div>
                        </div>
                      </div>
                    }

                  </div>
                </KTCardBody>
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                  <button
                    type="submit"
                    className="btn btn-light-primary btn-active-primary btn-sm"
                    data-kt-users-modal-action="submit"
                    disabled={isSubmitting || !isValid || !touched}
                  >
                    <span className="indicator-label">Add Community</span>
                    {(isSubmitting) && (
                      <span className="indicator-progress">
                        Please wait...{" "}
                        <span
                          className="spinner-border spinner-border-sm align-middle ms-2" />
                      </span>
                    )}
                  </button>
                </div>
              </Form>
            )
          }
        </Formik>

      </KTCard>
    </>
  );
};

export { CommunityCreate };