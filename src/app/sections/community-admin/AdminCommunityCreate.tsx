import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {Form, Formik} from 'formik'
import {
  Community,
  communitySchema,
  formOnChange,
  initialCommunity,
} from '../community/models/Community'
import {createAdminCommunity} from '../community/core/CommunityRequests'
import {useNavigate} from 'react-router-dom'
import React, {useState} from 'react'
import {jsonToFormData} from '../../helpers/form/FormHelper'
import {LogoImage} from '../community/partials/LogoImage'
import {BannerImage} from '../community/partials/BannerImage'
import {CommunityForm} from '../community/CommunityForm'
import { useAuth } from "../../modules/auth";

const AdminCommunityCreate = () => {
  const [community, setCommunity] = useState<Community>(initialCommunity)
  const {updateAuth} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    let data = jsonToFormData(community)
    await createAdminCommunity(data).then((response) => {
      updateAuth();
      navigate('/dashboard');
    })
  }

  const handleOnChange = (e: any) => formOnChange(e, community, setCommunity)

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <span className='card-icon'>
              <i className='las la-plus fs-2' />
            </span>
            <h3 className='card-label'>Add Community</h3>
          </div>
        </div>
        <Formik
          initialValues={community}
          onSubmit={handleSubmit}
          validationSchema={communitySchema}
        >
          {({isSubmitting}) => (
            <Form onChange={handleOnChange} className='form'>
              <KTCardBody className='py-4'>
                <div className='d-flex flex-column pt-5'>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Images</label>

                    <div className='col-lg-8'>
                      <div className='row'>
                        <LogoImage community={community} setCommunity={setCommunity} />

                        <BannerImage community={community} setCommunity={setCommunity} />
                      </div>
                    </div>
                  </div>

                  <CommunityForm
                    method={'create'}
                    community={community}
                    setCommunity={setCommunity}
                  />
                </div>
              </KTCardBody>
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  type='submit'
                  className='btn btn-light-mc-secondary btn-active-mc-secondary btn-sm'
                  data-kt-users-modal-action='submit'
                  disabled={isSubmitting}
                >
                  <span className='indicator-label'>Add Community</span>
                  {isSubmitting && (
                    <span className='indicator-progress'>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2' />
                    </span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  )
}

export { AdminCommunityCreate };
