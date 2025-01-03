import { Skeleton } from "@mui/material";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import SearchBar from "../../components/SearchBar/SearchBar";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import AddNewArrival from "./AddNewArrival";

const NewArrival = () => {
  const [perfumeData, setPerfumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const search = searchParams.get('search');
  const [isShowing, setIsShowing] = useState(false)


  function fetchNewArrival({ page, search }) {
    axios
      .get(`${import.meta.env.VITE_API_URL}/newArrival/admin?Search=${search || ''}&Page=${page || 1}`)
      .then((res) => {
        console.log(res)
        setPerfumeData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }


  useEffect(() => {
    fetchNewArrival({})
  }, []);


  useEffect(() => {
    fetchNewArrival({ search, page })
  }, [search, page]);

  const deleteItem = (item) => {
    if (window.confirm(`Are you sure you want to remove perfume:- ${item._id}`)) {
      axios.delete(`${import.meta.env.VITE_API_URL}/newArrival/${item._id}`).then((res) => {

        setPerfumeData(res.data)
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        fetchNewArrival({})


      }).catch(err => {
        toast.error("There was some issue removing the perfume", {
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

      <div className="p-10 ">
        <div className="text-center text-3xl font-medium">New Arrival Perfume</div>
        <div className="grid grid-cols-2 justify-center items-center space-y-4 md:space-y-0 pb-8">
          <div className="">
            <SearchBar />
          </div>
          <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
            <Link
              to="/newArrival/add"
              className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
            >
              Add
            </Link>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  <th scope="col" className="col-span-2 px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {perfumeData.data && perfumeData.data.map((item, idx) => (
                  <tr key={idx} className="bg-white border-b   hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <div className="ps-3">
                        <img className="size-32 object-contain" src={item.banner} />
                      </div>
                    </th>
                    <td className="px-6 py-4">{item.perfumeName}</td>

                    <td className="px-6 py-4">
                      <Link
                        to={`${item?.link}`}
                        target="_blank"
                        className="font-medium text-blue-600  hover:underline"
                      >
                        View
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600  hover:underline"
                        onClick={() => {
                          deleteItem(item)
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
      {perfumeData && <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        totalPages={perfumeData.totalPage}
      />}
      {isShowing && <ModalWrapper isShowing={isShowing} setIsShowing={setIsShowing}> <AddNewArrival setIsShowing={setIsShowing} /> </ModalWrapper>}
    </div>
  );
};

export default NewArrival;
