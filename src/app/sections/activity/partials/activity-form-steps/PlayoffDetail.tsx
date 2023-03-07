import { ErrorMessage, Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { SwitchInput } from "../../../../components/SwitchInput/SwitchInput";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { useActivityForm } from "../../core/contexts/ActivityFormContext";
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import InputMask from "react-input-mask";
import { KTCard, KTCardBody, KTCardHeader } from "../../../../helpers/components";
import { FormAction } from "../../../../helpers/form/FormAction";
import { updatePlayoffs } from "../../core/requests/ActivitySettingsRequests";
import toast from "react-hot-toast";
import { useActivity } from "../../core/contexts/ActivityContext";
import { activityPlayoffSchema } from "../../core/validation/ActivitySchema";
import {
  handlePlayoffsChange,
  onInputMaskChange,
  resetPlayoffDates,
  updatePlayoffDates
} from "../../../../helpers/PlayoffHelper";
import { TournamentTeamCountText } from "../TournamentTeamCountText";

const { before } = DateRangePicker;

type Props = {
  playoffDisabledDate: Date
}

export const PlayoffDetail: FC<Props> = ({ playoffDisabledDate }) => {
  const { activity, setActivity } = useActivity();
  const { activityForm, setActivityForm } = useActivityForm();
  const [enablePlayoffs, setEnablePlayoffs] = useState<boolean>(
    activityForm?.playoff?.is_enabled || false
  );
  const [playoffsRange, setPlayoffsRange] = useState<DateRange | null>();
  const [showErrors, setShowErrors] = useState<boolean>(false);

  useEffect(() => {
    resetPlayoffDates(activityForm, setActivityForm, setPlayoffsRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForm?.schedule?.matchplay_dates]);

  useEffect(() => {
    updatePlayoffDates(activityForm, setPlayoffsRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForm?.playoff?.playoff_dates]);

  const onPlayoffsChange = (e: any) => {
    handlePlayoffsChange(e, activityForm, setActivityForm, setShowErrors, setPlayoffsRange);
  };

  const onMaskedStateChange = ({ nextState }: any) => {
    return onInputMaskChange({ nextState }, activityForm);
  };

  const handleSubmit = async () => {
    let data = jsonToFormData(activityForm);

    await updatePlayoffs(activity?.id, data)
      .then((response) => {
        toast.success("Activity updated Successfully!");
        setActivity(response);
      })
      .catch(function(e) {
        if (e.response) {
          let status = e.response.status;

          if (status === 403) {
            toast.error("You are not allowed to do this update!");
          }
        }
      });
  };

  const handleOnChange = (event: any) => {
    let targetName = event.target.name;
    let targetValue = event.target.value;

    if (targetName === "playoff.teams") {
      updateData(
        {
          playoff: {
            ...activityForm?.playoff,
            ...{
              teams: targetValue
            }
          }
        },
        setActivityForm,
        activityForm
      );
    }
  };

  return (
    <KTCard border={true} className={"mt-8"}>
      <KTCardHeader text={"Playoffs"} bg="mc-primary" text_color="white" />

      <Formik
        validationSchema={activityPlayoffSchema}
        initialValues={activityForm!}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form onChange={handleOnChange} className="form" autoComplete="off">
            <KTCardBody className="py-4">
              <div className="d-flex flex-column pt-5 w-100">
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Enable Playoffs</label>
                  <div className="col-lg-8 fv-row">
                    <SwitchInput
                      id={"enable_playoff_switch"}
                      name="playoff.is_enabled"
                      isOn={enablePlayoffs}
                      handleToggle={(e: any) => {
                        setEnablePlayoffs(!enablePlayoffs);
                        updateData(
                          {
                            playoff: {
                              ...activityForm?.playoff,
                              ...{
                                is_enabled: !enablePlayoffs,
                                teams: e.target.checked ? 2 : undefined
                              }
                            }
                          },
                          setActivityForm,
                          activityForm
                        );
                      }}
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="playoff.is_enabled" />
                    </div>
                  </div>
                </div>

                {enablePlayoffs && (
                  <>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">
                        Playoff Dates
                      </label>
                      <div className="col-lg-8 fv-row">
                        <DateRangePicker
                          name={"playoff.playoff_dates"}
                          cleanable={false}
                          value={playoffsRange}
                          id="playoff_dates"
                          appearance="default"
                          placeholder="Playoff Dates"
                          className="w-100"
                          character={" - "}
                          ranges={[]}
                          onChange={onPlayoffsChange}
                          disabledDate={before && before(playoffDisabledDate)}
                        />
                        <div className="text-danger mt-2">
                          {showErrors && "Invalid Playoff dates"}
                        </div>
                        <div className="form-text">
                          <TournamentTeamCountText teamCount={activityForm?.playoff?.teams!} />
                        </div>
                        <div className="text-danger mt-2">
                          <ErrorMessage name="playoff.playoff_dates.start_date" />
                        </div>
                        <div className="text-danger mt-2">
                          <ErrorMessage name="playoff.playoff_dates.end_date" />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6"># of Teams</label>
                      <div className="col-lg-8 fv-row">
                        <InputMask
                          mask="999"
                          defaultValue={activityForm?.playoff?.teams}
                          className="form-control mb-3 mb-lg-0"
                          placeholder="Teams count"
                          maskPlaceholder={null}
                          name="playoff.teams"
                          beforeMaskedStateChange={onMaskedStateChange}
                          onChange={() => {
                            resetPlayoffDates(activityForm, setActivityForm, setPlayoffsRange);
                          }}
                        />
                        <div className="text-danger mt-2">
                          <ErrorMessage name="playoff.teams" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </KTCardBody>
            <FormAction text={"Update"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};
