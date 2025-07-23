// src/pages/Categories.tsx
import React, { useEffect, useState, type FormEvent } from "react";
import api from "../libs/api";
import BackToHomeButton from "./BackToHome";

interface Category {
  id: number;
  name: string;
}

const Categories: React.FC = () => {
  const [list, setList] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>("/categories");
      setList(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId !== null) {
        await api.put(`/categories/${editingId}`, { name });
      } else {
        await api.post("/categories", { name });
      }
      setName("");
      setEditingId(null);
      setError(null);
      fetchCategories();
    } catch (err) {
      setError("Error al guardar la categoría");
      console.error(err);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar esta categoría?")) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "No se pudo eliminar. Puede que esta categoría tenga productos asociados.";
      setError(msg);
      console.error("Error deleting category:", err);
    }
  };

  return (

    <div className="p-6 bg-yellow-50 min-h-screen text-red-800">
        <BackToHomeButton />
      <h1 className="text-4xl font-extrabold mb-6 text-center text-red-700">
        🍔 Gestión de Categorías
      </h1>

      {/* Error */}
      {error && (
        <div className="bg-red-200 text-red-800 p-3 rounded mb-4 text-center max-w-md mx-auto">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-semibold text-red-700">
            Nombre de Categoría
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded border-red-300 bg-yellow-100 text-red-900 shadow-sm focus:ring focus:ring-yellow-400"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-yellow-100 rounded font-bold hover:bg-red-700 transition"
          >
            {editingId !== null ? "🍟 Actualizar" : "🍔 Agregar"}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setName("");
                setError(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Listado */}
      {list.length === 0 ? (
        <p className="text-center text-gray-600">No hay categorías.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(cat => (
            <div
              key={cat.id}
              className="bg-white border border-yellow-300 rounded-lg shadow p-4 text-red-700 flex justify-between items-center"
            >
              <span className="text-lg font-semibold">{cat.name}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="px-3 py-1 bg-yellow-400 text-red-900 font-bold rounded hover:bg-yellow-500 transition"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
