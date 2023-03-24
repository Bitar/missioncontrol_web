import React, {FC} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {communitySchema} from '../../../../models/community/Community'
import {useCommunity} from '../../core/CommunityContext'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {FormAction} from '../../../../helpers/form/FormAction'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {updateAdminCommunity, updateCommunity} from '../../core/CommunityRequests'
import toast from 'react-hot-toast'
import {useParams} from 'react-router-dom'
import {useCommunityForm} from '../../core/CommunityFormContext'
import {useAuth} from '../../../../modules/auth'
import {isSuperAdmin} from '../../../iam/user/core/User'
import {SwitchInput} from '../../../../components/SwitchInput/SwitchInput'
import Select from 'react-select'
import {ImageCrop} from '../../components/ImageCrop'

const GeneralDetail: FC = () => {
  const {communityForm, setCommunityForm} = useCommunityForm()
  const {currentUser} = useAuth()
  const {setCommunity} = useCommunity()
  const params = useParams()

  const statuses = [
    {value: 1, label: 'Pending'},
    {value: 2, label: 'Active'},
  ]

  const handleSubmit = async () => {
    let data = jsonToFormData(communityForm)
    data.append('_method', 'PUT')

    if (params?.communityId) {
      await updateCommunity(params.communityId, data).then((response) => {
        toast.success('Community Updated Successfully')
        setCommunity(response)
      })
    } else {
      await updateAdminCommunity(data).then((response) => {
        toast.success('Community Updated Successfully')
        setCommunity(response)
      })
    }
  }
  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    if (targetName === 'is_featured') {
      updateData({is_featured: !communityForm?.is_featured}, setCommunityForm, communityForm)
    } else {
      if (targetName === 'logo' || targetName === 'banner_image') {
        targetValue = e.target.files[0]
      } else {
        targetValue = e.target.value
      }
      updateData({[targetName]: targetValue}, setCommunityForm, communityForm)
    }
  }

  return (
    <KTCard border={true}>
      <KTCardHeader text={'General Details'} bg='mc-primary' text_color='white' />
      <Formik
        validationSchema={communitySchema}
        initialValues={communityForm!}
        onSubmit={handleSubmit}
        enableReinitialize>
        {({isSubmitting}) => (
          <Form onChange={handleOnChange} className='form' autoComplete='off'>
            <KTCardBody className='py-4'>
              <div className='d-flex flex-column pt-5'>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Images</label>

                  <div className='col-lg-8'>
                    <div className='row'>
                      <div className='col-lg-4'>
                        <ImageCrop
                          isSquare={true}
                          community={communityForm}
                          setCommunity={setCommunityForm}
                          ratio={1}
                          name='logo'
                          defaultImage={communityForm?.logo}
                        />
                        <div className='text-muted fw-semibold'>Recommended Image Size: Square</div>
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='logo' />
                        </div>
                      </div>
                      <div className='col-lg-8'>
                        <ImageCrop
                          aspectRatioClass={'ratio ratio-1-91x1'}
                          community={communityForm}
                          setCommunity={setCommunityForm}
                          ratio={1.91}
                          name='banner_image'
                          defaultImage={communityForm?.banner_image}
                        />
                        <div className='text-muted fw-semibold'>
                          Recommended Image Ratio: 1.91:1 (1900px x 1000px)
                        </div>
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='banner_image' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      type='text'
                      name='name'
                      placeholder='Community Name'
                      className='form-control mb-3 mb-lg-0'
                      autoComplete='off'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='name' />
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    Description
                  </label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      as='textarea'
                      name='description'
                      className='form-control mb-3 mb-lg-0'
                      placeholder='Community Description'
                      rows={8}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='description' />
                    </div>
                  </div>
                </div>

                {currentUser && isSuperAdmin(currentUser) && (
                  <>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Status</label>
                      <div className='col-lg-8 fv-row'>
                        <Select
                          name='status'
                          placeholder={'Choose a State'}
                          defaultValue={statuses.find((e) => e.value === communityForm?.status)}
                          options={statuses}
                          onChange={(e) => {
                            updateData(
                              {
                                status: e?.value,
                              },
                              setCommunityForm,
                              communityForm
                            )
                          }}
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='status' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Featured</label>
                      <div className='col-lg-8 fv-row'>
                        <SwitchInput
                          name='is_featured'
                          isOn={communityForm?.is_featured}
                          handleToggle={() => {}}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </KTCardBody>
            <FormAction text={'Update Community'} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}

export {GeneralDetail}
