import React, { useEffect, useState } from "react";
import { client } from "./Url";

const MyBooking = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [carData, setCarData] = useState([]);

  const baseUrl = "http://localhost:8000";
  useEffect(() => {
    fetchBookingDetails();
    fetchCarData();
  }, []);

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

  const fetchCarData = async() => {
    await client.get('/carlisting')
    .then((res) => {
        setCarData(res.data);
    }).catch((error) => {
        console.error(error);
    })
  }
  
  return (
    <>
      <div className="flex justify-end pb-10">
        <div className="flex justify-center pt-20 text-white md:w-10/12">
          <div className="relative w-10/12 m-auto mt-20 2xl:text-lg">
            <div className="mb-4 text-lg 2xl:text-xl">Booking Details</div>
            {bookingDetails.map((item, index) => (
              <div key={index} className="bg-black rounded p-3 mb-6">
                <div className="flex gap-x-8">
                 {carData.map((car, index) => {
                    if (car.car_id === item.car) {
                        return (
                            <>
                            <img src={baseUrl + car.image_file} className="w-40 rounded object-cover" />
                            <div key={index} className="flex flex-col gap-y-2">
                            <p className="text-yellow mb-2">Car Details</p>
                                <span className="text-xs text-gray-500">Id: <p className="text-white inline">{car.car_id}</p></span>
                                <span className="text-xs text-gray-500">Brand: <p className="text-white inline">{car.make}</p></span>
                                <span className="text-xs text-gray-500">Model: <p className="text-white inline">{car.model}</p></span>
                                <span className="text-xs text-gray-500">Transmission: <p className="text-white inline">{car.transmission}</p></span>
                          </div>
                            </>
                        ) 
                    }
                })}
                  <div className="flex flex-col gap-y-2">
                    <p className="text-yellow mb-2">Pick Up</p>
                    <span className="text-xs text-gray-500">
                      Address: <p className="text-white inline">{item.pick_address}</p>
                    </span>
                    <span className="text-xs text-gray-500">Contact: <p className="text-white inline">{item.pick_contact}</p></span>
                    <span className="text-xs text-gray-500">Date: <p className="text-white inline">{item.pick_date}</p></span>
                    <span className="text-xs text-gray-500">Time: <p className="text-white inline">{item.pick_time}</p></span>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-yellow mb-2">Drop Off</p>
                    <span className="text-xs text-gray-500">
                      Address: <p className="text-white inline">{item.drop_address}</p>
                    </span>
                    <span className="text-xs text-gray-500">Contact: <p className="text-white inline">{item.drop_contact}</p></span>
                    <span className="text-xs text-gray-500">Date: <p className="text-white inline">{item.drop_date}</p></span>
                    <span className="text-xs text-gray-500">Time: <p className="text-white inline">{item.drop_time}</p></span>
                  </div>
                </div>
                <div className="text-right">
                <p className="text-sm my-2">Total Price: $ {item.total_price}</p>
                  <button className="text-xs bg-white rounded font-medium py-1 px-3 text-black">
                    Cancel
                  </button>
                  <button className="text-xs ml-2 bg-yellow rounded font-medium py-1 px-3 text-black">
                    Return
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBooking;
