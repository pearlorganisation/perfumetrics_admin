import React, { useEffect, useState } from 'react';
// import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Skeleton } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BrandImagesLinkPage = () => {
    const [items, setItems] = useState([]);
    //   let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    //   const page = searchParams.get('page');
    //   const search = searchParams.get('search');
    //   const dispatch = useDispatch();









    const [isLoading, setIsLoading] = useState(false);
    const fetchImageBrandLink = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/url-Image`)
            .then((response) => {
                setItems(response.data.data)
                setIsLoading(false);
            })
            .catch((error) => console.error('Error fetching items:', error));
    }
    useEffect(() => {
        fetchImageBrandLink()
        setIsLoading(true);

    }, []);

    function handleDeleteBrand(id) {
        axios.delete(`${import.meta.env.VITE_API_URL}/url-Image/${id}`)
            .then((response) => {
                setItems(response.data.data)
                setIsLoading(false);
                fetchImageBrandLink()
            })
            .catch((error) => console.error('Error Deleting items:', error));
    }




    return (
        <div className="container mx-auto p-4 pt-12">
            {/* <SearchBar /> */}

            <div className='flex justify-between py-3'>
                <h1 className="text-2xl font-bold mb-4">Perfume Brands Image Links </h1> <button
                    onClick={() => { navigate('/addbrandImageLink') }}
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
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Image</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Brand Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(items) && items?.length > 0 && items?.map((el) => (
                            <tr key={el._id}>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <div>
                                        <img src={el?.imageUrl} alt={el?.brand} className='h-14 w-28' />
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{el?.brand}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    {/* <button
                                // onClick={() => handleUpdateBrand(el._id, prompt('Enter new brand name:', el.brand))}
                                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                            >
                                Update
                            </button> */}
                                    <button
                                        onClick={() => handleDeleteBrand(el?._id)}
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
            {/* {items &&
        <Pagination
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            totalPages={brands.totalPage}
        />} */}
        </div>
    );
};




export default BrandImagesLinkPage