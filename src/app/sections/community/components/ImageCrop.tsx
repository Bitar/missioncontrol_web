import React, {FC, useEffect, useState} from 'react'
import Cropper from 'react-easy-crop'
import {Area} from 'react-easy-crop/types'
import clsx from 'clsx'
import {useFormikContext} from 'formik'
import getCroppedImg, {GetCroppedImgProps} from './ImageHandling'
import {updateData} from '../../../helpers/form/FormHelper'

type Props = {
  model: any
  setModel: any
  aspectRatioClass?: string
  ratio: number
  isSquare?: boolean
  name: any
  defaultImage?: string
  updateStuff?: any
}

export const ImageCrop: FC<Props> = ({
  model,
  setModel,
  aspectRatioClass,
  ratio,
  isSquare = false,
  name,
  defaultImage,
  updateStuff,
}) => {
  const [image, setImage] = useState<File | undefined>(undefined)
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState('')
  const [previewImage, setPreviewImage] = useState('none')
  const {setFieldValue} = useFormikContext()

  useEffect(() => {
    if (defaultImage) {
      setPreviewImage(defaultImage)
    }
  }, [defaultImage])

  const onImageLoad = async (e: any) => {
    setPreviewImage('none')

    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setImage(selectedFile)
    }
  }

  const onCropComplete = async (_: any, croppedAreaPixels: Area) => {
    if (image) {
      let obj: GetCroppedImgProps = {
        image: image,
        crop: croppedAreaPixels,
      }
      const croppedImageURL = await getCroppedImg(obj)
      setCroppedImage(croppedImageURL)
    }
  }

  const saveImage = () => {
    let imageToSave = croppedImage
    setPreviewImage(imageToSave)
    setImage(undefined)

    if (updateStuff) {
      updateStuff(imageToSave)
    } else {
      updateData(
        {
          [name]: imageToSave,
        },
        setModel,
        model
      )
    }

    setFieldValue(name, imageToSave)
  }

  return (
    <div>
      <div
        className={clsx(
          `${aspectRatioClass ?? ''} image-input image-input-outline image-input-empty`
        )}
        data-kt-image-input='true'>
        <div
          className={clsx('image-input-wrapper w-100 h-100 overflow-hidden', {
            'w-200px h-200px': isSquare,
          })}
          style={{backgroundImage: `url(${previewImage})`}}>
          {image && (
            <div className='crop-container'>
              <Cropper
                image={URL.createObjectURL(image)}
                crop={crop}
                zoom={zoom}
                aspect={ratio}
                showGrid={false}
                onCropChange={(e) => {
                  if (JSON.stringify(e) !== JSON.stringify(crop)) {
                    setCrop(e)
                  }
                }}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          )}
        </div>
        <label
          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
          data-kt-image-input-action='change'
          data-bs-toggle='tooltip'
          title='Change Cover'>
          <i className='bi bi-pencil-fill fs-7'></i>
          <input type='file' accept='.png, .jpg, .jpeg' onChange={onImageLoad} />
        </label>
      </div>
      {image && (
        <div className='d-grid mt-n2 z-index-3'>
          <button type='button' className='btn btn-sm btn-success btn-block' onClick={saveImage}>
            Accept
          </button>
        </div>
      )}
    </div>
  )
}
