import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Toaster, toast } from "sonner";
import TextEditor from "../../components/TextEditor/TextEditor";
import Select from "react-select"; // Importing React-Select
import axios from "axios";

const AddNews = () => {
    const [blogData, setBlogData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const [bannerName, setBannerName] = useState({});

    useEffect(() => {
        if (blogData?.status) {
            navigate("/news");
        }
    }, [blogData]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
    } = useForm({
        defaultValues: {},
    });

    const postNewsBlog = async (data) => {
        try {
            setIsLoading(true);
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/news`,
                data
            );
            setIsLoading(false);
            setBlogData(result?.data);
            console.log(result?.data, "NewsBlog");
        } catch (error) {
            setIsLoading(false);
            console.log(error?.message);
        }
    };

    const onSubmit = (data) => {
        console.log(data, "data");

        const formData = new FormData();
        const { banner, thumbnail } = data;
        formData.append("image", banner[0]);
        formData.append("thumbnail", thumbnail[0]);
        formData.append("description", data.content);
        formData.append("title", data.title);
        formData.append("user", data.user);
        formData.append("details", data.details);
        formData.append("slug", data.slug);
        // formData.append("type", data.type?.value); // Save the selected category
        // api call here
        postNewsBlog(formData);
    };

    const temp = watch("banner");

    useEffect(() => {
        setBannerName(temp);
    }, [temp]);

    // Sample options for React-Select
    const types = [
        { value: "SMALL", label: "Small" },
        { value: "MEDIUM", label: "Medium" },
        { value: "LARGE", label: "Large" },
    ];

    return (
        <div className="p-10">
            <Toaster />
            <div className=" flex justify-center">
                <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
                    Add a News
                </h3>
            </div>
            <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
                <form
                    className="space-y-6 mx-8 sm:mx-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Title */}
                    <label className="font-medium">Title</label>
                    <input
                        {...register('title', {
                            required: 'Title name is required',
                            pattern: {
                                value: /^[a-zA-Z0-9-_ ]+$/,
                                message: 'Title name can only contain letters, numbers, hyphens, and underscores',
                            },
                        })}
                        type="text"
                        className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                        placeholder="Enter a Slug for your blog"
                    />
                    {errors.title && (
                        <span className="text-red-500">{errors.title.message}</span>
                    )}
                    <label className="font-medium">Slug</label>
                    <input
                        {...register('slug', {
                            required: 'Slug  is required',
                            // pattern: {
                            //     value: /^[a-zA-Z0-9-_ ]+$/,
                            //     message: 'Slug name can only contain letters, numbers, hyphens, and underscores',
                            // },
                        })}
                        type="text"
                        className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                        placeholder="Enter a Slug"
                    />
                    {errors.slug && (
                        <span className="text-red-500">{errors.slug.message}</span>
                    )}



                    <div>
                        {/* Title */}
                        <label className="font-medium">Published By</label>
                        <input
                            {...register("user", { required: "Published By is required" })}
                            type="text"
                            className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                            placeholder="Enter a Name"
                        />
                        {errors.user && (
                            <span className="text-red-500">{errors.user.message}</span>
                        )}
                    </div>

                    {/* Category (React-Select) */}
                    <div>
                        <label className="font-medium">Type</label>
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: "Type is required" }} // Validation
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={types}
                                    placeholder="Select a category"
                                    className="mt-2"
                                />
                            )}
                        />
                        {errors.type && (
                            <span className="text-red-500">
                                {errors.type.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="font-medium">Description</label>
                        <textarea
                            rows={10}
                            cols={6}
                            {...register("details", { required: "Description is required" })}
                            type="text"
                            className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                            placeholder="Enter a title for your blog"
                        />
                        {errors.details && (
                            <span className="text-red-500">{errors.details.message}</span>
                        )}
                    </div>

                    {/* Banner */}
                    <div className="flex flex-col gap-6 items-center mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
                        <div className="relative w-full space-y-1">
                            <label className="font-medium">Banner Image (Recommended size: 750x400px)</label>
                            <div className="items-center justify-center  mx-auto">
                                <label
                                    className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                                    id="drop"
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-gray-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-600">
                                            {Array.isArray(Array.from(bannerName || {})) &&
                                                Array.from(bannerName || {}).length > 0
                                                ? bannerName[0]?.name
                                                : "Drop files to Attach, or "}
                                            <span className="text-blue-600 underline ml-[4px]">
                                                browse
                                            </span>
                                        </span>
                                    </span>
                                    <input
                                        type="file"
                                        {...register("banner", {
                                            onChange: (e) => {
                                                setPreview(URL.createObjectURL(e.target.files[0]));
                                            },
                                            required: "Banner is required",
                                        })}
                                        className="hidden"
                                        accept="image/png,image/jpeg,image/webp"
                                        id="input"
                                    />
                                </label>
                            </div>

                            {errors.banner && (
                                <span className="text-red-500">
                                    {errors.banner.message}
                                </span>
                            )}
                        </div>
                        <div className=' w-[300px] h-[300px] font-medium flex justify-center items-center relative border-2 border-gray-400'>



                            {preview && (
                                <div className='absolute flex items-center object-contain'>
                                    <img src={preview} className='rounded-md object-contain max-w-[300px] max-h-[300px]' width={'300px'} height={'300px'} />
                                </div>
                            )
                            }

                        </div>
                        {/* Thumbnail Upload */}
                        <div className="space-y-2 w-full">
                            <label className="font-medium">Thumbnail Image (Recommended size: 175x192px)</label>
                            <input
                                type="file"
                                {...register("thumbnail", { required: "Thumbnail is required" })}
                                accept="image/png,image/jpeg,image/webp"
                                className="w-full"
                            />
                            {errors.thumbnail && <span className="text-red-500">{errors.thumbnail.message}</span>}
                        </div>


                    </div>

                    {/* Content */}
                    <div>
                        <label className="font-medium">Content</label>
                        <Controller
                            name={`content`}
                            control={control}
                            render={({ field }) => (
                                <TextEditor
                                    onChange={(data) => field.onChange(data)} // Pass onChange handler from field
                                    value={field.value} // Pass value from field to TextEditor
                                />
                            )}
                            rules={{ required: true }}
                        />

                        {errors.content && (
                            <span className="fw-normal fs-6 text-red-500">
                                Content is required
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-2">
                        {isLoading ? (
                            <button
                                type="button"
                                className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300"
                            >
                                Loading...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNews;
