import React from "react";

const AddFragrams = () => {
  return (
    <div className="w-full mt-12 text-center  bg-white  shadow overflow-hidden sm:rounded-md">
      <h1 className="text-3xl">Add Yeah Fragram Form</h1>

      <form>
        <div className="flex flex-col items-center justify-center">
          <div className=" p-4 border border-grey-lighter w-1/2">
            <div className="flex flex-wrap items-stretch w-full mb-4 relative">
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                placeholder="Title"
              />
            </div>

            <div className="flex flex-wrap  w-full mb-4 relative">
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 border-grey-light rounded rounded-r-none px-3 relative"
                placeholder="Price"
              />
            </div>

            <div className="flex flex-wrap items-stretch w-full mb-4 relative">
              <input
                type="text"
                placeholder="Redirection Link"
                className="flex-shrink flex-grow flex-auto leading-normal w-px  border border-green-200 h-10 border-grey-light rounded rounded-l-none px-3 relative"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="brands"
                className="block text-sm font-medium text-gray-700"
              >
                Brands
              </label>
              <select
                id="brands"
                name="brands"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option> Brand 1 </option>
                <option> Brand 2 </option>
                <option> Brand 3 </option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 pt-4 bg-white">
          <label className="mb-5 block text-xl font-semibold text-[#07074D]">
            Upload Image File
          </label>

          <div className="mb-8">
            <input type="file" name="file" id="file" className="sr-only" />
            <label
              htmlFor="file"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#419A62] p-12 text-center"
            >
              <div>
                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                  Drop files here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#419A62] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFragrams;
