import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactUserDetail = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContactUsEntries = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/contact-us`);
                setEntries(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContactUsEntries();
    }, []);

    const handleView = (id) => {
        navigate(`view/${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Contact Us Listing</h1>

            {entries.length === 0 ? (
                <p>No entries found.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Message</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry) => (
                            <tr key={entry._id}>
                                <td className="border border-gray-300 px-4 py-2">{entry.name}</td>
                                <td className="border border-gray-300 px-4 py-2 truncate">
                                    {entry.message.length > 50 ? `${entry.message.substring(0, 50)}...` : entry.message}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleView(entry._id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ContactUserDetail