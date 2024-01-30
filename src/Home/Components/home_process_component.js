import licensed from "../../assets/img/licensed.png";
import affordable from "../../assets/img/affordable.png";
import effective from "../../assets/img/effective.png";
import easyToUse from "../../assets/img/easy_to_use.png";
function ProcessComponent() {
  return (
    <div className="bg-white">
      <div className="grid grid-flow-col auto-cols-max min-h-128 justify-center content-end space-x-64 mb-12">
        <div>
          <figure className="max-w-lg">
            <img
              className="h-40 max-w-full"
              src={licensed}
              alt="image-licensed"
            />
            <figcaption
              className="mt-2 text-center text-2xl font-semibold"
              alt="image-caption"
            >
              Licensed
            </figcaption>
          </figure>
        </div>
        <div>
          <figure className="max-w-lg">
            <img
              className="h-40 max-w-full"
              src={affordable}
              alt="image-affordable"
            />
            <figcaption
              className="mt-2 text-center text-2xl font-semibold"
              alt="image-affordable"
            >
              Affordable
            </figcaption>
          </figure>
        </div>
        <div>
          <figure className="max-w-lg">
            <img
              className="h-40 max-w-full"
              src={effective}
              alt="image-effective"
            />
            <figcaption
              className="mt-2 text-center text-2xl font-semibold"
              alt="image-effective"
            >
              Effective
            </figcaption>
          </figure>
        </div>
        <div>
          <figure className="max-w-lg">
            <img
              className="h-40 max-w-full"
              src={easyToUse}
              alt="image-easy-to-use"
            />
            <figcaption
              className="mt-2 text-center text-2xl font-semibold"
              alt="image-easy-to-use"
            >
              Easy-to-Use
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default ProcessComponent;
