import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import VideoReactApp from "./video";
import Home from "./Home/Pages/Home";
import Login from "./Home/Pages/Login";
import SignUp from "./Home/Pages/SignUp";
import FAQ from "./Home/Pages/FAQ";
import CounselorDashboardPage from "./Counselor/Pages/counselor_dashboard_page";
import SupervisorDashboardPage from "./Supervisor/Pages/supervisor_dashboard_page";

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/Login", Component: Login },
  { path: "/Sign Up", Component: SignUp },
  { path: "/FAQ", Component: FAQ },
  { path: "/Supervisor Dashboard", Component: SupervisorDashboardPage },
  { path: "/Counselor Dashboard", Component: CounselorDashboardPage },
  { path: "/VideoApp", Component: VideoReactApp },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
