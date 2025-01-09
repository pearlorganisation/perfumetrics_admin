import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addBrands } from '../../features/actions/brandsAction';
import { useNavigate } from 'react-router-dom';

const AddBrand = () => {
    const dispatch = useDispatch();
    const { isLoading, isUpdated } = useSelector((state) => state.brand);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        dispatch(addBrands({ brand: data.brand }));
    };

    useEffect(() => {
        if (isUpdated) {
            reset(); // Reset form fields after successful update
            navigate('/perfumeBrands');
        }
    }, [isUpdated, reset, navigate]);

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Brand</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Enter new brand name"
                        {...register('brand', {
                            required: 'Brand name is required',
                            pattern: {
                                value: /^[a-zA-Z0-9-_ ]+$/,
                                message: 'Brand name can only contain letters, numbers, hyphens, and underscores',
                            },
                        })}
                        className={`border p-3 rounded w-full focus:outline-none focus:ring-2 ${errors.brand ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            } mb-4`}
                    />
                    {errors.brand && (
                        <p className="text-red-500 text-sm mb-4">{errors.brand.message}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                            } text-white px-4 py-2 rounded w-full transition duration-300`}
                    >
                        {isLoading ? 'Loading...' : 'Add Brand'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
