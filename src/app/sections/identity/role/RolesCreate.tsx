import React, {useState} from "react";
import {Form, Field, Formik} from "formik";
import {KTCard, KTCardBody} from "../../../../_metronic/helpers";
import {useNavigate} from "react-router-dom";
import {Role, roleInitial, roleSchema} from "../../../models/identity/Role";
import {createRole} from "./core/_requests";
import {submitForm, updateData} from "../../../helpers/form/FormHelper";

const RolesCreate = () => {
    const [role, setRole] = useState<Role>(roleInitial);

    const navigate = useNavigate();

    const toIndex = () => {
        navigate('/roles')
    }

    const handleSubmit = async () => {
        await submitForm(createRole, role, toIndex)
    };

    const handleOnChange = (event: any) => {
        updateData({[event.target.name]: event.target.value}, setRole, role);
    };

    return (
        <>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2"/>
                        </span>
                        <h3 className="card-label">
                            Add Role
                        </h3>
                    </div>
                </div>
                <Formik initialValues={role} onSubmit={handleSubmit} validationSchema={roleSchema}>
                    {
                        ({isSubmitting, isValid, touched, errors}) => (
                            <>
                                <Form onChange={handleOnChange} className="form">
                                    <KTCardBody className="py-4">
                                        <div className="d-flex flex-column pt-5">
                                            <div className="row mb-6">
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name"
                                                        className="form-control mb-3 mb-lg-0"
                                                        autoComplete="off"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </KTCardBody>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button
                                            type="submit"
                                            className="btn btn-light-primary btn-active-primary btn-sm"
                                            data-kt-users-modal-action="submit"
                                            disabled={isSubmitting || !isValid || !touched}
                                        >
                                            <span className="indicator-label">Add Role</span>
                                            {(isSubmitting) && (
                                                <span className="indicator-progress">
                                                    Please wait...{" "}
                                                    <span
                                                        className="spinner-border spinner-border-sm align-middle ms-2"/>
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            </>
                        )
                    }
                </Formik>
            </KTCard>
        </>
    );
};

export {RolesCreate};