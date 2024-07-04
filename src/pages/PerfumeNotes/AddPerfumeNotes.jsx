import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { Toaster, toast } from "sonner";

const AddPerfumeNotes = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const filterData = (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("image", data.image[0]);

    return formData;
  };




  const onSubmit = (data) => {
    toast('saving')
    let formData = filterData(data);
    setIsLoading(true)
    axios
      .post(`${import.meta.env.VITE_API_URL}/note`, formData)
      .then((res) => {
        setIsLoading(false)
        toast.success("Saved successfully", {
          style: {
            background: "green",
            color: "white",
          },
        });
        window.location.href = '/perfumenotes'
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
        toast.error("Server Issue, Try again later", {
          style: {
            background: "red",
            color: "white",
          },
        });

      }
    );

    toast("saving filtered data");
  };

  return (
    <div>
      <section className="bg-white ">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">
            Add Perfume Notes
          </h2>

          <Toaster />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <div className="w-full flex justify-end py-2">
                </div>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 bg-gray-50 ">
                      <tr>
                       
                        <th scope="col" className="px-1 pt-2 pb-1">
                          Note Name
                        </th>
                        <th scope="col" className="px-1 pt-2 pb-1">
                          Img
                        </th>
                        <th scope="col" className="px-1 pt-2 pb-1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td
                          scope="row"
                          className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="E.g, Wood, lavender etc"
                            {...register("name", { required: true })}
                          />
                        </td>
                        <td className="px-1 py-4">
                          <input
                            type="file"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="0"
                            
                            accept=".jpg, .jpeg, .png, .webp"
                            {...register("image", {required: true})}
                          />
                        </td>
                      
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4 w-full">
              <button
                type="submit"
                className="w-1/3 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text- px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? 'Saving...' : 'Save'}

              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddPerfumeNotes;
