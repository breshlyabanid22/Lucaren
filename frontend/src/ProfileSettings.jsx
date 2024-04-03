import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const ProfileSettings = () => {

  const location = useLocation();
  const isActive = (itemHref) => location.pathname === itemHref;
  const nav = [
    { name: "Manage Profile", href: "/account-settings" },
    { name: "Car Listing", href: "/account-settings/car-listing" },
  ];
  return (
    <>
      {/* Sidebar */}
      <div className="absolute left-4 w-[18%] h-[80%] top-20 2xl:w-[18%] 2xl:text-lg text-white bg-black flex flex-col p-2 gap-2 rounded-md rounded-l-none text-sm">
        {nav.map((item, index) => (
          <ul key={index}>
            <li>
            <Link to={item.href}>
            <div className={`px-3 py-2 text-white hover:bg-black-2 hover:text-yellow 
                ${isActive(item.href) ? 'text-yellow bg-black-2 border-l-2 border-yellow' : ''}`}>
              {item.name}
            </div>
          </Link>
            </li>
          </ul>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default ProfileSettings;
