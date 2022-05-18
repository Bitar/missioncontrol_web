import React, {useState} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup'
import { Game } from '../../models/game/Game';
import { isNotEmpty, KTCard,KTCardBody } from '../../../_metronic/helpers';
import clsx from "clsx";
import { PageTitle } from '../../../_metronic/layout/core';
import {createGame} from "./core/_requests";
import {useNavigate} from 'react-router-dom';

const createGameSchema = Yup.object().shape({
    title: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Name is required'),
//    is_featured: Yup.boolean()
//         .required('Name is required'),
//     is_crossplay: Yup.boolean()
//         .required('Name is required'),
//     image: Yup.string()
//         .required('Name is required'), 
//     platforms: Yup.array()
//         .required("Name is required")  
})

const GameCreate = () => {
    const navigate = useNavigate();


    const [gameForEdit] = useState<Game>({
        title:'' ,
        description: '',
        is_featured: false,
        is_crossplay: false,
        image: '',
        platforms: []
    })


    const cancel = () => {
        navigate('/games')
    }

    const formik = useFormik({
        initialValues: gameForEdit,
        validationSchema: createGameSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    // await updateUser(values)
                } else {
                    await createGame(values)
                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
                cancel()
            }
        },
    })

    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Games'}</PageTitle>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2"/>
                        </span>
                        <h3 className="card-label">
                            Add Games
                        </h3>
                    </div>
                </div>



                <KTCardBody className='py-4'>
                    <form className='form' onSubmit={formik.handleSubmit} noValidate>
                        {/* begin::Scroll */}
                        <div
                            className='d-flex flex-column scroll-y me-n7 pe-7 pt-5'
                            id='kt_modal_add_user_scroll'
                            data-kt-scroll='true'
                            data-kt-scroll-activate='{default: false, lg: true}'
                            data-kt-scroll-max-height='auto'
                            data-kt-scroll-dependencies='#kt_modal_add_user_header'
                            data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                            data-kt-scroll-offset='300px'
                        >
                            {/* begin::Input group */}
                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Title</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='New Title'
                                    {...formik.getFieldProps('title')}
                                    type='text'
                                    name='title'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.title && formik.errors.title},
                                        {
                                            'is-valid': formik.touched.title && !formik.errors.title,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.title}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */}
                            </div>

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Description</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='New Description'
                                    {...formik.getFieldProps('description')}
                                    type='text'
                                    name='description'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.description && formik.errors.description},
                                        {
                                            'is-valid': formik.touched.description && !formik.errors.description,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.description}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */}
                            </div>
                            {/* end::Input group */}
                        </div>
                        {/* end::Scroll */}

                        {/* begin::Actions */}
                        <div className='py-5'>
                            <button
                                type='reset'
                                onClick={() => cancel()}
                                className='btn btn-light me-3'
                                data-kt-users-modal-action='cancel'
                                disabled={formik.isSubmitting}
                            >
                                Cancel
                            </button>

                            <button
                                type='submit'
                                className='btn btn-primary'
                                data-kt-users-modal-action='submit'
                                disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
                            >
                                <span className='indicator-label'>Submit</span>
                                {(formik.isSubmitting) && (
                                    <span className='indicator-progress'>
                                        Please wait...{' '}
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'/>
                                    </span>
                                )}
                            </button>
                        </div>
                        {/* end::Actions */}
                    </form>
                    {(formik.isSubmitting)}
                </KTCardBody>
            </KTCard>
        </>
    )
}

export {GameCreate}