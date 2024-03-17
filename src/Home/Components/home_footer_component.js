function Footer() {
  return (
    <div>
      <footer>
        <nav className="bg-primaryGreen r px-4 lg:px-6 py-2.5 pt-12 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-x-40 gap-y-10 py-12 ">
              <div>
                <a
                  href="#"
                  className="text-white font-medium text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-white font-medium text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  Login
                </a>
                <a
                  href="#"
                  className="text-white font-medium text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  FAQ
                </a>
                <a
                  href="#"
                  className="text-white font-medium text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  Get started
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-white font-medium text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  Terms & Condition
                </a>
                <a
                  href="#"
                  className="text-white font-medium text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  Privacy Policy
                </a>
              </div>
              <div>
                <span className="text-white font-semibold text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                  #98 SAN PEDRO BAUTISTA ST.BRGY.DAMAYAN
                </span>
              </div>
              <div>
                <span className="text-white font-semibold text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                  © 2023 Bloomfields Wellness Institute
                </span>
              </div>
            </div>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
