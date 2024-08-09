import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBrands, deleteBrands, fetchBrands, updateBrands } from '../../features/actions/brandsAction';
import { useNavigate } from 'react-router-dom';

const PerfumeBrands = () => {


    const [newBrand, setNewBrand] = useState('');
    const dispatch = useDispatch()
    const { brands, isLoading, isDeleted, isUpdated } = useSelector(state => state.brand)
    const navigate = useNavigate()




    const handleDeleteBrand = (id) => {
        dispatch(deleteBrands(id))
    };

    const handleUpdateBrand = (id, updatedName) => {
        dispatch(updateBrands({ id: id, data: { brand: updatedName } }))
    };
    useEffect(() => {
        dispatch(fetchBrands())
    }, [])

    useEffect(() => {
        if (isDeleted || isUpdated)
            dispatch(fetchBrands())
    }, [isDeleted, isUpdated])




    return (
        <div className="container mx-auto p-4 pt-12">
            <div className='flex justify-between py-3'>
                <h1 className="text-2xl font-bold mb-4">Perfume Brands</h1> <button
                    onClick={() => { navigate('/addBrand') }}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Brand
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Brand Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? <div className='h-[40vh] grid place-items-center w-full'>Loading...</div> : Array.isArray(brands) && brands?.length > 0 && brands?.map((brand) => (
                            <tr key={brand._id}>
                                <td className="py-2 px-4 border-b border-gray-200">{brand._id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{brand.brand}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleUpdateBrand(brand._id, prompt('Enter new brand name:', brand.brand))}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBrand(brand._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* <div className="mt-4">
                <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="Enter new brand name"
                    className="border border-gray-300 p-2 rounded mr-2"
                />
                <button
                    onClick={handleAddBrand}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Brand
                </button>
            </div> */}
        </div>
    );
};




export default PerfumeBrands