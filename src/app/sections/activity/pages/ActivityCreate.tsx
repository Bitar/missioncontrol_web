import { KTCard, KTCardBody, KTCardFooter, KTCardHeader, KTSVG } from "../../../helpers/components";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ActivityFormContext } from "../core/contexts/ActivityFormContext";
import { useActivity } from "../core/contexts/ActivityContext";
import { Form, Formik, FormikValues } from "formik";
import { FormErrorAlert } from "../../../modules/errors/partials/FormErrorAlert";
import { GeneralDetail } from "../partials/activity-create-steps/GeneralDetail";
import { StepperComponent } from "../../../../_metronic/assets/ts/components";
import { activityCreateWizardSchema } from "../core/validation/ActivitySchema";
import { GameDetail } from "../partials/activity-create-steps/GameDetails";
import { updateData } from "../../../helpers/form/FormHelper";
import { ActivityForm, initialActivityForm } from "../models/ActivityForm";

export const ActivityCreate = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const { activity } = useActivity();
  const [activityForm, setActivityForm] = useState<ActivityForm>(
    initialActivityForm()
  );
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const [isSubmitButton, setSubmitButton] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const stepper = useRef<StepperComponent | null>(null);
  const [currentSchema, setCurrentSchema] = useState(activityCreateWizardSchema[0]);

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement);
  };

  const prevStep = () => {
    if (!stepper.current) {
      return;
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber! - 1);

    stepper.current.goPrev();

    setCurrentSchema(activityCreateWizardSchema[stepper.current.currentStepIndex - 1]);
  };

  const submitStep = (values: ActivityForm, actions: FormikValues) => {
    if (!stepper.current) {
      return;
    }

    nextStep(stepper);
  };

  const nextStep = (stepper: any) => {
    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber! - 1);

    setCurrentSchema(activityCreateWizardSchema[stepper.current.currentStepIndex]);

    if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
      stepper.current.goNext();
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

  const handleOnChange = (event: any) => {
    let targetName = event.target.name;
    let targetValue = event.target.value;

    console.log(targetName);

    updateData({ [targetName]: targetValue }, setActivityForm, activityForm);
  };

  const handleSubmit = () => {
  };

  const stepperNav = [
    {
      title: "Basic Details",
      icon: "fa-duotone fa-file",
      has_next: true
    },
    {
      title: "Game",
      icon: "fa-duotone fa-gamepad",
      has_next: true
    },
    {
      title: "Schedule",
      icon: "fa-duotone fa-calendar-range",
      has_next: true
    },
    {
      title: "Team",
      icon: "fa-duotone fa-people-group",
      has_next: true
    },
    {
      title: "Entry",
      icon: "fa-duotone fa-ticket",
      has_next: true
    },
    {
      title: "Location",
      icon: "fa-duotone fa-location-dot",
      has_next: false
    }
  ];

  return (
    <KTCard>
      <KTCardHeader text={"Create Activity"} bg="mc-secondary" text_color="white" />
      <div ref={stepperRef} className="stepper stepper-links d-flex flex-column">
        <KTCardBody className="border-bottom">
          <div className="stepper-nav">
            {stepperNav.map((stepper, index) => (
              <div key={`activity-create-stepper-${index}`} className={clsx("stepper-item", { current: index === 0 })}
                   data-kt-stepper-element="nav">
                <div className="stepper-label">
                  <div className="stepper-icon">
                    <i className={`${stepper?.icon} fs-2x`}></i>
                  </div>
                  <h3 className="stepper-title">{stepper?.title}</h3>
                </div>
                {stepper?.has_next &&
                  <div className="stepper-arrow">
                    <KTSVG path="/media/icons/duotune/arr064.svg" className="svg-icon-2x" />
                  </div>
                }
              </div>
            ))}
          </div>
        </KTCardBody>


        <ActivityFormContext.Provider
          value={{ activityForm, setActivityForm }}
        >
          <Formik
            validationSchema={currentSchema}
            initialValues={activityForm!}
            onSubmit={submitStep}
            enableReinitialize
          >
            {() => (
              <Form onChange={handleOnChange} className="form" autoComplete="off">
                <KTCardBody>
                  <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />
                  <div className="current" data-kt-stepper-element="content">
                    <GeneralDetail />
                  </div>
                  <div data-kt-stepper-element="content">
                    <GameDetail />
                  </div>
                  <div data-kt-stepper-element="content">
                    I am 3
                  </div>
                </KTCardBody>
                <KTCardFooter className="d-flex justify-content-end py-6 px-9">
                  <button
                    onClick={prevStep}
                    type="button"
                    className="btn btn-sm btn-light-mc-secondary me-3"
                    data-kt-stepper-action="previous"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="btn btn-mc-secondary btn-active-mc-secondary btn-sm"
                    disabled={isSubmitting}
                  >
                    <span
                      className="indicator-label">{isSubmitting ? "Submitting" : isSubmitButton ? "Submit" : "Continue"}</span>
                    {isSubmitting && (
                      <span className="indicator-progress" style={{ display: "inline-block" }}>
                        <span className="spinner-border spinner-border-sm align-middle ms-2" />
                      </span>
                    )}
                  </button>
                </KTCardFooter>
              </Form>
            )}
          </Formik>
        </ActivityFormContext.Provider>
      </div>
    </KTCard>
  );
};
