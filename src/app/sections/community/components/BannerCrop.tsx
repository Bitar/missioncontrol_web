import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";

export const BannerCrop = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [completedCrop, setCompletedCrop] = useState<Blob | null>(null);

  const onImageLoad = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      const imageDataUrl = await readFile(selectedFile); // Wait for the file to be read and get the data URL
      // const image = new Image();
      // image.onload = () => {
      //   const scaleX = image.naturalWidth / image.width;
      //   const scaleY = image.naturalHeight / image.height;
      //   // Use the scaleX and scaleY values to perform your desired operations
      // };
      console.log(imageDataUrl)
      // image.src = imageDataUrl;
    }


    // const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //   if (event.target.files && event.target.files.length > 0) {
    //     const selectedFile = event.target.files[0];
    //     const imageDataUrl = await readFile(selectedFile); // Wait for the file to be read and get the data URL
    //     const image = new Image();
    //     image.onload = () => {
    //       const scaleX = image.naturalWidth / image.width;
    //       const scaleY = image.naturalHeight / image.height;
    //       // Use the scaleX and scaleY values to perform your desired operations
    //     };
    //     console.log(imageDataUrl)
    //     // image.src = imageDataUrl;
    //   }
    // };
  };

  // const

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log("running?");
      console.log(croppedArea, croppedAreaPixels);


      // if (image) {
      //   const imageFile = readFile(image);
      //
      //   const canvas = document.createElement("canvas");
      //   const scaleX = image?.naturalWidth / image?.width;
      //   const scaleY = image?.naturalHeight / image?.height;
      //   canvas.width = croppedAreaPixels.width;
      //   canvas.height = croppedAreaPixels.height;
      //   const ctx = canvas.getContext("2d");
      // }


    },
    []
  );

  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }


  // const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
  //   // console.log(croppedArea, croppedAreaPixels);
  // };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onImageLoad} />
      {image && (
        <div className="crop-container">
          <Cropper
            // image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            image={URL.createObjectURL(image)}
            crop={crop}
            zoom={zoom}
            aspect={1.91}
            showGrid={false}
            onCropChange={(e) => {
              if (JSON.stringify(e) !== JSON.stringify(crop)) {
                setCrop(e);
              }
            }}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      )}
      {completedCrop && <img alt="Crop Preview" src={URL.createObjectURL(completedCrop)} />}
    </div>
  );
};