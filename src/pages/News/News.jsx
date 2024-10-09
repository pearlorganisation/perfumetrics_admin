import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import parse from 'html-react-parser';
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

const News = () => {
    const [celebrityPerfume, setCelebrityPerfume] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const getNews = ({ page, search }) => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/news/admin?Search=${search || ''}&Page=${page || 1}`)
            .then((res) => {
                console.log(res)
                setCelebrityPerfume(res?.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getNews({})
    }, []);
    useEffect(() => {
        getNews({ search, page })
    }, [search, page]);
    const deleteItem = (item) => {
        if (window.confirm(`Are you sure you want to delete perfume:- ${item.title}`)) {
            axios.delete(`${import.meta.env.VITE_API_URL}/news/${item._id}`).then((res) => {

                getNews({ search, page })

                toast.success("Successfully Deleted !!", {
                    style: {
                        background: "green",
                        color: "white",
                    },
                });


            }).catch(err => {
                console.log(err, "Error")
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
                <div className="text-center text-3xl font-medium">News Blogs</div>
                <div class="flex  items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
                    <SearchBar />
                    <Link
                        to="/addNews"
                        className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
                    >
                        Add
                    </Link>
                </div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {isLoading && (
                        <>
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                            <Skeleton animation="wave" height={50} />
                        </>
                    )}
                    {celebrityPerfume && (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Img
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>

                                    <th scope="col" className="col-span-2 px-6 py-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {celebrityPerfume?.data?.map((item, idx) => (
                                    <tr className="bg-white border-b   hover:bg-gray-50 ">
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                                        >
                                            <div className="ps-3">
                                                <img src={item?.image} width={"100px"} />
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{item?.title}</td>
                                        {/* <td className="px-6 py-4">{parse(item?.description?.slice(0, 10))}</td> */}


                                        <td className="px-6 py-4 space-x-3 flex justify-center items-center">

                                            <Link
                                                to={`/updateNews/${item?._id}`}
                                                className="font-medium text-blue-600  hover:underline"
                                            >
                                                View/edit
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
                {celebrityPerfume && <Pagination
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    totalPages={celebrityPerfume?.totalPage}
                />}
            </div>
        </div>
    );
};





export default News