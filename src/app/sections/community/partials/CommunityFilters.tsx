import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import {KTCardHeader} from '../../../helpers/components/KTCardHeader'
import {Field, Form, Formik} from 'formik'
import {KTCardBody} from '../../../helpers/components/KTCardBody'
import {updateData} from '../../../helpers/form/FormHelper'
import {KTCard} from '../../../helpers/components/KTCard'
import React, {useState} from 'react'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import { isCommunityAdmin } from "../../../models/iam/User";
import Select from "react-select";
import { Button } from "react-bootstrap";

const initCommunityFilterObj = {
  name: '',
}

type CommunityFilterObj = {
  name: string
}

const CommunityFilters = () => {
  const {updateState} = useQueryRequest()
  const [communityFilters, setCommunityFilters] =
    useState<CommunityFilterObj>(initCommunityFilterObj)

  const filterData = () => {
    updateState({
      filter: communityFilters,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({[e.target.name]: e.target.value}, setCommunityFilters, communityFilters)
    }
  }

  return (
    <div className="bg-primary bg-opacity-5 p-10 mb-15 card-rounded">
      <Formik initialValues={communityFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className="form">
          <div className="row">
            <div className="col-lg-4 mb-5">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>
          </div>
          <Button variant="primary" type="submit">Filter</Button>
        </Form>
      </Formik>
    </div>
  )
}

export {CommunityFilters}
