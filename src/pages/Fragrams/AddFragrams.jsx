
import React from "react";


const AddYeahFragram = () => {

  return (
    <div className="w-full mt-12 text-center  bg-white  shadow overflow-hidden sm:rounded-md">
      <h1 className="text-3xl">Add Fragrams Form</h1>

      <form className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center mt-8">
          <div className=" p-4 border border-grey-lighter w-full">
            <div className="flex flex-wrap items-stretch w-full mb-4 relative">
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-green-200 h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                placeholder="Title"
              />
            </div>

            <div className="flex flex-wrap items-stretch w-full mb-4 relative">
              <input
                type="text"
                placeholder="Redirection Link"
                className="flex-shrink flex-grow flex-auto leading-normal w-px  border border-green-200 h-10 border-grey-light rounded rounded-l-none px-3 relative"
              />
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

export default AddYeahFragram;
