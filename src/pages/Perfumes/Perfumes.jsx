import React, { useState } from "react";
import { Link } from "react-router-dom";

const Perfumes = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div class="p-10 ">
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
          <div className="text-2xl font-semibold">
            Perfume Reviews:
          </div>
          <Link
            to="/perfume/add"
            className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
          >
            Add
          </Link>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                {/* <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  "/>
                        <label for="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    Status
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b   hover:bg-gray-50 ">
                {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  "/>
                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td> */}
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      Hair Conditioner
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">Rs 450</td>

                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600  hover:underline"
                  >
                    View Details
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b   hover:bg-gray-50 ">
                {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  "/>
                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td> */}
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">Shampoo</div>
                  </div>
                </th>
                <td className="px-6 py-4">Rs 750</td>

                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600  hover:underline"
                  >
                    View Details
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b   hover:bg-gray-50 ">
                {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  "/>
                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td> */}
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">Face Scrub</div>
                  </div>
                </th>
                <td className="px-6 py-4">Rs 400</td>

                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600  hover:underline"
                  >
                    View Details
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b   hover:bg-gray-50 ">
                {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  "/>
                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td> */}
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">Facewash</div>
                  </div>
                </th>
                <td className="px-6 py-4">Rs 300</td>

                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600  hover:underline"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Perfumes;
