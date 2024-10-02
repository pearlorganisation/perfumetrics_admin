import Select from "react-select";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../features/actions/brandsAction";
import ct from 'countries-and-timezones';


const UpdatePerfume = () => {
  const { state } = useLocation();
  const [countryISOData, setCountryISOData] = useState(null);

  const getCountryISO = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/countryISOcodes`)
      .then((res) => {
        console.log(res)
        setCountryISOData(res?.data.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getCountryISO()
  }, []);

  const tmz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timezone = ct.getTimezone(tmz);
  console.log(timezone?.countries[0], "timezone");




  const { brands } = useSelector(state => state.brand)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [brandsData, setBrandsData] = useState([])
  const { perfumeId } = useParams()
  const gender = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },

  ]
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [brandId, setBrandId] = useState(null);

  const [gallery, setGallery] = useState([]);
  const [accords, setAccords] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [purchaseLinks, setPurchaseLinks] = useState([]);
  const [pros, setPros] = useState(null);
  const [cons, setCons] = useState(null);
  const [gendeR, setGender] = useState('');
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [defaultTopNote, setDefaultTopNote] = useState([]);

  const accordsRef = useRef(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      perfume: state?.perfume,
      detail: state?.details,
      description: state?.description,

      gender: gender.find(el => el.value === state?.ratingFragrams?.gender,

      ),
      overall: state?.ratingFragrams?.overall,
      midNote: state?.middleNote

        ?.map(ite => {
          return {
            label: ite?.name,
            value: ite._id
          }
        }),
      baseNote: state?.baseNote?.map((el) => {
        return {
          label: el.name,
          value: el._id
        }
      }),
      topNote: state?.topNote?.map((el) => {
        return {
          label: el.name,
          value: el._id
        }
      })

    }
  });



  useEffect(() => {

    setAccords(state.mainAccords);
    setPurchaseLinks(state.purchaseLinks);
    setPros(state.pros)
    setCons(state.cons)

    console.log(state, "perfume")
  }, [state])

  useEffect(() => {

    console.log(pros, cons)

    console.log(noteData, "noteData")
  }, [noteData, state])


  useEffect(() => {
    console.log("defaultTopNote", defaultTopNote);
  }, [purchaseLinks])



  const addAccord = () => {
    setAccords((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let newAccord = { id: id, name: "", percentage: 0, color: '#000000' };
      return [...prev, newAccord];
    });
  };

  const removeAccord = (id) => {
    setAccords((prev) => {
      let accords = [...prev];
      let res = accords?.filter((e) => e.id !== id);
      return res;
    });
  };

  const addPurchaseLink = () => {
    setPurchaseLinks((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let purchaseLink = { id: id, link: "", company: "" };
      return [...prev, purchaseLink];
    });
  };

  const removePurchaseLink = (id) => {
    setPurchaseLinks((prev) => {
      let purchaseLinks = [...prev];
      let res = purchaseLinks?.filter((e) => e.id !== id);
      return res;
    });
  };

  const addPros = () => {
    setPros((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let newPro = { id: id, pros: "" };
      return [...prev, newPro];
    });
  };

  const removePros = (id) => {
    setPros((prev) => {
      let pros = [...prev];
      let res = pros?.filter((e) => e.id !== id);
      console.log(res);
      return res;
    });
  };

  const addCons = () => {
    setCons((prev) => {
      let id = (prev[prev?.length - 1]?.id || 0) + 1;
      let newCon = { id: id, cons: "" };
      return [...prev, newCon];
    });
  };

  const removeCons = (id) => {
    setCons((prev) => {
      let cons = [...prev];
      let res = cons?.filter((e) => e.id !== id);
      return res;
    });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/note?Limit="infinte"`)
      .then((res) => {
        setNoteData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterData = (data) => {

    console.log("data submittion", data);

    let formData = new FormData();

    let topNote = data?.topNote?.map((item) => item.value) || state?.topNotemap?.((item) => item._id);
    let midNote = data?.midNote?.map((item) => item.value) || state?.midNotemap?.((item) => item._id);
    let baseNote = data?.baseNote?.map((item) => item.value) || state?.baseNotemap?.((item) => item._id);

    console.log("dfdsfsda", baseNote);

    let filteredAccords = accords.map((item) => {
      delete item.id;
      return item;
    });

    let filteredPros = pros.map((item) => {
      delete item.id;
      return { title: item.title || item?.pros };
    });

    let filteredCons = cons.map((item) => {
      delete item.id;
      return { title: item.cons || item?.title };
    });
    console.log("puschase links", purchaseLinks)
    const map = new Map()

    formData.append("purchaseLinks", JSON.stringify(purchaseLinks));

    formData.append("topNote", JSON.stringify(topNote));
    formData.append("middleNote", JSON.stringify(midNote));
    formData.append("baseNote", JSON.stringify(baseNote));
    formData.append("perfume", data.perfume);
    formData.append("description", data.description);
    formData.append("details", data.details);
    formData.append("mainAccords", JSON.stringify(filteredAccords));
    formData.append("pros", JSON.stringify(filteredPros));
    formData.append("cons", JSON.stringify(filteredCons));

    formData.append("banner", banner);
    formData.append("logo", logo);
    formData.append('brand', brandId || { label: state?.brand?.brand, value: state?.brand?._id }.value)
    formData.append('video', video)
    formData.append('ratingFragrams', JSON.stringify({
      longitivity: Number(data.longitivity),
      gender: data?.gender?.value,
      sillage: Number(data?.sillage),
      pricing: Number(data?.pricing),
      overall: Number(data?.overall),
      compliment: Number(data?.compliment)
    }))

    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }



    // Do a bit of work to convert the entries to a plain JS object
    const value = Object.fromEntries(formData.entries());

    console.log({ value });

    return formData;
  };

  const onSubmit = async (data) => {
    if (isLoading) return
    toast("saving");
    let tempAccords = [...accords];
    let totalPercentage = 0;

    tempAccords.forEach((e) => (totalPercentage += e.percentage));
    if (totalPercentage !== 100) {
      toast.error("Total Accords percentage must be equal to 100", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }

    let formData = filterData(data);
    setIsLoading(true)
    console.log(formData)
    try {
      setIsLoading(true);

      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/perfume/${perfumeId}`, formData);

      setIsLoading(false);
      navigate('/perfumes');
      toast.success("Updated successfully", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error("Server down, please try again later", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  useEffect(() => {
    dispatch(fetchBrands({ limit: "infinite" }))
    // addAccord()
    // addPurchaseLink()
    // addCons();
    // addPros();
  }, [])

  useEffect(() => {
    if (brands?.data?.length > 0) {
      const temp = brands?.data?.map(item => {
        return {
          value: item?._id,
          label: item?.brand
        }
      })
      setBrandsData(temp)
    }
  }, [brands])



  useEffect(() => {
    console.log(brandsData?.find(item => item?.value === state?.brand))
    console.log(state?.mainAccords, "state?.mainAccords || []")
  }, [brandsData])



  return (
    <>
      <section className="bg-white ">
        <div className="max-w-4xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">Update Perfume</h2>
          <Toaster />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="col-span-2 sm:col-span-1">
                {banner ? (
                  <div className="flex justify-center items-centerw-[250px] h-[250px] border border-gray-300">
                    <img src={URL.createObjectURL(banner)} className="h-full" />
                  </div>
                ) : <div className="flex justify-center items-centerw-[250px] h-[250px] border border-gray-300">
                  <img src={state?.banner} className="h-full" />
                </div>}

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="file_input"
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
                    accept=".jpg, .jpeg, .png, .webp"

                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                {logo ? (
                  <div className="w-[250px] h-[250px] border border-red-300">
                    <img src={URL.createObjectURL(logo)} className="h-full" />
                  </div>
                ) : <div className="w-[250px] h-[250px] border border-red-300">
                  <img src={state?.logo} className="h-full" />
                </div>}



                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="file_input"
                  >
                    Upload Brand Logo
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                    id="file_input"
                    type="file"
                    onChange={(e) => {
                      setLogo(e.target.files[0]);
                    }}
                    accept=".jpg, .jpeg, .png, .webp"

                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="file_input"
                >
                  Brand Name
                </label>
                <Select
                  options={brandsData}

                  onChange={(val) => {
                    setBrandId(val?.value)
                  }}
                  defaultValue={{ label: state?.brand?.brand, value: state?.brand?._id }}

                // closeMenuOnSelect={true}
                />

              </div>
              <div className="sm:col-span-2">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="file_input"
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
                    accept=".jpg, .jpeg, .png, .webp"

                  />
                </div>
                {gallery && gallery?.length > 0 ? (
                  <div className="w-full flex flex-wrap gap-2 py-2">
                    {gallery?.map((item, idx) => (
                      <div key={`gallery${idx}`}>
                        <div className="h-[200px] border rounded-sm flex items-center justify-center box-border">
                          <img
                            src={URL.createObjectURL(item)}
                            className="h-full"
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
                ) : <div className="w-full flex flex-wrap gap-2 py-2">
                  {state?.gallery?.map((item, idx) => (
                    <div key={`gallery${idx}`}>
                      <div className="h-[200px] border rounded-sm flex items-center justify-center box-border">
                        <img
                          src={item?.path}
                          className="h-full"
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
                </div>}
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="file_input"
                >
                  Upload Video
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                  accept="video/*" // This allows only video file types
                  onChange={(e) => {
                    setVideo(e.target.files[0]);
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="perfume"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Perfume Name
                </label>
                <input
                  type="text"
                  defaultValue={state?.perfume}
                  id="perfume"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      "
                  placeholder="Type product name"
                  {...register("perfume", { required: true })}
                />
              </div>
              <div className="col-span-2" ref={accordsRef}>
                <div className="w-full flex justify-between pb-1">
                  <label
                    htmlFor="name"
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
                                defaultValue={item?.name || 'Something went wrong'}
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

                              />
                            </td>
                            <td className="px-1 py-4">
                              <input
                                type="number"
                                onWheel={event => event.currentTarget.blur()}
                                min={0}
                                max={100}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="0"
                                defaultValue={item?.percentage || 0}
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

                              />
                            </td>
                            <td className="px-1 py-4">
                              <input
                                type="color"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full h-[42px]"
                                placeholder="John"
                                defaultValue={item?.color || '#ffffff'}
                                onChange={(e) => {
                                  setAccords((prev) => {
                                    let tempArr = [...prev];
                                    let idx = tempArr.findIndex((ele) => {
                                      return ele.id === item.id;
                                    });

                                    let row = tempArr[idx];
                                    tempArr.slice(idx, 1);
                                    row.color = e.target.value;
                                    tempArr[idx] = row;
                                    return tempArr;
                                  });
                                }}

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

              <div className="col-span-2">
                <div className="w-full flex justify-between pb-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Purchase Links
                  </label>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 rounded-sm p-1 px-2 text-white"
                    onClick={() => {
                      addPurchaseLink();
                    }}
                  >
                    Add Link
                  </button>
                </div>
                {purchaseLinks && purchaseLinks?.length > 0 && (
                  <div className="relative over">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-gray-700 bg-gray-50 ">
                        <tr>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            S.No.
                          </th>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            Link
                          </th>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            Company
                          </th>
                          <th scope="col" className="px-1 pt-2 pb-1">
                            Country
                          </th>

                          <th scope="col" className="px-1 pt-2 pb-1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseLinks.map((item, idx) => (
                          <tr className="bg-white border-b " key={item?.id}>
                            <td className="px-1 py-4">{idx + 1}</td>
                            <td
                              scope="row"
                              className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              <input
                                type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="https://xyz.xyz/xyzzz"
                                defaultValue={item.link}
                                onChange={(e) => {
                                  setPurchaseLinks((prev) => {
                                    let tempArr = [...prev];
                                    let idx = tempArr.findIndex((ele) => {
                                      return ele.id === item.id;
                                    });

                                    let row = tempArr[idx];
                                    tempArr.slice(idx, 1);
                                    row.link = e.target.value;
                                    tempArr[idx] = row;
                                    return tempArr;
                                  });
                                }}

                              />
                            </td>
                            <td className="px-1 py-4">
                              <input
                                type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Company Name"
                                defaultValue={item.company}
                                onChange={(e) => {
                                  setPurchaseLinks((prev) => {
                                    let tempArr = [...prev];
                                    let idx = tempArr.findIndex((ele) => {
                                      return ele.id === item.id;
                                    });

                                    let row = tempArr[idx];
                                    tempArr.slice(idx, 1);

                                    row.company = e.target.value;
                                    tempArr[idx] = row;
                                    return tempArr;
                                  });
                                }}

                              />
                            </td>
                            <td
                              className="px-1 py-4"
                            >
                              {countryISOData && <Select
                                defaultValue={countryISOData.find(it => it?.value === item?.country)}
                                value={countryISOData.find(it => it?.value === item?.country)}
                                options={countryISOData}
                                // defaultValue={ }
                                onChange={(selectedOption) => {
                                  setPurchaseLinks((prev) => {
                                    // Clone the previous array
                                    let tempArr = [...prev];

                                    // Find the index of the item you want to update
                                    let idx = tempArr.findIndex((ele) => ele.id === item.id);

                                    // Make sure the item exists
                                    if (idx !== -1) {
                                      // Update the relevant field with the selected value
                                      tempArr[idx] = {
                                        ...tempArr[idx],
                                        country: selectedOption.value, // Assuming company field gets the selected value
                                      };
                                    }

                                    return tempArr;
                                  });
                                }}
                                // value={selectedCountry}
                                // onChange={handleCountrySelect}
                                placeholder="Select a country"
                              />}
                            </td>



                            <td className="px-1 py-4">
                              <button
                                type="button"
                                className="bg-red-500 hover:bg-white hover:text-black hover:shadow-[0_0_0_2px#ff0000] text-white rounded-sm p-2.5 px-2 transition duration-300"
                                onClick={() => {
                                  removePurchaseLink(item?.id);
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

              {/* pros */}
              {/* <div className="col-span-2">
                <div className="col-span-2 md:col-span-1">
                  <div className="w-full flex justify-between pb-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-base font-medium text-gray-900 "
                    >
                      Pros
                    </label>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 rounded-sm p-1 px-2 text-white"
                      onClick={() => {
                        addPros();
                      }}
                    >
                      Add Pro
                    </button>
                  </div>
                  {pros && pros?.length > 0 && (
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 bg-gray-50 ">
                          <tr>
                            <th scope="col" className="px-1 pt-2 pb-1">
                              S.No.
                            </th>
                            <th scope="col" className="px-1 pt-2 pb-1">
                              Content
                            </th>

                            <th scope="col" className="px-1 pt-2 pb-1"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {pros.map((item, idx) => (
                            <tr
                              className="bg-white border-b "
                              key={`pro${item?.id}`}
                            >
                              <td className="px-1 py-4">{idx + 1}</td>
                              <td
                                scope="row"
                                className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap "
                              >
                                <input
                                  type="text"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder="A Pro of this perfume"
                                  defaultValue={item.title}
                                  onChange={(e) => {
                                    setPros((prev) => {
                                      let tempArr = [...prev];
                                      let idx = tempArr.findIndex((ele) => {
                                        return ele.id === item.id;
                                      });

                                      let row = tempArr[idx];
                                      tempArr.slice(idx, 1);
                                      row.pros = e.target.value;
                                      tempArr[idx] = row;
                                      return tempArr;
                                    });
                                  }}

                                />
                              </td>

                              <td className="px-1 py-4">
                                <button
                                  type="button"
                                  className="bg-red-500 hover:bg-white hover:text-black hover:shadow-[0_0_0_2px#ff0000] text-white rounded-sm p-2.5 px-2 transition duration-300"
                                  onClick={() => {
                                    removePros(item?.id);
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

                <div className="col-span-2 md:col-span-1">
                  <div className="w-full flex justify-between pb-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-base font-medium text-gray-900 "
                    >
                      Cons
                    </label>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 rounded-sm p-1 px-2 text-white"
                      onClick={() => {
                        addCons();
                      }}
                    >
                      Add Con
                    </button>
                  </div>
                  {cons && cons?.length > 0 && (
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 bg-gray-50 ">
                          <tr>
                            <th scope="col" className="px-1 pt-2 pb-1">
                              S.No.
                            </th>
                            <th scope="col" className="px-1 pt-2 pb-1">
                              Content
                            </th>

                            <th scope="col" className="px-1 pt-2 pb-1"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cons.map((item, idx) => (
                            <tr
                              className="bg-white border-b "
                              key={`pro${item?.id}`}
                            >
                              <td className="px-1 py-4">{idx + 1}</td>
                              <td
                                scope="row"
                                className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap "
                              >
                                <input
                                  type="text"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder="A Con of this perfume"
                                  defaultValue={item.title}
                                  onChange={(e) => {
                                    setCons((prev) => {
                                      let tempArr = [...prev];
                                      let idx = tempArr.findIndex((ele) => {
                                        return ele.id === item.id;
                                      });

                                      let row = tempArr[idx];
                                      tempArr.slice(idx, 1);
                                      row.cons = e.target.value;
                                      tempArr[idx] = row;
                                      return tempArr;
                                    });
                                  }}

                                />
                              </td>

                              <td className="px-1 py-4">
                                <button
                                  type="button"
                                  className="bg-red-500 hover:bg-white hover:text-black hover:shadow-[0_0_0_2px#ff0000] text-white rounded-sm p-2.5 px-2 transition duration-300"
                                  onClick={() => {
                                    removeCons(item?.id);
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
              </div> */}

              <div className="col-span-2">
                <div className="w-full border border-b border-x-0 border-t-0 mb-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-base font-medium text-gray-900 "
                  >
                    Perfume Notes:
                  </label>
                </div>
                <div className="w-full flex justify-between py-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Top Note
                  </label>
                </div>
                <Controller
                  name="topNote"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}


                      defaultValue={state.topNote?.map(ite => {
                        return {
                          label: ite?.name,
                          value: ite._id
                        }
                      })}
                      options={noteData.map((note) => ({
                        value: note._id,
                        label: note.name,
                      }))}
                      isMulti
                    />
                  )}
                />

                <div className="w-full flex justify-between py-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Mid Note
                  </label>
                </div>
                <Controller
                  name="midNote"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={state.middleNote

                        ?.map(ite => {
                          return {
                            label: ite?.name,
                            value: ite._id
                          }
                        })}
                      options={noteData.map((note) => ({
                        value: note._id,
                        label: note.name,
                      }))}
                      isMulti
                    />
                  )}
                />

                <div className="w-full flex justify-between py-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Base Note
                  </label>
                </div>
                <Controller
                  name="baseNote"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={state.baseNote
                        ?.map(ite => {
                          return {
                            label: ite?.name,
                            value: ite._id
                          }
                        })}
                      options={noteData.map((note) => ({
                        value: note._id,
                        label: note.name,
                      }))}
                      isMulti
                    />
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  defaultValue={state?.description}
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500      "
                  placeholder="Write a product description here..."
                  {...register("description", { required: true })}
                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Details
                </label>
                <textarea
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500      "
                  placeholder="Write a product details here..."
                  defaultValue={state?.details}
                  {...register("details", { required: true })}
                ></textarea>
              </div>
            </div>
            <div>
              <div className="text-2xl font-medium">Fragram Ratings</div>
              <div className="grid md:grid-cols-2 gap-3 pb-4">
                <div className="">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Longitivity
                  </label>
                  <input
                    type="number"
                    id="name"
                    defaultValue={state?.ratingFragrams?.longitivity || 0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      "
                    placeholder="Longitivity"
                    min={"0"}
                    max={"10"}
                    {...register("longitivity", { required: true })}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Sillage
                  </label>
                  <input
                    type="number"
                    id="name"
                    defaultValue={state?.ratingFragrams?.sillage || 0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      "
                    placeholder="Sillage"
                    min={"0"}
                    max={"10"}
                    {...register("sillage", { required: true })}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Pricing
                  </label>
                  <input
                    type="number"
                    id="name"
                    defaultValue={state?.ratingFragrams?.pricing || 0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      "
                    placeholder="Pricing"
                    min={"0"}
                    max={"10"}
                    {...register("pricing", { required: true })}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Gender
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select

                        value={gender.find(el => el.value === value
                        )}
                        options={gender}
                        defaultValue={gender.find(el => el.value === state?.ratingFragrams?.gender
                        )}

                      />
                    )}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Compliment
                  </label>
                  <input
                    type="number"
                    id="number"
                    defaultValue={state?.ratingFragrams?.compliment || 0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      "
                    placeholder="Compliment"
                    {...register("compliment", { required: true })}
                    min={0}
                    max={10}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Overall
                  </label>
                  <input
                    type="number"
                    id="name"
                    defaultValue={state?.ratingFragrams?.overall}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      "
                    placeholder="Overall"
                    min={"0"}
                    max={"10"}
                    {...register("overall", { required: true })}
                  />
                </div>
              </div>
            </div>


            <div className="flex justify-center items-center space-x-4 w-full">
              {
                isLoading ? <button
                  type="button"
                  className="w-1/3 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Loading...
                </button> : <button
                  type="submit"
                  className="w-1/3 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Save
                </button>
              }
            </div>
          </form>
        </div>
      </section>
    </>
  );
};




export default UpdatePerfume;
