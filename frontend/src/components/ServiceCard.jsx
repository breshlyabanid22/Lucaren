const ServiceCard = ({imgURL, label, subtext}) => {
    return (
      <div className="flex-1 sm:w-[450px] sm:min-w-[450px] w-full rounded-[20px] font-poppins shadow-3xl px-10 py-16">
        <div className="w-11 flex h-11 justify-center text-center items-center rounded-full">
          <img src={imgURL} alt={label} width={40} height={40}/>
        </div>
        <h3 className="mt-6 text-md text-white font-bold">{label}</h3>
        <p className="mt-6 break-words text-sm text-white ">{subtext}</p>
      </div>
    )
  }
   
  export default ServiceCard