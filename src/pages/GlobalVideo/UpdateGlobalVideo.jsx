import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner'; // Optionally, for notifications

const UpdateGlobalVideo = () => {
    const { globalVideoId } = useParams()
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const maxSizeInMB = 50; // Set max size (e.g., 50MB)

    // Function to handle video selection
    const handleVideoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type
            const isVideo = file.type.startsWith('video/');
            if (!isVideo) {
                setError('Please upload a valid video file.');
                setVideo(null);
                return;
            }

            // Validate file size (convert bytes to MB)
            const isValidSize = file.size / (1024 * 1024) <= maxSizeInMB;
            if (!isValidSize) {
                setError(`File size should not exceed ${maxSizeInMB}MB.`);
                setVideo(null);
                return;
            }

            // Clear errors and set the video file
            setError('');
            setVideo(file);
        }
    };

    // Function to upload video
    const handleUpload = async () => {
        if (!video) {
            setError('No video selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', video);
        formData.append('itemType', "video");

        try {
            setLoading(true);
            setError('');

            // Replace with your actual API endpoint
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/globalData/${globalVideoId}`, formData);



            if (response?.data?.status) {
                toast.success('Video uploaded successfully');
                navigate(`/globalVideo`)
                setVideo(null); // Reset video input
            } else {
                setError(data?.message || 'Error uploading video');
            }
        } catch (error) {
            console.error('Upload failed', error);
            const { response } = error
            toast.error(response?.data?.message, { position: "top-center" })

            setError('Error uploading video');
        } finally {
            setLoading(false);
        }
    };

    const getPerfumes = (globalVideoId) => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/globalData/${globalVideoId}`)
            .then((res) => {
                console.log(res)
                // setPerfumeData(res?.data?.data);
                // setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                // setIsLoading(false);
            });
    }

    useEffect(() => {
        getPerfumes(globalVideoId)
    }, []);

    return (
        <>
            <div className="max-w-md mx-auto my-10 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <h2 className="text-2xl font-semibold text-center mb-4">Upload a Video</h2>

                {/* File input */}
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                        htmlFor="video_input"
                    >
                        Select Video
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        id="video_input"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
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
                            Upload Video
                        </button>
                    )}
                </div>
            </div>


        </>
    );
};








export default UpdateGlobalVideo