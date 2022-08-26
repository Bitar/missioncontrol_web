import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import {Activity} from '../models/Activity'
import {RegistrationDatePicker} from './RegistrationDatePicker'
import {MatchPlayDatePicker} from './MatchPlayDatePicker'
import {updateData} from "../../../helpers/form/FormHelper";
import {TimeOfDayOptions} from "./TimeOfDayOptions";

type Props = {
    activity: Activity | undefined
    setActivity: Dispatch<SetStateAction<Activity>>
}

const Schedule: FC<Props> = ({activity, setActivity}) => {
    const [frequency, setFrequency] = useState(0)
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
                <div className='col-lg-4'>
                    <span className='required fw-bold fs-6'>Time of day</span>
                </div>
                <div className='col-lg-8 fv-row'>
                    <TimeOfDayOptions/>
                </div>
            </div>
        </>
    )
}
export {Schedule}
