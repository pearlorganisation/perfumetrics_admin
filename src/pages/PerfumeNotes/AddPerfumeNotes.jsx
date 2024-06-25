import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { Toaster, toast } from "sonner";

const AddPerfumeNotes = () => {
  const [notesRow, setNotesRow] = useState([{ name: "top1", photo: null }]);

 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast("saving");
  };

  const addNotesRow = () => {
    setNotesRow((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let newTopNote = { id: `top${id}`, name: "", photo: null };
      return [...prev, newTopNote];
    });
  };

  const removeNotesRow = (id) => {
    setNotesRow((prev) => {
      let notesRow = [...prev];
      let res = notesRow?.filter((e) => e.id !== id);
      return res;
    });
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
                 

                  <div
                    size={36}
                    onClick={() => {
                      addNotesRow();
                    }}
                    className="bg-blue-500 hover:bg-blue-700 cursor-pointer px-2 text-white rounded-md transition duration-300"
                  >Add Row</div>
                </div>
                {notesRow && notesRow?.length > 0 && (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-gray-700 bg-gray-50 ">
                        <tr>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            S.No.
                          </th>
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
                        {notesRow.map((item, idx) => (
                          <tr className="bg-white border-b " key={item?.id}>
                            <td className="px-1 py-4">{idx + 1}</td>
                            <td
                              scope="row"
                              className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              <input
                                type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="E.g, Wood, lavender etc"
                                onChange={(e) => {
                                  setNotesRow((prev) => {
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
                            </td>
                            <td className="px-1 py-4">
                              <input
                                type="file"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="0"
                                onChange={(e) => {
                                  setNotesRow((prev) => {
                                    let tempArr = [...prev];
                                    let idx = tempArr.findIndex((ele) => {
                                      return ele.id === item.id;
                                    });

                                    let row = tempArr[idx];
                                    tempArr.slice(idx, 1);

                                    row.photo = e.target.files[0];
                                    tempArr[idx] = row;
                                    console.log(tempArr);
                                    return tempArr;
                                  });
                                }}
                                required
                              />
                            </td>

                            <td className="px-1 py-4">
                              <button
                                type="button"
                                className="bg-red-500 hover:bg-white hover:text-black hover:shadow-[0_0_0_2px#ff0000] text-white rounded-sm p-2.5 px-2 transition duration-300"
                                onClick={() => {
                                  removeNotesRow(item?.id);
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
            </div>
            <div className="flex justify-center items-center space-x-4 w-full">
              <button
                type="submit"
                className="w-1/3 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text- px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddPerfumeNotes;
