import {KTCard, KTCardBody} from '../../../helpers/components'
import {ErrorMessage, Form, Formik} from 'formik'
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
import {CommunityForm} from '../partials/CommunityForm'
import {ImageCrop} from '../components/ImageCrop'

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
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Images</label>

                    <div className='col-lg-8'>
                      <div className='row'>
                        <div className='col-lg-4'>
                          <ImageCrop
                            isSquare={true}
                            community={community}
                            setCommunity={setCommunity}
                            ratio={1}
                            name='logo'
                          />
                          <div className='text-muted fw-semibold'>Recommended Image Size: Square</div>
                          <div className='text-danger mt-2'>
                            <ErrorMessage name='logo' />
                          </div>
                        </div>
                        <div className='col-lg-8'>
                          <ImageCrop
                            aspectRatioClass={'ratio ratio-1-91x1'}
                            community={community}
                            setCommunity={setCommunity}
                            ratio={1.91}
                            name='banner_image'
                          />
                          <div className='text-muted fw-semibold'>Recommended Image Ratio: 1.91:1 (1900px x 1000px)</div>
                          <div className='text-danger mt-2'>
                            <ErrorMessage name='banner_image' />
                          </div>
                        </div>
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
