import { NavBarLogo } from "../../assets/images";
function NavBar() {
  return (
    <div>
      <header className="sticky top-0">
        <nav className="bg-primaryGreen r px-4 lg:px-6 py-2.5 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a
              href="#"
              className="flex items-center"
              style={{ textDecoration: "none" }}
            >
              <img
                src={NavBarLogo}
                className="drop-shadow-lg  object-cover h-20 max-w-full"
                alt="Bloomfields Logo"
              />
              <span className="text-pretty text-2xl ms-2 font-semibold whitespace-nowrap text-white">
                Bloomfields Wellness Institute
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a
                href={`/`}
                className="text-white font-medium text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                style={{ textDecoration: "none" }}
              >
                Home
              </a>
              <a
                href={`/FAQ`}
                className="text-white font-medium text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                style={{ textDecoration: "none" }}
              >
                FAQ
              </a>
              <a
                href={`/Login`}
                className="text-white font-medium text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                style={{ textDecoration: "none" }}
              >
                Login
              </a>
              <a
                href="/Sign Up"
                className="text-white font-medium text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                style={{ textDecoration: "none" }}
              >
                Get started
              </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
