const FrameComponent = ({ className = "" }) => {
    return (
      <section
        className={`w-[1120px] flex flex-col items-start justify-start gap-[11px] max-w-full text-left text-11xl text-gray font-poppins ${className}`}
      >
        <h1 className="m-0 relative text-inherit font-normal font-inherit mq450:text-lg mq1050:text-5xl">
          Featured Cars
        </h1>
        <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[19px] box-border gap-[73px] max-w-full text-mini mq750:gap-[18px] mq1125:gap-[36px]">
          <div className="flex flex-row items-start justify-start py-0 px-px box-border max-w-full">
            <p className="m-0 relative">
              Check out a variety of our luxury cars available for rent.
            </p>
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[32px] mq750:gap-[16px]">            <div className="h-64 flex-1 relative rounded-xl bg-gainsboro-200 min-w-[236px] max-w-[256px]">
              <div className="absolute top-[0px] left-[calc(50%_-_128px)] rounded-xl bg-gainsboro-200 w-full h-full hidden" />
            </div>
            <div className="h-64 flex-1 relative rounded-xl bg-gainsboro-200 min-w-[236px] max-w-[256px]">
              <div className="absolute top-[0px] left-[calc(50%_-_128px)] rounded-xl bg-gainsboro-200 w-full h-full hidden" />
            </div>
            <div className="h-64 flex-1 relative rounded-xl bg-gainsboro-200 min-w-[236px] max-w-[256px]">
              <div className="absolute top-[0px] left-[calc(50%_-_128px)] rounded-xl bg-gainsboro-200 w-full h-full hidden" />
            </div>
            <div className="h-64 flex-1 relative rounded-xl bg-gainsboro-200 min-w-[236px] max-w-[256px]">
              <div className="absolute top-[0px] left-[calc(50%_-_128px)] rounded-xl bg-gainsboro-200 w-full h-full hidden" />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-end">
          <input
            className="[border:none] [outline:none] bg-gray h-12 w-40 relative rounded-3xs"
            type="text"
          />
        </div>
      </section>
    );
  };
 
  FrameComponent.propTypes = {
    className: PropTypes.string,
  };
 
  export default FrameComponent;