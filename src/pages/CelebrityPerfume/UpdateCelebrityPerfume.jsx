import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import axios from "axios";

const UpdateCelebrityPerfume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bannerName, setBannerName] = useState({});
    const [thumbnailName, setThumbnailName] = useState({});
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [previewBanner, setPreviewBanner] = useState(null);
    const [previewThumbnail, setPreviewThumbnail] = useState(null);
    const { celebrityPerfumeId } = useParams();
    const [celebrityPerfume, setCelebrityPerfume] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
        reset,
    } = useForm();

    const getCelebrityPerfume = (celebrityPerfumeId) => {
        axios.get(`${import.meta.env.VITE_API_URL}/celebrityPerfumes/admin/${celebrityPerfumeId}`)
            .then((res) => {
                reset(res?.data?.data);
                setCelebrityPerfume(res?.data?.data);
                setPreviewBanner(res?.data?.data?.banner);
                setPreviewThumbnail(res?.data?.data?.thumbnail);
            })
            .catch(() => {
                toast.error("Error on Fetch Data!!");
            });
    };

    useEffect(() => {
        getCelebrityPerfume(celebrityPerfumeId);
    }, []);

    const updateCelebrityPerfume = async (updateData) => {
        try {
            setIsLoading(true);
            await axios.patch(`${import.meta.env.VITE_API_URL}/celebrityPerfumes/${celebrityPerfumeId}`, updateData);
            navigate("/celebrityPerfume");
            setIsLoading(false);
        } catch (error) {
            toast.error("Error on Update Perfume!!");
            setIsLoading(false);
        }
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        if (selectedBanner) {
            formData.append("banner", selectedBanner);
        }
        if (selectedThumbnail) {
            formData.append("thumbnail", selectedThumbnail);
        }
        formData.append("content", data.content);
        formData.append("title", data.title);
        formData.append("imageAttribute", data.imageAttribute);

        updateCelebrityPerfume(formData);
    };

    const handleFileInputChange = (e, setFile, setPreview) => {
        const file = e.target.files[0];
        setFile(file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <div className="p-10">
            <Toaster />
            <div className="flex justify-center">
                <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">Update Celebrity Perfume</h3>
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
                        {previewBanner && <img src={previewBanner} className="max-h-[500px]" alt="Banner Preview" />}
                        <input
                            type="file"
                            {...register("banner")}
                            accept="image/png,image/jpeg,image/webp"
                            className="w-full"
                            onChange={(e) => handleFileInputChange(e, setSelectedBanner, setPreviewBanner)}
                        />
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="space-y-2">
                        <label className="font-medium">Thumbnail Image (Recommended size: 175x192px)</label>
                        {previewThumbnail && <img src={previewThumbnail} className="max-h-[200px]" alt="Thumbnail Preview" />}
                        <input
                            type="file"
                            {...register("thumbnail")}
                            accept="image/png,image/jpeg,image/webp"
                            className="w-full"
                            onChange={(e) => handleFileInputChange(e, setSelectedThumbnail, setPreviewThumbnail)}
                        />
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
                                <JoditEditor
                                    value={field.value}
                                    tabIndex={1}
                                    onBlur={(newContent) => field.onChange(newContent)}
                                />
                            )}
                            rules={{ required: "Content is required" }}
                        />
                        {errors.content && <span className="text-red-500">{errors.content.message}</span>}
                    </div>

                    <div className="flex justify-center pt-2">
                        {isLoading ? (
                            <button type="button" className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300">Loading...</button>
                        ) : (
                            <button type="submit" className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300">Save</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCelebrityPerfume;
