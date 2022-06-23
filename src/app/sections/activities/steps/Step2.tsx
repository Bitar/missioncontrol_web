import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage} from 'formik'
// import AsyncSelect from 'react-select/async';

const Step2: FC = () => {

    return (
        <div className='w-100'>
            <div className='pb-10 pb-lg-15'>
                <h2 className='fw-bolder text-dark'>Activity Info</h2>

                <div className='text-gray-400 fw-bold fs-6'>
                    If you need more info, please check out
                    <a href='/dashboard' className='link-primary fw-bolder' target={'_blank'}>
                        {' '}
                        Help Page
                    </a>
                    .
                </div>
            </div>

            <div className='mb-10 fv-row'>
                <label className='form-label mb-3'>Activity Title</label>

                <Field
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    name='activityTitle'
                />
                <div className='text-danger mt-2'>
                    <ErrorMessage name='activityTitle'/>
                </div>
            </div>

            <div className='mb-10 fv-row'>
                <label className='form-label mb-3'>Game</label>

                {/*<Field*/}
                {/*    type='text'*/}
                {/*    className='form-control form-control-lg form-control-solid'*/}
                {/*    name='gameTitle'*/}
                {/*    placeholder="Search..."*/}
                {/*    onChange={(e: any) => setSearch(e.target.value)}*/}
                {/*/>*/}
                {/*<AsyncSelect*/}
                {/*    cacheOptions*/}
                {/*    loadOptions={loadOptions}*/}
                {/*    defaultOptions*/}
                {/*    onInputChange={handleInputChange}*/}
                {/*/>*/}
                <div className='text-danger mt-2'>
                    <ErrorMessage name='gameTitle'/>
                </div>
            </div>
        </div>
    )
}

export {Step2}
