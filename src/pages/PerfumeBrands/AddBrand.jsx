import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBrands } from '../../features/actions/brandsAction';
import { useNavigate } from 'react-router-dom';

const AddBrand = () => {
    const [newBrand, setNewBrand] = useState('');
    const dispatch = useDispatch()
    const { brands, isLoading, isUpdated } = useSelector(state => state.brand)
    const navigate = useNavigate()
    const handleAddBrand = () => {

        dispatch(addBrands({ brand: newBrand }))

    };
    useEffect(() => {
        if (isUpdated) {
            navigate('/perfumeBrands')
        }
    }, [isUpdated])

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Brand</h1>
                <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="Enter new brand name"
                    className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                {
                    isLoading ? <button
                        type='button'
                        className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition duration-300"
                    >
                        Loading...
                    </button> : <button
                        onClick={handleAddBrand}
                        className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition duration-300"
                    >
                        Add Brand
                    </button>
                }

            </div>
        </div>

    )
}

export default AddBrand