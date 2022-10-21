import React, { FC, useState } from "react";
import { CommunityFormType, initialCommunityFormTypeByCommunity } from "../models/Community";
import { ID, KTCard, KTCardBody, QUERIES } from "../../../../_metronic/helpers";
import { useCommunity } from "../CommunityContext";
import { KTCardHeader } from "../../../helpers/components/KTCardHeader";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { GeneralDetail } from "../partials/community-form-steps/GeneralDetail";
import { ContactDetails } from "../partials/community-form-steps/ContactDetails";
import { AddressDetails } from "../partials/community-form-steps/AddressDetails";
import { AccessDetail } from "../partials/community-form-steps/AccessDetail";
import {
  communityPermissionSchema,
  PermissionDetails
} from "../partials/community-form-steps/permission/PermissionDetails";
import { SuspenseView } from "../../../layout/SuspenseView";
import { QueryRequestProvider } from "../../../modules/table/QueryRequestProvider";
import { QueryResponseProvider } from "../../../modules/table/QueryResponseProvider";
import { getCommunityPermissions } from "../core/CommunityPermissionRequests";
import { ListViewProvider } from "../../../modules/table/ListViewProvider";
import { PermissionDetailTableWrapper } from "../partials/community-form-steps/permission/PermissionDetailTable";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormErrorAlert } from "../../../modules/errors/partials/FormErrorAlert";
import { SwitchInput } from "../../../components/SwitchInput/SwitchInput";
import { FormAction } from "../../../helpers/form/FormAction";

type Props = {
  communityId?: ID
}

