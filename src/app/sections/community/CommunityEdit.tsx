import React, {Dispatch, FC, SetStateAction} from 'react'
import {Community, communitySchema, formOnChange, initialCommunity} from './models/Community'
import {useNavigate, useParams} from 'react-router-dom'
import {Form, Formik} from 'formik'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {LogoImage} from './partials/LogoImage'
import {BannerImage} from './partials/BannerImage'
import {CommunityForm} from './CommunityForm'
import {jsonToFormData} from '../../helpers/form/FormHelper'
import {updateCommunity} from './core/CommunityRequests'

type Props = {
  community: Community | undefined
  setCommunity: Dispatch<SetStateAction<Community | undefined>>
}

const CommunityEdit: FC<React.PropsWithChildren<Props>> = ({community, setCommunity}) => {
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async () => {
    let data = jsonToFormData(community)
    data.append('_method', 'PUT')

    await updateCommunity(params.id, data).then((response) => {
      setCommunity(response)
      navigate('/communities/' + response?.id)
    })
  }

  const handleOnChange = (e: any) => formOnChange(e, community, setCommunity)

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <h3 className='card-label'>Update Community</h3>
          </div>
        </div>
        <Formik
          initialValues={initialCommunity(community)}
          onSubmit={handleSubmit}
          validationSchema={communitySchema}
          enableReinitialize
        >
          {({isSubmitting, isValid, touched}) => (
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
                    method={'edit'}
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
                  disabled={isSubmitting || !isValid || !touched}
                >
                  <span className='indicator-label'>Save Changes</span>
                  {isSubmitting && (
                    <span className='indicator-progress'>
                      Please wait...{' '}
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

export {CommunityEdit}
