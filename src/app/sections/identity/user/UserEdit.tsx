import React, { FC, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";
import { useParams } from "react-router-dom";
import { updateUser } from "./core/UserRequests";
import { jsonToFormData } from "../../../helpers/form/FormHelper";
import { formOnChange, userSchema } from "./models/User";
import { AvatarImage } from "./partials/AvatarImage";
import { UserFormPage } from "./UserFormPage";
import { initUserForm, UserForm } from "./models/UserForm";
import { useUser } from "./core/UserContext";
import toast from "react-hot-toast";


const UserEdit: FC = () => {
  const { user, setUser } = useUser();
  const [userForm, setUserForm] = useState<UserForm>(initUserForm(user));

  const params = useParams();

  useEffect(() => {
    setUserForm(initUserForm(user));
  }, [user])

  const handleSubmit = async () => {
    let data = jsonToFormData(userForm);
    data.append("_method", "PUT");

    await updateUser(params.id, data).then((response) => {
      setUser(response)
      toast.success('User updated Successfully!');
    });
  };

  const handleOnChange = (e: any) => formOnChange(e, userForm, setUserForm);

  return (
    <>
      <KTCard>
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">Update User</h3>
          </div>
        </div>
        <Formik
          initialValues={userForm}
          onSubmit={handleSubmit}
          validationSchema={userSchema}
          enableReinitialize
        >
          {({ isSubmitting, isValid, touched }) => (
            <Form onChange={handleOnChange} className="form" encType="multipart/form-data" autoComplete='false'>
              <KTCardBody className="py-4">
                <div className="d-flex flex-column pt-5">
                  <AvatarImage user={userForm} setUser={setUserForm} />

                  <UserFormPage method={"edit"} user={userForm} setUser={setUserForm} />
                </div>
              </KTCardBody>
              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button
                  type="submit"
                  className="btn btn-light-mc-secondary btn-active-mc-secondary btn-sm"
                  disabled={isSubmitting || !isValid || !touched}
                >
                  <span className="indicator-label">Save Changes</span>
                  {isSubmitting && (
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2" />
                    </span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  );
};

export { UserEdit };
