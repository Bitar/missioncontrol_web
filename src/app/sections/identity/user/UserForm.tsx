import { Field } from "formik";
import React, { FC, useEffect, useState } from "react";
import { User } from "./models/User";
import { getRoles } from "../role/core/_requests";
import { updateData } from "../../../helpers/form/FormHelper";
import { DatePickerMC } from "../../../helpers/form/DatePickerMC";
import Select from "react-select";

type Props = {
  method: string
  user: User | undefined
  setUser: any
}

let rolesOptions: any[] = [];

const UserForm: FC<Props> = ({ method, user, setUser }) => {
  const [selected, setSelected] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (rolesOptions.length === 0) {
      getRoles().then((response) => {
        response?.data?.forEach(function(value) {
          let option = { value: value.id, label: value.name, isSelected: false };
          rolesOptions.push(option);
        });
      });
    }
  }, []);

  useEffect(() => {
    if (user?.roles) {
      user?.roles?.forEach(function(role) {
        setSelected((prevState) => ({
          ...prevState,
          ...{
            value: role.id,
            label: role.name,
            isSelected: true
          }
        }));
      });
      setLoaded(true);
    }
  }, [user]);

  const handleChange = (selectedOption: any) => {
    let rolesObject = selectedOption.map((option: any) => {
      return {
        id: option.value,
        name: option.label
      };
    });

    setSelected(rolesObject);

    updateData({ roles: rolesObject }, setUser, user);
  };

  return (
    <>
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
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
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
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Roles</label>
        <div className="col-lg-8 fv-row">
          {(loaded || method === "create") && (
            <Select
              isMulti
              isSearchable
              defaultValue={selected}
              options={rolesOptions}
              onChange={handleChange}
            />
          )}
        </div>
      </div>

      <div className="separator separator-dashed my-6"></div>

      <div className="row mb-6">
        <div className="col-12">
          <h4 className="text-dark">Update Password:</h4>
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">Password</label>
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

      <div className="row mb-6">
        <div className="col-12">
          <h4 className="text-dark">Profile Details</h4>
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">Username</label>
        <div className="col-lg-8 fv-row">
          <div className="input-group mb-3">
            <Field
              type="text"
              name="meta.username"
              placeholder="Username"
              className={"form-control mb-3 mb-lg-0"}
              autoComplete="off"
            />
            <span className="input-group-text">#{user?.meta?.rng}</span>
          </div>
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">Date of Birth</label>
        <div className="col-lg-8 fv-row">
          <DatePickerMC user={user} setUser={setUser} />
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">City</label>
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
    </>
  );
};

export { UserForm };
