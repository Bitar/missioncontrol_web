import {PageTitle} from "../../../_metronic/layout/core";
import {isNotEmpty, KTCard, KTCardBody} from "../../../_metronic/helpers";
import clsx from "clsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Community, initialCommunity} from "../../models/community/Community";
import {createCommunity} from "./core/_requests";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCountries, getStates} from "../misc/core/_requests";
import {selectCustomStyles} from "../activities/core/_consts";
import Select from "react-select";
import {CommunityAddress, initialCommunityAddress} from "../../models/community/CommunityAddress";

const createCommunitySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    // contact: Yup.object().shape({
    //     name: Yup.string().required('Contact name  is required'),
    //     email: Yup.string().email('Please enter a valid email').required('Email is required'),
    //     phone_number :Yup.string().required('Phone number is required'),
    //   }),

    

    // contact_name: Yup.string()
    //     .required('Contact Name is required'),
    // contact_email: Yup.string().email()
    //     .required('Contact email is required'),
    // contact_phone_number: Yup.string()
    //     .required('Contact phone number is required'),
    // address_address_one: Yup.string()
    //     .required('Address One is required'),
    // address_address_two: Yup.string()
    //     .required('Address Two is required'),
    // address_city: Yup.string()
    //     .required('City is required'),
    // address_state_province: Yup.string()
    //     .required('State Province is required'),
    // address_postal_code: Yup.string()
    //     .required('Postal Code is required'),
    // address_country_code: Yup.string()
    //     .required('Country Code is required'),
    // banner_image: Yup.mixed().required('File is required'),
    // logo: Yup.mixed().required('File is required')
})

const stateSelect: any[] = []
const countrySelect: any[] = []

