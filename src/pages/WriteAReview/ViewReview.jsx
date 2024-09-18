import React from "react";

const ViewReview = ({ isOpen, onClose, perfume }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Perfume Details</h2>

                <div className="flex flex-col space-y-4">
                    {/* Perfume Image */}
                    <div className="w-full flex justify-center">
                        <img
                            src={perfume.img}
                            alt={perfume.name}
                            className="w-32 h-32 object-cover rounded"
                        />
                    </div>

                    {/* Perfume Name */}
                    <div>
                        <strong>Perfume Name:</strong>
                        <p>{perfume.name}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <strong>Description:</strong>
                        <p>{perfume.description}</p>
                    </div>

                    {/* User */}
                    <div>
                        <strong>User:</strong>
                        <p>{perfume.user}</p>
                    </div>

                    {/* Status */}
                    <div>
                        <strong>Status:</strong>
                        <p>{perfume.status}</p>
                    </div>
                </div>

                {/* Close Button */}
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};



export default ViewReview