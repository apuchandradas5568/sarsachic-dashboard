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

  const [themeName, setThemeName] = useState('');
  const [themeImageSrc, setThemeImageSrc] = useState(null);
  const [themeCroppedImageUrl, setThemeCroppedImageUrl] = useState('');
  const [themeCrop, setThemeCrop] = useState({ x: 0, y: 0 });
  const [themeZoom, setThemeZoom] = useState(1);
  const [themeCroppedAreaPixels, setThemeCroppedAreaPixels] = useState(null);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

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

  const handleThemeImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setThemeImageSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setIsThemeModalOpen(true);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onThemeCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setThemeCroppedAreaPixels(croppedAreaPixels);
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

  const handleThemeCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(themeImageSrc, themeCroppedAreaPixels);
      setThemeCroppedImageUrl(croppedImage);
      setIsThemeModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [themeCroppedAreaPixels, themeImageSrc]);

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log('Colors:', color1, color2);
    console.log('Cropped Image URL:', croppedImageUrl);
  };

  const handleThemeSubmit = () => {
    // Add your theme submission logic here
    console.log('Theme Name:', themeName);
    console.log('Cropped Theme Image URL:', themeCroppedImageUrl);
  };

  return (
    <div className=" mx-auto p-4">
      <div>
      <h1 className="text-2xl font-bold mb-8">Application Theme Customization</h1>
      <div className='flex flex-col gap-8 md:flex-row lg:items-center'>
        <div className="flex flex-col items-start gap-4">
          <label className="block">Primary Color:</label>
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
        <div className="flex flex-col items-start gap-4">
          <label className="block">Secondary Color:</label>
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
      </div>
      <div className="my-8">
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
                aspect={4 / 5}
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
          <div className="w-72">
            <h2 className="mt-4">Cropped Image:</h2>
            <img src={croppedImageUrl} alt="Cropped" />
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


<hr className='mt-8' />
      {/* New Section for Theme Category Page */}
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Theme Category Banner Change</h2>
        <label className="block mb-2">Theme Name:</label>
        <select
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          className="p-2 border rounded mb-4"
        >
          <option value="">Select a Theme</option>
          <option value="theme1">Theme 1</option>
          <option value="theme2">Theme 2</option>
          <option value="theme3">Theme 3</option>
        </select>
        <label className="block mb-2">Theme Banner Image (PNG, max 10MB):</label>
        <input
          type="file"
          accept="image/png"
          onChange={handleThemeImageChange}
          className="p-2 border rounded"
        />
        <ReactModal isOpen={isThemeModalOpen} onRequestClose={() => setIsThemeModalOpen(false)}>
          <div className="relative w-full h-64 mt-4">
            {themeImageSrc && (
              <Cropper
                image={themeImageSrc}
                crop={themeCrop}
                zoom={themeZoom}
                aspect={7 / 3}
                onCropChange={setThemeCrop}
                onZoomChange={setThemeZoom}
                onCropComplete={onThemeCropComplete}
              />
            )}
            <button
              onClick={handleThemeCrop}
              className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-full"
            >
              <FaCrop />
            </button>
          </div>
        </ReactModal>
        {themeCroppedImageUrl && (
          <div className="w-72">
            <h2 className="mt-4">Cropped Theme Image:</h2>
            <img src={themeCroppedImageUrl} alt="Cropped Theme" />
          </div>
        )}
      </div>
      <button
        onClick={handleThemeSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Submit Theme
      </button>
    </div>
  );
};

export default AppCustomization;
