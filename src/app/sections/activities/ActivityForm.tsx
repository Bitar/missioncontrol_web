import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Activity } from "./models/Activity";
import { ErrorMessage } from "formik";
import { updateData } from "../../helpers/form/FormHelper";
import { SelectMC } from "../../helpers/form/SelectMC";
import { getAllCommunities } from "../community/core/CommunityRequests";
import { GameDetails, Location, EntryFee, Schedule, TeamDetails, Scoring } from "./partials";
import { KTCard, KTCardBody } from "../../../_metronic/helpers";
import TextField from "@mui/material/TextField";

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const ActivityForm: FC<React.PropsWithChildren<Props>> = ({ activity, setActivity }) => {
  const [openScoring, setOpenScoring] = useState(false);
  const ActivityProps = {
    activity: activity,
    setActivity: setActivity
  };

  const handleChange = (object: any) => {
    updateData({ community: object }, setActivity, activity);
  };

  return (
    <>
      <div className="row mb-6">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Title</label>
        <div className="col-lg-8 fv-row">
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            className="w-100"
            size="small" />
          <div className="text-danger mt-2">
            <ErrorMessage name="title" />
          </div>
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Description</label>
        <div className="col-lg-8 fv-row">
          <TextField
            label="Description"
            variant="outlined"
            multiline
            name="description"
            className="w-100"
            size="small" />
          {/*<Field*/}
          {/*  as="textarea"*/}
          {/*  name="description"*/}
          {/*  className="form-control mb-3 mb-lg-0"*/}
          {/*  placeholder="Activity Description"*/}
          {/*  rows={3}*/}
          {/*/>*/}
          <div className="text-danger mt-2">
            <ErrorMessage name="description" />
          </div>
        </div>
      </div>

      <div className="row mb-6">
        {/*TODO: Maybe Async here*/}
        <SelectMC label={"Community"} api={getAllCommunities} onChangeData={handleChange} />
      </div>

      <div className="separator separator-dashed my-6"></div>

      <Schedule {...ActivityProps} />

      <div className="separator separator-dashed my-6"></div>

      <GameDetails {...ActivityProps} />

      <div className="separator separator-dashed my-6"></div>

      {activity?.game_mode && (
        <>
          <Scoring {...ActivityProps} />

          <div className="separator separator-dashed my-6"></div>
        </>
      )}

      <TeamDetails {...ActivityProps} />

      <div className="separator separator-dashed my-6"></div>

      <EntryFee {...ActivityProps} />

      <div className="separator separator-dashed my-6"></div>

      <Location {...ActivityProps} />

      <div className="separator separator-dashed my-6"></div>

      {/*  Prize  */}
      {/*  Score  */}
    </>
  );
};

export { ActivityForm };
