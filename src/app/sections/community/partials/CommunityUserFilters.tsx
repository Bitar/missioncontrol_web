import { KTCardHeader } from "../../../helpers/components/KTCardHeader";
import { Field, Form, Formik } from "formik";
import { KTCardBody } from "../../../helpers/components/KTCardBody";
import { isCommunityAdmin } from "../../identity/user/models/User";
import Select from "react-select";
import { updateData } from "../../../helpers/form/FormHelper";
import { KTCard } from "../../../helpers/components/KTCard";
import React, { useState } from "react";
import { initialQueryState } from "../../../helpers/crud-helper/models";
import { useQueryRequest } from "../../../modules/table/QueryRequestProvider";

const initCommunityFilterObj = {
  first_name: '',
  last_name: '',
  email: ''
}

type CommunityFilterObj = {
  first_name: string,
  last_name: string,
  email: string
}

const CommunityUserFilters = () => {
  const [communityFilters, setCommunityFilters] = useState<CommunityFilterObj>(initCommunityFilterObj)
  const { updateState } = useQueryRequest();

  const filterData = () => {
    updateState({
      filter: communityFilters,
      ...initialQueryState
    });
  };

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({ [e.target.name]: e.target.value }, setCommunityFilters, communityFilters);
    }
  };

  return (
    <KTCard id="filter-container" className="bg-transparent mb-10" shadow={false} border={true}>
      <KTCardHeader text={"Filters"} bg={"info"} text_color={"white"} />
      <Formik initialValues={communityFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className="form">
          <KTCardBody>
            <div className="row">
              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>

              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='last_name'
                  placeholder='Last Name'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>

              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='email'
                  placeholder='Email'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>
            </div>
          </KTCardBody>
          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button type="submit" className="btn btn-mc-secondary btn-active-mc-secondary btn-sm">
              <span className="indicator-label">Filter</span>
            </button>
          </div>
        </Form>
      </Formik>
    </KTCard>
  )
}

export {CommunityUserFilters}