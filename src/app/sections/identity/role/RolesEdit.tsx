import React, { useEffect, useState } from "react";
import { Role, roleInitial, roleSchema } from "../../../models/identity/Role";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import { getRoleById, updateRole } from "./core/_requests";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";
import clsx from "clsx";
import { submitForm, updateData } from "../../../helpers/FormHelper";


const RolesEdit = () => {
    const [role, setRole] = useState<Role | undefined>();
    const navigate = useNavigate();
    const params = useParams();

    const toIndex = () => {
        navigate("/roles");
    };

    const handleSubmit = async () => {
        await submitForm(updateRole, role, toIndex, params.id);
    };

    const handleOnChange = (event: any) => {
        updateData({ [event.target.name]: event.target.value }, setRole, role);
    };

    useEffect(() => {
        getRoleById(params.id).then(response => {
            setRole(response);
        });
    }, [params.id]);

    return (
        <>
            <PageTitle breadcrumbs={[]}>{"Roles"}</PageTitle>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2" />
                        </span>
                        <h3 className="card-label">
                            Edit Role
                        </h3>
                    </div>
                </div>
                <KTCardBody className="py-4">
                    <Formik initialValues={roleInitial(role)} onSubmit={handleSubmit} validationSchema={roleSchema}
                            enableReinitialize={true}>
                        {
                            ({ isSubmitting, isValid, touched, errors }) => (
                                <Form onChange={handleOnChange} className="form">

                                    <div className="d-flex flex-column me-n7 pe-7 pt-5">
                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
                                            <div className="col-lg-8 fv-row">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    className={clsx("form-control mb-3 mb-lg-0",
                                                        { "is-invalid": touched.name && errors.name },
                                                        { "is-valid": touched.name && !errors.name }
                                                    )}
                                                    autoComplete="off"
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-5">
                                        <button
                                            type="reset"
                                            onClick={() => toIndex()}
                                            className="btn btn-light me-3"
                                            data-kt-users-modal-action="cancel"
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            data-kt-users-modal-action="submit"
                                            disabled={isSubmitting || !isValid || !touched}
                                        >
                                            <span className="indicator-label">Submit</span>
                                            {(isSubmitting) && (
                                                <span className="indicator-progress"> Please wait...{" "} <span
                                                    className="spinner-border spinner-border-sm align-middle ms-2" /> </span>
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </KTCardBody>
            </KTCard>
        </>
    );
};

export { RolesEdit };