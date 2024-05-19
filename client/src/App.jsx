import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
