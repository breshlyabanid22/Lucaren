import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { client } from "./Url";
const SingleCarPage = () => {
  const { carId } = useParams();
  const [carData, setCarData] = useState([]);
  const cardId = parseInt(carId);

  const baseUrl = "http://localhost:8000";
  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    await client
      .get("/carlisting")
      .then((res) => {
        setCarData(res.data);
      })
      .catch((err) => console.error(err));
  };
  const singleCarData = carData.find((car) => car.car_id === cardId);
  return (
    <>
      {singleCarData ? (
        <div className=" pt-20 text-white mx-auto md:w-10/12 h-full flex items-center">
          <div className="w-full flex gap-16 justify-center">
            <img
              src={baseUrl + singleCarData.image_file}
              className="w-[500px] aspect-auto rounded-md 2xl:w-[700px]"
            />
            <div className="flex flex-col w-[400px] justify-between">
              <h2 className="text-3xl">{singleCarData.make}</h2>
              <p>{singleCarData.model} {singleCarData.model_year}</p>
              <p>$ {singleCarData.daily_rate}</p>
              <p>Transmission: {singleCarData.transmission}</p>
              <p>Rating: </p>
              <button className="py-2 px-3 w-full rounded border border-yellow hover:bg-yellow">Rent</button>
              <Link to="/cars" className="py-2 px-3 text-center rounded w-full bg-white text-black">Go back</Link>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SingleCarPage;
