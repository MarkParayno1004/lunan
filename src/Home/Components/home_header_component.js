import { HeaderImage } from "../../assets/images";
function HeaderComponent() {
  return (
    <div className="bg-primaryGreen">
      <div className="grid grid-flow-col auto-cols-max min-h-128 justify-center content-center">
        <div>
          <article className="text-pretty mt-6">
            <h1 className="text-5xl font-bold text-white">
              Convenient and
              <br />
              Affordable Therapy
              <br />
              Anytime, Anywhere.
            </h1>
            <p className="text-1xl text-white mt-2">
              A safe and supportive space where licensed
              <br /> therapists provide compassionate and effective
              <br /> therapy services.
            </p>
          </article>
          <button className="mt-4 bg-primaryOrange rounded-lg px-3 py-2 font-semibold text-white text-xl">
            Get Started
          </button>
        </div>
        <div>
          <img
            src={HeaderImage}
            className="object-cover h-96 w-100"
            alt="header-display"
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
