import React, { FC, useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { updateData } from "../../../helpers/form/FormHelper";
import clsx from "clsx";
import { ErrorMessage, useFormikContext } from "formik";

type Props = {
  community: any
  setCommunity: any
}

const BannerImage: FC<Props> = ({ community, setCommunity }) => {
  const defaultImage = community?.image || toAbsoluteUrl("/media/svg/avatars/blank.svg");
  const [image, setImage] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>("");
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (community?.banner_image !== undefined && community?.banner_image !== "") {
      if (
        community?.banner_image !== "http://dashboard.missioncontrol.test/media/avatar/blank.svg"
      ) {
        setImage(`url(${community?.banner_image})`);
        setFieldValue("banner_image", `url(${community?.logo})`);
      } else {
        setImage(`none`);
        setFieldValue("banner_image", "");
      }
    } else {
      setImage(`none`);
      setFieldValue("banner_image", "");
    }
  }, [community]);

  const handleOnChange = (event: any) => {
    let file = event.target.files[0];

    if (file) {
      let url = `url(${URL.createObjectURL(file)})`;
      setImage(url);
      setFieldValue("banner_image", url);
    }
  };

  const cancelImageChange = () => {
    let randomString = Math.random().toString(36);
    setImageInput(randomString);

    updateData(
      {
        banner_image: ""
      },
      setCommunity,
      community
    );
    setImage("none");
    setFieldValue("banner_image", "");
  };

  return (
    <>
      <div className="col-lg-8">
        <div
          className={clsx("ratio ratio-21x9 image-input image-input-outline", {
            "image-input-empty": image === "" || image === "none"
          })}
          style={{ backgroundImage: `url(${defaultImage})`, width: "100%" }}
          data-kt-image-input="true"
        >
          <div className="image-input-wrapper w-100 h-100" style={{ backgroundImage: `${image}` }} />

          <label
            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
            data-kt-image-input-action="change"
            data-bs-toggle="tooltip"
            title="Change avatar"
          >
            <i className="bi bi-pencil-fill fs-7"></i>
            <input
              key={imageInput}
              type="file"
              name="banner_image"
              accept=".png, .jpg, .jpeg"
              onChange={handleOnChange}
            />
            <input type="hidden" name="avatar_remove" />
          </label>

          {image && image !== "" && (
            <span
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="remove"
              data-bs-toggle="tooltip"
              title="Remove avatar"
              onClick={cancelImageChange}
            >
              <i className="bi bi-x fs-2"></i>
            </span>
          )}
        </div>
        <div className="label-container">
          <label className="col-lg-4 col-form-label fw-bold fs-6 required">Banner Image</label>
          <div className="text-danger mt-2">
            <ErrorMessage name="banner_image" />
          </div>
        </div>
      </div>
    </>
  );
};
export { BannerImage };
