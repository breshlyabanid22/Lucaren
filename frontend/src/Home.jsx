import React, { useEffect, useState } from "react";
import { client } from "./Url";
import { Link, useNavigate } from "react-router-dom";
 
const Home = () => {
  const [carData, setCarData] = useState([]);
  const [visibleCars, setVisibleCars] = useState([]);
  const [carOfTheDay, setCarOfTheDay] = useState(null);

  const baseUrl = "http://localhost:8000";
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchCarData();
  }, []);
 
  useEffect(() => {
    const interval = setInterval(() => {
      changeVisibleCars();
      changeCarOfTheDay();
    }, 5000); // Change cars every 5 seconds
    return () => clearInterval(interval);
  }, [carData]);
 
  const fetchCarData = async () => {
    await client
      .get("/carlisting")
      .then((res) => {
        setCarData(res.data);
        setVisibleCars(getRandomCars(res.data, 4));
        setCarOfTheDay(getRandomCars(res.data, 1)[0]);
      })
      .catch((err) => console.error(err));
  };
 
  const getRandomCars = (cars, num) => {
    const shuffled = cars.filter(car => car.available).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
 
  const changeVisibleCars = () => {
    setVisibleCars(getRandomCars(carData, 4));
  };
 
  const changeCarOfTheDay = () => {
    setCarOfTheDay(getRandomCars(carData, 1)[0]);
  };

 
  return (
    <div className="relative w-full h-[2024px] overflow-hidden text-left text-[30px] text-white font-poppins">
      <div className="absolute top-[216px] left-1/2 transform -translate-x-1/2 w-[1120px] h-[1282px]">
        <div className="absolute top-0 left-0 rounded-xl bg-gainsboro-100 w-full h-[584px]">
 
            <div className="justify-center text-center font-poppins text-4xl mb-8 -mt-20">
                Car of the Day
              </div>
 
          {carOfTheDay && (
            <div className="relative w-full h-full p-8">
 
              <Link to={`/cars/${carOfTheDay.car_id}`} className="relative block w-full h-full hover:scale-105 duration-75 shadow-lg">
                <img
                  src={baseUrl + carOfTheDay.image_file}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
 
                <div className="absolute bottom-0 w-full p-2 text-md text-center bg-opacity-75 bg-gray-800 rounded-b-lg">
                  <div>
                    <p>{carOfTheDay.make} {carOfTheDay.model}</p>
                  </div>
                </div>
 
 
              </Link>
            </div>
          )}
        </div>
        <div className="absolute top-[796px] left-1/2 -translate-x-1/2 w-full h-[486px]">
          <div className="absolute top-0 transform justify-start">
            Featured Cars
          </div>
          <div className="absolute top-[56px] transform text-[15px]">
            Check out a variety of our luxury cars available for rent.
          </div>
          <div className="absolute top-[152px] left-1/2 transform -translate-x-1/2 w-full h-64 flex justify-between">
            {visibleCars.map((car, index) => (
              <Link
                to={`/cars/${car.car_id}`}
                key={index}
                className="relative w-64 h-64 hover:scale-105 duration-75 shadow-lg p-4"
              >
                <img
                  src={baseUrl + car.image_file}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 w-full p-2 text-sm flex flex-row justify-between bg-opacity-75 bg-gray-800 rounded-b-lg">
                  <div>
                    <p>{car.make}</p>
                    <p>$ {car.daily_rate}/day</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/cars"
            className="absolute top-[438px] text-sm left-[960px] rounded-3xs bg-gray-800 rounded-xl w-40 h-12 flex items-center justify-center text-white hover:bg-gray-600"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default Home;