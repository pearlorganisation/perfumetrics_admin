import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../features/actions/brandsAction";
import Select from "react-select";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const AddSideBarReview = ({ setIsShowing }) => {
    const dispatch = useDispatch()
    const { perfumeId } = useParams()

    const [isLoading, setIsLoading] = useState(false)


    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null); // State to store the image preview URL



    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
            setImagePreview(imageUrl); // Update the state with the image URL
        }
    };




    const postSideBarReview = async (formData) => {

        try {
            setIsLoading(true)
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/reviewsSidebar`, formData)
            toast.success("Submitted !!", { position: 'top-center' })
            setIsLoading(false)
            setIsShowing(false)

            console.log(result, "relatedFragrams")
        } catch (error) {
            setIsLoading(false)

            console.log(error.message)
        }

    }

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append("title", data?.title)
        formData.append("reviewBy", data?.reviewBy)
        formData.append("description", data?.description)
        formData.append("banner", data?.file[0])
        formData.append("perfumeId", perfumeId)

        postSideBarReview(formData)

        console.log(data, perfumeId); // Handle form submission
    };
    return (
        <div className="w-full text-center space-y-5  bg-white  shadow overflow-hidden sm:rounded-md">
            <h1 className="text-3xl">Add  Sidebar Review </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
                    <div className="p-4 border border-grey-lighter w-full">
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                                placeholder="Title"
                            />
                            {errors.perfumeName && <p className="text-red-500">{errors.perfumeName.message}</p>}
                        </div>
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <textarea
                                {...register('description', { required: 'Description is required' })}
                                className="w-full border border-green-200 outline-none px-3 py-2"
                                placeholder="Description"
                                id="" cols="30" rows="5"></textarea>

                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </div>
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <input
                                type="text"
                                {...register('reviewBy', { required: 'Review By is required' })}
                                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                                placeholder="Review By"
                            />
                            {errors.reviewBy && <p className="text-red-500">{errors.reviewBy.message}</p>}
                        </div>







                    </div>
                </div>

                <div className="mb-6 pt-4 bg-white max-w-4xl mx-auto">
                    <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                        Upload Banner Image File
                    </label>

                    <div className="mb-8">
                        <input
                            type="file"
                            name="file"
                            id="file"
                            className="sr-only"
                            {...register('file', { required: 'File is required' })}
                            onChange={handleFileChange} // Handle file change to update preview
                        />
                        <label
                            htmlFor="file"
                            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#419A62] p-12 text-center"
                        >
                            <div>
                                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                    Drop files here
                                </span>
                                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                    Or
                                </span>
                                <span className="inline-flex rounded border border-[#419A62] py-2 px-7 text-base font-medium text-[#07074D]">
                                    Browse
                                </span>
                            </div>
                        </label>
                        {errors.file && <p className="text-red-500">{errors.file.message}</p>}
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Selected" className="max-w-xs mx-auto rounded-md" />
                            <p className="text-center mt-2 text-sm text-gray-600">Preview of the selected image</p>
                        </div>
                    )}
                </div>
                {
                    isLoading ? <button className="bg-blue-500 px-4 py-3 rounded-md text-white w-full" type="button">
                        Loading...
                    </button> : <button className="bg-blue-500 px-4 py-3 rounded-md text-white w-full" type="submit">
                        Submit
                    </button>
                }

            </form>

        </div>
    );
};




export default AddSideBarReview