// src/controllers/products.ts
import { Request, Response } from 'express';
import { db } from '../db/connection';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';
import { categories } from '../db/schema';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        category_id: products.category_id,
        category_name: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(categories.id, products.category_id));
    // Transformar para que category sea un objeto
    const formatted = allProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category_id: p.category_id,
      category: p.category_id ? { id: p.category_id, name: p.category_name } : undefined
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, category_id } = req.body;    
  try {
    const result = await db
      .insert(products)
      .values({ name, price, category_id });         
    res.status(201).json({ message: 'Producto creado', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, category_id } = req.body;   
  try {
    await db
      .update(products)
      .set({ name, price, category_id })           
      .where(eq(products.id, Number(id)));
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.delete(products)
      .where(eq(products.id, Number(id)));
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};
