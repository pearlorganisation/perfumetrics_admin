import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

const Pagination = ({ searchParams, setSearchParams, totalPages }) => {
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const location = useLocation();

    const navigate = useNavigate();
    const handlePagination = useDebouncedCallback((name, term) => {
        console.log(name, term)
        const params = new URLSearchParams(location.search);
        if (term) {
            params.set(name, term);
        } else {
            params.delete(name);
        }
        navigate(`${location.pathname}?${params.toString()}`);
    }, 500);

    useEffect(() => {
        setCurrentPage(Number(searchParams.get('page')))
    }, [Number(searchParams.get('page'))])




    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium">
                <button
                    onClick={() => {
                        handlePagination("page", currentPage === 1 ? currentPage : currentPage - 1)
                        setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
                    }}
                    className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                >
                    Previous
                </button>
                <div>
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={() => {
                        handlePagination("page", currentPage === totalPages ? currentPage : currentPage + 1)
                        setCurrentPage(
                            currentPage === totalPages ? currentPage : currentPage + 1
                        );
                    }}
                    className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
