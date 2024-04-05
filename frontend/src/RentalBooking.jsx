import React, { useState } from "react";

const RentalBooking = () => {
  const [formData, setFormData] = useState({
    pick_address: "",
    pick_date: null,
    pick_time: null,
    pick_contact: "",
    drop_address: "",
    drop_date: null,
    drop_time: null,
    drop_contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };

  return (
    <div className="flex flex-col justify-center h-full pt-20 mx-auto text-white md:w-10/12">
      <div className="flex items-center justify-center w-full gap-x-8 my-6">
        <form action="" className="flex flex-row gap-12 w-[700px] xl:w-[750px]">
          <div className="grid gap-3 w-full">
            <h1 className="mb-4 text-lg">Pick Up Location and Date</h1>
            <div className="flex flex-col-reverse">
              <input
                type="text"
                id="pick_address"
                name="pick_address"
                onChange={handleChange}
                className="bg-inherit border-b-2 outline-none p-2 peer focus:border-yellow border-white"
              />
              <label htmlFor="pick_address" className="peer-focus:text-yellow">
                Address
              </label>
            </div>
            <div className="flex flex-col-reverse">
              <input
                type="number"
                id="pick_contact"
                name="pick_contact"
                onChange={handleChange}
                placeholder="+63"
                className="bg-inherit border-b-2 outline-none p-2 peer focus:border-yellow border-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <label htmlFor="pick_contact" className="peer-focus:text-yellow">
                Contact Number
              </label>
            </div>
            <div className="flex flex-col-reverse">
              <input
                type="date"
                id="pick_date"
                name="pick_date"
                onChange={handleChange}
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
            />
           <label htmlFor="pick_time" className="peer-focus:text-yellow">Time</label>
           </div>
          </div>
          <div className="grid gap-4 w-full">
            <h1 className="mb-4 text-lg">Drop Off Location</h1>
            <div className="flex flex-col-reverse">
              <input
                type="text"
                id="drop_address"
                name="drop_address"
                onChange={handleChange}
                className="bg-inherit border-b-2 outline-none p-2 peer focus:border-yellow border-white"
              />
              <label htmlFor="drop_address" className="peer-focus:text-yellow">
                Address
              </label>
            </div>
            <div className="flex flex-col-reverse">
              <input
                type="number"
                id="drop_contact"
                name="drop_contact"
                onChange={handleChange}
                placeholder="+63"
                className="bg-inherit border-b-2 outline-none p-2 peer focus:border-yellow border-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <label htmlFor="drop_contact" className="peer-focus:text-yellow">
                Contact Number
              </label>
            </div>
            <div className="flex flex-col-reverse">
              <input
                type="date"
                id="drop_date"
                name="drop_date"
                onChange={handleChange}
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
              className="bg-inherit outline-none p-2 peer border-b-2 text-black border-black invert "
            />
           <label htmlFor="drop_time" className="peer-focus:text-yellow">Time</label>
           </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalBooking;
