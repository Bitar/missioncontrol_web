import { ActivityForm } from "../models/Activity";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { updateData } from "../../../helpers/form/FormHelper";

type Props = {
  activity: ActivityForm,
  setActivity: Dispatch<SetStateAction<ActivityForm>>
}

const TimeOfDayPicker: FC<Props> = ({activity, setActivity}) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs())

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticTimePicker
          label={' '}
          ampm
          orientation='landscape'
          openTo='minutes'
          value={value}
          onChange={(newValue: any) => {
            setValue(newValue)

            let timeOfDay = (new Date(newValue.$d).getTime() / 1000).toString()

            updateData(
              {
                schedule: {
                  ...activity?.schedule,
                  ...{settings: {
                      ...activity?.schedule.settings,
                      ...{time: timeOfDay},
                    }}
                },
              },
              setActivity,
              activity
            )
          }}
          componentsProps={{actionBar: {actions: []}}}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
  )
}

export {TimeOfDayPicker}
