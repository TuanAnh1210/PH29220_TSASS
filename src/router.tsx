import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/site/Home";
import AdminLayout from "./layouts/AdminLayout";
import Courses from "./pages/site/Courses";
import Login from "./pages/site/Login";
import AddCourse from "./pages/admin/AddCourse";
import UpdateCourse from "./pages/admin/UpdateCourse";
import Course from "./pages/admin/Course";
import Dashboard from "./pages/admin";
import Category from "./pages/admin/Category";
import AddCategory from "./pages/admin/AddCategory";
import UpdateCategory from "./pages/admin/UpdateCategory";
import User from "./pages/admin/User";
import AddUser from "./pages/admin/AddUser";
import UpdateUser from "./pages/admin/UpdateUser";
import DetailCourse from "./pages/site/DetailCourse";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "detail/:id",
        element: <DetailCourse />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "update-course/:id",
        element: <UpdateCourse />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "update-category/:id",
        element: <UpdateCategory />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "update-user/:id",
        element: <UpdateUser />,
      },
    ],
  },
]);
