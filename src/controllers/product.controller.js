import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Listar todos los productos (GET)
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// 2. Buscar producto por ID (GET /:id)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto" });
  }
};

// 3. Crear un registro (POST)
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await prisma.product.create({
      data: { 
        name, 
        price: Number(price), 
        stock: Number(stock) 
      }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// 4. Actualizar un registro (PUT /:id)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { 
        name, 
        price: Number(price), 
        stock: Number(stock) 
      }
    });
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado o error al actualizar" });
  }
};

// 5. Eliminar un registro (DELETE /:id)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado para eliminar" });
  }
};