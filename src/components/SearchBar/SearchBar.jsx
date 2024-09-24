import React from 'react'
import { useDebouncedCallback } from "use-debounce";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleSearch = useDebouncedCallback((name, term) => {
        console.log(name, term)
        const params = new URLSearchParams(location.search);
        if (term) {
            params.set(name, term);
        } else {
            params.delete(name);
        }
        navigate(`${location.pathname}?${params.toString()}`);
    }, 500);
    return (
        <div className="relative max-w-xs flex justify-start items-center">
            <FaMagnifyingGlass className='w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto' />

            <input
                type="text"
                placeholder="Search..."
                // value={inputValue}
                onChange={(e) => {
                    console.log(e.target.value)
                    handleSearch("search", e.target.value)
                }}
                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
        </div>
    )
}

export default SearchBar