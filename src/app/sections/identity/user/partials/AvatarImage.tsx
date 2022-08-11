import clsx from "clsx";
import {toAbsoluteUrl} from "../../../../../_metronic/helpers";
import React, {FC, useState} from "react";
import {updateData} from "../../../../helpers/FormHelper";

type Props = {
    user: any,
    setUser: any
}

const AvatarImage: FC<Props> = ({user, setUser}) => {
    const [image, setImage] = useState<string>("");

    const handleOnChange = (event: any) => {
        let file = event.target.files[0]

        if(file) {
            let url = `url(${URL.createObjectURL(file)})`
            setImage(url)
        }
    }

    const cancelImageChange = (event: any) => {
        updateData({
            'meta': {
                'image': ""
            }
        }, setUser, user)
        setImage("")
    }

    return (
        <>
            <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-bold fs-6">Avatar</label>
                <div className="col-lg-8">
                    <div
                        className={clsx("image-input image-input-outline",
                            {"image-input-empty": image === ''}
                        )}
                        style={{backgroundImage: `url(${toAbsoluteUrl('/media/svg/avatars/blank.svg')})`}}
                        data-kt-image-input="true">

                        <div className="image-input-wrapper w-125px h-125px" style={{backgroundImage: `${image}`}}/>

                        <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change"
                               data-bs-toggle="tooltip" title="Change avatar">
                            <i className="bi bi-pencil-fill fs-7"></i>
                            <input type="file" name="meta.image" accept=".png, .jpg, .jpeg" onChange={handleOnChange}/>
                            <input type="hidden" name="avatar_remove"/>
                        </label>

                        {image !== '' &&
                            <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove"
                                  data-bs-toggle="tooltip" title="Remove avatar" onClick={cancelImageChange}>
                                                                    <i className="bi bi-x fs-2"></i>
                                                                </span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export {AvatarImage}