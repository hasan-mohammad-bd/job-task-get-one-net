// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Index from "../pages";
import NotFound from "../pages/NotFound";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />, 
  },
]);
