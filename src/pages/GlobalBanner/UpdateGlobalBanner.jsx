import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner'; // Optionally, for notifications

const UpdateGlobalBanner = () => {
    const { globalBannerId } = useParams()
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const maxSizeInMB = 5; // Set max size (e.g., 50MB)

    // Function to handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                setError('Please upload a valid image file.');
                setImage(null);
                return;
            }

            // Validate file size (convert bytes to MB)
            const isValidSize = file.size / (1024 * 1024) <= maxSizeInMB;
            if (!isValidSize) {
                setError(`File size should not exceed ${maxSizeInMB}MB.`);
                setImage(null);
                return;
            }

            // Clear errors and set the image file
            setError('');
            setImage(file);
        }
    };

    // Function to upload image
    const handleUpload = async () => {
        if (!image) {
            setError('No image selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', image);
        formData.append('itemType', "banner");

        try {
            setLoading(true);
            setError('');

            // Replace with your actual API endpoint
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/globalData/${globalBannerId}`, formData);



            if (response?.data?.status) {
                toast.success('image uploaded successfully');
                navigate(`/globalBanner`)
                setImage(null); // Reset image input
            } else {
                setError(data?.message || 'Error uploading image');
            }
        } catch (error) {
            console.error('Upload failed', error);
            const { response } = error
            toast.error(response?.data?.message, { position: "top-center" })

            setError('Error uploading image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto my-10 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <h2 className="text-2xl font-semibold text-center mb-4">Upload a image</h2>

                {/* File input */}
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                        htmlFor="video_input"
                    >
                        Select image
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        id="video_input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                </div>

                {/* Upload Button */}
                <div className="mt-4">
                    {loading ? (
                        <button
                            disabled
                            className="w-full bg-gray-300 text-gray-600 py-2 px-4 rounded-lg font-semibold flex justify-center items-center"
                        >
                            Uploading...
                        </button>
                    ) : (
                        <button
                            onClick={handleUpload}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
                        >
                            Upload image
                        </button>
                    )}
                </div>
            </div>


        </>
    );
};


















export default UpdateGlobalBanner