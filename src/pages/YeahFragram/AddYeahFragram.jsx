import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../features/actions/brandsAction";
import Select from "react-select";

const AddFragrams = () => {
  const dispatch = useDispatch()
  const [brandsData, setBrandsData] = useState([])
  const { brands, isLoading, isDeleted, isUpdated } = useSelector(state => state.brand)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [])
  useEffect(() => {
    if (brands.length > 0) {
      const temp = brands?.map(item => {
        return {
          value: item?._id,
          label: item?.brand
        }
      })
      setBrandsData(temp)
    }
  }, [brands])
  return (
    <div className="w-full mt-12 text-center space-y-5  bg-white  shadow overflow-hidden sm:rounded-md">
      <h1 className="text-3xl">Add Yeah Fragram Form</h1>

      <form>
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          <div className=" p-4 border border-grey-lighter w-full">
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

            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm text-left font-medium text-gray-900 "
                htmlFor="file_input"
              >
                Brands
              </label>
              <Select
                options={brandsData}

                onChange={(val) => {
                  setBrandId(val?.value)
                }}

              // closeMenuOnSelect={true}
              />

            </div>
          </div>
        </div>

        <div className="mb-6 pt-4 bg-white max-w-4xl mx-auto">
          <label className="mb-5 block text-xl font-semibold text-[#07074D]">
            Upload Image File
          </label>

          <div className="mb-8">
            <input type="file" name="file" id="file" className="sr-only" />
            <label
              htmlFor="file"
              className="relative flex min-h-[200px]  items-center justify-center rounded-md border border-dashed border-[#419A62] p-12 text-center"
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
