import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Bienvenido a la App 
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Esta es una app para mostrar ejemplos prácticos con React + Tailwind.
      </p>
      <Link
        to="/rossmary-villalba"
        className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Ir a la tarjeta de Rossmary Villalba 
      </Link>
     
      <Link
        to="/steffany-melgarejo"
        className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Ir a la pagina de Steffany
      </Link>
    </div>
  );
}

export default Welcome;
