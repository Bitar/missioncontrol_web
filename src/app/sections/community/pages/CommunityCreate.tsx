import {KTCard, KTCardBody} from '../../../helpers/components'
import {Form, Formik} from 'formik'
import {
  Community,
  communitySchema,
  formOnChange,
  initialCommunity,
} from '../../../models/community/Community'
import {createCommunity} from '../core/CommunityRequests'
import {useNavigate} from 'react-router-dom'
import React, {useState} from 'react'
import {jsonToFormData} from '../../../helpers/form/FormHelper'
import {LogoImage} from '../components/LogoImage'
import {BannerImage} from '../components/BannerImage'
import {CommunityForm} from '../partials/CommunityForm'
import {Row} from 'react-bootstrap'
import {BannerCrop} from '../components/BannerCrop'

const CommunityCreate = () => {
  const [community, setCommunity] = useState<Community>(initialCommunity)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    let data = jsonToFormData(community)
    await createCommunity(data).then((response) => navigate('/communities/' + response?.id))
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
          {({isSubmitting, isValid, touched}) => (
            <Form onChange={handleOnChange} className='form'>
              <KTCardBody className='py-4'>
                <div className='d-flex flex-column pt-5'>
                  <Row className='mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Banner Image</label>

                    <div className='col-lg-8'>
                      <div className='row'>
                        <BannerCrop />
                      </div>
                    </div>
                  </Row>

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
                  disabled={isSubmitting || !isValid || !touched}
                >
                  <span className='indicator-label'>Add Community</span>

                  {isSubmitting && (
                    <span className='indicator-progress' style={{display: 'inline-block'}}>
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

export {CommunityCreate}
