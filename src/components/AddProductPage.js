import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";
import Header from "./Header/header";
import "./AddProductPage.css";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    sku: "",
    quantity: 0,
    name: "",
    images: [],
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    // Reset form fields
    setProduct({
      sku: "",
      quantity: 0,
      name: "",
      images: [],
      description: "",
    });
    alert("Product Added Successfully");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="section-title">
              <h1 className="products-heading">
                PRODUCTS <img src="/assets/arrow.svg" alt="SVG arrow Image" />
              </h1>
              <h2 className="add-product-heading">Add New Product</h2>
            </div>

            <div className="form-group">
              <label htmlFor="sku" className="form-label">
                SKU
              </label>
              <input
                type="text"
                className="form-control"
                id="sku"
                name="sku"
                value={product.sku}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Product Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={product.description}
                onChange={handleChange}
              ></textarea>
              <small className="form-text">
                A small description about the product
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="images" className="form-label">
                Product Images
              </label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                multiple
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <button className="addbutton" type="submit">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
