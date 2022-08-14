import React, {FC, useState} from 'react'
import {Field, ErrorMessage} from 'formik'
// import DatePicker from "react-datepicker";

const Step3: FC = () => {
  const [date, setDate] = useState(new Date())

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'>Activity Schedule</h2>

        <div className='text-gray-400 fw-bold fs-6'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, obcaecati? Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Praesentium, voluptatum?
        </div>
      </div>

      <div className='pb-1'>
        <h4 className='fw-bolder text-dark'>Time</h4>
      </div>

      <div className='fv-row row mb-10'>
        <div className='col-6'>
          <label className='form-label required'>Time of Day</label>

          <Field name='time' className='form-control form-control-lg form-control-solid' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='time' />
          </div>
        </div>
        <div className='col-6'>
          <label className='form-label required'>Timezone</label>

          <Field name='timezone' className='form-control form-control-lg form-control-solid' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='timezone' />
          </div>
        </div>
      </div>

      <div className='pb-5'>
        <h4 className='fw-bolder text-dark'>Match Frequency</h4>
        <div className='text-gray-400 fw-bold fs-6'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, obcaecati? Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Praesentium, voluptatum?
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Match Dates</label>

        <Field name='dates' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='dates' />
        </div>
      </div>

      <div className='pb-5'>
        <h4 className='fw-bolder text-dark'>Registration Dates</h4>
        <div className='text-gray-400 fw-bold fs-6'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, obcaecati? Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Praesentium, voluptatum?
        </div>
      </div>

      <div className='fv-row row mb-10'>
        <div className='col-6'>
          <label className='form-label required'>Start</label>

          {/*<DateTimePicker onChange={setDate} value={date} />*/}
          {/*<Field name='time' className='form-control form-control-lg form-control-solid'/>*/}
          {/*<DatePicker selected={date} onChange={(date:Date) => setDate(date)} />*/}
          <div className='text-danger mt-2'>
            <ErrorMessage name='time' />
          </div>
        </div>
        <div className='col-6'>
          <label className='form-label required'>End Date</label>

          <Field name='timezone' className='form-control form-control-lg form-control-solid' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='timezone' />
          </div>
        </div>
      </div>

      <div className='pb-5'>
        <h4 className='fw-bolder text-dark'>Gameplay Dates</h4>
        <div className='text-gray-400 fw-bold fs-6'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, obcaecati? Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Praesentium, voluptatum?
        </div>
      </div>

      <div className='fv-row row mb-10'>
        <div className='col-6'>
          <label className='form-label required'>Start Date</label>

          <Field name='time' className='form-control form-control-lg form-control-solid' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='time' />
          </div>
        </div>
        <div className='col-6'>
          <label className='form-label required'>End Date</label>

          <Field name='timezone' className='form-control form-control-lg form-control-solid' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='timezone' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step3}
