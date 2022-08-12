import React, {FC} from "react";
import {Form, Formik} from "formik";
import {KTCard, KTCardBody} from "../../../../_metronic/helpers";
import {useNavigate, useParams} from "react-router-dom";
import {updateUser} from "./core/_requests";
import {jsonToFormData, updateData} from "../../../helpers/form/FormHelper";
import {User, initialUser, userSchema} from "../../../models/identity/User";
import {AvatarImage} from "./partials/AvatarImage";
import {UserForm} from "./UserForm";

type Props = {
    user: User | undefined,
    setUser: any
}

const UserEdit: FC<Props> = ({user, setUser}) => {

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async () => {
        let data = jsonToFormData(user)
        data.append('_method', 'PUT')

        await updateUser(params.id, data)
            .then(response => {
                setUser(response)
                navigate('/users/' + response?.id)
            })
    };

    const handleOnChange = (event: any) => {
        let target_name = event.target.name

        if (target_name.includes('meta.')) {
            let meta_field = target_name.split("meta.")[1]
            let value;

            if (meta_field === 'image') {
                value = event.target.files[0]
            } else {
                value = event.target.value
            }

            updateData({
                'meta': {...user?.meta, ...{[meta_field]: value}}
            }, setUser, user)

        } else {
            updateData({[target_name]: event.target.value}, setUser, user);
        }
    };

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

                                                <UserForm method={'edit'} user={user} setUser={setUser}/>

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

export {UserEdit};