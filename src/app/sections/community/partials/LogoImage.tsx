import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {updateData} from '../../../helpers/form/FormHelper'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {ErrorMessage, useFormikContext} from 'formik'

type Props = {
  community: any
  setCommunity: any
}

const LogoImage: FC<Props> = ({community, setCommunity}) => {
  const defaultImage = community?.image || toAbsoluteUrl('/media/svg/avatars/blank.svg')
  const [image, setImage] = useState<string>('')
  const [imageInput, setImageInput] = useState<string>('')
  const {setFieldValue} = useFormikContext()

  useEffect(() => {
    if (community?.logo !== undefined && community?.logo !== '') {
      if (community?.logo !== 'http://dashboard.missioncontrol.test/media/avatar/blank.svg') {
        setImage(`url(${community?.logo})`)
        setFieldValue('logo', `url(${community?.logo})`)
      } else {
        setImage(`none`)
        setFieldValue('logo', '')
      }
    } else {
      setImage(`none`)
      setFieldValue('logo', '')
    }
  }, [community])

  const handleOnChange = (event: any) => {
    let file = event.target.files[0]

    if (file) {
      let url = `url(${URL.createObjectURL(file)})`
      setImage(url)
      setFieldValue('logo', url)
    }
  }

  const cancelImageChange = () => {
    let randomString = Math.random().toString(36)
    setImageInput(randomString)

    updateData(
      {
        logo: '',
      },
      setCommunity,
      community
    )
    setImage('none')
    setFieldValue('logo', '')
  }

  return (
    <>
      <div className='col-lg-4'>
        <div
          className={clsx('image-input image-input-outline', {
            'image-input-empty': image === '' || image === 'none',
          })}
          style={{backgroundImage: `url(${defaultImage})`}}
          data-kt-image-input='true'
        >
          <div
            className='image-input-wrapper w-125px h-125px'
            style={{backgroundImage: `${image}`}}
          />

          <label
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='change'
            data-bs-toggle='tooltip'
            title='Change avatar'
          >
            <i className='bi bi-pencil-fill fs-7'></i>
            <input
              key={imageInput}
              type='file'
              name='logo'
              accept='.png, .jpg, .jpeg'
              onChange={handleOnChange}
            />
            <input type='hidden' name='avatar_remove' />
          </label>

          {image && image !== '' && (
            <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
              onClick={cancelImageChange}
            >
              <i className='bi bi-x fs-2'></i>
            </span>
          )}
        </div>
        <div className='text-danger mt-2'>
          <ErrorMessage name='logo' />
        </div>
      </div>
    </>
  )
}

export {LogoImage}
