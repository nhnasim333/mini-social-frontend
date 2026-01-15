import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import Login from "../pages/Login/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "/",
    //     element: <DashboardManagement />,
    //   },
    // ]
  },
  // {
  //   path: "/login",
  //   element: (
  //       <Login />
  //   ),
  // },
]);

export default router;
