import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import GlobalSearchBar from "../../components/GlobalSearchBar/GlobalSearchBar";

const PerfumeNotes = () => {
  const [perfumeData, setPerfumeData] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const page = searchParams.get('page');
  const search = searchParams.get('search');
  const getPerfumes = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/perfume/?Page=${page}&Search=${search || ''}`)
      .then((res) => {
        console.log(res)
        setPerfumeData(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getPerfumes()
  }, [search, page]);

  const deleteItem = (item) => {
    if (window.confirm(`Are you sure you want to delete perfume:- ${item.perfume}`)) {
      axios.delete(`${import.meta.env.VITE_API_URL}/perfume/${item._id}`).then((res) => {

        setPerfumeData(res.data.perfumeData)
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        getPerfumes()

      }).catch(err => {
        toast.error("There was some issue deleting the perfume", {
          style: {
            background: "red",
            color: "white",
          },
        });

      })
    }
  }


  useEffect(() => {
    console.log("perfumeData", perfumeData);
  }, [perfumeData])

  return (
    <div>
      <Toaster />

      <div class="p-10 ">
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
          <SearchBar />
          <div className="relative" ref={dropdownRef}>
            <GlobalSearchBar />
            {globalPanel && <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="absolute flex flex-col gap-4 top-12 z-50 p-1 rounded-md  w-full h-44 bg-white overflow-y-scroll">
              {globalPerfumesData && globalPerfumesData.map((currPerfume, index) => {
                return (<div onClick={() => handleGlobalSearch(currPerfume.perfume)} className="grid grid-cols-[30%_auto] gap-2 p-1 border-b-2 items-center " key={index}>
                  <img src={currPerfume.banner} alt={currPerfume.slug} className="min-h-12 max-h-12 " />
                  <p className="text-sm line-clamp-3 text-wrap text-slate-500 font-bold">
                    {currPerfume.perfume}
                  </p>
                </div>)
              })}

            </div>
            }
          </div>
          <Link
            to="/perfume/add"
            className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
          >
            Add
          </Link>

        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          {isLoading && (
            <>
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
            </>
          )}
          {perfumeData && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Img
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>

                  <th scope="col" className="col-span-2 px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {perfumeData?.data && perfumeData.data.map((item, idx) => (
                  <tr key={idx} className="bg-white border-b   hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <div className="ps-3  w-full">
                        <img src={item.banner} className="w-full h-20 object-contain" />
                      </div>
                    </th>
                    <td className="px-6 py-4">{item.perfume}</td>


                    <td className="px-6 py-4 space-x-3 flex justify-center items-center">
                      <Link to={`/perfume/relatedFragram/${item?._id}`} className="px-6 py-4 font-medium text-blue-600 hover:underline">Related Fragram</Link>
                      <Link to={`/perfume/perfumeCategory/${item?._id}`} className="px-6 py-4 font-medium text-blue-600 hover:underline">Perfume Category</Link>
                      <Link to={`/perfume/fragram/${item?._id}`} className="px-6 py-4 font-medium text-blue-600 hover:underline">Fragram</Link>
                      {/* <Link to={`/perfume/sideBarReview/${item?._id}`} className="px-6 py-4 font-medium text-blue-600 hover:underline">SideBar Review</Link> */}
                      <Link
                        to={`/perfume/update/${item?._id}`}
                        state={item}
                        className="font-medium text-blue-600  hover:underline"
                      >
                        View/edit
                      </Link>
                      <button
                        className="font-medium text-red-600  hover:underline"
                        onClick={() => {
                          deleteItem(item)
                        }}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {perfumeData && <Pagination
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          totalPages={
            perfumeData.totalPage}
        />}

      </div>
    </div>
  );
};

export default PerfumeNotes;
