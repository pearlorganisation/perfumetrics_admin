import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

const PerfumeNotes = () => {
  const [perfumeData, setPerfumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/perfume`)
      .then((res) => {
        console.log(res)
        setPerfumeData(res?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const deleteItem = (item) => {
    if(window.confirm(`Are you sure you want to delete perfume:- ${item.perfume}`)){
      axios.delete(`${import.meta.env.VITE_API_URL}/perfume/${item._id}`).then((res) => {

        setPerfumeData(res.data.perfumeData)
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
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
        <div class="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
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
                    <td className="px-6 py-4">{item.perfume}</td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/perfume/update/${item?._id}`}
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
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfumeNotes;
