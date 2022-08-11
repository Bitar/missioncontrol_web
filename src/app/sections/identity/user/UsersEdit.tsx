import React, {useEffect, useState} from "react";
import {Form, Field, Formik} from "formik";
import {KTCard, KTCardBody} from "../../../../_metronic/helpers";
import {useNavigate, useParams} from "react-router-dom";
import {getUserById, updateUser} from "./core/_requests";
import {submitForm, updateData} from "../../../helpers/FormHelper";
import {User, userInitial, userSchema} from "../../../models/identity/User";
import AsyncSelect from "react-select/async";
import {getRoles} from "../role/core/_requests";

const UsersEdit = () => {
    const [user, setUser] = useState<User | undefined>();
    const navigate = useNavigate();
    const params = useParams();

    const toIndex = () => {
        navigate('/users')
    }

    const handleSubmit = async () => {
        await submitForm(updateUser, user, toIndex, params.id)
    };

    const handleOnChange = (event: any) => {
        updateData({[event.target.name]: event.target.value}, setUser, user);
    };

    useEffect(() => {
        getUserById(params.id).then(response => {
            setUser(response);
        });
    }, [params.id]);

    const loadRoles = (searchValue: any, callback: any) => {
        getRoles().then(response => {
            let roles: any[] = [];

            response?.data?.forEach(function (value) {
                roles.push({value: value.id, label: value.name, original: value});
            });

            callback(roles);
        })
    }

    const handleChange = (selectedOption: any) => {
        let rolesObject = selectedOption.map((option: any) => {
            delete option.original.name
            return option.original
        })

        updateData({'roles': rolesObject}, setUser, user);
    }

    return (
        <>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">
                            Edit User
                        </h3>
                    </div>
                </div>
                <Formik initialValues={userInitial(user)} onSubmit={handleSubmit} validationSchema={userSchema} enableReinitialize={true}>
                    {
                        ({isSubmitting, isValid, touched}) => {
                            return (
                                <>
                                    <Form onChange={handleOnChange} className="form">
                                        <KTCardBody className="py-4">
                                            <div className="d-flex flex-column pt-5">
                                                <div className="row mb-6">
                                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Full Name</label>

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

                                                <div className='row mb-6'>
                                                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Roles</label>
                                                    <div className='col-lg-8 fv-row'>
                                                        <AsyncSelect
                                                            loadOptions={loadRoles}
                                                            defaultOptions
                                                            isMulti
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="separator separator-dashed my-6"></div>

                                                {/* TODO: Ask for separate forms for password and update */}

                                                <div className='row mb-6'>
                                                    <div className="col-12">
                                                        <h4 className='text-dark'>Update Password:</h4>
                                                    </div>
                                                </div>

                                                <div className="row mb-6">
                                                    <label
                                                        className="col-lg-4 col-form-label fw-bold fs-6">Password</label>
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
                                                    <label className="col-lg-4 col-form-label fw-bold fs-6">Password Confirmation</label>
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
                                        </KTCardBody>
                                        <div className="card-footer d-flex justify-content-end py-6 px-9">
                                            <button
                                                type="submit"
                                                className="btn btn-light-primary btn-active-primary btn-sm"
                                                disabled={isSubmitting || !isValid || !touched}
                                            >
                                                <span className="indicator-label">Save Changes</span>
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
                    }
                </Formik>
            </KTCard>
        </>
    );
};

export {UsersEdit};