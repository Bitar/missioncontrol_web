import React, { useState } from "react";
import { Form, Formik } from "formik";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";
import { useNavigate } from "react-router-dom";
import { createUser } from "./core/_requests";
import { jsonToFormData, updateData } from "../../../helpers/form/FormHelper";
import { User, initialUser, userSchema } from "../../../models/identity/User";
import { AvatarImage } from "./partials/AvatarImage";
import { UsersForm } from "./UsersForm";

const UsersCreate = () => {
    const [user, setUser] = useState<User>(initialUser);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let data = jsonToFormData(user);
        await createUser(data)
          .then(response => navigate("/users/" + response?.id));
    };

    const handleOnChange = (event: any) => {
        let target_name = event.target.name;

        if (target_name.includes("meta.")) {
            let meta_field = target_name.split("meta.")[1];
            let value;

            if (meta_field === "image") {
                value = event.target.files[0];
            } else {
                value = event.target.value;
            }

            updateData({
                "meta": { ...user?.meta, ...{ [meta_field]: value } }
            }, setUser, user);
        } else {
            updateData({ [event.target.name]: event.target.value }, setUser, user);
        }
    };

    return (
      <>
          <KTCard>
              <div className="card-header">
                  <div className="card-title">
                      <span className="card-icon">
                          <i className="las la-plus fs-2" />
                      </span>
                      <h3 className="card-label">
                          Add User
                      </h3>
                  </div>
              </div>
              <Formik initialValues={user} onSubmit={handleSubmit} validationSchema={userSchema(true)}>
                  {
                      ({ isSubmitting, isValid, touched }) => {
                          return (
                            <>
                                <Form onChange={handleOnChange} className="form" encType="multipart/form-data">
                                    <KTCardBody className="py-4">
                                        <div className="d-flex flex-column pt-5">
                                            <AvatarImage user={user} setUser={setUser} />

                                            <UsersForm method={"create"} user={user} setUser={setUser} />
                                        </div>
                                    </KTCardBody>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button
                                          type="submit"
                                          className="btn btn-light-primary btn-active-primary btn-sm"
                                          data-kt-users-modal-action="submit"
                                          disabled={isSubmitting || !isValid || !touched}
                                        >
                                            <span className="indicator-label">Add User</span>
                                            {(isSubmitting) && (
                                              <span className="indicator-progress">
                                                  Please wait...{" "}
                                                  <span
                                                    className="spinner-border spinner-border-sm align-middle ms-2" />
                                              </span>
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            </>
                          );
                      }
                  }
              </Formik>
          </KTCard>
      </>
    );
};

export { UsersCreate };