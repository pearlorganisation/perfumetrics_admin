import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import AddBrandsFragram from "./AddPerfumeCategory";
import AddPerfumeCategory from "./AddPerfumeCategory";

const PerfumeCategory = () => {
  const [perfumeData, setPerfumeData] = useState(null);
  const { perfumeId } = useParams()
  console.log(perfumeId)
  const [isLoading, setIsLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(false)

  const getPerfumeCategory = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/perfumeCategories?perfumeId=${perfumeId}`)
      .then((res) => {
        console.log(res)
        setPerfumeData(res?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPerfumeCategory()
  }, [isShowing]);




  return (
    <div>
      <Toaster />

      <div class="p-10 ">
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
          <div className="text-3xl">Perfume Category</div>
          <button
            onClick={() => setIsShowing(true)}
            className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
          >
            Add
          </button>
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
          {perfumeData ? (
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
                    Perfume Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>

                  <th scope="col" className="col-span-2 px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {perfumeData.map((item, idx) => (
                  <tr className="bg-white border-b   hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <div className="ps-3">
                        <img src={item.banner} width={"100px"} />
                      </div>
                    </th>
                    <td className="px-6 py-4">{item?.perfumeName}</td>
                    <td className="px-6 py-4">{item?.perfume?.perfume}</td>
                    <td className="px-6 py-4">{item?.priceMl}</td>

                    {/* <td className="px-6 py-4">
                      <Link
                        to={`/perfume/update/${item?._id}`}
                        className="font-medium text-blue-600  hover:underline"
                      >
                        View/edit
                      </Link>
                    </td> */}
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600  hover:underline"
                        onClick={() => {
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div className="text-center h-[30rem] grid place-items-center">No Data Found</div>}
        </div>
      </div>

      {isShowing && <ModalWrapper isShowing={isShowing} setIsShowing={setIsShowing}> <AddPerfumeCategory setIsShowing={setIsShowing} /> </ModalWrapper>}
    </div>
  );
};



export default PerfumeCategory