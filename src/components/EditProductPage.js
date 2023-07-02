import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, fetchProducts } from "../store/productSlice";
import { useParams } from "react-router-dom";
import Header from "./Header/header";
import "./AddProductPage.css";

const EditProductPage = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.find((p) => p.id === productId)
  );
  console.log(product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(productId);
    dispatch(fetchProducts(productId)); // Use fetchProduct instead of fetchProducts
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setSku(product.sku);
      setQuantity(product.quantity);
      setImages(product.images);
    }
  }, [product]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleImagesChange = (e) => {
    // Handle image changes and update the 'images' state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: productId,
      product: {
        sku,
        quantity,
        name,
        description,
        images,
      },
    };
    dispatch(updateProduct(updatedProduct));
  };

  return (
    <div>
      <Header />
      <div className="wrapper">
        {product ? (
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="section-title">
                <h1 className="products-heading">
                  PRODUCTS <img src="/assets/arrow.svg" alt="SVG arrow Image" />
                </h1>
                <h2 className="add-product-heading">Edit Product</h2>
              </div>

              <div className="form-group">
                <label htmlFor="sku" className="form-label">
                  SKU
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sku}
                  onChange={handleSkuChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={handleQuantityChange}
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
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="images" className="form-label">
                  Product Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleImagesChange}
                />
              </div>

              <div className="form-group">
                <button className="addbutton" type="submit">
                  Update Product
                </button>
              </div>
            </div>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
export default EditProductPage;
