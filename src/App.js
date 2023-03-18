import "./App.css";
import LandingPage from "./Components/LandingPage";
import "../src/Components/LandingPage.css";
import User from "./Components/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: `/user/:id`, element: <User /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
