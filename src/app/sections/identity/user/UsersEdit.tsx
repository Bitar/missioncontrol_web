import React, {useEffect, useState} from "react";
import {Form, Field, Formik} from "formik";
import {KTCard, KTCardBody} from "../../../../_metronic/helpers";
import {PageTitle} from "../../../../_metronic/layout/core";
import {useNavigate, useParams} from "react-router-dom";
import {getUserById, updateUser} from "./core/_requests";
import {submitForm, updateData} from "../../../helpers/FormHelper";
import {User, userInitial, userSchema} from "../../../models/identity/User";

const UsersEdit = () => {
    const [user, setUser] = useState<User | undefined>();
    const navigate = useNavigate();
    const params = useParams();

    const toIndex = () => {
        navigate('/users')
    }

    const handleSubmit = async () => {
        await submitForm(updateUser, user, toIndex, params.user)
    };

    const handleOnChange = (event: any) => {
        updateData({[event.target.name]: event.target.value}, setUser, user);
    };

    useEffect(() => {
        getUserById(params.user).then(response => {
            console.log(response)
            setUser(response);
        });
    }, [params.user]);

    return (
        <>
            <PageTitle breadcrumbs={[]}>{"Users"}</PageTitle>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2"/>
                        </span>
                        <h3 className="card-label">
                            Edit User
                        </h3>
                    </div>
                </div>
                <KTCardBody className="py-4">
                    <Formik initialValues={userInitial(user)} onSubmit={handleSubmit} validationSchema={userSchema} enableReinitialize={true}>
                        {
                            ({isSubmitting, isValid, touched}) => {
                                return (
                                    <Form onChange={handleOnChange} className="form">
                                        {/* begin::Scroll */}
                                        <div className="d-flex flex-column me-n7 pe-7 pt-5">
                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label required fw-bold fs-6">Full
                                                    Name</label>

                                                <div className="col-lg-8">
                                                    <div className="row">
                                                        <div className="col-lg-6 fv-row">
                                                            <Field
                                                                type="text"
                                                                name="first_name"
                                                                placeholder="First Name"
                                                                className={"form-control mb-3 mb-lg-0"}
                                                                autoComplete="off"
                                                            />
                                                        </div>

                                                        <div className="col-lg-6 fv-row">
                                                            <Field
                                                                type="text"
                                                                name="last_name"
                                                                placeholder="Last Name"
                                                                className={"form-control mb-3 mb-lg-0"}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-6">
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type="text"
                                                        name="email"
                                                        placeholder="Email"
                                                        className={"form-control mb-3 mb-lg-0"}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-6">
                                                <label
                                                    className="col-lg-4 col-form-label required fw-bold fs-6">Password</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        className={"form-control mb-3 mb-lg-0"}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label required fw-bold fs-6">Password
                                                    Confirmation</label>
                                                <div className="col-lg-8 fv-row">
                                                    <Field
                                                        type="password"
                                                        name="password_confirmation"
                                                        placeholder="Password"
                                                        className={"form-control mb-3 mb-lg-0"}
                                                        autoComplete="off"
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
                                                disabled={isSubmitting}>
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
                                                    <span className="indicator-progress">
                                                    Please wait...{" "}
                                                        <span
                                                            className="spinner-border spinner-border-sm align-middle ms-2"/>
                                                </span>
                                                )}
                                            </button>
                                        </div>
                                        {/* end::Actions */}
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </KTCardBody>
            </KTCard>
        </>
    );
};

export {UsersEdit};