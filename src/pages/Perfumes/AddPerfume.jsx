import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

const AddPerfume = () => {
  const [banner, setBanner] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [accords, setAccords] = useState([]);
  const [maxPercentage, setMaxPercentage] = useState(100);
  const [pyramidTop, setPyramidTop] = useState([]);
  const [pyramidMid, setPyramidMid] = useState([]);
  const [pyramidBase, setPyramidBase] = useState([]);

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

  const addPyramidTop = () => {
    setPyramidTop((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let newTopNote = { id: id, name: "", photo: null };
      return [...prev, newTopNote];
    });
  };

  const removePyramidTop = (id) => {
    setPyramidTop((prev) => {
      let pyramidTop = [...prev];
      let res = pyramidTop?.filter((e) => e.id !== id);
      return res;
    });
  };

  const addPyramidMid = () => {
    setPyramidMid((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let newMidNote = { id: id, name: "", photo: null };
      return [...prev, newMidNote];
    });
  };

  const removePyramidMid = (id) => {
    setPyramidMid((prev) => {
      let pyramidMid = [...prev];
      let res = pyramidMid?.filter((e) => e.id !== id);
      return res;
    });
  };

  const addPyramidBase = () => {
    setPyramidBase((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let newBaseNote = { id: id, name: "", photo: null };
      return [...prev, newBaseNote];
    });
  };

  const removePyramidBase = (id) => {
    setPyramidBase((prev) => {
      let pyramidBase = [...prev];
      let res = pyramidBase?.filter((e) => e.id !== id);
      return res;
    });
  };

  // useEffect(() => {
  //   if(accords.length <= 0 ) return
  //   let totalPercentage = 0
  //   for(let i= 0; i < accords.length; i++){
  //     totalPercentage += accords[i].percentage
  //   }
  //   console.log(totalPercentage)
  //   if(totalPercentage === 100) return
  //   setMaxPercentage(() => {
  //     return 100 - Number(totalPercentage)
  //   })

  // }, [accords])

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
                              let tempArr = [...prev];
                              return tempArr.filter((ele) => ele !== item);
                            });
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
                    Add Accord
                  </button>
                </div>
                {accords && accords?.length > 0 && (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-gray-700 bg-gray-50 ">
                        <tr>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            S.No.
                          </th>
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
                        {accords.map((item, idx) => (
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
                            </td>
                            <td className="px-1 py-4">
                              <input
                                type="number"
                                min={0}
                                max={maxPercentage}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="0"
                                onChange={(e) => {
                                  setAccords((prev) => {
                                    let tempArr = [...prev];
                                    let idx = tempArr.findIndex((ele) => {
                                      return ele.id === item.id;
                                    });

                                    let row = tempArr[idx];
                                    tempArr.slice(idx, 1);

                                    row.percentage = Number(e.target.value);
                                    tempArr[idx] = row;
                                    return tempArr;
                                  });
                                }}
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
                <div className="w-full border border-b border-x-0 border-t-0 mb-2">
                  <label
                    for="name"
                    className="block mb-2 text-base font-medium text-gray-900 "
                  >
                    Perfume Notes:
                  </label>
                </div>
                <div className="w-full flex justify-between py-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Top Note
                  </label>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 rounded-sm p-1 px-2 text-white"
                    onClick={() => {
                      addPyramidTop();
                    }}
                  >
                    Add Top Note
                  </button>
                </div>
                {pyramidTop && pyramidTop?.length > 0 && (
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
                        {pyramidTop.map((item, idx) => (
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
                                  setPyramidTop((prev) => {
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
                                  setPyramidTop((prev) => {
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
                                  removePyramidTop(item?.id);
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

                <div className="w-full flex justify-between py-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Mid Note
                  </label>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 rounded-sm p-1 px-2 text-white"
                    onClick={() => {
                      addPyramidMid();
                    }}
                  >
                    Add Mid Note
                  </button>
                </div>
                {pyramidMid && pyramidMid?.length > 0 && (
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

                          <th scope="col" className="px-1 pt-2 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {pyramidMid.map((item, idx) => (
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
                                  setPyramidTop((prev) => {
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
                                  setPyramidMid((prev) => {
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
                                  removePyramidMid(item?.id);
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

                <div className="w-full flex justify-between py-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Base Note
                  </label>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 rounded-sm p-1 px-2 text-white"
                    onClick={() => {
                      addPyramidBase();
                    }}
                  >
                    Add Base Note
                  </button>
                </div>
                {pyramidBase && pyramidBase?.length > 0 && (
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
                        {pyramidBase.map((item, idx) => (
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
                                  setPyramidBase((prev) => {
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
                                  setPyramidBase((prev) => {
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
                                  removePyramidBase(item?.id);
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
                className="w-1/3 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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

export default AddPerfume;
