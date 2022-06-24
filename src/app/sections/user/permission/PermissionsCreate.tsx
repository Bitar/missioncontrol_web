import React, {useState} from 'react'
import {useFormik} from "formik";
import {initialPermission, Permission, permissionSchema} from "../../../models/user/Permission";
import {isNotEmpty, KTCard, KTCardBody} from "../../../../_metronic/helpers";
import clsx from "clsx";
import {PageTitle} from "../../../../_metronic/layout/core";
import {createPermission} from "./core/_requests";
import {useNavigate} from 'react-router-dom';


const PermissionsCreate = () => {
    const navigate = useNavigate();

    const cancel = () => {
        navigate('/permissions')
    }

    const formik = useFormik({
        initialValues: initialPermission,
        validationSchema: permissionSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    // await updateUser(values)
                } else {
                    await createPermission(values)
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
            <PageTitle breadcrumbs={[]}>{'Permissions'}</PageTitle>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2"/>
                        </span>
                        <h3 className="card-label">
                            Add Permission
                        </h3>
                    </div>
                </div>
                <KTCardBody className='py-4'>
                    <form className='form' onSubmit={formik.handleSubmit} noValidate>
                        {/* begin::Scroll */}
                        <div
                            className='d-flex flex-column scroll-y me-n7 pe-7 pt-5'
                            data-kt-scroll='true'
                            data-kt-scroll-activate='{default: false, lg: true}'
                            data-kt-scroll-max-height='auto'
                            data-kt-scroll-offset='300px'
                        >
                            {/* begin::Input group */}
                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Name</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='Name'
                                    {...formik.getFieldProps('name')}
                                    type='text'
                                    name='name'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.name && formik.errors.name},
                                        {
                                            'is-valid': formik.touched.name && !formik.errors.name,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.name}</span>
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

export {PermissionsCreate}