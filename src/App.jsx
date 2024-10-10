import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import { supabase } from "./API/client";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from "./components/Layout";
import Movimientos from "./pages/Movimientos";

// Este loader se encargará de verificar si el usuario está autenticado
const authLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return redirect("/login");
  }
  return null
};
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: authLoader,
    children: [
      {path: "/",element: <Home />},
      {path: "/movimientos",element: <Movimientos />},
      {path: "*",element: <NotFoundPage />},
    ]
  
  },
  {path: "/login",element: <Login />}
]);

function App() {
  
  return <RouterProvider router={routes} />;
}

export default App;
