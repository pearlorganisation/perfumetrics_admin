"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import AccordsTable from "./AccordsTable";
import PurchaseLinksTable from "./PurchaseLinksTable";
import ProsConsTable from "./ProsConsTable";
import NotesSelect from "./NotesSelect";
import ImageUpload from "./ImageUpload";
import TextEditor from "../../../components/TextEditor/TextEditor";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../../features/actions/brandsAction";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddPerfume = () => {
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [video, setVideo] = useState(null);
  const [brandsData, setBrandsData] = useState([]);
  const [brandLinkedImages, setBrandLinkedImages] = useState(null);
  const [countryISOData, setCountryISOData] = useState(null);
  const [noteData, setNoteData] = useState([]);
  const { brands } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getNotesData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/note?Limit="infinite"`)
      .then((res) => {
        setNoteData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCountryISO = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/countryISOcodes`)
      .then((res) => {
        // console.log(res);
        
        setCountryISOData(res?.data.data);

        // //setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // //setIsLoading(false);
      });
  };
  const getBrandLinkedImages = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/url-Image`)
      .then((res) => {
        console.log(res);
        setBrandLinkedImages(res?.data.data);

        //setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setIsLoading(false);
      });
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCountryISO();
    getBrandLinkedImages();
    getNotesData();
    dispatch(fetchBrands({limit:'infinite'}));
  }, []);

  useEffect(()=>{
    if (brands?.data?.length > 0) {
      const temp = brands?.data?.map((item) => {
        return {
          value: item?._id,
          label: item?.brand,
        };
      });
      setBrandsData(temp);
    }
  },[brands]);
  
  function filteredData(data){
    console.log(data);
    console.log("gallery",gallery);
    console.log("logo",logo);
    console.log("banner",banner);
    let filteredAccords = data.accords.map((item) => {
      delete item.id;
      return item;
    });
    let filteredTopNotes = data.topNote.map((item) => {
      
      return item.value;
    });
    let filteredMidNotes = data.midNote.map((item) => {
      
      return item.value;
    });
    let filteredBottomNotes = data.baseNote.map((item) => {
      
      return item.value;
    });


    const formData = new FormData();
    data?.purchaseLinks?.forEach(ele=>{
      ele.country = ele?.country.value;
      ele.company = {
        ...ele.company.value
      }
      
    })
 
    formData.append("purchaseLinks", JSON.stringify(data.purchaseLinks));
    formData.append("topNote", JSON.stringify(filteredTopNotes));
    formData.append("middleNote", JSON.stringify(filteredMidNotes));
    formData.append("baseNote", JSON.stringify(filteredBottomNotes));
    formData.append("perfume", data.perfume);
    formData.append("brandAltAttribute", data.brandAltAttribute);
    formData.append("mainImageAltAttribute", data.mainImageAltAttribute);
    formData.append("description", data.description);
    formData.append("details", data.details);
    formData.append("mainAccords", JSON.stringify(filteredAccords));
    formData.append("pros", JSON.stringify(data?.pros));
    formData.append("cons", JSON.stringify(data?.cons));
    formData.append("keywords", JSON.stringify(data?.keywords?.split(",")));

    formData.append("banner", banner?.[0]);
    formData.append("logo", logo?.[0]);
    formData.append("brand", data.brand.value);
    formData.append("video", video);
    formData.append("slug", data.slug);
    formData.append(
      "ratingFragrams",
      JSON.stringify({
        longitivity: Number(data?.longitivity),
        gender: data?.gender?.value,
        sillage: Number(data?.sillage),
        pricing: Number(data?.pricing),
        overall: Number(data?.overall),
        compliment: Number(data?.compliment),
      })
    );

    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }


    const jsonObject = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    console.log("FormData as JSON:", JSON.stringify(jsonObject, null, 2));
   return formData
    
  }
  const onSubmit = async (data) => {
    // if (isLoading) return;
    toast("saving");
    let tempAccords = [...data.accords];
    let totalPercentage = 0;
    tempAccords.forEach((e) => (totalPercentage += parseInt(e.percentage)));
    if (totalPercentage !== 100) {
      toast.error("Total Accords percentage must be equal to 100", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }
    const payload = filteredData(data);
    try {
      // setIsLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/perfume`,
        payload
      );


      // setIsLoading(false);
      navigate("/perfumes");
      toast.success("Saved successfully", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });
    } catch (err) {
      console.error(err);
      // setIsLoading(false);
      toast.error(err?.response?.data?.message || "Server down, please try again later", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };



  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Add New Perfume</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ImageUpload label="Upload Main Pic" required={true} onChange={setBanner} />
        <ImageUpload label="Upload Brand Logo"  required={true} onChange={setLogo} />
        <ImageUpload
          label="Upload Gallery Pics"
          onChange={(files) => setGallery([...gallery, ...files])}
          multiple
          required={true}
        />
        <ImageUpload
          label="Upload Video"
          onChange={setVideo}
          accept="video/*"
        />

        <input
          {...register("perfume", {
            required: "Perfume name is required",
            minLength: 3,
            maxLength: 250,
          })}
          className="w-full p-2 border rounded"
          placeholder="Perfume Name"
        />
        {errors.perfume && (
          <p className="text-red-500">{errors.perfume.message}</p>
        )}

        <input
          {...register("brandAltAttribute", {
            required: "Brand alt attribute is required",
          })}
          className="w-full p-2 border rounded"
          placeholder="Brand Alt Attribute"
        />

        <input
          {...register("mainImageAltAttribute", {
            required: "Main image alt attribute is required",
          })}
          className="w-full p-2 border rounded"
          placeholder="Main Image Alt Attribute"
        />

        <input
          {...register("slug", {
            required: "Slug is required",
            pattern: {
              value:/^[a-zA-Z0-9-_ ]+$/,
              message:
                "Slug can only contain letters, numbers, hyphens, and underscores",
            },
            maxLength: {
              value: 200,
              message: "Slug must be less than 200 characters",
            },
          })}
          className="w-full p-2 border rounded"
          placeholder="Slug"
        />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

        <input
          {...register("keywords", { required: "Keywords are required" })}
          className="w-full p-2 border rounded"
          placeholder="Keywords (comma separated)"
        />

        {brandsData &&<Controller
          name="brand"
          control={control}
          rules={{ required: "Brand is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={brandsData}
              className="w-full"
              placeholder="Select Brand"
            />
          )}
        />}

        <AccordsTable control={control} />
        {countryISOData && brandLinkedImages && (
          <PurchaseLinksTable
            control={control}
            countryISOData={countryISOData}
            brandLinkedImages={brandLinkedImages}
          />
        )}
        <ProsConsTable control={control} />

        {noteData && (
          <NotesSelect noteData = {noteData} control={control} name="topNote" label="Top Note" />
        )}
        {noteData && (
          <NotesSelect noteData = {noteData} control={control} name="midNote" label="Mid Note" />
        )}
        {noteData && (
          <NotesSelect noteData = {noteData} control={control} name="baseNote" label="Base Note" />
        )}
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextEditor
              onChange={field.onChange}
              value={field.value}
              label="Description"
            />
          )}
        />

        <Controller
          name="details"
          control={control}
          rules={{ required: "Details are required" }}
          render={({ field }) => (
            <TextEditor
              onChange={field.onChange}
              value={field.value}
              label="Details"
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("longitivity", { required: true, min: 0, max: 10 })}
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Longitivity (0-10)"
          />
          <input
            {...register("sillage", { required: true, min: 0, max: 10 })}
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Sillage (0-10)"
          />
          <input
            {...register("pricing", { required: true, min: 0, max: 10 })}
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Pricing (0-10)"
          />
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "M", label: "Male" },
                  { value: "F", label: "Female" },
                  { value: "O", label: "Other" },
                ]}
                className="w-full"
                placeholder="Select Gender"
              />
            )}
          />
          <input
            {...register("compliment", { required: true, min: 0, max: 10 })}
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Compliment (0-10)"
          />
          <input
            {...register("overall", { required: true, min: 0, max: 10 })}
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Overall (0-10)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPerfume;
