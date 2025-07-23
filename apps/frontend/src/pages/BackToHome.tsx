import { useNavigate } from "react-router-dom";

const BackToHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="mb-4 px-4 py-2 bg-[#d30000] text-white rounded hover:bg-red-700 transition"
    >
      ← Volver al Inicio
    </button>
  );
};

export default BackToHomeButton;