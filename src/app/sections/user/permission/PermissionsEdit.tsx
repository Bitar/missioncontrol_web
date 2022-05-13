import React, {useEffect, useState} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup'
import {Permission} from "../../../models/user/Permission";
import {KTCard, KTCardBody, Response} from "../../../../_metronic/helpers";
import clsx from "clsx";
import {PageTitle} from "../../../../_metronic/layout/core";
import {GET_PERMISSIONS_URL, updatePermission} from "./core/_requests";
import {useNavigate, useParams} from 'react-router-dom';
import axios, {AxiosResponse} from "axios";

const editPermissionSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
})

const PermissionsEdit = () => {
    const [permission, setPermission] = useState<Permission | undefined>();
    const navigate = useNavigate()
    const params = useParams();
    // const permission = await getPermissionById(params.id)

    const initialValues = {
        name: permission?.name || '',
    }

    const cancel = () => {
        navigate('/permissions')
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: editPermissionSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                await updatePermission(params.id, values)
                // if (isNotEmpty(values.id)) {
                //     // await updateUser(values)
                // } else {
                //     // await updatePermission(values)
                // }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
                cancel()
            }
        },
    })


    useEffect(() => {
        axios
            .get(`${GET_PERMISSIONS_URL}/${params.id}`)
            .then((response: AxiosResponse<Response<Permission>>) => response.data)
            .then((response: Response<Permission>) => {
                setPermission(response.data)
            })
    }, [params.id]);

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
                            Edit Permission
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
                                <label className='required fw-bold fs-6 mb-2'>Name</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                {/*<Field name="name" type="text" className={'form-control form-control-solid mb-3 mb-lg-0' + (formik.touched.name && formik.errors.name ? ' is-invalid' : 'is-valid')} />*/}
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

export {PermissionsEdit}