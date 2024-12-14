import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../features/actions/brandsAction";
import Select from "react-select";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { toast } from 'sonner';

const AddSaleOff = ({ setIsShowing }) => {
    const dispatch = useDispatch()
    const { perfumeId } = useParams()
    const [brandsData, setBrandsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { brands, isDeleted, isUpdated } = useSelector(state => state.brand)


    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null); // State to store the image preview URL
    const { fields, append, remove } = useFieldArray({
        control,
        name: "links",
    });
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
    useEffect(() => {
        getCountryISO()
    }, []);



    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
            setImagePreview(imageUrl); // Update the state with the image URL
        }
    };


    useEffect(() => {
        dispatch(fetchBrands())
    }, [])
    useEffect(() => {
        if (brands.length > 0) {
            const temp = brands?.map(item => {
                return {
                    value: item?._id,
                    label: item?.brand
                }
            })
            setBrandsData(temp)
        }
    }, [brands])
    const postRelatedFragram = async (formData) => {

        try {
            setIsLoading(true)
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/salesOff`, formData)
            setIsLoading(false)
            setIsShowing(false)

            console.log(result, "relatedFragrams")
        } catch (error) {
            setIsLoading(false)
            toast.error(error?.response?.data?.message || "Error on Adding Sales Off", { position: 'top-center' })
            console.log(error?.response?.data?.message)
        }

    }

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append("title", data?.title)
        formData.append("links", JSON.stringify(data?.links))
        formData.append("rating", data?.rating)
        formData.append("banner", data?.banner[0])

        postRelatedFragram(formData)

        console.log(data, "data"); // Handle form submission
    };
    return (
        <div className="w-full text-center space-y-5  bg-white  shadow overflow-hidden sm:rounded-md">
            <h1 className="text-3xl">Add  Sale Off </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Perfume Title */}
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
                    <div className="p-4 border border-grey-lighter w-full">
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 rounded px-3 focus:border-blue focus:shadow"
                                placeholder="Title"
                            />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <input
                                type="text"
                                {...register('quantity', { required: 'Quantity is required' })}
                                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 rounded px-3 focus:border-blue focus:shadow"
                                placeholder="Quantity"
                            />
                            {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
                        </div>
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <input
                                type="text"
                                {...register('rating', { required: 'Rating is required' })}
                                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 rounded px-3 focus:border-blue focus:shadow"
                                placeholder="Rating"
                            />
                            {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
                        </div>



                        <div className='relative'>
                            {/* Dynamic Fields */}
                            {fields.map((field, index) => (
                                <div key={field.id} className="bg-gray-50 grid grid-cols-2 p-4 rounded shadow-md gap-4 text-left relative">
                                    <div className='col-span-2 space-y-1'>
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
                                            <p className="text-red-500">
                                                {errors.links[index].link.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className='col-span-2 space-y-1'>
                                        <label
                                            htmlFor={`links.${index}.price`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            {...register(`links.${index}.price`, {
                                                required: 'Price is required',
                                            })}
                                            placeholder="Price"
                                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                                        />
                                        {errors.links?.[index]?.price && (
                                            <p className="text-red-500">
                                                {errors.links[index].price.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* <div className='space-y-1'>
                                        <label
                                            htmlFor={`links.${index}.company`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            {...register(`links.${index}.company`, {
                                                required: 'Company name is required',
                                            })}
                                            placeholder="Company Name"
                                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                                        />
                                        {errors.links?.[index]?.company && (
                                            <p className="text-red-500">
                                                {errors.links[index].company.message}
                                            </p>
                                        )}
                                    </div> */}

                                    <div className='space-y-1 col-span-2'>
                                        <label
                                            htmlFor={`links.${index}.country`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Country
                                        </label>
                                        <Controller
                                            name={`links.${index}.country`} // Dynamically accessing the `country` field in your array of links
                                            control={control}
                                            rules={{ required: 'Country is required' }} // Validation rule for required field
                                            render={({ field }) => (
                                                <Select
                                                    {...field} // Spread the field props from Controller to manage the value
                                                    options={countryISOData} // Assuming `countryISOData` is your options array for countries
                                                    getOptionLabel={(e) => e.label} // Use this to get the label for display in Select
                                                    getOptionValue={(e) => e.value} // Use this to get the value for the selected option
                                                    value={countryISOData.find((option) => option.value === field.value) || null} // Ensure the correct option object is selected
                                                    onChange={(selectedOption) => {
                                                        field.onChange(selectedOption?.value || null); // Update form value with selected option's value
                                                    }}
                                                    placeholder="Select a country"
                                                    isClearable // Allow clearing the selected option
                                                />
                                            )}
                                        />
                                        {errors.links?.[index]?.country && (
                                            <p className="text-red-500">
                                                {errors.links[index].country.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="bg-red-500 absolute top-0 right-0 text-white p-1 rounded"
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => append({ link: '', country: '' })}
                                className="bg-blue-500 mt-3 text-white px-4 py-2 rounded  top-0 right-0"
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
                            {...register('banner', { required: 'File is required' })}
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

                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Selected" className="max-w-xs mx-auto rounded-md" />
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



export default AddSaleOff