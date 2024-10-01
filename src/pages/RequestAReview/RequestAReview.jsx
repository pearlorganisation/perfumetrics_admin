import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";


const RequestAReview = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();


    const getWriteAReview = (id) => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/requestReview/${id}`)
            .then((res) => {
                console.log(res);
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const approveReview = async (id, status) => {

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/requestReview/${id}`, { status: status })
            navigate(-1);
            console.log(res, "res")
        } catch (error) {
            toast.error("Server is Busy !! Try Again Later!!")
            console.log(error)
        }
    }



    useEffect(() => {
        // Use the id from params if needed
        getWriteAReview(id);
    }, []);

    useEffect(() => {
        console.log("first", data);
    }, [data]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Requested Review Detail</h2>
                <div className="flex flex-col space-y-4">
                    {/* Perfume Image */}
                    <div className="w-full flex justify-center">
                        {data && data?.images && (
                            <img
                                src={data?.images[0]?.path}
                                alt={data.name}
                                className=" h-48 object-cover rounded"
                            />
                        )}
                    </div>

                    {/* Perfume Name */}
                    <div>
                        <strong>Perfume Name:</strong>
                        <p>{data?.perfumeName}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <strong>Description:</strong>
                        <p>{data?.description}</p>
                    </div>

                    {/* User */}
                    <div>
                        <strong>User:</strong>
                        <p>{data?.userId?.userName}</p>
                    </div>

                    {/* Status */}
                    <div>
                        <strong>Status:</strong>
                        <p>{data?.status}</p>
                    </div>
                </div>

                {/* Close Button */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    {
                        loading ? <button
                            type="button"
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                        >
                            Loading...
                        </button> : <button
                            onClick={() => {
                                approveReview(id, "discarded")
                            }}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                        >
                            Discarded
                        </button>
                    }
                    {
                        loading ? <button
                            type="button"
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        >
                            Loading...
                        </button> : <button
                            onClick={() => {
                                approveReview(id, "approved")
                            }}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        >
                            Approve
                        </button>
                    }
                </div>
            </div>

        </div>
    );
};

export default RequestAReview;