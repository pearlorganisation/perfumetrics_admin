import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import parse from 'html-react-parser';

const WriteAReview = () => {
    const [writeReviewData, setWriteReveiwData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getWriteAReview = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/writeReview`)
            .then((res) => {
                console.log(res)
                setWriteReveiwData(res?.data?.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getWriteAReview()
    }, []);

    const deleteItem = (item) => {
        if (window.confirm(`Are you sure you want to delete review:- ${item.perfumeName}`)) {
            axios.delete(`${import.meta.env.VITE_API_URL}/writeReview/${item._id}`).then((res) => {

                setWriteReveiwData(res.data.perfumeData)
                toast.success(res.data.message, {
                    style: {
                        background: "green",
                        color: "white",
                    },
                });
                getWriteAReview()

            }).catch(err => {
                toast.error("There was some issue deleting the perfume", {
                    style: {
                        background: "red",
                        color: "white",
                    },
                });

            })
        }
    }


    return (
        <div>
            <Toaster />

            <div class="p-10 ">
                <div className="text-center text-3xl font-medium">Write A Review</div>
                {/* <div class="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">

                    <Link
                        to="/addNews"
                        className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
                    >
                        Add
                    </Link>
                </div> */}
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {isLoading && (
                        <>
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                        </>
                    )}
                    {writeReviewData && (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Img
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Perfume Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>

                                    <th scope="col" className="col-span-2 px-6 py-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {writeReviewData?.map((item, idx) => (
                                    <tr className="bg-white border-b   hover:bg-gray-50 ">
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                                        >
                                            <div className="ps-3">
                                                {item?.images?.length > 0 ? <img src={item?.images[0]?.path} width={"50px"} /> : null}
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{item?.perfumeName}</td>
                                        <td className="px-6 py-4">{item?.description}</td>
                                        <td className="px-6 py-4">{item?.userId?.userName}</td>
                                        <td className={`px-6 py-4 `}>
                                            <div className={` text-white p-1 rounded-md font-medium uppercase text-center ${item?.status === 'approved' ? 'bg-green-500' : item?.status === 'discarded' ? 'bg-red-500' : item?.status === 'pending' ? 'bg-yellow-500' : ''}`}>
                                                {item?.status}

                                            </div>
                                        </td>


                                        <td className="px-6 py-4 space-x-3 flex justify-center items-center">

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
                                        </td>

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







export default WriteAReview