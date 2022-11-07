import { KTCardHeader } from "../../../../helpers/components/KTCardHeader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CommunityFormType, communitySchema } from "../../models/Community";
import { KTCardBody } from "../../../../helpers/components/KTCardBody";
import { LogoImage } from "../LogoImage";
import { BannerImage } from "../BannerImage";
import { KTCard } from "../../../../helpers/components/KTCard";
import React, { Dispatch, FC, SetStateAction } from "react";
import { useCommunity } from "../../CommunityContext";
import { useParams } from "react-router-dom";
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import { updateAdminCommunity, updateCommunity } from "../../core/CommunityRequests";
import toast from "react-hot-toast";
import { FormAction } from "../../../../helpers/form/FormAction";

type Props = {
  communityForm: CommunityFormType,
  setCommunityForm: Dispatch<SetStateAction<CommunityFormType>>
}

const ContactDetails: FC<Props> = ({ communityForm, setCommunityForm }) => {
  const { setCommunity } = useCommunity();
  const params = useParams()

  const handleSubmit = async () => {
    let data = jsonToFormData(communityForm)
    data.append('_method', 'PUT')

    if (params?.communityId) {
      await updateCommunity(params.communityId, data).then((response) => {
        toast.success('Community Contact Updated Successfully')
        setCommunity(response);
      });
    } else {
      await updateAdminCommunity(data).then((response) => {
        toast.success('Community Contact Updated Successfully')
        setCommunity(response);
      });
    }

  };

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    let contact_field = targetName.split('contact.')[1]

    updateData(
      {
        contact: {...communityForm?.contact, ...{[contact_field]: targetValue}},
      },
      setCommunityForm,
      communityForm
    )
  };
  return (
    <KTCard border={true}>
      <KTCardHeader text={"Contact Info"} bg="mc-primary" text_color="white"  />
      <Formik
        validationSchema={communitySchema}
        initialValues={communityForm}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({isSubmitting}) => (
          <Form
            onChange={handleOnChange}
            className="form"
            autoComplete="off">
            <KTCardBody className="py-4">
              <div className="d-flex flex-column pt-5">
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      type='text'
                      name='contact.name'
                      placeholder='Contact Name'
                      className='form-control mb-3 mb-lg-0'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='contact.name' />
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      type='text'
                      name='contact.email'
                      placeholder='Contact Email'
                      className='form-control mb-3 mb-lg-0'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='contact.email' />
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    Phone Number
                  </label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      type='text'
                      name='contact.phone_number'
                      placeholder='Phone Number...'
                      className='form-control mb-3 mb-lg-0'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='contact.phone_number' />
                    </div>
                  </div>
                </div>
              </div>
            </KTCardBody>
            <FormAction text={"Update Contact"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}

export {ContactDetails}