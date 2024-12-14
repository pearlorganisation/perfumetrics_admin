import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBrands, deleteBrands, fetchBrands, updateBrands } from '../../features/actions/brandsAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';
import { Skeleton } from '@mui/material';

const PerfumeBrands = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [brand, setBrand] = useState();
    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const dispatch = useDispatch();
    const { brands, isLoading, isDeleted, isUpdated } = useSelector(state => state.brand)
    const navigate = useNavigate();




    const handleDeleteBrand = (id) => {
        dispatch(deleteBrands(id))
    };

    const handleUpdateBrand = (id, updatedName) => {
        dispatch(updateBrands({ id: id, data: { brand: updatedName } }))
    };
    useEffect(() => {
        dispatch(fetchBrands({}))
    }, [])

    useEffect(() => {
        if (isUpdated) {
            dispatch(fetchBrands({}))
        }
    }, [isUpdated]);


    useEffect(() => {


        dispatch(fetchBrands({ search, page }))

    }, [search, page]);






    return (
        <div className="container mx-auto p-4 pt-12">
            <SearchBar />

            <div className='flex justify-between py-3'>
                <h1 className="text-2xl font-bold mb-4">Perfume Brands</h1> <button
                    onClick={() => { navigate('/addBrand') }}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Brand
                </button>
            </div>
            {isLoading && (
                <>
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                </>
            )}
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
                        Array.isArray(brands.data) && brands.data?.length > 0 && brands.data?.map((brand) => (
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
            {brands &&
                <Pagination
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    totalPages={brands.totalPage}
                />}
        </div>
    );
};




export default PerfumeBrands