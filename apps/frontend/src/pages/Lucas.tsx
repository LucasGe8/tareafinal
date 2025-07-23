// src/pages/Lucas.tsx
import React, { useEffect, useState, type FormEvent } from "react";
import api from "../libs/api";
import BackToHomeButton from "./BackToHome";

interface Category {
  id: number;
  name: string;
}

interface ItemInterface {
  id: number;
  name: string;
  price: number;
  category?: Category;
  category_id?: number;
}

const Lucas: React.FC = () => {
  const [productList, setProductList] = useState<ItemInterface[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      // Asegúrate en el backend de incluir la categoría en la respuesta
      const res = await api.get<ItemInterface[]>("/products?include=category");
      setProductList(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategoryId("");
    setEditingId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      price: Number(price),
      category_id: categoryId || undefined,
    };
    try {
      if (editingId !== null) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (item: ItemInterface) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setCategoryId(item.category_id ?? "");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-red-600 p-6">
      <BackToHomeButton />
      {/* Header */}
      <header className="bg-red-600 text-white py-4 mb-8 shadow">
        <h1 className="text-3xl font-bold text-center">McDonald’s - Gestión de Productos</h1>
      </header>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mb-12 bg-gray-100 p-6 rounded-lg shadow"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del Producto</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Precio (Gs.)</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">— Sin categoría —</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="flex-1 py-2 bg-yellow-400 text-red-600 font-semibold rounded hover:bg-yellow-500 transition"
            >
              {editingId !== null ? "Actualizar Producto" : "Agregar Producto"}
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="ml-4 py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Listado de Productos */}
      {productList.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {productList.map(item => (
            <div
              key={item.id}
              className="relative bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex flex-col justify-between"
            >
              {/* Badge de categoría */}
              {item.category && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                  {item.category.name}
                </span>
              )}
              <div>
                <h2 className="text-xl font-bold text-red-600">{item.name}</h2>
                <p className="text-lg mb-2">Gs. {item.price.toFixed(2)}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 py-1 bg-yellow-400 text-red-600 font-semibold rounded hover:bg-yellow-500 transition"
                >
                  ✎ Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lucas;
