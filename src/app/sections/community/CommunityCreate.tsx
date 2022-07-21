import {PageTitle} from "../../../_metronic/layout/core";
import {isNotEmpty, KTCard, KTCardBody} from "../../../_metronic/helpers";
import clsx from "clsx";
import {ErrorMessage, Field, Form, Formik, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {Community, communitySchema, initialCommunity} from "../../models/community/Community";
import {createCommunity} from "./core/_requests";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCountries, getStates} from "../misc/core/_requests";
import {selectCustomStyles} from "../activities/core/_consts";
import Select from "react-select";
import {CommunityAddress, initialCommunityAddress} from "../../models/community/CommunityAddress";
import {submitForm, updateData} from "../../helpers/FormHelper";
import {createRole} from "../identity/role/core/_requests";

const stateSelect: any[] = []
const countrySelect: any[] = []

const CommunityCreate = () => {
    const [community, setCommunity] = useState<Community>(initialCommunity)
    const [communityAddress, setCommunityAddress] = useState<CommunityAddress>(initialCommunityAddress)
    const navigate = useNavigate()

    const toIndex = () => {
        navigate('/communities')
    }

    const handleSubmit = async () => {
        await submitForm(createCommunity, community, toIndex)
    };

    const formik = useFormik({
        initialValues: initialCommunity,
        validationSchema: communitySchema,
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

    const handleOnChange = (event: any) => {
        updateData({[event.target.name]: event.target.value}, setCommunity, community);
    };

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

                        <Formik initialValues={community} onSubmit={values => {
                            // same shape as initial values
                            console.log(values);
                        }}
                                validationSchema={communitySchema}>
                            {
                                ({isSubmitting, isValid, touched, errors}) => (
                                    <Form onChange={handleOnChange} className='form'>

                                        <div className='d-flex flex-column me-n7 pe-7 pt-5'>
                                            <div className="row mb-6">
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        placeholder="Community Name"
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            {"is-invalid": touched.name && errors.name},
                                                            {"is-valid": touched.name && !errors.name}
                                                        )}
                                                        autoComplete="off"
                                                        disabled={isSubmitting}
                                                    />
                                                    {/*<div className='text-danger mt-2'>*/}
                                                    {/*    <ErrorMessage name='name'/>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>

                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Description</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        as='textarea'
                                                        name='description'
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            {"is-invalid": touched.description && errors.description},
                                                            {"is-valid": touched.description && !errors.description}
                                                        )}
                                                        placeholder='Community Description'
                                                        rows={3}
                                                    />
                                                    {/*<div className='text-danger mt-2'>*/}
                                                    {/*    <ErrorMessage name='description'/>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>

                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Image</label>
                                                <div className="col-lg-8 fv-row">
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
                                            </div>

                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Banner Image</label>
                                                <div className="col-lg-8 fv-row">
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

                                            <div className="separator separator-dashed my-6"></div>

                                            <div className='row mb-6'>
                                                <div className="col-12">
                                                    <h4 className='text-dark'>Contact Info:</h4>
                                                </div>
                                            </div>

                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type='text'
                                                        name='contact.name'
                                                        placeholder='Contact Name'
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            // {"is-invalid": touched.name && errors.name},
                                                            // {"is-valid": touched.name && !errors.name}
                                                        )}
                                                    />
                                                </div>

                                                {/*<div className='text-danger mt-2'>*/}
                                                {/*    <ErrorMessage name='contact.name'/>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type='text'
                                                        name='contact.email'
                                                        placeholder='Contact Email'
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            // {"is-invalid": touched.name && errors.name},
                                                            // {"is-valid": touched.name && !errors.name}
                                                        )}
                                                    />
                                                </div>

                                                {/*<div className='text-danger mt-2'>*/}
                                                {/*    <ErrorMessage name='contact.email'/>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Phone
                                                    Number</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type='text'
                                                        name='contact.phone_number'
                                                        placeholder='Phone Number...'
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            // {"is-invalid": touched.name && errors.name},
                                                            // {"is-valid": touched.name && !errors.name}
                                                        )}
                                                    />
                                                </div>
                                                {/*<div className='text-danger mt-2'>*/}
                                                {/*    <ErrorMessage name='contact.phone_number'/>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className="separator separator-dashed my-6"></div>

                                            <div className='row mb-6'>
                                                <div className="col-12">
                                                    <h4 className='text-dark'>Address:</h4>
                                                </div>
                                            </div>

                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Address
                                                    One</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type='text'
                                                        name='address.address_one'
                                                        placeholder='ex: 420 Broadway'
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            // {"is-invalid": touched.name && errors.name},
                                                            // {"is-valid": touched.name && !errors.name}
                                                        )}
                                                    />
                                                </div>

                                                {/*<div className='text-danger mt-2'>*/}
                                                {/*    <ErrorMessage name='address.address_one'/>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Address
                                                    Two</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type='text'
                                                        name='address.address_two'
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            // {"is-invalid": touched.name && errors.name},
                                                            // {"is-valid": touched.name && !errors.name}
                                                        )}
                                                        placeholder='ex: Unit 134'
                                                    />
                                                </div>

                                                {/*<div className='text-danger mt-2'>*/}
                                                {/*    <ErrorMessage name='address.address_two'/>*/}
                                                {/*</div>*/}
                                            </div>


                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">City</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type='text'
                                                        name='address.city'
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            // {"is-invalid": touched.name && errors.name},
                                                            // {"is-valid": touched.name && !errors.name}
                                                        )}
                                                        placeholder='ex: Boston'
                                                    />
                                                </div>

                                                {/*<div className='text-danger mt-2'>*/}
                                                {/*    <ErrorMessage name='address.city'/>*/}
                                                {/*</div>*/}
                                            </div>


                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">State</label>
                                                <div className="col-lg-8 fv-row">
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
                                                </div>
                                                {/*<div className='text-danger mt-2'>*/}
                                                {/*    <ErrorMessage name='address.state_province'/>*/}
                                                {/*</div>*/}
                                            </div>


                                            <div className='row mb-6'>
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Postal Code</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type='text'
                                                        name='address.postal_code'
                                                        className={clsx("form-control mb-3 mb-lg-0",
                                                            // {"is-invalid": touched.name && errors.name},
                                                            // {"is-valid": touched.name && !errors.name}
                                                        )}
                                                        placeholder='ex: 95125'
                                                    />
                                                </div>
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
                                                        <span
                                                            className='spinner-border spinner-border-sm align-middle ms-2'/>
                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </Form>
                                )
                            }

                        </Formik>

                    </KTCardBody>
                </KTCard>
            </FormikProvider>
        </>
    )
}

export {CommunityCreate}