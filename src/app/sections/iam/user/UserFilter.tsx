import React, { FC, useState } from "react";
import { useQueryRequest } from "../../../modules/table/QueryRequestProvider";
import { Field, Form, Formik } from "formik";
import { initialQueryState } from "../../../helpers/crud-helper/models";
import { updateData } from "../../../helpers/form/FormHelper";
import { Button } from "react-bootstrap";

const initUser = {
  first_name: "",
  last_name: "",
  email: ""
};

type UserFilterObj = {
  first_name: string
  last_name: string
  email: string
}

const UserFilter: FC = () => {
  const { updateState } = useQueryRequest();

  const [userFilters, setUserFilters] = useState<UserFilterObj>(initUser);

  const filterData = () => {
    updateState({
      filter: userFilters,
      ...initialQueryState
    });
  };

  const handleOnChange = (e: any) =>
    updateData({ [e.target.name]: e.target.value }, setUserFilters, userFilters);

  return (
    <div className="bg-primary bg-opacity-5 p-10 mb-15 card-rounded">
      <Formik initialValues={userFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className="form">
          <div className="row">
            <div className="col-lg-4 mb-5">
              <Field
                type="text"
                name="first_name"
                placeholder="First Name"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>

            <div className="col-lg-4 mb-5">
              <Field
                type="text"
                name="last_name"
                placeholder="Last Name"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>

            <div className="col-lg-4 mb-5">
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>
          </div>
          <Button variant="primary" type="submit">Filter</Button>
        </Form>
      </Formik>
    </div>
  );
};

export { UserFilter };
