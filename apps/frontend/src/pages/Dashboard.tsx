import { Link } from "react-router-dom";
import fondoMcDonalds from "../assets/MC.jpeg";


const Dashboard = () => {
  return (
    <div
      className="p-10 min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondoMcDonalds})`,
      }}
    >
      <h1 className="text-5xl font-extrabold text-yellow-400 mb-10 bg-red-700 bg-opacity-80 px-6 py-4 rounded-lg shadow-lg tracking-wide">
        Bienvenido a McDonald's 🍟
      </h1>
      <div className="space-x-6">
        <Link
          to="/lucas"
          className="inline-block px-8 py-4 bg-red-600 text-yellow-300 font-bold rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300"
        >
          Productos
        </Link>
        <Link
          to="/venta"
          className="inline-block px-8 py-4 bg-yellow-400 text-red-800 font-bold rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300"
        >
          Punto de Venta
        </Link>
        <Link
          to="/categorias"
          className="inline-block px-8 py-4 bg-yellow-400 text-red-800 font-bold rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300"
        >
          Categorías
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
