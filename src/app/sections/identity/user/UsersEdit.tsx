import React, {useEffect, useState} from "react";
import {Form, Field, Formik} from "formik";
import {KTCard, KTCardBody} from "../../../../_metronic/helpers";
import {useNavigate, useParams} from "react-router-dom";
import {getUserById, updateUser} from "./core/_requests";
import {jsonToFormData, updateData} from "../../../helpers/FormHelper";
import {User, initialUser, userSchema} from "../../../models/identity/User";
import AsyncSelect from "react-select/async";
import {getRoles} from "../role/core/_requests";
import {AvatarImage} from "./partials/AvatarImage";

const UsersEdit = () => {
    const [user, setUser] = useState<User | undefined>();
    // const [userMeta, setUserMeta] = useState<UserMeta | undefined>()
    const [selected, setSelected] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async () => {
        let data = jsonToFormData(user)

        data.append('_method', 'PUT')

        await updateUser(params.id, data)
            .then(response => navigate('/users/' + response?.id));
    };

    const handleOnChange = (event: any) => {
        let target_name = event.target.name

        console.log('changing?');

        if (target_name.includes('meta.')) {
            let meta_field = target_name.split("meta.")[1]
            let value;

            if(meta_field === 'image') {
                value = event.target.files[0]
            } else {
                value = event.target.value
            }

            updateData({
                'meta': {...user?.meta, ...{[meta_field]: value}}
            }, setUser, user)

            // updateData({[meta_field]: value}, setUserMeta, userMeta);
            // updateData({'meta': userMeta}, setUser, user);

        } else {
            updateData({[target_name]: event.target.value}, setUser, user);
        }
    };

    useEffect(() => {
        getUserById(params.id, 'include=roles').then(response => {
            setUser(response);
            // setUserMeta(response?.meta)

            response?.roles?.forEach(function (role) {
                setSelected(prevState => ({
                    ...prevState, ...{
                        value: role.id, label: role.name
                    }
                }))
                setLoaded(true)
            });
        });
    }, [params.id]);

    const loadRoles = (searchValue: any, callback: any) => {
        getRoles().then(response => {
            let roles: any[] = [];

            response?.data?.forEach(function (value) {
                let option = {value: value.id, label: value.name}
                roles.push(option);
            });

            callback(roles);
        })
    }

    const handleChange = (selectedOption: any) => {
        let rolesObject = selectedOption.map((option: any) => {
            return {
                'id': option.value
            }
        })

        setSelected(rolesObject)

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
                <Formik initialValues={initialUser(user)}
                        onSubmit={handleSubmit}
                        validationSchema={userSchema}
                        enableReinitialize={true}>
                    {
                        ({isSubmitting, isValid, touched}) => {
                            return (
                                <>
                                    <Form onChange={handleOnChange}
                                          className="form"
                                          encType="multipart/form-data">
                                        <KTCardBody className="py-4">
                                            <div className="d-flex flex-column pt-5">

                                                <AvatarImage user={user} setUser={setUser}/>

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
                                                        {loaded &&
                                                            <AsyncSelect
                                                                isMulti
                                                                cacheOptions
                                                                defaultValue={selected}
                                                                defaultOptions
                                                                loadOptions={loadRoles}
                                                                onChange={handleChange}
                                                            />
                                                        }
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

                                                <div className="separator separator-dashed my-6"></div>

                                                <div className='row mb-6'>
                                                    <div className="col-12">
                                                        <h4 className='text-dark'>Profile Details</h4>
                                                    </div>
                                                </div>

                                                <div className="row mb-6">
                                                    <label
                                                        className="col-lg-4 col-form-label required fw-bold fs-6">Username</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <div className="input-group mb-3">
                                                            <Field
                                                                type="text"
                                                                name='meta.username'
                                                                placeholder="Username"
                                                                className={"form-control mb-3 mb-lg-0"}
                                                                autoComplete="off"

                                                            />
                                                            <span className="input-group-text">#{user?.meta?.rng}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mb-6">
                                                    <label
                                                        className="col-lg-4 col-form-label required fw-bold fs-6">City</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <Field
                                                            type="text"
                                                            name="meta.city"
                                                            placeholder="City"
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