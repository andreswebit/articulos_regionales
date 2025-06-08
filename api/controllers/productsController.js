import db from "../db/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [productId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ message: "Error al obtener producto", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: "Nombre y precio son requeridos" });
    }
    
    const [result] = await db.query(
      "INSERT INTO productos (name, price, category, description) VALUES (?, ?, ?, ?)",
      [name, price, category || null, description || null]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      name, 
      price, 
      category,
      description,
      message: "Producto creado exitosamente" 
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, category, description } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: "Nombre y precio son requeridos" });
    }
    
    const [result] = await db.query(
      "UPDATE productos SET name = ?, price = ?, category = ?, description = ? WHERE id = ?",
      [name, price, category || null, description || null, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No se encontró producto con ID ${id}` });
    }
    
    res.json({ 
      id: parseInt(id), 
      name, 
      price, 
      category,
      description,
      message: "Producto actualizado exitosamente" 
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar producto", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query("DELETE FROM productos WHERE id = ?", [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No se encontró producto con ID ${id}` });
    }
    
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
};