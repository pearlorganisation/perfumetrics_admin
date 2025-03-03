import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Toaster, toast } from "sonner";
import TextEditor from "../../components/TextEditor/TextEditor";
import axios from "axios";

const AddCelebrityPerfume = () => {
    const [blogData, setBlogData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [bannerName, setBannerName] = useState({});
    const [thumbnailName, setThumbnailName] = useState({});

    useEffect(() => {
        if (blogData?.status) {
            navigate("/celebrityPerfume");
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

    const postCelebrityPerfumeBlog = async (data) => {
        try {
            setIsLoading(true);
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/celebrityPerfumes`, data);
            setIsLoading(false);
            setBlogData(result?.data);
        } catch (error) {
            setIsLoading(false);
            console.log(error?.message);
        }
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("banner", data.banner[0]);
        formData.append("thumbnail", data.thumbnail[0]);
        formData.append("content", data.content);
        formData.append("title", data.title);
        formData.append("imageAttribute", data.imageAttribute);

        postCelebrityPerfumeBlog(formData);
    };

    useEffect(() => {
        setBannerName(watch("banner"));
        setThumbnailName(watch("thumbnail"));
    }, [watch("banner"), watch("thumbnail")]);

    return (
        <div className="p-10">
            <Toaster />
            <div className="flex justify-center">
                <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">Add a blog</h3>
            </div>
            <div className="bg-white rounded-lg shadow p-4 py-6 sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
                <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
                    <label className="font-medium">Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        type="text"
                        className="w-full mt-2 px-5 py-2 text-gray-500 border border-slate-300 bg-transparent outline-none focus:border-teal-400 shadow-sm rounded-lg"
                        placeholder="Enter a title for your blog"
                    />
                    {errors.title && <span className="text-red-500">{errors.title.message}</span>}

                    {/* Banner Upload */}
                    <div className="space-y-2">
                        <label className="font-medium">Banner Image (Recommended size: 750x400px)</label>
                        <input
                            type="file"
                            {...register("banner", { required: "Banner is required" })}
                            accept="image/png,image/jpeg,image/webp"
                            className="w-full"
                        />
                        {errors.banner && <span className="text-red-500">{errors.banner.message}</span>}
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="space-y-2">
                        <label className="font-medium">Thumbnail Image (Recommended size: 175x192px)</label>
                        <input
                            type="file"
                            {...register("thumbnail", { required: "Thumbnail is required" })}
                            accept="image/png,image/jpeg,image/webp"
                            className="w-full"
                        />
                        {errors.thumbnail && <span className="text-red-500">{errors.thumbnail.message}</span>}
                    </div>

                    {/* Image Attribute */}
                    <div>
                        <label className="font-medium">Image Attribute</label>
                        <input
                            {...register("imageAttribute", { required: "Image attribute is required" })}
                            type="text"
                            className="w-full mt-2 px-5 py-2 text-gray-500 border border-slate-300 bg-transparent outline-none focus:border-teal-400 shadow-sm rounded-lg"
                            placeholder="Enter an image attribute"
                        />
                        {errors.imageAttribute && <span className="text-red-500">{errors.imageAttribute.message}</span>}
                    </div>

                    {/* Content Editor */}
                    <div>
                        <label className="font-medium">Content</label>
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <TextEditor onChange={(data) => field.onChange(data)} value={field.value} />
                            )}
                            rules={{ required: "Content is required" }}
                        />
                        {errors.content && <span className="text-red-500">{errors.content.message}</span>}
                    </div>

                    <div className="flex justify-center pt-2">
                        {isLoading ? (
                            <button type="button" className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300">
                                Loading...
                            </button>
                        ) : (
                            <button type="submit" className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300">
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCelebrityPerfume;
