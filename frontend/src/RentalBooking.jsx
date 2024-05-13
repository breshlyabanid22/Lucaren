import React, { useEffect, useState } from "react";
import { client } from "./Url";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const RentalBooking = () => {
  const [carData, setCarData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const { carId } = useParams();
  const [toast, setToast] = useState("");
  const [isError, setIsError] = useState(false);
  const [computedPrice, setComputedPrice] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const carID = parseInt(carId);
  
  const baseUrl = "http://localhost:8000";

  const singleCarData = carData.find((car) => car.car_id === carID);

  const [formData, setFormData] = useState({
    pick_address: "",
    pick_date: null,
    pick_time: null,
    pick_contact: "",
    drop_address: "",
    drop_date: null,
    drop_time: null,
    drop_contact: "",
    total_price: 0,
  });

  useEffect(() => {
    fetchCarData();
    fetchUserData();
    if (toast) {
      const timeout = setTimeout(() => {
        setToast("");
        if(isSaved){
          location.reload();
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const fetchUserData = async () => {
    await client.get("/user").then((res) => {
      setCurrentUser(res.data.user_id);
      console.log("Current user dada:", currentUser);
    }).catch((error) => {
      console.error(error);
    })
  };
  const fetchCarData = async () => {
    await client
      .get("/carlisting")
      .then((res) => {
        setCarData(res.data);
        console.log("Car Data:", carData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Convert pick_date to a Date object
    const pickDate = new Date(formData.pick_date);
    if (pickDate < currentDate) {
      setIsError(true);
      setToast("Pick-up date must be later than the current date.");
      return; 
  }
  if(!computedPrice || computedPrice === 0){
    setIsInvalid(true);
    setIsError(true);
    setToast("Total price must not be $0.");

    return;
  }
    const formDataToSend = new FormData();
    const timeValue =
      formData.pick_time.split(":")[0] + ":" + formData.pick_time.split(":")[1];
    const timeValueDrop =
      formData.drop_time.split(":")[0] + ":" + formData.pick_time.split(":")[1];

    formDataToSend.append("pick_address", formData.pick_address);
    formDataToSend.append("pick_date", formData.pick_date);
    formDataToSend.append("pick_time", timeValue);
    formDataToSend.append("pick_contact", formData.pick_contact);
    formDataToSend.append("drop_address", formData.drop_address);
    formDataToSend.append("drop_date", formData.drop_date);
    formDataToSend.append("drop_time", timeValueDrop);
    formDataToSend.append("drop_contact", formData.drop_contact);
    formDataToSend.append("total_price", computedPrice);
    formDataToSend.append("current_user", currentUser);

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      .split("=")[1];

    client
      .post(`/rental-booking/${carID}/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken,
        },
      })
      .then((res) => {
        setIsError(false);
        setToast("Booking Successful. Please check your booking details.");
        setComputedPrice(0);
        setIsSaved(true);
        changeCarAvailability();
      })
      .catch((error) => {
        console.error(error.response);
        if (error) {
          if(error.response.data.non_field_errors){
            setToast(error.response.data.non_field_errors[0]);
            setIsError(true);
          }
          if (
            error.response.data.pick_contact ||
            error.response.data.drop_contact
          ) {
            setToast("Contact number must be 11 digits.");
            setIsError(true);

          }
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };

  const computeTotalPrice = () => {
    const startDate = new Date(`${formData.pick_date}T${formData.pick_time}`);
    const endDate = new Date(`${formData.drop_date}T${formData.drop_time}`);
    const diffInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const totalPrice = diffInDays * singleCarData.daily_rate;

    if(formData.pick_time === null || formData.drop_time === null || !formData.pick_date || !formData.drop_date){
      setIsInvalid(true);
      setComputedPrice("Invalid") 
    }else{
      totalPrice <= 0 ? setIsInvalid(true) : setIsInvalid(false);
      setComputedPrice(totalPrice.toFixed(2));
    }
  };

  const changeCarAvailability = async () => {

    const formDataToSend = new FormData();

    formDataToSend.append("available", false);

    const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        .split("=")[1];

    await client.put(`/carlisting/${carID}/`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": csrfToken,
      },
    }).then((res) => {
      console.log(res.data);
    }).catch((error) => {
      console.error(error);
    })
  }
  return (
    <>
      <div className="flex flex-col justify-center mb-20 mt-24 2xl:mt-40 mx-auto text-white md:w-10/12 2xl:w-3/5">
        <Link to="/cars" className="w-11 mb-2">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-lg rounded-full p-3 bg-black hover:text-yellow"
          />
        </Link>
        <h1 className="text-lg">Car Details</h1>
        {singleCarData && (
          <div className="flex gap-x-3 justify-between text-sm ml-8 mt-6 border-b-2 border-yellow mb-6">
            <div className="flex flex-col gap-y-3 mb-6">
              <span className="text-gray text-gray-500">
                Car id:{" "}
                <p className="text-yellow inline">{singleCarData.car_id}</p>
              </span>
              <span className="text-gray text-gray-500">
                Brand: <p className="inline text-white">{singleCarData.make}</p>
              </span>
              <span className="text-gray text-gray-500">
                Model: <p className="inline text-white">{singleCarData.model}</p>
              </span>
              <span className="text-gray text-gray-500">
                Price:{" "}
                <p className="text-white inline">
                  $ {singleCarData.daily_rate}/day
                </p>
              </span>
              <span className="text-gray text-gray-500">
                Transmission:{" "}
                <p className="inline text-white">
                  {singleCarData.transmission}
                </p>
              </span>
            </div>
            <img
              src={baseUrl + singleCarData.image_file}
              className="h-[145px] aspect-auto rounded-md"
            />
          </div>
        )}
        <h1 className="text-lg">Rental Booking</h1>
        <div className="flex flex-col items-center justify-center w-full gap-x-8 gap-y-6 my-6">
          <div
            className={`${
              isError
                ? "text-red-400 border-red-600"
                : "text-green-400 border-green-600"
            } ${
              toast ? "block" : "hidden"
            }  py-2 border px-4 rounded-md text-xs `}
          >
            {toast}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-row gap-x-12 w-[700px] xl:w-[750px]"
          >
            <div className="grid gap-3 w-full">
              <h1 className="mb-4 text-lg hover:text-yellow">
                Pick Up Location & Date
              </h1>
              <div className="flex flex-col-reverse">
                <input
                  type="text"
                  id="pick_address"
                  name="pick_address"
                  onChange={handleChange}
                  value={formData.pick_address}
                  required
                  className="bg-inherit border-b-2 outline-none p-2 peer focus:border-yellow border-white"
                />
                <label
                  htmlFor="pick_address"
                  className="peer-focus:text-yellow"
                >
                  Address
                </label>
              </div>
              <div className="flex flex-col-reverse">
                <input
                  type="number"
                  id="pick_contact"
                  name="pick_contact"
                  onChange={handleChange}
                  value={formData.pick_contact}
                  placeholder="+63"
                  required
                  className="bg-inherit border-b-2 outline-none p-2 peer focus:border-yellow border-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <label
                  htmlFor="pick_contact"
                  className="peer-focus:text-yellow"
                >
                  Contact Number
                </label>
              </div>
              <div className="flex flex-col-reverse">
                <input
                  type="date"
                  id="pick_date"
                  name="pick_date"
                  onChange={handleChange}
                  required
                  className="bg-inherit p-2 peer text-black border-b-black invert outline-none border-b-2"
                />
                <label htmlFor="pick_date" className="peer-focus:text-yellow">
                  Date
                </label>
              </div>
              <div className="flex flex-col-reverse">
                <input
                  type="time"
                  id="pick_time"
                  name="pick_time"
                  onChange={handleChange}
                  className="bg-inherit outline-none p-2 peer border-b-2 text-black border-black invert "
                  step="1800"
                  required
                />
                <label htmlFor="pick_time" className="peer-focus:text-yellow">
                  Time
                </label>
              </div>
            </div>
            <div className="grid gap-4 w-full">
              <h1 className="mb-4 text-lg hover:text-yellow">
                Drop Off Location & Date
              </h1>
              <div className="flex flex-col-reverse">
                <input
                  type="text"
                  id="drop_address"
                  name="drop_address"
                  onChange={handleChange}
                  value={formData.drop_address}
                  required
                  className="bg-inherit border-b-2 outline-none p-2 peer focus:border-yellow border-white"
                />
                <label
                  htmlFor="drop_address"
                  className="peer-focus:text-yellow"
                >
                  Address
                </label>
              </div>
              <div className="flex flex-col-reverse">
                <input
                  type="number"
                  id="drop_contact"
                  name="drop_contact"
                  onChange={handleChange}
                  value={formData.drop_contact}
                  placeholder="+63"
                  required
                  className="bg-inherit border-b-2 outline-none p-2 peer focus:border-yellow border-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <label
                  htmlFor="drop_contact"
                  className="peer-focus:text-yellow"
                >
                  Contact Number
                </label>
              </div>
              <div className="flex flex-col-reverse">
                <input
                  type="date"
                  id="drop_date"
                  name="drop_date"
                  onChange={handleChange}
                  required
                  className="bg-inherit p-2 peer text-black border-b-black invert outline-none border-b-2"
                />
                <label htmlFor="drop_date" className="peer-focus:text-yellow">
                  Date
                </label>
              </div>
              <div className="flex flex-col-reverse">
                <input
                  type="time"
                  id="drop_time"
                  name="drop_time"
                  onChange={handleChange}
                  step="1800"
                  required
                  className="bg-inherit outline-none p-2 peer border-b-2 text-black border-black invert "
                />
                <label htmlFor="drop_time" className="peer-focus:text-yellow">
                  Time
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-6 justify-between">
              <div className=" bg-black py-8 rounded px-4 flex flex-col items-center gap-y-6">
                <p className="text-sm">Total Price:</p>
                <p className={`text-lg border-b-2 ${isInvalid ? 'text-red-600 text-sm' : 'text-white'} border-yellow`}>
                  $ {computedPrice}
                </p>
                <span
                  onClick={computeTotalPrice}
                  className="text-sm px-4 py-2 bg-white rounded-md text-black cursor-pointer"
                >
                  Compute
                </span>
              </div>
              <button
                type="submit"
                className="hover:bg-yellow border w-32 border-yellow py-2 px-6"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RentalBooking;
