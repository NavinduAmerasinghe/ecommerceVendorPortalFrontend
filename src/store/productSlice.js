import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Update the base URL with your backend server's URL
});

// Fetch all products from the backend
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      // Handle error
      throw Error("Failed to fetch products");
    }
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    try {
      const formData = new FormData();
      formData.append("sku", product.sku);
      formData.append("quantity", product.quantity);
      formData.append("name", product.name);
      formData.append("description", product.description);

      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i]);
      }

      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      // Handle error
      throw Error("Failed to add product");
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }) => {
    try {
      const formData = new FormData();
      formData.append("sku", product.sku);
      formData.append("quantity", product.quantity);
      formData.append("name", product.name);
      formData.append("description", product.description);

      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i]);
      }

      const response = await api.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      // Handle error
      throw Error("Failed to update product");
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (error) {
      // Handle error
      throw Error("Failed to delete product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id, quantity, name, images, description } = action.payload;
        const product = state.find((product) => product.id === id);
        if (product) {
          product.quantity = quantity;
          product.name = name;
          product.images = images;
          product.description = description;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        return state.filter((product) => product.id !== id);
      });
  },
});

export default productSlice.reducer;
