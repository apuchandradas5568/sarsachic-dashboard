import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import ReactModal from 'react-modal';
import { FaCrop } from 'react-icons/fa';
import getCroppedImg from '../actions/cropImage';

const AppCustomization = () => {
  const [color1, setColor1] = useState('#ffffff');
  const [color2, setColor2] = useState('#ffffff');
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColor1Change = (e) => {
    setColor1(e.target.value);
  };

  const handleColor2Change = (e) => {
    setColor2(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setIsModalOpen(true);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImageUrl(croppedImage);
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSrc]);

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log('Colors:', color1, color2);
    console.log('Cropped Image URL:', croppedImageUrl);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Application Theme Customization</h1>
      <div className="mb-4 flex items-center gap-4 ">
        <label className="block mb-2">Primary Color:</label>
        <input
          type="text"
          value={color1}
          onChange={handleColor1Change}
          className="p-2 border rounded"
        />
        <div
          className="w-10 h-10"
          style={{ backgroundColor: color1 }}
        ></div>
      </div>
      <div className="flex items-center gap-4">
        <label className="block mb-2">Secondary Color:</label>
        <input
          type="text"
          value={color2}
          onChange={handleColor2Change}
          className="p-2 border rounded"
        />
        <div
          className="w-10 h-10"
          style={{ backgroundColor: color2 }}
        ></div>
      </div>
      <div className="my-8 ">
        <label className="block mb-2">Banner Image (PNG, max 10MB):</label>
        <input
          type="file"
          accept="image/png"
          onChange={handleImageChange}
          className="p-2 border rounded"
        />
        <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <div className="relative w-full h-64 mt-4">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 5} // Use this for portrait aspect ratio, remove or set to null for free aspect ratio
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
            <button
              onClick={handleCrop}
              className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-full"
            >
              <FaCrop />
            </button>
          </div>
        </ReactModal>
        {croppedImageUrl && (
          <div className='w-72' >
            <h2 className="mt-4">Cropped Image:</h2>
            <img  src={croppedImageUrl} alt="Cropped" />
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default AppCustomization;
