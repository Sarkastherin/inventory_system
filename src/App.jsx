import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  createHashRouter
} from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import { supabase } from "./API/client";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from "./components/Layout";
import Movimientos from "./pages/Movimientos";
import Stock from "./pages/Stock";
import { useEffect, useState } from "react";
import Consultas from "./pages/Consultas";

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

function App() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-bs-theme", theme);
  }, [theme]);
  const handleTheme = () => {
    //console.log(theme)
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }
  const routes = createHashRouter([
    {
      path: "/",
      element: <Layout handleTheme={handleTheme} theme={theme}/>,
      loader: authLoader,
      children: [
        {path: "/",element: <Home />},
        {path: "/movimientos",element: <Movimientos theme={theme}/>},
        {path: "/stock",element: <Stock theme={theme}/>},
        {path: "/consultas",element: <Consultas theme={theme}/>},
        {path: "*",element: <NotFoundPage />},
      ]
    
    },
    {path: "/login",element: <Login />}
  ]);
  return <RouterProvider router={routes} handleTheme={handleTheme}/>;
}

export default App;
