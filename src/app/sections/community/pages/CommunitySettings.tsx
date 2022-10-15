import clsx from "clsx";
import React, { FC, useEffect, useRef, useState } from "react";
import { StepperComponent } from "../../../../_metronic/assets/ts/components/_StepperComponent";
import { ID } from "../../../../_metronic/helpers";
import { useCommunity } from "../CommunityContext";
import { CommunityFormType, initialCommunityFormTypeByCommunity } from "../models/Community";
import { GeneralDetailsStep } from "../partials/community-form-steps/GeneralDetailsStep";

type Props = {
  communityId?: ID
}

const CommunitySettings: FC<Props> = ({ communityId }) => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const stepper = useRef<StepperComponent | null>(null);
  const { community, setCommunity } = useCommunity();

  const [communityForm, setCommunityForm] = useState<CommunityFormType>(
    initialCommunityFormTypeByCommunity(community)
  );

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement);
  };

  const goToStep = (index: number) => {
    stepper?.current?.goto(index);
  };

//   const prevStep = () => {
//     if (!stepper.current) {
//       return;
//     }
//
//     stepper.current.goPrev();
//
//     // setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
//   };
// //values: ICreateAccount,
//   const submitStep = (actions: FormikValues) => {
//     if (!stepper.current) {
//       return;
//     }
//
//     // setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])
//
//     if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
//       stepper.current.goNext();
//     } else {
//       stepper.current.goto(1);
//       actions.resetForm();
//     }
//   };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

  const settingsNav = [
    {
      title: "Details",
      description: "Basic Details",
      icon: "fas fa-file"
    },
    {
      title: "Contact Info",
      description: "Point of contact",
      icon: "fas fa-phone"
    },
    {
      title: "Address",
      description: "Where they at",
      icon: "fas fa-house"
    },
    {
      title: "Community",
      description: "Who controls what",
      icon: "fas fa-crown"
    }
  ];

  return (
    <>
      <div
        ref={stepperRef}
        className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
        id="kt_create_account_stepper">

        <div
          className="card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9">

          <div className="card-body px-6 px-lg-10 px-xxl-15 py-20">

            <div className="stepper-nav">

              {settingsNav.map((setting, index) => (
                <React.Fragment key={`stepper-item-key-${index}`}>
                  <div className={clsx("stepper-item w-100 p-3 rounded",
                    { current: index === 0 })} data-kt-stepper-element="nav">

                    <div className="stepper-wrapper" onClick={() => goToStep((index + 1))}>

                      <div className="stepper-icon w-45px h-45px bg-transparent">
                        <i className={`${setting.icon} fs-2x text-mc-secondary`}></i>
                      </div>

                      <div className="stepper-label">
                        <h3 className="stepper-title">{setting.title} {(index + 1)}</h3>

                        <div className="stepper-desc fw-semibold">{setting.description}</div>
                      </div>

                    </div>
                  </div>

                  {index + 1 < settingsNav.length &&
                    <div className="my-2"></div>
                  }
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex flex-row-fluid flex-center bg-body rounded">
          <div className="current" data-kt-stepper-element="content">
            <GeneralDetailsStep />
          </div>

          <div data-kt-stepper-element="content">
            Step 2
          </div>

          <div data-kt-stepper-element="content">
            Step 3
          </div>

          <div data-kt-stepper-element="content">
            Step 4
          </div>
        </div>
      </div>
    </>
  );
};

export { CommunitySettings };

