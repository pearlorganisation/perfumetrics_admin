import { Skeleton } from "@mui/material";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import parse from 'html-react-parser';
import SearchBar from "../../components/SearchBar/SearchBar";

const CelebrityPerfume = () => {
    const [celebrityPerfume, setCelebrityPerfume] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page');
    const search = searchParams.get('search');

    const getCelebrityPerfume = ({ page, search }) => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/celebrityPerfumes/admin?Page=${page || 1}&Search=${search || ''}`)
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
        getCelebrityPerfume({})
    }, []);

    useEffect(() => {
        getCelebrityPerfume({ page, search })
    }, [search, page]);

    const deleteItem = (item) => {
        if (window.confirm(`Are you sure you want to delete Celebrity Perfume:- ${item.title}`)) {
            axios.delete(`${import.meta.env.VITE_API_URL}/celebrityPerfumes/${item._id}`).then((res) => {

                toast.success("Successfully Re", {
                    style: {
                        background: "green",
                        color: "white",
                    },
                });
                getCelebrityPerfume({ page, search })


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

            <div className="p-10 ">
                <div className="text-center text-3xl font-medium">Celebrity Perfume</div>
                <div className="grid grid-cols-2 justify-center items-center ">
                    <div className="space-y-4 md:space-y-0 pb-8">
                        <SearchBar />
                    </div>
                    <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">

                        <Link
                            to="/addCelebrityPerfume"
                            className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
                        >
                            Add
                        </Link>
                    </div>
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
                    {celebrityPerfume && celebrityPerfume.data && (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Img
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3">
                                        Content
                                    </th> */}

                                    <th scope="col" className="col-span-2 px-6 py-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {celebrityPerfume.data.map((item, idx) => (
                                    <tr key={idx} className="bg-white border-b   hover:bg-gray-50 ">
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                                        >
                                            <div className="ps-3">
                                                <img src={item?.banner} width={"100px"} />
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{item?.title}</td>
                                        {/* <td className="px-6 py-4">{parse(item?.content)}</td> */}


                                        <td className="px-6 py-4 space-x-3 flex justify-center items-center">

                                            <Link
                                                to={`/updateCelebrityPerfume/${item?._id}`}
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
                    totalPages={celebrityPerfume.totalPage}
                />}
            </div>
        </div>
    );
};



export default CelebrityPerfume