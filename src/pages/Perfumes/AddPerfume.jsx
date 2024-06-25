import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'sonner';



const AddPerfume = () => {
  const [banner, setBanner] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [accords, setAccords] = useState([]);



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()



  const onSubmit = (data) => {
    console.log(data)
    toast('saving')
  }


  const addAccord = () => {
    setAccords((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let newAccord = { id: id, name: "", percentage: 0 };
      return [...prev, newAccord];
    });
  };

  const removeAccord = (id) => {
    setAccords((prev) => {
      let accords = [...prev];
      console.log(accords);
      let res = accords?.filter((e) => e.id !== id);
      console.log(res);
      return res;
    });
  };

  return (
    <div>
       
      <section className="bg-white ">
     
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add Perfume</h2>
          <Toaster />
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                {banner && (
                  <div className="w-[250px] h-[250px] border">
                    <img
                      src={URL.createObjectURL(banner)}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    for="file_input"
                  >
                    Upload Main Pic
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                    id="file_input"
                    type="file"
                    onChange={(e) => {
                      setBanner(e.target.files[0]);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    for="file_input"
                  >
                    Upload Gallery Pics
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                    id="file_input"
                    type="file"
                    multiple
                    onChange={(e) => {
                      setGallery((prev) => {
                        return [...prev, ...e.target.files];
                      });
                    }}
                    required
                  />
                </div>
                {gallery && gallery?.length > 0 && (
                  <div className="w-full flex flex-wrap gap-2">
                    {gallery?.map((item) => (
                      <div>
                        <div className="h-[200px] w-[200px] border rounded-sm flex flex-col justify-center">
                          <img
                            src={URL.createObjectURL(item)}
                            className="w-full"
                          />
                        </div>
                        <button
                          type="button"
                          className="w-full bg-red-500 hover:bg-white hover:text-black hover:shadow-[0_0_0_2px#ff0000] text-white rounded-sm p-2.5 px-2 transition duration-300"
                          onClick={() => {
                            setGallery((prev) => {
                                let tempArr = [...prev]
                                return tempArr.filter((ele) => ele !== item)
                            })
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Perfume Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      "
                  placeholder="Type product name"
                  {...register("perfume", { required: true })}
                />
              </div>
              <div className="sm:col-span-2">
                <div className="w-full flex justify-between pb-1">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Main Accords
                  </label>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 rounded-sm p-1 px-2 text-white"
                    onClick={() => {
                      addAccord();
                    }}
                  >
                    Add
                  </button>
                </div>
                {accords && accords?.length > 0 && (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-gray-700 bg-gray-50 ">
                        <tr>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            Accord Name
                          </th>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            Percentage
                          </th>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            Color
                          </th>
                          <th scope="col" className="px-1 pt-2 pb-1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {accords.map((item) => (
                          <tr className="bg-white border-b " key={item?.id}>
                            <th
                              scope="row"
                              className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              <input
                                type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="E.g, Wood, lavender etc"
                                onChange={(e) => {
                                  setAccords((prev) => {
                                    let tempArr = [...prev];
                                    let idx = tempArr.findIndex((ele) => {
                                      return ele.id === item.id;
                                    });

                                    let row = tempArr[idx];
                                    tempArr.slice(idx, 1);
                                    row.name = e.target.value;
                                    tempArr[idx] = row;
                                    return tempArr;
                                  });
                                }}
                                required
                              />
                            </th>
                            <td className="px-1 py-4">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="0"
                                required
                              />
                            </td>
                            <td className="px-1 py-4">
                              <input
                                type="color"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full h-[42px]"
                                placeholder="John"
                                required
                              />
                            </td>
                            <td className="px-1 py-4">
                              <button
                                type="button"
                                className="bg-red-500 hover:bg-white hover:text-black hover:shadow-[0_0_0_2px#ff0000] text-white rounded-sm p-2.5 px-2 transition duration-300"
                                onClick={() => {
                                  removeAccord(item?.id);
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500      "
                  placeholder="Write a product description here..."
                  {...register("description", { required: true })}

                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Details
                </label>
                <textarea
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500      "
                  placeholder="Write a product details here..."
                  {...register("details", { required: true })}

                ></textarea>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4 w-full">
              <button
                type="submit"
                className="w-1/2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddPerfume;
