import React, { useEffect, useRef, useState, useContext} from "react";
import { client } from "./Url";
import { UserContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faTrash,
  faPenToSquare,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";

const CarListing = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [toast, setToast] = useState("");
  const [isError, setIsError] = useState(false);
  const [carData, setCarData] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    car_id: "",
    make: "",
    model: "",
    model_year: "",
    daily_rate: "",
    transmission: "",
    image_file: "",
    available: true,
  });
  const baseUrl = "http://localhost:8000";
  useEffect(() => {

    if(currentUser){
      fetchCarData();
    }
      const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editId, isSaved]);

  useEffect(() => {
    fetchUserData();

    if (toast) {
      const timeout = setTimeout(() => {
        setToast("");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const fetchUserData = async () => {
    await client
      .get("/user")
      .then((res) => {
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCarData = async () => {
    //fetch the car data from the backend
    await client
      .get("/carlisting")
      .then((res) => {
        const response = res.data;
        if (editId !== -1) {
          const carDataResponse = response.find((res) => res.car_id === editId);
          setFormData({
            make: carDataResponse.make,
            model: carDataResponse.model,
            model_year: carDataResponse.model_year,
            daily_rate: carDataResponse.daily_rate,
            transmission: "",
            available: carDataResponse.available,
          });
        }
        setCarData(res.data);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_file" && files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    }else{
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" || value !== null) {
        formDataToSend.append(key, value);
      }
      formDataToSend.append("available", true);

    });
    try {
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        .split("=")[1];

      const response = client
        .post("/carlisting", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        })
        .then((res) => {
          handleToast("Successfully added");
          setIsError(false);
          setFormData({
            make: "",
            model: "",
            model_year: "",
            daily_rate: "",
            transmission: "",
            image_file: "",
          });
          isSaved ? setIsSaved(false) : setIsSaved(true);
        })
        .catch((error) => {
          handleToast("Please upload an image");
          setIsError(true);
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    
    formData.available ? formDataToSend.append("available", true) : formDataToSend.append("available", false);

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        formDataToSend.append(key, value);
      }
    });

    try {
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        .split("=")[1];

      client
        .put(`/carlisting/${editId}/`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        })
        .then((res) => {
          setEditId(-1);
          setFormData({
            make: "",
            model: "",
            model_year: "",
            daily_rate: "",
            transmission: "",
            image_file: "",
          });
        })
        .catch((err) => {
          console.error("Error:", err);

          if (err.response.data.transmission) {
            alert("Transmission field is required. Please try again!");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function openModal() {
    setIsOpen(true);
    setFormData({
      make: "",
      model: "",
      model_year: "",
      daily_rate: "",
      transmission: "",
      image_file: "",
    });
  }
  function handleToast(toast) {
    setToast(toast);
  }

  function handleEdit(id) {
    setEditId(id);
  }
  function handleDelete(id) {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      .split("=")[1];

    client
      .delete(`/carlisting/${id}/`, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      })
      .then((res) => {
        setEditId(-1);
        isSaved ? setIsSaved(false) : setIsSaved(true);
      })
      .catch((err) => console.error(err));
  }
  return (
    <>
      <div className="flex justify-end pb-10">
        <div className="flex justify-center pt-20 text-white md:w-10/12">
          <div className="relative w-10/12 m-auto mt-20 2xl:text-lg">
            <div className="mb-4 text-lg 2xl:text-xl">Car Listing</div>
            <button
              onClick={openModal}
              className="px-2 py-2 text-sm border rounded-sm border-yellow text-yellow hover:text-white hover:border-white"
            >
              + Add Listing
            </button>
            <div className="relative flex flex-col p-3 mt-3 text-sm border">
              <div className="mb-3 text-lg">My Listing</div>
              <table className="w-full overflow-hidden text-left rtl:text-right">
                <thead className="border-b-2 border-yellow">
                  <tr>
                    <th scope="col" className="px-2 py-2">
                      Image
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Make
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Model
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Model Year
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Daily Rate
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Transmission
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carData.map((car, index) =>
                    car.car_id === editId ? (
                      <tr
                        key={index}
                        className="odd:bg-black even:bg-[#212121]"
                      >
                        <td>
                          <label
                            htmlFor="image_file"
                            className="cursor-pointer"
                          >
                            <img
                              src={baseUrl + car.image_file}
                              loading="lazy"
                              alt=""
                              className="object-cover w-16 h-16"
                            />
                            <input
                              id="image_file"
                              type="file"
                              name="image_file"
                              onChange={handleChange}
                              className="hidden"
                            />
                          </label>
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            name="make"
                            defaultValue={car.make}
                            className="w-24 p-2 border border-yellow bg-inherit"
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            name="model"
                            defaultValue={car.model}
                            className="w-24 p-2 border border-yellow bg-inherit"
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            name="model_year"
                            defaultValue={car.model_year}
                            className="w-20 p-2 border border-yellow bg-inherit"
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            name="daily_rate"
                            defaultValue={car.daily_rate}
                            className="w-20 p-2 border border-yellow bg-inherit"
                            onChange={handleChange}
                          />
                        </td>
                        <td className="flex flex-col gap-2 px-2 py-2">
                          <label htmlFor="automatic" className="">
                            <input
                              type="radio"
                              id="automatic"
                              name="transmission"
                              value="Automatic"
                              onChange={handleChange}
                              className="mr-2"
                              required
                            />
                            Automatic
                          </label>
                          <label htmlFor="manual">
                            <input
                              type="radio"
                              id="manual"
                              name="transmission"
                              value="Manual"
                              onChange={handleChange}
                              className="mr-2"
                              required
                            />
                            Manual
                          </label>
                        </td>
                        <td className="px-2 py-2">
                          <button
                            onClick={handleUpdate}
                            className="px-2 py-1 text-black rounded shadow-md hover:scale-110 bg-yellow"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleEdit(-1)}
                            className="ml-6 text-xl hover:text-red-600"
                          >
                            <FontAwesomeIcon icon={faRectangleXmark} />
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr
                        key={index}
                        className="odd:bg-black even:bg-[#212121]"
                      >
                        <td className="w-16 h-16">
                          <img
                            src={baseUrl + car.image_file}
                            loading="lazy"
                            alt=""
                            className="object-cover w-16 h-16"
                          />
                        </td>
                        <td className="px-2 py-2">{car.make}</td>
                        <td className="px-2 py-2">{car.model}</td>
                        <td className="px-2 py-2">{car.model_year}</td>
                        <td className="px-2 py-2">{car.daily_rate}</td>
                        <td className="px-2 py-2">{car.transmission}</td>
                        <td className="text-lg">
                          <button
                            onClick={() => handleEdit(car.car_id)}
                            className="mx-6 hover:text-green-600"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => handleDelete(car.car_id)}
                            className="hover:text-red-600"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-0 z-20 flex items-center justify-center w-screen h-screen bg-opacity-25 bg-slate-600">
            <div ref={ref} className="relative p-6 bg-black rounded-md">
              <div className="mb-4 text-lg text-white">Create a Listing</div>
              <div
                className={`text-center text-sm py-1 rounded-sm ${
                  isError
                    ? "text-red-500 border border-red-500"
                    : "text-green-500 border border-green-500"
                } ${toast ? "" : "hidden"}`}
              >
                {toast}
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-row justify-center mt-8 mb-6 gap-x-8"
              >
                <label
                  htmlFor="image_file"
                  className="flex items-center justify-center bg-black-2 h-[280px] w-[200px] 2xl:w-[200px] rounded-md text-yellow font-thin"
                >
                  {formData.image_file ? (
                    <img
                      src={URL.createObjectURL(formData.image_file)}
                      className="object-cover h-[280px] w-[200px] 2xl:w-[230px] rounded-md hover:object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-sm gap-y-2">
                      <span>
                        <FontAwesomeIcon icon={faUpload} size="xl" />
                      </span>
                      <p>Upload image</p>
                    </div>
                  )}
                  <input
                    id="image_file"
                    type="file"
                    name="image_file"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                <div className="flex flex-col gap-y-6">
                  <div className="flex items-center justify-between gap-2 items">
                    <label htmlFor="make" className="text-sm text-white">
                      Make
                    </label>
                    <input
                      id="make"
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Toyota, Ford, Chevrolet"
                      className="px-2 py-1 text-sm text-white placeholder-gray-500 border-none bg-black-2 focus:outline-none placeholder:text-sm required:border-red-700"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="model" className="text-sm text-white">
                      Model
                    </label>
                    <input
                      id="model"
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                      placeholder=""
                      className="px-2 py-1 text-sm text-white placeholder-gray-500 border-none bg-black-2 focus:outline-none placeholder:text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="model_year" className="text-sm text-white">
                      Model Year
                    </label>
                    <input
                      id="model_year"
                      type="number"
                      name="model_year"
                      value={formData.model_year}
                      onChange={handleChange}
                      required
                      placeholder=""
                      className="px-2 py-1 text-sm text-white placeholder-gray-500 border-none bg-black-2 focus:outline-none placeholder:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="daily_rate" className="text-sm text-white">
                      Daily Rate
                    </label>
                    <input
                      id="daily_rate"
                      type="number"
                      name="daily_rate"
                      value={formData.daily_rate}
                      onChange={handleChange}
                      placeholder=""
                      required
                      className="text-sm border-none bg-black-2 focus:outline-none text-white px-2 py-1 placeholder:text-sm placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-evenly">
                    <label
                      htmlFor="transmission"
                      className="text-sm text-white"
                    >
                      Automatic
                    </label>
                    <input
                      id="automatic"
                      type="radio"
                      name="transmission"
                      value="Automatic"
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="transmission"
                      className="text-sm text-white"
                    >
                      Manual
                    </label>
                    <input
                      id="manual"
                      type="radio"
                      name="transmission"
                      value="Manual"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-3 py-1 text-sm border rounded-sm text-yellow border-yellow hover:bg-yellow hover:text-white"
                    >
                      Add Listing
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarListing;
