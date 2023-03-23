import { Area } from 'react-easy-crop';

export interface GetCroppedImgProps {
  image: File;
  crop: Area;
}

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (error) => reject(error));
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
  });
};

const getCroppedImg = async ({ image, crop }: GetCroppedImgProps): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  return new Promise((resolve) => {
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const imageSrc = event.target?.result as string;
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const { width, height } = crop;
      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
      }

      resolve(canvas.toDataURL('image/jpeg'));
    };
  });
};

export default getCroppedImg;