const CommunityCreate = () => {

    const [community, setCommunity] = useState<Community>(initialCommunity)
    const [communityAddress, setCommunityAddress] = useState<CommunityAddress>(initialCommunityAddress)

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: initialCommunity,
        validationSchema: createCommunitySchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    // await updateUser(values)
                } else {
               
                    let formData = new FormData()

                    formData.append('logo', values.logo!)
                    formData.append('banner_image', values.banner_image!)
                    formData.append('name', values.name!)
                    formData.append('description', values.description!)
                    formData.append('contact[name]', values.contact!.name)
                    formData.append('contact[email]', values.contact!.email)
                    formData.append('contact[phone_number]', values.contact!.phone_number)
                    formData.append('address[address_one]', values.address!.address_one)
                    formData.append('address[address_two]', values.address!.address_two)
                    formData.append('address[city]', values.address!.city)
                    formData.append('address[state_province]', communityAddress.state_province)
                    formData.append('address[postal_code]', values.address!.postal_code)
                    formData.append('address[country_code]', communityAddress.country_code)

                    const comm = await createCommunity(formData)
                    navigate('/communities/' + comm?.id)

                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
            }
        },
    })


    useEffect(() => {
        getStates().then(response => {
            response?.data?.forEach(function (value) {
                stateSelect.push({value: value.id, label: value.name, code: value.code})
            })
        })

        getCountries().then(response => {
            response?.data?.forEach(function (value) {
                countrySelect.push({value: value.id, label: value.name, code: value.code})
            })
        })
    }, [])

    const updateAddressData = (fieldsToUpdate: Partial<CommunityAddress>) => {
        const updatedData = {...communityAddress, ...fieldsToUpdate}
        setCommunityAddress(updatedData)
    }


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
                    <form className='form' method="post" encType="multipart/form-data" onSubmit={formik.handleSubmit} noValidate>
                        {/* begin::Scroll */}
                        <div
                            className='d-flex flex-column me-n7 pe-7 pt-5'
                        >
                            <div className='fv-row mb-7'>
                                <label className='required fw-bold fs-6 mb-2'>Name</label>


                                <input
                                    placeholder='Name'
                                    {...formik.getFieldProps('name')}
                                    type='text'
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

                            {/* begin::Input group */}
                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Description</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <textarea
                                    rows={3}
                                    {...formik.getFieldProps('description')}
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.description && formik.errors.description},
                                        {
                                            'is-valid': formik.touched.description && !formik.errors.description,
                                        }
                                    )}
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

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Contact Name</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='Contact Name'
                                    type='text'
                                   
                                    {...formik.getFieldProps('contact[name]')}
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        // {'is-invalid': formik.touched.contact && formik.errors.contact},
                                        // {
                                        //     'is-valid': formik.touched.contact && !formik.errors.contact,
                                        // }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {/*{formik.touched.contact && formik.errors.contact && (*/}
                                {/*    <div className='fv-plugins-message-container'>*/}
                                {/*        <div className='fv-help-block'>*/}
                                {/*            <span role='alert'>{formik.errors.contact}</span>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                {/* end::Input */}


                            </div>
                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Contact Email</label>
                                {/* end::Label */}

                                {/* begin::Input */}


                                <input
                                    placeholder='Contact Email'
                                    {...formik.getFieldProps('contact[email]')}
                                    type="email"
                                    name='contact.email'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
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
                           
                            </div>

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Phone number</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='Contact Phone Number'
                                    {...formik.getFieldProps('contact[phone_number]')}
                                    type='text'
                                    name='contact.phone_number'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {/* end::Input */}
                            </div>

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Address One</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:1350 Boylston Street'
                                    {...formik.getFieldProps('address[address_one]')}
                                    type='text'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                            </div>


                            <div className='fv-row mb-7'>
                                <label className='required fw-bold fs-6 mb-2'>Address Two</label>

                                <input
                                    placeholder='ex:Unit 611'
                                    {...formik.getFieldProps('address[address_two]')}
                                    type='text'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                            </div>

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>City</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:Boston'
                                    {...formik.getFieldProps('address[city]')}
                                    type='text'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                    )}
                                    autoComplete='off'
                                />
                            </div>


                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>State</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <Select
                                // {...formik.getFieldProps('address[state_province]')}
                                    className={clsx(
                                        'basic-select',
                                    )}
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    name="state"
                                    onChange={(inputValue) => {
                                        updateAddressData({
                                            state_province: inputValue.code
                                        })
                                    }}
                                    options={stateSelect}
                                    styles={selectCustomStyles}
                                />
                            </div>


                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Postal Code</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:02215'
                                    // {...formik.getFieldProps('address[postal_code]')}
                                    type='text'
                                    name='address.postal_code'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                            </div>


                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Country Code</label>
                                {/* end::Label */}


                                {/* begin::Input */}
                                <Select
                                    // {...formik.getFieldProps('address[country_code]')}
                                    className={clsx(
                                        'basic-select',
                                    )}
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={(inputValue) => {
                                        updateAddressData({
                                            country_code: inputValue.code
                                        })
                                    }}
                                    options={countrySelect}
                                    styles={selectCustomStyles}
                                />
                            </div>

                            <div className='fv-row mb-7'>
                                <label className='required fw-bold fs-6 mb-2'>logo</label>
                                <input
                                    type='file'
                                    name='file'
                                    // @ts-ignore
                                    onChange={(event) => formik.setFieldValue('logo', event.target.files[0])}

                                    className={clsx('form-control form-control-solid mb-3 mb-lg-0',
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                            </div>

                            <div className='fv-row mb-7'>
                                <label className='required fw-bold fs-6 mb-2'>Banner Image</label>

                                <input
                                    type='file'
                                    name='file'
                                    // @ts-ignore
                                    onChange={(event) => formik.setFieldValue('banner_image', event.target.files[0])}

                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                            </div>


                        </div>

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

                    </form>
                    {(formik.isSubmitting)}
                </KTCardBody>
            </KTCard>
        </>
    )
}

export {CommunityCreate}