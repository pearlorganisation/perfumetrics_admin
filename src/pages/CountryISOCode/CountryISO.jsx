import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import parse from 'html-react-parser';
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";

const CountryISO = () => {
    const [countryISOData, setCountryISOData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const getCountryISO = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/countryISOcodes`)
            .then((res) => {
                console.log(res)
                setCountryISOData(res?.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getCountryISO()
    }, []);






    return (
        <div>
            <Toaster />

            <div className="p-10 ">
                <div className="text-center text-3xl font-medium">Country ISO</div>
                <div className="p-4 flex justify-between items-center">
                    <SearchBar /> <Link to='/addCountryISO' className="px-5 py-2 bg-blue-600 text-white rounded-lg">Add</Link>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {isLoading && (
                        <>
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                        </>
                    )}
                    {countryISOData && (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ISO Code
                                    </th>



                                </tr>
                            </thead>
                            <tbody>
                                {countryISOData?.data?.map((item, idx) => (
                                    <tr className="bg-white border-b   hover:bg-gray-50 ">

                                        <td className="px-6 py-4">{item?._id}</td>
                                        <td className="px-6 py-4">{item?.label}</td>
                                        <td className="px-6 py-4">{item?.value}</td>



                                        {/* <td className="px-6 py-4 space-x-3 flex justify-center items-center">

                                            <Link
                                                to={`/viewReview/${item._id}`}
                                                className="font-medium text-blue-600  hover:underline"
                                            >
                                                View
                                            </Link>
                                            <button
                                                className="font-medium text-red-600  hover:underline"
                                                onClick={() => {
                                                    deleteItem(item)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td> */}

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    );
};







export default CountryISO