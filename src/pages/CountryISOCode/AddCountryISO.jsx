import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function AddCountryISO() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            countryISOcodes: [{ value: '', label: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'countryISOcodes',
    });
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const addCountryISO = (data) => {
        axios
            .post(`${import.meta.env.VITE_API_URL}/countryISOcodes`, data)
            .then((res) => {
                console.log(res)

                setIsLoading(false);
                navigate('/countryISO')
            })
            .catch((err) => {
                console.log(err);
                toast.error("Server Busy Try Again !", { position: 'top-center' })
                setIsLoading(false);
            });
    }
    // useEffect(() => {
    //     addCountryISO()
    // }, []);

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        addCountryISO(data)
    };

    return (
        <div className="container mx-auto p-4 pt-12">
            <h1 className="text-2xl font-bold mb-4 mx-auto text-center 
            ">Country ISO Form</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <div key={field.id} className="mb-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            {/* Labels */}
                            <label className="col-span-3 text-gray-700 font-medium">ISO Code</label>
                            <label className="col-span-7 text-gray-700 font-medium">Country</label>

                            {/* Inputs */}
                            <div className="col-span-3">
                                <input
                                    type="text"
                                    placeholder="ISO Code (e.g., DE)"
                                    {...register(`countryISOcodes.${index}.value`, {
                                        required: 'ISO Code is required',
                                        minLength: {
                                            value: 2,
                                            message: 'ISO Code must be at least 2 characters',
                                        },
                                    })}
                                    className={`input w-full px-3 py-2 border ${errors.countryISOcodes?.[index]?.value
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        } rounded-md`}
                                />
                                {errors.countryISOcodes?.[index]?.value && (
                                    <p className="text-red-500 text-sm">
                                        {errors.countryISOcodes?.[index]?.value.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-7">
                                <input
                                    type="text"
                                    placeholder="Country (e.g., Germany)"
                                    {...register(`countryISOcodes.${index}.label`, {
                                        required: 'Country is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Country must be at least 2 characters',
                                        },
                                    })}
                                    className={`input w-full px-3 py-2 border ${errors.countryISOcodes?.[index]?.label
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        } rounded-md`}
                                />
                                {errors.countryISOcodes?.[index]?.label && (
                                    <p className="text-red-500 text-sm">
                                        {errors.countryISOcodes?.[index]?.label.message}
                                    </p>
                                )}
                            </div>

                            {/* Remove button */}
                            {
                                fields?.length > 1 && <div className="col-span-2">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="bg-red-500 text-white px-3 py-2 rounded-md"
                                    >
                                        Remove
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                ))}

                {/* Add more button */}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={() => append({ value: '', label: '' })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add More
                    </button>
                </div>

                {/* Submit button */}
                {
                    isLoading ? <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                        Loading...
                    </button> : <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                }
            </form>
        </div>
    );
}




export default AddCountryISO