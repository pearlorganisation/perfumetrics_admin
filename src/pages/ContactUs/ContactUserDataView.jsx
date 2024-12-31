// Import necessary modules
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactUserDataView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContactUsEntry = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/contact-us/${id}`);
                setEntry(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContactUsEntry();
    }, [id]);

    const handleBack = () => {
        navigate('/contact-us');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-12">
            <h1 className="text-2xl font-bold mb-4">View Contact Us Entry</h1>

            {entry ? (
                <div className="border rounded p-4 shadow-md bg-white">
                    <p className="mb-2">
                        <strong>Name:</strong> {entry.name}
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> {entry.email}
                    </p>
                    <p className="mb-2">
                        <strong>Company:</strong> {entry.company}
                    </p>
                    <p className="mb-2">
                        <strong>Message:</strong> {entry.message}
                    </p>
                    <p className="mb-2">
                        <strong>Submitted At:</strong> {new Date(entry.createdAt).toLocaleString()}
                    </p>

                    <button
                        onClick={handleBack}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Back
                    </button>
                </div>
            ) : (
                <p>Entry not found.</p>
            )}
        </div>
    );
};

export default ContactUserDataView;
