// src/pages/PuntoDeVenta.tsx
import { useEffect, useState } from "react";
import api from "../libs/api";
import { jsPDF } from "jspdf";
import BackToHomeButton from "./BackToHome";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category; // categoría como objeto
}

interface CartItem extends Product {
  quantity: number;
}

interface Sale {
  items: CartItem[];
  total: number;
  date: string;
}

const PuntoDeVenta: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastSale, setLastSale] = useState<Sale | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Asegúrate que la API devuelve category como objeto con id y name
        const res = await api.get<Product[]>("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const finalizarVenta = () => {
    if (cart.length === 0) return;
    const now = new Date();
    const ticket: Sale = {
      items: cart,
      total,
      date: now.toLocaleString(),
    };
    setLastSale(ticket);
    setCart([]);
  };

  const descargarPDF = () => {
    if (!lastSale) return;
    const doc = new jsPDF({ unit: "px", format: "a6" });
    let y = 20;
    doc.setFontSize(14);
    doc.text("TICKET DE VENTA", 20, y);
    y += 30;
    doc.setFontSize(10);
    doc.text(`Fecha: ${lastSale.date}`, 20, y);
    y += 20;
    lastSale.items.forEach((it) => {
      doc.text(
        `${it.name} (${it.quantity}) - ${it.category.name} - Gs. ${
          it.price * it.quantity
        }`,
        20,
        y
      );
      y += 20;
    });
    y += 10;
    doc.setFontSize(12);
    doc.text(`Total: Gs. ${lastSale.total}`, 20, y);
    doc.save(`ticket_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#ffcc00] text-[#d30000] p-6 font-sans">
        <BackToHomeButton />
      <h1 className="text-4xl font-bold text-center mb-8 text-[#d30000]">
        🍟 Punto de Venta
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productos */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-4 border-[#d30000] pb-2">
            Productos Disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg p-4 shadow-lg border border-[#d30000]"
              >
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">Categoría: {p.category.name}</p>
                <p className="text-[#d30000] font-bold">Gs. {p.price}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="mt-3 w-full px-3 py-1 bg-[#d30000] text-white font-medium rounded hover:bg-red-700 transition"
                >
                  + Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carrito y Ticket */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-4 border-[#d30000] pb-2">
            Carrito
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-800">El carrito está vacío.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-3 rounded shadow border border-[#d30000]"
                >
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × Gs. {item.price}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      Categoría: {item.category.name}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#d30000] font-bold hover:text-black transform transition-transform hover:scale-110"
                  >
                    X
                  </button>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>Gs. {total}</span>
              </div>
              <button
                onClick={finalizarVenta}
                className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Finalizar Venta
              </button>
            </div>
          )}

          {/* Ticket */}
          {lastSale && (
            <div className="mt-10 bg-white text-black p-4 rounded shadow-lg max-w-md mx-auto border border-[#d30000]">
              <h3 className="text-center font-bold mb-2 text-lg text-[#d30000]">
                TICKET DE VENTA
              </h3>
              <p className="text-sm text-center mb-4">{lastSale.date}</p>
              <div className="space-y-2">
                {lastSale.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-semibold">
                        {it.name} ({it.quantity})
                      </span>
                      <p className="text-xs text-gray-600 italic">{it.category.name}</p>
                    </div>
                    <span>Gs. {it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
              <hr className="my-2 border-gray-300" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>Gs. {lastSale.total}</span>
              </div>
              <button
                onClick={descargarPDF}
                className="mt-4 w-full px-4 py-2 bg-[#d30000] text-white rounded hover:bg-red-700 transition"
              >
                Descargar Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PuntoDeVenta;
