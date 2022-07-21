import {PageTitle} from "../../../_metronic/layout/core";
import {isNotEmpty, KTCard, KTCardBody} from "../../../_metronic/helpers";
import clsx from "clsx";
import {ErrorMessage, Field, FormikProvider, useFormik} from "formik";
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
    name: Yup.string().required('Community name is required'),
    description: Yup.string().required('Community description is required'),
    contact:Yup.object().shape({
        name: Yup.string().required('Contact name is required'),
        email: Yup.string().email('Please enter a valid email').required('Contact email is required'),
        phone_number :Yup.string().required('Contact phone number is required'),
    }),
    address:Yup.object().shape({
        address_one: Yup.string().required('Contact address is required'),
        address_two: Yup.string(),
        city :Yup.string().required('City is required'),
        // state_province: Yup.string().required('State Province is required'),
        postal_code: Yup.string().required('Postal Code is required'),
        // country_code: Yup.string().required('Country Code is required'),

    }),
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
                    var country = "US"
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
                    formData.append('address[country_code]', country)
                    // @ts-ignore
                    console.log(...formData)
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
            <FormikProvider value={formik}>
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
                            <div
                                className='d-flex flex-column me-n7 pe-7 pt-5'
                            >
                                <div className='fv-row mb-7'>
                                    <label className='required fw-bold fs-6 mb-2'>Name</label>
                                    <Field
                                        type='text'
                                        className='form-control mb-2'
                                        placeholder='Community Name'
                                        name='name'
                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='name'/>
                                    </div>
                                </div>

                                <div className='fv-row mb-7'>
                                    <label className='required fw-bold fs-6 mb-2'>Description</label>
                                    <Field
                                        as='textarea'
                                        name='description'
                                        className='form-control mb-2'
                                        placeholder='Community Description'
                                        rows={3}
                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='description'/>
                                    </div>
                                </div>

                                <div className='fv-row mb-7'>
                                    <label className='required fw-bold fs-6 mb-2'>Contact Name</label>
                                    <Field
                                        type='text'
                                        className='form-control mb-2'
                                        placeholder='Community Contact Name...'
                                        {...formik.getFieldProps('contact[name]')}
                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='contact.name'/>
                                    </div>
                                </div>

                                <div className='fv-row mb-7'>

                                    <label className='required fw-bold fs-6 mb-2'>Contact Email</label>
                                    <Field
                                        type='text'
                                        className='form-control mb-2'
                                        placeholder='Community Contact Email...'

                                        {...formik.getFieldProps('contact[email]')}
                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='contact.email'/>
                                    </div>
                                </div>

                                <div className='fv-row mb-7'>
                                    <label className='required fw-bold fs-6 mb-2'>Phone number</label>
                                    <Field
                                        type='text'
                                        className='form-control mb-2'
                                        placeholder='Community Contact Phone Number...'

                                        {...formik.getFieldProps('contact[phone_number]')}
                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='contact.phone_number'/>
                                    </div>
                                </div>



                                <div className='fv-row mb-7'>
                                    {/* begin::Label */}
                                    <label className='required fw-bold fs-6 mb-2'>Address One</label>
                                    <Field
                                        type='text'
                                        className='form-control mb-2'
                                        placeholder='ex: 424 Broadway'

                                        {...formik.getFieldProps('address[address_one]')}

                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='address.address_one'/>
                                    </div>
                                </div>



                                <div className='fv-row mb-7'>
                                    <label className='fw-bold fs-6 mb-2'>Address Two</label>
                                    <Field
                                        type='text'
                                        className='form-control mb-2'
                                        placeholder='ex: Unit 134'

                                        {...formik.getFieldProps('address[address_two]')}

                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='address.address_two'/>
                                    </div>
                                </div>


                                <div className='fv-row mb-7'>
                                    <label className='required fw-bold fs-6 mb-2'>City</label>
                                    <Field
                                        type='text'
                                        className='form-control mb-2'
                                        placeholder='ex: Boston'

                                        {...formik.getFieldProps('address[city]')}

                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='address.city'/>
                                    </div>
                                </div>



                                <div className='fv-row mb-7'>
                                    <label className='required fw-bold fs-6 mb-2'>State</label>
                                    <Select
                                        //{...formik.getFieldProps('address[state_province]')}
                                        className={clsx(
                                            'basic-select',
                                        )}
                                        classNamePrefix="select"
                                        isClearable={true}
                                        isSearchable={true}
                                        name="address.state_province"
                                        onChange={(inputValue) => {
                                            updateAddressData({
                                                state_province: inputValue.code
                                            })
                                        }}
                                        options={stateSelect}
                                        styles={selectCustomStyles}
                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='address.state_province'/>
                                    </div>
                                </div>


                                <div className='fv-row mb-7'>
                                    <label className='required fw-bold fs-6 mb-2'>Postal Code</label>
                                    <Field
                                        type='text'
                                        className='form-control mb-2'
                                        placeholder='ex: 95125'
                                        {...formik.getFieldProps('address[postal_code]')}

                                    />
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='address.postal_code'/>
                                    </div>
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
            </FormikProvider>
        </>
    )
}

export {CommunityCreate}