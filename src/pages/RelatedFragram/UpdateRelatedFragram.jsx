import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../features/actions/brandsAction";
import Select from "react-select";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { IoClose } from "react-icons/io5";

const UpdateRelatedFragram = ({ setIsShowing, data }) => {
    console.log(data, "singlePerfumeData")
    const dispatch = useDispatch();
    const { perfumeId } = useParams();
    const [brandsData, setBrandsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { brands } = useSelector(state => state.brand);
    const [countryISOData, setCountryISOData] = useState(null);
    const getCountryISO = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/countryISOcodes`)
            .then((res) => {
                console.log(res)
                setCountryISOData(res?.data.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            perfumeName: data.perfumeName,
            brand: {
                value: data?.brand?._id, // Unique value
                label: data?.brand?.brand, // Displayed label
            },
            links: data?.mapOfLinks
                ? Object.entries(data?.mapOfLinks).map(([country, link]) => ({ country, link }))
                : [{ link: '', country: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "links",
    });

    const [imagePreview, setImagePreview] = useState(data?.banner || null); // State for image preview

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    useEffect(() => {
        dispatch(fetchBrands({ limit: "infinite" }));
    }, []);

    useEffect(() => {
        if (brands?.data?.length > 0) {
            const temp = brands?.data?.map(item => ({
                value: item?._id,
                label: item?.brand,
            }));
            setBrandsData(temp);
        }
    }, [brands]);

    const updateRelatedFragram = async (formData) => {
        try {
            setIsLoading(true);
            const result = await axios.patch(`${import.meta.env.VITE_API_URL}/relatedFragrams/single/${data?._id}`, formData);
            setIsLoading(false);
            if (result?.data?.status) {
                toast.success("Submitted!", { position: 'top-center' });
                setIsShowing(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error:", error.message);
        }
    };

    const onSubmit = (data) => {
        console.log(data, "link data")
        const formData = new FormData();
        formData.append('perfumeName', data.perfumeName);
        formData.append('perfume', perfumeId);
        formData.append('brand', data?.brand?.value);
        formData.append('banner', data.banner[0]);
        formData.append(`links`, JSON.stringify(data?.links));



        updateRelatedFragram(formData);
    };

    useEffect(() => {
        getCountryISO()
    }, []);

    return (
        <div className="w-full text-center space-y-5 bg-white shadow overflow-hidden sm:rounded-md">
            <h1 className="text-3xl">Upload Related Fragram</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Perfume Title */}
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
                    <div className="p-4 border border-grey-lighter w-full">
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <input
                                type="text"
                                {...register('perfumeName', { required: 'Title is required' })}
                                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 rounded px-3 focus:border-blue focus:shadow"
                                placeholder="Title"
                            />
                            {errors.perfumeName && <p className="text-red-500">{errors.perfumeName.message}</p>}
                        </div>

                        {/* Brand Selection */}
                        <div className="text-left mb-4 relative w-full">
                            <Controller
                                name="brand"
                                control={control}
                                rules={{ required: 'Brand is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={brandsData}
                                        placeholder="Select a Brand"
                                        classNamePrefix="react-select"
                                    />
                                )}
                            />
                            {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
                        </div>

                        <div className="relative">
                            {/* Dynamic Fields */}
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="bg-gray-50 grid grid-cols-2 p-4 rounded shadow-md gap-4 text-left relative"
                                >
                                    {/* Link Input */}
                                    <div className="col-span-2 space-y-1">
                                        <label
                                            htmlFor={`links.${index}.link`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Link
                                        </label>
                                        <input
                                            type="url"
                                            {...register(`links.${index}.link`, {
                                                required: 'Link is required',
                                            })}
                                            placeholder="https://example.com"
                                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                                        />
                                        {errors.links?.[index]?.link && (
                                            <p className="text-red-500">{errors.links[index].link.message}</p>
                                        )}
                                    </div>

                                    {/* Country Dropdown */}
                                    <div className="space-y-1 col-span-2">
                                        <label
                                            htmlFor={`links.${index}.country`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Country
                                        </label>
                                        <Controller
                                            name={`links.${index}.country`}
                                            control={control}
                                            rules={{ required: 'Country is required' }}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={countryISOData} // Dropdown options
                                                    getOptionLabel={(e) => e.label}
                                                    getOptionValue={(e) => e.value}
                                                    value={countryISOData?.find((opt) => opt.value === field.value) || null}
                                                    onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                    placeholder="Select a country"
                                                    isClearable
                                                />
                                            )}
                                        />
                                        {errors.links?.[index]?.country && (
                                            <p className="text-red-500">{errors.links[index].country.message}</p>
                                        )}
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="bg-red-500 absolute top-0 right-0 text-white p-1 rounded"
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            ))}

                            {/* Add Button */}
                            <button
                                type="button"
                                onClick={() => append({ link: '', country: '' })}
                                className="bg-blue-500 mt-3 text-white px-4 py-2 rounded"
                            >
                                Add Links
                            </button>
                        </div>

                    </div>
                </div>

                {/* Image Upload */}
                <div className="mb-6 pt-4 bg-white max-w-4xl mx-auto">
                    <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                        Upload Image File
                    </label>
                    <div className="mb-8">
                        <input
                            type="file"
                            id="file"
                            className="sr-only"
                            {...register('banner', { required: { value: false, message: 'Banner is required' } })}
                            onChange={handleFileChange}
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
                        {errors.banner && <p className="text-red-500">{errors.banner.message}</p>}
                    </div>

                    {/* Preview Section */}
                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Preview" className="max-w-xs mx-auto rounded-md" />
                            <p className="text-center mt-2 text-sm text-gray-600">Preview of the selected image</p>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                {isLoading ? (
                    <button className="bg-blue-500 px-4 py-3 rounded-md text-white w-full" type="button">
                        Loading...
                    </button>
                ) : (
                    <button className="bg-blue-500 px-4 py-3 rounded-md text-white w-full" type="submit">
                        Submit
                    </button>
                )}
            </form>
        </div>
    );
};

export default UpdateRelatedFragram;