const CommunitySettings: FC<Props> = () => {
  const { community } = useCommunity();
  const [communityForm, setCommunityForm] = useState<CommunityFormType>(
    initialCommunityFormTypeByCommunity(community)
  );

  const settingsNav = [
    {
      title: "Details",
      description: "Basic Details",
      icon: "fas fa-file"
    },
    {
      title: "Contact",
      description: "Who shall we speak to",
      icon: "fas fa-phone"
    },
    {
      title: "Address",
      description: "Where art thou?",
      icon: "fas fa-map-marker"
    },
    {
      title: "Access",
      description: "You can do what again?",
      icon: "fas fa-key"
    },
    {
      title: "Permissions",
      description: "Let's add people",
      icon: "fas fa-users"
    }
  ];

  return (
    <>
      <KTCard>
        <KTCardHeader text={'Settings'} className='bg-mc-secondary' text_color='white'/>
        <KTCardBody>
          <Tab.Container defaultActiveKey="settingsNav-0">
            <div className="row">
              <div className="col-lg-4 col-xl-3">
                <Nav variant="pills" className="flex-column settings-nav">
                  {settingsNav.map((settings, index) => (
                    <Nav.Item key={`settings-nav-${index}`} className="mb-5">
                      <Nav.Link className="settings-nav-item" eventKey={`settingsNav-${index}`}>
                        <div className="settings-nav-icon w-45px h-45px bg-transparent">
                          <i className={`${settings.icon} fs-2x text-mc-secondary`}></i>
                        </div>
                        <div className="settings-nav-label">
                          <span className="settings-nav-title">{settings.title}</span>
                          <span className="settings-nav-desc">{settings.description}</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
              <div className="col-lg-8 col-xl-9">
                <Tab.Content>
                  <Tab.Pane eventKey="settingsNav-0">
                    <GeneralDetail communityForm={communityForm} setCommunityForm={setCommunityForm}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settingsNav-1">
                    <ContactDetails communityForm={communityForm} setCommunityForm={setCommunityForm}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settingsNav-2">
                    <AddressDetails communityForm={communityForm} setCommunityForm={setCommunityForm}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settingsNav-3">
                    <AccessDetail communityForm={communityForm} setCommunityForm={setCommunityForm}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settingsNav-4">
                    <SuspenseView>
                      {community && (
                        <QueryRequestProvider>
                          <QueryResponseProvider
                            id={QUERIES.COMMUNITIES_PERMISSIONS_LIST}
                            requestFunction={getCommunityPermissions}
                            requestId={community?.id}
                          >
                            <ListViewProvider>
                              <PermissionDetails/>
                            </ListViewProvider>
                          </QueryResponseProvider>
                        </QueryRequestProvider>
                      )}
                    </SuspenseView>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>
        </KTCardBody>
      </KTCard>
      
      {/*<KTCard>*/}
      {/*  <div className="card-header bg-mc-secondary">*/}
      {/*    <div className="card-title">*/}
      {/*      <h3 className="card-label text-white">Update Community</h3>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <Formik*/}
      {/*    initialValues={communityForm}*/}
      {/*    onSubmit={handleSubmit}*/}
      {/*    validationSchema={communitySchema}*/}
      {/*    enableReinitialize*/}
      {/*  >*/}
      {/*    {({ isSubmitting, isValid, touched }) => (*/}
      {/*      <Form onChange={handleOnChange} className="form">*/}
      {/*        <KTCardBody className="py-4">*/}
      {/*          <div className="d-flex flex-column pt-5">*/}
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label fw-bold fs-6">Images</label>*/}
      
      {/*              <div className="col-lg-8">*/}
      {/*                <div className="row">*/}
      {/*                  <LogoImage community={communityForm} setCommunity={setCommunityForm} />*/}
      
      {/*                  <BannerImage community={communityForm} setCommunity={setCommunityForm} />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  type="text"*/}
      {/*                  name="name"*/}
      {/*                  placeholder="Community Name"*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                  autoComplete="off"*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="name" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label fw-bold fs-6">Description</label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  as="textarea"*/}
      {/*                  name="description"*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                  placeholder="Community Description"*/}
      {/*                  autoComplete="off"*/}
      {/*                  rows={3}*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="description" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="separator separator-dashed my-6"></div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <div className="col-12">*/}
      {/*                <h4 className="text-dark">Contact Info:</h4>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  autoComplete="off"*/}
      {/*                  type="text"*/}
      {/*                  name="contact.name"*/}
      {/*                  placeholder="Contact Name"*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="contact.name" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  autoComplete="off"*/}
      {/*                  type="text"*/}
      {/*                  name="contact.email"*/}
      {/*                  placeholder="Contact Email"*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="contact.email" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">*/}
      {/*                Phone Number*/}
      {/*              </label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  autoComplete="off"*/}
      {/*                  type="text"*/}
      {/*                  name="contact.phone_number"*/}
      {/*                  placeholder="Phone Number..."*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="contact.phone_number" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="separator separator-dashed my-6"></div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <div className="col-12">*/}
      {/*                <h4 className="text-dark">Address:</h4>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">*/}
      {/*                Address One*/}
      {/*              </label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  autoComplete="off"*/}
      {/*                  type="text"*/}
      {/*                  name="address.address_one"*/}
      {/*                  placeholder="ex: 420 Broadway"*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="address.address_one" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label fw-bold fs-6">Address Two</label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  autoComplete="off"*/}
      {/*                  type="text"*/}
      {/*                  name="address.address_two"*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                  placeholder="ex: Unit 134"*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="address.address_two" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">City</label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  autoComplete="off"*/}
      {/*                  type="text"*/}
      {/*                  name="address.city"*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                  placeholder="ex: Boston"*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="address.city" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">State</label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Select*/}
      {/*                  name="address.state_id"*/}
      {/*                  placeholder={"Choose a State"}*/}
      {/*                  value={states?.filter((state) => state.id === (Number.isInteger(communityForm?.address?.state_id) ? communityForm?.address?.state_id : parseInt(communityForm?.address?.state_id + "")))[0]}*/}
      {/*                  options={states}*/}
      {/*                  getOptionLabel={(state) => state?.name}*/}
      {/*                  getOptionValue={(state) => state?.id?.toString() || ""}*/}
      {/*                  onChange={(e) => {*/}
      {/*                    updateData({*/}
      {/*                      address: {*/}
      {/*                        ...communityForm?.address,*/}
      {/*                        ...{*/}
      {/*                          state_id: e?.id*/}
      {/*                        }*/}
      {/*                      }*/}
      {/*                    }, setCommunityForm, communityForm);*/}
      {/*                  }}*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="address.state_id" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">*/}
      {/*                Postal Code*/}
      {/*              </label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <Field*/}
      {/*                  type="text"*/}
      {/*                  name="address.postal_code"*/}
      {/*                  className="form-control mb-3 mb-lg-0"*/}
      {/*                  placeholder="ex: 95125"*/}
      {/*                />*/}
      {/*                <div className="text-danger mt-2">*/}
      {/*                  <ErrorMessage name="address.postal_code" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <div className="col-12">*/}
      {/*                <h4 className="text-dark">Access:</h4>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            <div className="row mb-6">*/}
      {/*              <label className="col-lg-4 col-form-label required fw-bold fs-6">*/}
      {/*                Visibility*/}
      {/*              </label>*/}
      {/*              <div className="col-lg-8 fv-row">*/}
      {/*                <div className="row">*/}
      {/*                  <div className="col-lg-6">*/}
      {/*                    <label className="d-flex flex-stack cursor-pointer mb-5">*/}
      {/*                      <span className="d-flex align-items-center me-2">*/}
      {/*                        <span className="symbol symbol-50px me-6">*/}
      {/*                          <span className="symbol-label bg-light-warning">*/}
      {/*                            <i className="fab fa-html5 text-warning fs-2x"></i>*/}
      {/*                          </span>*/}
      {/*                        </span>*/}
      
      {/*                        <span className="d-flex flex-column">*/}
      {/*                          <span className="fw-bolder fs-6">Public</span>*/}
      
      {/*                          <span className="fs-7 text-muted">Anyone can join</span>*/}
      {/*                        </span>*/}
      {/*                      </span>*/}
      
      {/*                      <span className="form-check form-check-custom form-check-solid">*/}
      {/*                        <Field*/}
      {/*                          className="form-check-input"*/}
      {/*                          type="radio"*/}
      {/*                          name="access.type"*/}
      {/*                          value={1}*/}
      {/*                          checked={communityForm?.access?.type === 1}*/}
      {/*                        />*/}
      {/*                      </span>*/}
      {/*                    </label>*/}
      {/*                  </div>*/}
      {/*                  <div className="col-lg-6">*/}
      {/*                    <label className="d-flex flex-stack cursor-pointer mb-5">*/}
      {/*                      <span className="d-flex align-items-center me-2">*/}
      {/*                        <span className="symbol symbol-50px me-6">*/}
      {/*                          <span className="symbol-label bg-light-success">*/}
      {/*                            <i className="fab fa-react text-success fs-2x"></i>*/}
      {/*                          </span>*/}
      {/*                        </span>*/}
      
      {/*                        <span className="d-flex flex-column">*/}
      {/*                          <span className="fw-bolder fs-6">Private</span>*/}
      {/*                          <span className="fs-7 text-muted">Only certain people</span>*/}
      {/*                        </span>*/}
      {/*                      </span>*/}
      
      {/*                      <span className="form-check form-check-custom form-check-solid">*/}
      {/*                        <Field*/}
      {/*                          className="form-check-input"*/}
      {/*                          type="radio"*/}
      {/*                          name="access.type"*/}
      {/*                          value={2}*/}
      {/*                          checked={communityForm?.access?.type === 2}*/}
      {/*                        />*/}
      {/*                      </span>*/}
      {/*                    </label>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      
      {/*            {communityForm?.access?.type === 2 && (*/}
      {/*              <div className="row mb-6">*/}
      {/*                <label className="col-lg-4 col-form-label required fw-bold fs-6">*/}
      {/*                  Entry Access*/}
      {/*                </label>*/}
      {/*                <div className="col-lg-8 fv-row">*/}
      {/*                  <div className="row">*/}
      {/*                    <div className="col-lg-6">*/}
      {/*                      <label className="d-flex flex-stack mb-5">*/}
      {/*                        <span className="d-flex align-items-center me-2">*/}
      {/*                          <span className="symbol symbol-50px me-6">*/}
      {/*                            <span className="symbol-label bg-mc-primary">*/}
      {/*                              <i className="fa fa-key text-mc-secondary fs-3"></i>*/}
      {/*                              <i className="fa fs-3"></i>*/}
      {/*                            </span>*/}
      {/*                          </span>*/}
      
      {/*                          <span className="d-flex flex-column">*/}
      {/*                            <span className="fw-bolder fs-6">Passcode</span>*/}
      {/*                            <span className="fs-7 text-muted">Good ol' fashion password</span>*/}
      {/*                          </span>*/}
      {/*                        </span>*/}
      {/*                      </label>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            )}*/}
      
      {/*            {communityForm?.access?.key === 2 && (*/}
      {/*              <div className="row mb-6">*/}
      {/*                <label className="col-lg-4 col-form-label required fw-bold fs-6">*/}
      {/*                  Passcode*/}
      {/*                </label>*/}
      {/*                <div className="col-lg-8 fv-row">*/}
      {/*                  <Field*/}
      {/*                    type="password"*/}
      {/*                    name="access.value"*/}
      {/*                    className="form-control mb-3 mb-lg-0"*/}
      {/*                    placeholder="Passcode"*/}
      {/*                  />*/}
      {/*                  <div className="text-danger mt-2">*/}
      {/*                    <ErrorMessage name="access.value" />*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            )}*/}
      {/*          </div>*/}
      {/*        </KTCardBody>*/}
      {/*        <div className="card-footer d-flex justify-content-end py-6 px-9">*/}
      {/*          <button*/}
      {/*            type="submit"*/}
      {/*            className="btn btn-light-mc-secondary btn-active-mc-secondary btn-sm"*/}
      {/*            data-kt-users-modal-action="submit"*/}
      {/*            disabled={isSubmitting || !isValid || !touched}*/}
      {/*          >*/}
      {/*            <span className="indicator-label">Save Changes</span>*/}
      {/*            {isSubmitting && (*/}
      {/*              <span className="indicator-progress" style={{ display: "inline-block" }}>*/}
      {/*                <span className="spinner-border spinner-border-sm align-middle ms-2" />*/}
      {/*              </span>*/}
      {/*            )}*/}
      {/*          </button>*/}
      {/*        </div>*/}
      {/*      </Form>*/}
      {/*    )}*/}
      {/*  </Formik>*/}
      {/*</KTCard>*/}
    </>
  );
};

export { CommunitySettings };
