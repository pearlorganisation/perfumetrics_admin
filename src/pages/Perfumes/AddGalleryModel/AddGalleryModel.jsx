import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { BsArrowsMove } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
export function DragNDropPhotos({ gallery, setGallery }) {


  useEffect(() => {
    setGallery((prev) => {
      return prev?.map((item, idx) => {
        return {
          ...item,
          position: item?.position ?? idx,
          src: item?.path,
          id: `img${idx + 1}`,
          alt: item?.alt || `Image ${idx + 1}`,
        };
      });
    });
  }, []);

  const [modal, setModal] = useState(false);
  const [defaultData, setDefaultData] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [positionLog, setPositionLog] = useState([]);
  const draggedOverItemId = useRef(null);

  // Sort images by position
  const sortedImages = [...gallery].sort((a, b) => a.position - b.position);

  // Handle drag start
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    // Set the drag image to be the element itself
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", item.id);
    }
    // Add a class to the dragged element for styling
    setTimeout(() => {
      const element = document.getElementById(item.id);
      if (element) element.classList.add("opacity-50");
    }, 0);
  };

  // Handle drag over
  const handleDragOver = (e, item) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === item.id) return;
    draggedOverItemId.current = item.id;
  };

  // Handle drop
  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    // Swap positions
    const updatedImages = gallery.map((img) => {
      // If this is the dragged item, update its position to the target position
      if (img.id === draggedItem.id) {
        return { ...img, position: targetItem.position };
      }

      // If this is the target item or any item between the dragged and target positions
      if (draggedItem.position < targetItem.position) {
        // Moving forward: decrease position of items between old and new positions
        if (
          img.position > draggedItem.position &&
          img.position <= targetItem.position
        ) {
          return { ...img, position: img.position - 1 };
        }
      } else {
        // Moving backward: increase position of items between new and old positions
        if (
          img.position < draggedItem.position &&
          img.position >= targetItem.position
        ) {
          return { ...img, position: img.position + 1 };
        }
      }

      return img;
    });

    setGallery(updatedImages);

    // Log the position change
    const logMessage = `Moved ${draggedItem.alt} from position ${draggedItem.position + 1
      } to position ${targetItem.position + 1}`;
    setPositionLog((prev) => [logMessage, ...prev]);

    // Reset drag state
    setDraggedItem(null);
    draggedOverItemId.current = null;
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (draggedItem) {
      const element = document.getElementById(draggedItem.id);
      if (element) element.classList.remove("opacity-50");
    }
    setDraggedItem(null);
    draggedOverItemId.current = null;
  };



  return (
    <>
      {!modal && (
        <div className="rounded-md  container mx-auto p-10 w-full">
          <div className="grid grid-cols-2 justify-between p-2  mv-6">
            <h1 className="text-2xl font-bold ">Draggable Image Grid</h1>
            <div>
              <button
                className="p-3 bg-green-400 rounded-md text-white hover:scale-125"
                onClick={() => {
                  setDefaultData(null);
                  setModal(true);
                }}
              >
                Add Gallery Images{" "}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {sortedImages.map((image) => (
              <div
                id={image.id}
                key={image.id}
                className={`
              relative  flex flex-col rounded-lg overflow-hidden cursor-move
              transition-all duration-200 hover:shadow-lg
              ${draggedOverItemId.current === image.id
                    ? "border-primary"
                    : "border-gray-200"
                  }
              ${draggedItem?.id === image.id ? "ring-2 ring-primary" : ""}
            `}
                draggable
                onDragStart={(e) => handleDragStart(e, image)}
                onDragOver={(e) => handleDragOver(e, image)}
                onDrop={(e) => handleDrop(e, image)}
                onDragEnd={handleDragEnd}
              >
                <div
                  onClick={() => {
                    setDefaultData(image);
                    setModal(true);
                  }}
                  className="aspect-square relative "
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover h-full w-full"
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                    Position: {image.position + 1}
                  </div>
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-full">
                    <BsArrowsMove size={16} />
                  </div>
                </div>
                <div className="p-2 bg-white text-center">
                  {image?.alt || "Alt Attribute Not Found"}
                </div>
                <div className="">

                  <button
                    type="button"
                    className="p-2 w-full h-full text-white font-sans bg-red-600 hover:bg-red-500 rounded-b-md"
                    onClick={() => {
                      setGallery((prev) => {
                        const temp = prev.filter((ite) => ite?.id != image?.id);
                        console.log("temp", temp);
                        return [...temp];
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>


        </div>
      )}

      {modal && (
        <AddGalleryModel
          defaultData={defaultData}
          setDefaultData={setDefaultData}
          setGallery={setGallery}
          setModal={setModal}
        />
      )}
    </>
  );
}

const AddGalleryModel = ({
  setModal,
  setGallery,
  defaultData,
  setDefaultData,
}) => {
  const altText = useRef("");
  const [currentFile, setCurrentFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("IM getting triggered !!", defaultData);
    if (defaultData) {
      altText.current.value = defaultData?.alt || "Failed To Load ";
    } else {
      altText.current.value = "";
    }
  }, [defaultData]);
  async function uploadFileToCloudinary() {
    if (!currentFile && altText.current == "") {
      toast.error("Both Fields Are Required !!");
      return;
    }

    if (currentFile) {
      const formData = new FormData();
      formData.append("file", currentFile);

      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      try {
        setIsLoading(true);
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_ClOUDINARY_CLOUD_NAME
          }/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Upload Success:", res.data);
        alert("Image uploaded successfully!");
        setGallery((prev) => {
          const presentArray = [...prev];
          if (defaultData) {
            const present = presentArray.find((el) => el.id == defaultData.id);
            present.path = res.data.secure_url;
            present.src = res.data.secure_url;
            present.alt = altText?.current?.value || "Could Not Read";
            return [...presentArray];
          } else {

            return [
              ...presentArray,
              {
                position: prev.length,
                id: `img ${prev.length}`,
                alt: altText?.current?.value || "Could Not Read",
                path: res.data.secure_url,
                src: res.data.secure_url,
              },
            ];
          }
        });
        setModal(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Upload Error:", error);
        setIsLoading(false);

        alert("Failed to upload image.");
      }
    } else {
      if (altText.current != "") {
        setGallery((prev) => {
          const presentArray = [...prev];
          if (defaultData) {
            console.log(defaultData, presentArray);
            const present = presentArray.find((el) => el.id == defaultData.id);
            console.log(present, "present");
            present.alt = altText?.current?.value || "shashank";

            return [...presentArray];
          }
        });
        toast.success("Alt Changes Successfully !!");
      }
    }

    setModal(false);
    setDefaultData(null);
  }

  async function handleUpload() {
    await uploadFileToCloudinary();
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-50 flex justify-center items-center w-full h-full">
      <div className="relative p-6 w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upload Gallery Image
          </h3>
          <button
            onClick={() => {
              setModal(false);
              setDefaultData(null);
            }}
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-4 space-y-4">
          {/* Alt Attribute */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Alt Attribute
            </label>
            <input
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter Alt Text"
              ref={altText}
            //   onChange={(e) => setAltText(e.target.value)}/
            />
          </div>

          {/* Image Upload */}
          {defaultData ? (
            <div className="flex justify-between px-2">
              <img src={defaultData?.src} alt="Dummy" className="size-52" />
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-semibold">
                    Change Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setCurrentFile(e.target.files[0]);
                      // setDefaultData(null);
                    }}
                    accept="image/*"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 font-semibold">
                Upload Image
              </label>
              <input
                type="file"
                onChange={(e) => setCurrentFile(e.target.files[0])}
                accept="image/*"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 border-t pt-4">
          <button
            type="button"
            onClick={handleUpload}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? "Loading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGalleryModel;