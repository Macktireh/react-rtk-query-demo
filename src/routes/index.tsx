import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/views/Home";
import { PostDetail } from "@/views/PostDetail";
import { About } from "@/views/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <PostDetail />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);