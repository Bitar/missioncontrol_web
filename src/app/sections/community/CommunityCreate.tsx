import {PageTitle} from "../../../_metronic/layout/core";
import {isNotEmpty, KTCard, KTCardBody} from "../../../_metronic/helpers";
import clsx from "clsx";
import {Field, getIn, useFormik} from "formik";
import * as Yup from "yup";
import {initialCommunity} from "../../models/community/Community";
import { createCommunity } from "./core/_requests";
import Swal from "sweetalert2";


const createPlanSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Description is required'),
    contact:Yup.object().shape({
            arr: Yup.array().of(Yup.object().shape({ name: Yup.string().required('Name is required'), email: Yup.string().required('Email is required'), phone_number: Yup.string().required('Phone Number is required')})),
            }),
    address:Yup.object().shape({
             arr: Yup.array().of(Yup.object().shape({ address_one: Yup.string().required('Description is required') , address_two: Yup.string(), city: Yup.string(),state_province: Yup.string() ,postal_code: Yup.string(), country_code: Yup.string()  })),
             }) , 
    banner_image:Yup.mixed().required('File is required'),
    logo:Yup.mixed().required('File is required')
})

const CommunityCreate = () => {

    const formik = useFormik({
        initialValues: initialCommunity,
        validationSchema: createPlanSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    // await updateUser(values)
                } else {
                    //console.log(values)
                    let formData = new FormData()

                    formData.append('logo',values.logo!)
                    formData.append('banner_image',values.banner_image!)
                    formData.append('name',values.name!)
                    formData.append('description',values.description!)
                    formData.append('contact[name]',values.contact!.name)
                    formData.append('contact[email]',values.contact!.email)
                    formData.append('contact[phone_number]',values.contact!.phone_number)
                    formData.append('address[address_one]',values.address!.address_one)
                    formData.append('address[address_two]',values.address!.address_two)
                    formData.append('address[city]',values.address!.city)
                    formData.append('address[state_province]',values.address!.state_province)
                    formData.append('address[postal_code]',values.address!.postal_code)
                    formData.append('address[country_code]',values.address!.country_code)
                    
                    

                    //response
                    const potato = await createCommunity(formData)
                    //get the id and pass it as param to the community details
                    console.log(potato?.id)
                    //'community/:`potato?/id`'
                    //make sure error 
                    Swal.fire(
                        'Good job!',
                        'You created your community!',
                        'success'
                      )
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
                    <form className='form' method="post" encType="multipart/form-data"  onSubmit={formik.handleSubmit} noValidate>
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

                                {/* begin::Input group */}
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
                            {/* end::Input group */}
                       
                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Contact Name</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='Contact Name'
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
                                <label className='required fw-bold fs-6 mb-2'>Contact Email</label>
                                {/* end::Label */}

                                {/* begin::Input */}

                            
                                <input
                                    placeholder='Contact Email'
                                    {...formik.getFieldProps('email')}
                                    type="email"
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
                                <label className='required fw-bold fs-6 mb-2'>Phone number</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='Contact Phone Number'
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

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Address One</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:1350 Boylston Street'
                                    {...formik.getFieldProps('address_one')}
                                    type='text'
                                    name='address.address_one'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.address && formik.errors.address},
                                        {
                                            'is-valid': formik.touched.address && !formik.errors.address,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.address}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */} 
                            </div>


                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Address Two</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:Unit 611'
                                    {...formik.getFieldProps('address_two')}
                                    type='text'
                                    name='address.address_two'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.address && formik.errors.address},
                                        {
                                            'is-valid': formik.touched.address && !formik.errors.address,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.address}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */} 
                            </div>

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>City</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:Boston'
                                    {...formik.getFieldProps('city')}
                                    type='text'
                                    name='address.city'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.address && formik.errors.address},
                                        {
                                            'is-valid': formik.touched.address && !formik.errors.address,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.address}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */} 
                            </div>

                            
                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>State</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:MA'
                                    {...formik.getFieldProps('state_province')}
                                    type='text'
                                    name='address.state_province'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.address && formik.errors.address},
                                        {
                                            'is-valid': formik.touched.address && !formik.errors.address,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.address}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */} 
                            </div>


                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Postal Code</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:02215'
                                    {...formik.getFieldProps('postal_code')}
                                    type='text'
                                    name='address.postal_code'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.address && formik.errors.address},
                                        {
                                            'is-valid': formik.touched.address && !formik.errors.address,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.address}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */} 
                            </div>

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Country Code</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    placeholder='ex:US'
                                    {...formik.getFieldProps('country_code')}
                                    type='text'
                                    name='address.country_code'
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.address && formik.errors.address},
                                        {
                                            'is-valid': formik.touched.address && !formik.errors.address,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.address}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */} 
                            </div>

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>logo</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    type='file'
                                    name='file'
                                     // @ts-ignore
                                     onChange={(event) => formik.setFieldValue('logo',event.target.files[0])}
                                     //onChange={(event) => console.log('banner_image',event.target.files[0])}
                                    
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.logo && formik.errors.logo},
                                        {
                                            'is-valid': formik.touched.logo && !formik.errors.logo,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.logo && formik.errors.logo && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.logo}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */} 
                            </div>

                            <div className='fv-row mb-7'>
                                {/* begin::Label */}
                                <label className='required fw-bold fs-6 mb-2'>Banner Image</label>
                                {/* end::Label */}

                                {/* begin::Input */}
                                <input
                                    type='file'
                                    name='file'
                                     // @ts-ignore
                                     onChange={(event) => formik.setFieldValue('banner_image',event.target.files[0])}
                                     //onChange={(event) => console.log('banner_image',event.target.files[0])}
                                    
                                    className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {'is-invalid': formik.touched.banner_image && formik.errors.banner_image},
                                        {
                                            'is-valid': formik.touched.banner_image && !formik.errors.banner_image,
                                        }
                                    )}
                                    autoComplete='off'
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.banner_image && formik.errors.banner_image && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.banner_image}</span>
                                        </div>
                                    </div>
                                )}
                                {/* end::Input */} 
                            </div>


                            

                       
                        </div>
                      

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