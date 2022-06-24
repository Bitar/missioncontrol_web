import React, {FC, useState} from 'react'
import {useFormik} from "formik";
import {Activity} from "../../models/activity/Activity";
import * as Yup from "yup";

const editActivitySchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
})

const ActivityCreate: FC = () => {
    const [activity, setActivity] = useState<Activity | undefined>()
    const initialValues = {
        title: activity?.title || ''
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: editActivitySchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                // await updateRole(params.id, values)
            } catch (ex) {

            } finally {
                setSubmitting(false)
                // cancel()
            }
        }
    })

    return (
        <>
            <form className='form d-flex flex-column flex-lg-row' onSubmit={formik.handleSubmit} noValidate>

                {/* Aside */}
                <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
                    <div className="card card-flush py-4">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Thumbnail</h2>
                            </div>
                        </div>
                        <div className="card-body text-center pt-0">
                            <div className="image-input image-input-empty image-input-outline mb-3" data-kt-image-input="true">
                                {/*style="background-image: url(assets/media/svg/files/blank-image.svg)"*/}
                                <div className="image-input-wrapper w-150px h-150px"/>
                                <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip"
                                       title="Change avatar">
                                    <i className="bi bi-pencil-fill fs-7"/>
                                    <input type="file" name="avatar" accept=".png, .jpg, .jpeg"/>
                                    <input type="hidden" name="avatar_remove"/>
                                </label>
                                <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip"
                                      title="Cancel avatar">
														<i className="bi bi-x fs-2"/>
													</span>
                                <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip"
                                      title="Remove avatar">
														<i className="bi bi-x fs-2"/>
													</span>
                            </div>
                            <div className="text-muted fs-7">Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</div>
                        </div>
                    </div>
                    {/*<div className="card card-flush py-4">*/}
                    {/*    <div className="card-header">*/}
                    {/*        <div className="card-title">*/}
                    {/*            <h2>Status</h2>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-toolbar">*/}
                    {/*            <div className="rounded-circle bg-success w-15px h-15px" id="kt_ecommerce_add_product_status"/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="card-body pt-0">*/}
                    {/*        /!*<select className="form-select mb-2" data-control="select2" data-hide-search="true" data-placeholder="Select an option" id="kt_ecommerce_add_product_status_select">*!/*/}
                    {/*        /!*    <option/>*!/*/}
                    {/*        /!*    <option value="published" selected={true}>Published</option>*!/*/}
                    {/*        /!*    <option value="draft">Draft</option>*!/*/}
                    {/*        /!*    <option value="scheduled">Scheduled</option>*!/*/}
                    {/*        /!*    <option value="inactive">Inactive</option>*!/*/}
                    {/*        /!*</select>*!/*/}
                    {/*        <div className="text-muted fs-7">Set the product status.</div>*/}
                    {/*        <div className="d-none mt-10">*/}
                    {/*            <label htmlFor="kt_ecommerce_add_product_status_datepicker" className="form-label">Select publishing date and time</label>*/}
                    {/*            <input className="form-control" id="kt_ecommerce_add_product_status_datepicker" placeholder="Pick date &amp; time"/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="card card-flush py-4">*/}
                    {/*    <div className="card-header">*/}
                    {/*        <div className="card-title">*/}
                    {/*            <h2>Product Details</h2>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="card-body pt-0">*/}
                    {/*        <label className="form-label">Categories</label>*/}
                    {/*        /!*<select className="form-select mb-2" data-control="select2" data-placeholder="Select an option" data-allow-clear="true" multiple={true}>*!/*/}
                    {/*        /!*    <option/>*!/*/}
                    {/*        /!*    <option value="Computers">Computers</option>*!/*/}
                    {/*        /!*    <option value="Watches">Watches</option>*!/*/}
                    {/*        /!*    <option value="Headphones">Headphones</option>*!/*/}
                    {/*        /!*    <option value="Footwear">Footwear</option>*!/*/}
                    {/*        /!*    <option value="Cameras">Cameras</option>*!/*/}
                    {/*        /!*    <option value="Shirts">Shirts</option>*!/*/}
                    {/*        /!*    <option value="Household">Household</option>*!/*/}
                    {/*        /!*    <option value="Handbags">Handbags</option>*!/*/}
                    {/*        /!*    <option value="Wines">Wines</option>*!/*/}
                    {/*        /!*    <option value="Sandals">Sandals</option>*!/*/}
                    {/*        /!*</select>*!/*/}
                    {/*        <div className="text-muted fs-7 mb-7">Add product to a category.</div>*/}
                    {/*        <a href="../../demo1/dist/apps/ecommerce/catalog/add-category.html" className="btn btn-light-primary btn-sm mb-10">*/}
                    {/*            <span className="svg-icon svg-icon-2">*/}
                    {/*								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">*/}
                    {/*									<rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"/>*/}
                    {/*									<rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor"/>*/}
                    {/*								</svg>*/}
                    {/*							</span>*/}
                    {/*            Create new category</a>*/}
                    {/*        <label className="form-label d-block">Tags</label>*/}
                    {/*        <input id="kt_ecommerce_add_product_tags" name="kt_ecommerce_add_product_tags" className="form-control mb-2" value=""/>*/}
                    {/*        <div className="text-muted fs-7">Add tags to a product.</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="card card-flush py-4">*/}
                    {/*    <div className="card-header">*/}
                    {/*        <div className="card-title">*/}
                    {/*            <h2>Weekly Sales</h2>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="card-body pt-0">*/}
                    {/*        <span className="text-muted">No data available. Sales data will begin capturing once product has been published.</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="card card-flush py-4">*/}
                    {/*    <div className="card-header">*/}
                    {/*        <div className="card-title">*/}
                    {/*            <h2>Product Template</h2>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="card-body pt-0">*/}
                    {/*        <label htmlFor="kt_ecommerce_add_product_store_template" className="form-label">Select a product template</label>*/}
                    {/*        /!*<select className="form-select mb-2" data-control="select2" data-hide-search="true" data-placeholder="Select an option" id="kt_ecommerce_add_product_store_template">*!/*/}
                    {/*        /!*    <option/>*!/*/}
                    {/*        /!*    <option value="default" selected={true}>Default template</option>*!/*/}
                    {/*        /!*    <option value="electronics">Electronics</option>*!/*/}
                    {/*        /!*    <option value="office">Office stationary</option>*!/*/}
                    {/*        /!*    <option value="fashion">Fashion</option>*!/*/}
                    {/*        /!*</select>*!/*/}
                    {/*        <div className="text-muted fs-7">Assign a template from your current theme to define how a single product is displayed.</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {/* Main */}
            </form>
        </>
    )
}

export {ActivityCreate}
