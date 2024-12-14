import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

const UpdatePerfumeNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null); // State to store the current image
  const [previewImage, setPreviewImage] = useState(null); // State to store the new image preview
  const { id } = useParams();  // Get perfume note ID from URL
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Function to filter form data for API submission
  const filterData = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // Add new image if uploaded
    }
    return formData;
  };

  // Fetch the single perfume note data
  const getSingleNote = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/note/${id}`)
      .then((res) => {
        const result = res?.data?.data;
        setValue("name", result?.name);  // Set the note name in the form
        setDefaultImage(result?.image);  // Set the existing image as default
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("Server Issue, Try again later", {
          style: {
            background: "red",
            color: "white",
          },
        });
      });
  };

  useEffect(() => {
    getSingleNote();
  }, []);  // Fetch note data when component is mounted

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data)
    setIsLoading(true);
    const formData = filterData(data);

    // Send PUT request to update the perfume note
    axios
      .patch(`${import.meta.env.VITE_API_URL}/note/${id}`, formData)
      .then((res) => {
        setIsLoading(false);
        navigate('/perfumenotes')
        toast.success("Note updated successfully", {
          style: {
            background: "green",
            color: "white",
          },
        });
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("Failed to update note", {
          style: {
            background: "red",
            color: "white",
          },
        });
      });
  };

  // Handle new image selection and update preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);  // Update preview image with the new one
    }
  };

  return (
    <div>
      <section className="bg-white">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Update Perfume Notes
          </h2>

          <Toaster />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <div className="w-full flex justify-end py-2"></div>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 bg-gray-50">
                      <tr>
                        <th scope="col" className="px-1 pt-2 pb-1">
                          Note Name
                        </th>
                        <th scope="col" className="px-1 pt-2 pb-1">
                          Image
                        </th>
                        <th scope="col" className="px-1 pt-2 pb-1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td
                          scope="row"
                          className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="E.g, Wood, lavender etc"
                            {...register("name", { required: true })}
                          />
                        </td>
                        <td className="px-1 py-4">
                          {/* Show default image or new preview image */}
                          {previewImage ? (
                            <div className="mb-4">
                              <img
                                src={previewImage}
                                alt="New Preview"
                                className="h-20 w-20 object-cover rounded-lg"
                              />
                            </div>
                          ) : (
                            defaultImage && (
                              <div className="mb-4">
                                <img
                                  src={defaultImage}
                                  alt="Default"
                                  className="h-20 w-20 object-cover rounded-lg"
                                />
                              </div>
                            )
                          )}

                          <input
                            type="file"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            accept=".jpg, .jpeg, .png, .webp"
                            {...register("image")}
                            onChange={handleImageChange} // Update image on selection
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
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdatePerfumeNotes;
