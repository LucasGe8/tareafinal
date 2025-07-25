// src/controllers/categories.ts
import { Request, Response } from 'express';
import { db } from '../db/connection';
import { products, categories } from '../db/schema';
import { eq } from 'drizzle-orm';


// Obtener todas las categorías
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await db.select().from(categories);
    res.json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
};

// Crear una nueva categoría
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await db.insert(categories).values({ name });
    res.status(201).json({ message: 'Categoría creada', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
};

// Actualizar una categoría existente
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db
      .update(categories)
      .set({ name })
      .where(eq(categories.id, Number(id)));
    res.json({ message: 'Categoría actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const productos = await db
      .select()
      .from(products)
      .where(eq(products.category_id, id));

    if (productos.length > 0) {
      res.status(400).json({ message: "La categoría contiene productos." });
      return;
    }

    await db.delete(categories).where(eq(categories.id, id));
    res.json({ message: "Categoría eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno" });
  }
};
