import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import {Activity} from '../models/Activity'
import {RegistrationDatePicker} from './RegistrationDatePicker'
import {MatchPlayDatePicker} from './MatchPlayDatePicker'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {StaticTimePicker} from "@mui/x-date-pickers/StaticTimePicker";
import TextField from "@mui/material/TextField";
import dayjs, {Dayjs} from "dayjs";
import {useThemeMode} from "../../../../_metronic/partials";
import {ThemeModeComponent} from "../../../../_metronic/assets/ts/layout";

type Props = {
    activity: Activity | undefined
    setActivity: Dispatch<SetStateAction<Activity>>
}

const Schedule: FC<Props> = ({activity, setActivity}) => {
    const [frequency, setFrequency] = useState(0)
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'
    const {mode} = useThemeMode()
    const theme = mode === 'system' ? systemMode : mode

    return (
        <>
            <div className='row mb-6'>
                <div className='col-12'>
                    <h4 className='text-dark'>Schedule</h4>
                </div>
            </div>

            <div className='row mb-6'>
                <div className='col-lg-4'>
                    <span className='required fw-bold fs-6'>Registration Dates</span>
                </div>
                <div className='col-lg-8 fv-row'>
                    <RegistrationDatePicker activity={activity} setActivity={setActivity}/>
                </div>
            </div>
            <div className='row mb-6'>
                <div className='col-lg-4'>
                    <span className='required fw-bold fs-6'>Match Play Dates</span>
                </div>
                <div className='col-lg-8 fv-row'>
                    <MatchPlayDatePicker activity={activity} setActivity={setActivity}/>
                </div>
            </div>
            <div className='row mb-6'>
                <div className='col-lg-4'>
                    <span className='required fw-bold fs-6'>Match Frequency</span>
                </div>
                <div className='col-lg-8 fv-row'>
                    <select
                        name='frequency'
                        className='form-select form-select-white form-select-sm'
                        defaultValue={0}
                        onChange={(e: any) => setFrequency(e.target.value)}>
                        <option value="0" disabled>Select...</option>
                        <option value='1'>Daily</option>
                        <option value='2'>Weekly</option>
                        {/*<option value='3'>Custom</option>*/}
                    </select>
                </div>
            </div>
            <div className='row mb-6'>
                <div className='offset-lg-4 col-lg-6 fv-row'>
                    <ThemeProvider theme={createTheme({palette: {mode: theme,}})}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticTimePicker
                                label={" "}
                                ampm
                                orientation="landscape"
                                openTo="minutes"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                componentsProps={{actionBar: {actions: []}}}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
            </div>
        </>
    )
}
export {Schedule}
