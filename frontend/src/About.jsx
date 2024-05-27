// import {services} from './constants';
// import ServiceCard from './components/ServiceCard';
 
const About = () => {
  return (
 
    <div className="flex flex-col justify-center items-center h-screen">
 
      <div className="mb-8 text-center text-3xl font-bold font-['Poppins'] text-white">
        About Lucaren
      </div>
 
      <div className="text-center text-white text-md font-normal mb-16 font-['Poppins']">
      Lucaren offers exclusive luxury car rentals, providing discerning customers with unparalleled elegance and performance
      </div>
 
      <div className="max-container flex justify-center flex-wrap gap-9">
        {/* {services.map((service) => (
          <ServiceCard key={service.label} {...service} />
        ))} */}
      </div>
 
    </div>
  );
};
 
export default About;
 