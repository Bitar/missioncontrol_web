import {PageTitle} from "../../../_metronic/layout/core";
import {isNotEmpty, KTCard, KTCardBody} from "../../../_metronic/helpers";
import clsx from "clsx";
import  {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Community, initialCommunity} from "../../models/community/Community";
import { createCommunity } from "./core/_requests";





const createPlanSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
     description: Yup.string()
         .required('Description is required'),
    // logo: Yup.string()
    //      .required('Description is required'),
     contact:Yup.object().shape({
            arr: Yup.array().of(Yup.object().shape({ name: Yup.string().required('Description is required'),  email: Yup.string(), phone_number: Yup.string()})),
            }),
    // address:Yup.object().shape({
    //         arr: Yup.array().of(Yup.object().shape({ address_one: Yup.string().required('Description is required') , address_two: Yup.string(), city: Yup.string(),state_providence: Yup.string(),postal_code: Yup.string(),country_code: Yup.string()  })),
    //         })             
})

const CommunityCreate = () => {
    
     const [communityForEdit] = useState<Community>(initialCommunity)

    const formik = useFormik({
        initialValues: communityForEdit,
        validationSchema: createPlanSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    // await updateUser(values)
                } else {
                    await createCommunity(values)
                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
            }
        },
    })

    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Create Community'}</PageTitle>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2"/>
                        </span>
                        <h3 className="card-label">
                            Add Community
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

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Description</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='Description'
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

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>contact.name</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='contact name'
                                    {...formik.getFieldProps('contact name')}
                                    type='text'
                                    name='contact.name'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.contact && formik.errors.contact},
                                        {
                                            'is-valid': formik.touched.contact && !formik.errors.contact,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.contact && formik.errors.contact && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.contact}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */}

                                
                            </div>
                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>contact.email</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='email'
                                    {...formik.getFieldProps('email')}
                                    type='text'
                                    name='contact.email'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.contact && formik.errors.contact},
                                        {
                                            'is-valid': formik.touched.contact && !formik.errors.contact,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.contact && formik.errors.contact && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.contact}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */}                     
                            </div>
                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>contact.phone_number</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='phone_number'
                                    {...formik.getFieldProps('phone_number')}
                                    type='text'
                                    name='contact.phone_number'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.contact && formik.errors.contact},
                                        {
                                            'is-valid': formik.touched.contact && !formik.errors.contact,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.contact && formik.errors.contact && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.contact}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */}

                                
                            </div>

                          
                                    
                           


                                        
                          
                        </div>

                            


                  
                        {/* end::Scroll */}

                        {/* begin::Actions */}
                        <div className='py-5'>
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

export {CommunityCreate}