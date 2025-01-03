import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUploadCloud } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBrandLinkPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Store the file for submission
  const navigate = useNavigate();
  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Save the file for submission
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); // Generate a preview
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      alert('Please upload an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('brand', data.brand);
    formData.append('imageUrl', selectedFile);

    try {
        setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/url-Image`,
        formData
      );
      setIsLoading(false);
      console.log('Response:', response.data);
      alert('Form submitted successfully!');
      reset(); // Reset the form
      navigate("/brandImageLink")
    //   setPreview(null); // Clear the preview
    //   setSelectedFile(null); // Clear the selected file
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="p-20">
      <h1 className="text-lg font-bold mb-4">Add Brand Link</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Brand Name
        </label>
        <input
          {...register('brand', { required: true })}
          placeholder="Enter brand name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="mt-4">
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
            <div className="space-y-1 text-center">
              <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 1MB</p>
            </div>
          </div>

          {preview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto border rounded-md"
              />
            </div>
          )}
        </div>

        {!isLoading && <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>}
      </form>
    </div>
  );
};

export default AddBrandLinkPage;
