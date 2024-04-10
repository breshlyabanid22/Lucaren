import React, { useEffect, useState } from "react";
import { client } from "./Url";

const MyBooking = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [carData, setCarData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [returnId, setReturnId] = useState(0);

  const options = [
    { label: "Select a rating", value: "" },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];
  const baseUrl = "http://localhost:8000";
  useEffect(() => {
    fetchBookingDetails();
    fetchCarData();
  }, [isDeleted]);

  const fetchBookingDetails = async () => {
    await client
      .get("/rental-booking-details")
      .then((res) => {
        console.log(res.data[0]);
        setBookingDetails(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCarData = async () => {
    await client
      .get("/carlisting")
      .then((res) => {
        setCarData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDelete = (id) => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      .split("=")[1];

    client
      .delete(`/rental-booking/${id}/`, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      })
      .then((res) => {
        setIsDeleted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const closeModal = () => {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
  };
  const handleReturn = (id) => {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);

    setReturnId(id);
  };

  const handleSubmit = async () => {

  }
  return (
    <>
      <div className="flex justify-end pb-10">
        <div className="flex justify-center pt-20 text-white md:w-10/12">
          <div className="relative w-10/12 m-auto mt-20 2xl:text-lg">
            <div className="mb-4 text-lg 2xl:text-xl">Booking Details</div>
            {bookingDetails.map((item, index) => (
              <>
                <div key={index} className="bg-black rounded p-3 mb-6">
                  <div className="flex gap-x-8">
                    {carData.map((car, index) => {
                      if (car.car_id === item.car) {
                        return (
                          <>
                            <img
                              src={baseUrl + car.image_file}
                              className="w-40 rounded object-cover"
                            />
                            <div key={index} className="flex flex-col gap-y-2">
                              <p className="text-yellow mb-2">Car Details</p>
                              <span className="text-xs text-gray-500">
                                Id:{" "}
                                <p className="text-white inline">
                                  {car.car_id}
                                </p>
                              </span>
                              <span className="text-xs text-gray-500">
                                Brand:{" "}
                                <p className="text-white inline">{car.make}</p>
                              </span>
                              <span className="text-xs text-gray-500">
                                Model:{" "}
                                <p className="text-white inline">{car.model}</p>
                              </span>
                              <span className="text-xs text-gray-500">
                                Transmission:{" "}
                                <p className="text-white inline">
                                  {car.transmission}
                                </p>
                              </span>
                            </div>
                          </>
                        );
                      }
                    })}
                    <div className="flex flex-col gap-y-2">
                      <p className="text-yellow mb-2">Pick Up</p>
                      <span className="text-xs text-gray-500">
                        Address:{" "}
                        <p className="text-white inline">{item.pick_address}</p>
                      </span>
                      <span className="text-xs text-gray-500">
                        Contact:{" "}
                        <p className="text-white inline">{item.pick_contact}</p>
                      </span>
                      <span className="text-xs text-gray-500">
                        Date:{" "}
                        <p className="text-white inline">{item.pick_date}</p>
                      </span>
                      <span className="text-xs text-gray-500">
                        Time:{" "}
                        <p className="text-white inline">{item.pick_time}</p>
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p className="text-yellow mb-2">Drop Off</p>
                      <span className="text-xs text-gray-500">
                        Address:{" "}
                        <p className="text-white inline">{item.drop_address}</p>
                      </span>
                      <span className="text-xs text-gray-500">
                        Contact:{" "}
                        <p className="text-white inline">{item.drop_contact}</p>
                      </span>
                      <span className="text-xs text-gray-500">
                        Date:{" "}
                        <p className="text-white inline">{item.drop_date}</p>
                      </span>
                      <span className="text-xs text-gray-500">
                        Time:{" "}
                        <p className="text-white inline">{item.drop_time}</p>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm my-2">
                      Total Price: ${item.total_price}
                    </p>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs bg-white hover:bg-gray-400 rounded font-medium py-1 px-3 text-black"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={() => handleReturn(item.id)}
                      className="text-xs ml-2 hover:bg-amber-400 focus:ring-amber-200 focus:ring-1 focus:outline-none bg-yellow rounded font-medium py-1 px-3 text-black"
                    >
                      Return Now
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        {isOpenModal && (
          <div className="flex absolute top-0 w-screen h-screen z-100 bg-opacity-25 bg-slate-600 justify-center items-center">
            <span className="relative flex flex-col gap-y-4 justify-between px-4 py-4 w-[300px] bg-black rounded">
              <form onSubmit={handleSubmit} className=" text-white">
                <h1>Return Details</h1>
                <span className="text-xs text-gray-500">
                  Return Id:{" "}
                  <p className="text-white text-sm inline">{returnId}</p>
                </span>

                <h2 className="my-2 text-xs">Rating:</h2>
                <select
                  name="rating"
                  id="rating"
                  className="text-white text-xs rounded px-1 bg-inherit border border-yellow"
                >
                  {options.map((option) => (
                    <option value={option.value} className="bg-black">
                      {option.label}
                    </option>
                  ))}
                </select>
                <h1 className="text-white my-2 text-xs">
                  Please leave a feedback:
                </h1>
                <textarea className="text-white text-xs p-2 bg-black-2 w-full pb-12 flex" />
                <div className="text-white flex-row-reverse flex gap-x-2 mt-4">
                  <button className="bg-yellow text-black text-xs rounded py-1 px-2">
                    Submit
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-white text-black text-xs rounded py-1 px-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBooking;
