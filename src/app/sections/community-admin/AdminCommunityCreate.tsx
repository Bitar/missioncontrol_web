import { Form, Formik, FormikValues } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { StepperComponent } from "../../../_metronic/assets/ts/components";
import {
  communityCreateWizardSchema,
  CommunityFormType, formOnChange,
  initialCommunityFormTypeByCommunity
} from "../community/models/Community";
import { KTSVG } from "../../helpers/components/KTSVG";
import { GeneralDetails } from "../community/partials/community-create-steps/GeneralDetails";
import { KTCardBody } from "../../../_metronic/helpers";
import { KTCardHeader } from "../../helpers/components/KTCardHeader";
import { ContactDetails } from "../community/partials/community-create-steps/ContactDetails";
import { AddressDetails } from "../community/partials/community-create-steps/AddressDetails";
import { AccessDetail } from "../community/partials/community-create-steps/AccessDetail";
import { BillingPlanWrapper } from "../billing/BillingPlanWrapper";

const AdminCommunityCreate = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const stepper = useRef<StepperComponent | null>(null);
  const [currentSchema, setCurrentSchema] = useState(communityCreateWizardSchema[0]);
  const [communityForm, setCommunityForm] = useState<CommunityFormType>(
    initialCommunityFormTypeByCommunity
  );
  const [isSubmitButton, setSubmitButton] = useState(false);

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement);
  };

  const prevStep = () => {
    if (!stepper.current) {
      return;
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber! - 1);

    stepper.current.goPrev();

    setCurrentSchema(communityCreateWizardSchema[stepper.current.currentStepIndex - 1]);
  };

  const submitStep = (values: CommunityFormType, actions: FormikValues) => {
    if (!stepper.current) {
      return;
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber! - 1);

    setCurrentSchema(communityCreateWizardSchema[stepper.current.currentStepIndex]);

    if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
      stepper.current.goNext();
    } else {
      stepper.current.goto(1);
      actions.resetForm();
    }
  };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

  const handleOnChange = (e: any) => formOnChange(e, communityForm, setCommunityForm);

  return (
    <div className="card">
      {/*<div className="card-body">*/}
      <KTCardHeader text={"Create Community"} bg="mc-secondary" text_color="white" />
      <div ref={stepperRef} className="stepper stepper-links d-flex flex-column">
        <KTCardBody className="border-bottom">
          <div className="stepper-nav">
            <div className="stepper-item current" data-kt-stepper-element="nav">
              <div className="stepper-label">
                <div className="stepper-icon">
                  <KTSVG path="/media/icons/duotune/abs021.svg" className="svg-icon-3x" />
                </div>
                <h3 className="stepper-title">Basic Details</h3>
              </div>
              <div className="stepper-arrow">
                <KTSVG path="/media/icons/duotune/arr064.svg" className="svg-icon-2x" />
              </div>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <div className="stepper-label">
                <div className="stepper-icon">
                  <i className="fa-duotone fa-phone-arrow-down-left fs-3x"></i>
                  {/*<i className="fas fa-phone fs-3x"></i>*/}
                </div>
                <h3 className="stepper-title">External Contact</h3>
              </div>
              <div className="stepper-arrow">
                <KTSVG path="/media/icons/duotune/arr064.svg" className="svg-icon-2x" />
              </div>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <div className="stepper-label">
                <div className="stepper-icon">
                  <i className="fa-duotone fa-location-dot fs-3x"></i>
                  {/*<i className="fas fa-map-marker fs-3x"></i>*/}
                </div>
                <h3 className="stepper-title">Address</h3>
              </div>
              <div className="stepper-arrow">
                <KTSVG path="/media/icons/duotune/arr064.svg" className="svg-icon-2x" />
              </div>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <div className="stepper-label">
                <div className="stepper-icon">
                  <i className="fa-duotone fa-key fs-3x"></i>
                </div>
                <h3 className="stepper-title">Access</h3>
              </div>
              <div className="stepper-arrow">
                <KTSVG path="/media/icons/duotune/arr064.svg" className="svg-icon-2x" />
              </div>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <div className="stepper-label">
                <div className="stepper-icon">
                  <i className="fa-duotone fa-dollar-sign fs-3x"></i>
                </div>
                <h3 className="stepper-title">Payment</h3>
              </div>
              <div className="stepper-arrow">
                <KTSVG path="/media/icons/duotune/arr064.svg" className="svg-icon-2x" />
              </div>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <div className="stepper-label">
                <div className="stepper-icon">
                  <i className="fa-duotone fa-check-double fs-3x"></i>
                </div>
                <h3 className="stepper-title">Review</h3>
              </div>
            </div>
          </div>
        </KTCardBody>

        <KTCardBody>
          <Formik
            validationSchema={currentSchema}
            initialValues={communityForm}
            onSubmit={submitStep}
          >
            {() => (
              <Form className="mx-auto mw-100"
                    onChange={handleOnChange}
              >
                <div className="current" data-kt-stepper-element="content">
                  <GeneralDetails
                    communityForm={communityForm}
                    setCommunityForm={setCommunityForm}
                  />
                </div>

                <div data-kt-stepper-element="content">
                  <ContactDetails
                    communityForm={communityForm}
                    setCommunityForm={setCommunityForm}
                  />
                </div>

                <div data-kt-stepper-element="content">
                  <AddressDetails
                    communityForm={communityForm}
                    setCommunityForm={setCommunityForm}
                  />
                </div>

                <div data-kt-stepper-element="content">
                  <AccessDetail communityForm={communityForm} setCommunityForm={setCommunityForm} />
                </div>

                <div data-kt-stepper-element="content">
                  <BillingPlanWrapper />
                </div>

                <div data-kt-stepper-element="content">Step 5</div>

                <div className="d-flex flex-stack pt-15">
                  <div className="mr-2">
                    <button
                      onClick={prevStep}
                      type="button"
                      className="btn btn-lg btn-light-mc-secondary me-3"
                      data-kt-stepper-action="previous"
                    >
                      Back
                    </button>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-lg btn-mc-secondary me-3">
                      <span className="indicator-label">
                        {!isSubmitButton && "Continue"}
                        {isSubmitButton && "Submit"}
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </KTCardBody>
      </div>
      {/*</div>*/}
    </div>
  );
};

export { AdminCommunityCreate };
