import HeaderComponent from "../Components/home_header_component";
import ProcessComponent from "../Components/home_process_component";
import AboutUsComponent from "../Components/home_about_us_component";
import MobileApp from "../Components/home_mobile_component";
import Footer from "../Components/home_footer_component";
import NavBar from "../Components/home_navbar_component";

export const Home = () => {
  return (
    <div className="homepage">
      <NavBar />
      <HeaderComponent />
      <ProcessComponent />
      <AboutUsComponent />
      <MobileApp />
      <Footer />
    </div>
  );
};
