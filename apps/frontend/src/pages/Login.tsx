import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/api";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const doLogin = async () => {
    if (!form.username || !form.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await api.post("/login", form, { withCredentials: true });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d30000] to-[#ffcc00] px-4">
      <div className="bg-[#ffcc00] rounded-3xl shadow-2xl w-full max-w-sm p-8 sm:p-10 border-4 border-[#d30000]">
        <h2 className="text-4xl font-extrabold text-[#d30000] text-center mb-8 font-sans drop-shadow-lg">
          🍔 McDonald's Login
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-bold text-[#d30000] mb-2 tracking-wide"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#d30000] bg-white text-[#d30000] font-semibold placeholder-[#d30000] focus:outline-none focus:ring-4 focus:ring-[#d30000]/70 transition"
              placeholder="Tu usuario"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-[#d30000] mb-2 tracking-wide"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#d30000] bg-white text-[#d30000] font-semibold placeholder-[#d30000] focus:outline-none focus:ring-4 focus:ring-[#d30000]/70 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-center text-red-700 font-semibold">{error}</p>
          )}

          <button
            type="button"
            onClick={doLogin}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-extrabold text-lg tracking-wide transition ${
              loading
                ? "bg-[#f9a825] cursor-not-allowed text-[#a13000]"
                : "bg-[#d30000] hover:bg-[#a60000] text-yellow-400 shadow-lg"
            }`}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
