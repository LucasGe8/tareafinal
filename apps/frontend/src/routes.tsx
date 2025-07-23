import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Jonas from "./pages/Jonas";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Lucas from "./pages/Lucas";
import PuntoDeVenta from "./pages/PuntoDeVenta";
import Categories from "./pages/Categorias";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, // Agrupa rutas protegidas
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/jonas",
        element: <Jonas />,
      },
      {
       path: "/lucas",
       element: <Lucas /> 
      },
      {
       path: "/venta",
       element: <PuntoDeVenta /> 
      },
       {
       path: "/categorias",
       element: <Categories /> 
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
