import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { client } from "./Url";
import { UserContext } from "./App";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleCarPage = () => {
  const { carId } = useParams();
  const [carData, setCarData] = useState([]);
  const carID = parseInt(carId);
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [reviewData, setReviewData] = useState([]);
  const baseUrl = "http://localhost:8000";
  useEffect(() => {
    fetchCarData();
    fetchReviewData();
  }, []);

  const fetchCarData = async () => {
    await client
      .get("/carlisting")
      .then((res) => {
        setCarData(res.data);
      })
      .catch((err) => console.error(err));
  };
  const fetchReviewData = async () => {
    await client.get("/feedback").then((res) => {
      setReviewData(res.data);
    }).catch((error) => {
      console.error(error);
    })
  }
 
  
  const singleCarData = carData.find((car) => car.car_id === carID);

  return (
    <>
      {singleCarData ? (
        <div className=" pt-20 text-white mx-auto md:w-10/12 my-8 flex flex-col justify-center items-center">
          <div className="w-full flex gap-16 justify-center">
            <img
              src={baseUrl + singleCarData.image_file}
              className="w-[500px] aspect-auto rounded-md 2xl:w-[700px]"
            />
            <div className="flex flex-col w-[400px] justify-between text-sm 2xl:text-md">
              <h2 className="text-3xl 2xl:text-4xl text-yellow">{singleCarData.make}</h2>
              <p>{singleCarData.model} {singleCarData.model_year}</p>
              <p>$ {singleCarData.daily_rate} /day</p>
              <p>{singleCarData.transmission}</p>
              <p>Rating: </p>
              {currentUser ? (
                <Link to={`/rental-booking/${carId}`} className="text-center py-2 px-3 w-full rounded border border-yellow hover:bg-yellow 2xl:py-3 2xl:px-4 2xl:text-lg">Rent</Link>
              ) : (
                <Link to={`/login`} className="text-center py-2 px-3 w-full rounded border border-yellow hover:bg-yellow 2xl:py-3 2xl:px-4 2xl:text-lg">Rent</Link>
              )
              }
              <Link to="/cars" className="py-2 px-3 text-center rounded w-full bg-white text-black 2xl:py-3 2xl:px-4 2xl:text-lg">Go back</Link>
            </div>
          </div>
          <div className="flex flex-col mt-12 w-full rounded p-4">
            <p className="text-yellow text-lg mb-4">Reviews and Ratings</p>
            {reviewData.filter(data => data.car_id === carID).length > 0 ? (
              reviewData.map((data, index) => {
                if(data.car_id === carID){
                  return (
                    <div key={index} className="text-sm mb-3 p-4 rounded bg-black">
                      <div className="flex items-center gap-2">
                        <img src={baseUrl + data.user_profile} className="size-9 rounded-full" />
                        <p>{data.username}</p>
                        <p className="text-xs text-slate-500">{data.date_posted}</p>
                      </div>
                      <div className="flex gap-x-2 my-2">
                        <p className="text-xs">Rating:</p>
                        {[...Array(data.rating)].map(star => {
                          return (
                            <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
                          )
                        })}
                      </div>
                      {data.comment && (
                       <>
                        <p className=" mb-2 text-xs">Comments:</p>
                        <p className="bg-black-2 px-2 py-3 text-xs rounded">{data.comment}</p>
                       </>
                      )
                      }
                    </div>
                  );
                }else{
                  return null;
                }
              })
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SingleCarPage;
