import { GooglePlay, LoginScreenApp, HomeScreenApp } from "../../assets/images";

function MobileApp() {
  return (
    <div className="grid grid-flow-col gap-x-36 min-h-128 content-center justify-center">
      <div className="flex">
        <img className="object-contain h-128 w-100" src={LoginScreenApp} />
        <img className="object-contain h-128 w-100" src={HomeScreenApp} />
      </div>
      <div>
        <article className="text-pretty">
          <p className="text-4xl text-balance font-medium">
            Embark on a journey towards a happier,
            <br /> healthier you, one session at a time.
          </p>
          <div className="mt-10">
            <a href="#">
              <img src={GooglePlay} className="object-contain h-20 w-100" />
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

export default MobileApp;
