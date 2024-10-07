import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { Notifications } from "./Notifications";

const Root = () => <Outlet />;

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
