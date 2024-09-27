import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";


const PerfumeNotes = () => {
  const [noteData, setNoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const search = searchParams.get('search');

  const getNotesData = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/note?Page=${page}&Limit=${10}&Search=${search || ''}`)
      .then((res) => {

        setNoteData(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getNotesData()
  }, [search, page]);

  const deleteItem = (item) => {
    if (window.confirm(`Are you sure you want to delete perfume:- ${item.name}`)) {
      axios.delete(`${import.meta.env.VITE_API_URL}/note/${item._id}`).then((res) => {
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        setNoteData(res.data.data)
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

  return (
    <div>
      <Toaster />
      <div class="p-10 ">
        <div className="text-center text-2xl py-2">PERFUME NOTES</div>

        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
          <SearchBar />
          <Link
            to="/perfumenotes/add"
            className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
          >
            Add
          </Link>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/* {isLoading && (
            <>
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
            </>
          )} */}
          {noteData?.data && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Img
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {
                isLoading ? Array.from({ length: 10 }).map(item => {
                  return <tbody class="animate-pulse">
                    <tr class="bg-gray-200 border-b">
                      <th scope="row" class="flex items-center px-6 py-4">
                        <div class="ps-3 h-10 w-10 bg-gray-300 rounded"></div>
                      </th>
                      <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                      </td>
                    </tr>

                  </tbody>
                }) : <tbody>
                  {noteData?.data?.map((item, idx) => (
                    <tr className="bg-white border-b   hover:bg-gray-50 ">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                      >
                        <div className="ps-3">
                          <img src={item.image} width={"50px"} />
                        </div>
                      </th>
                      <td className="px-6 py-4">{item.name}</td>


                      <td className="px-6 py-4">
                        <Link
                          to={`/perfumenotes/update/${item?._id}`}
                          className="font-medium text-blue-600  hover:underline"
                        >
                          View/edit
                        </Link>
                      </td>
                      <td className="px-6 py-4">
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
              }
            </table>
          )}
        </div>
        <Pagination
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          totalPages={noteData?.totalPage}
        />
      </div>
    </div>
  );
};

export default PerfumeNotes;
