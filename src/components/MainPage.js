import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/productSlice";
import Header from "./Header/header";
import "./MainPage.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MainPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
    window.location.reload();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(deleteProductId));
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToFavorites = (productId) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      navigate("/favorites");
    }
  };

  const navigateToFilteredProducts = () => {
    if (filteredProducts.length > 0) {
      localStorage.setItem(
        "filteredProducts",
        JSON.stringify(filteredProducts)
      );
      navigate("/filtered-products");
    }
  };

  const isProductFavorited = (productId) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(productId);
  };
  const handleButtonClick = () => {
    window.location.href = "/add-product";
  };
  const handleFavClick = () => {
    window.location.href = "/favorites";
  };
  return (
    <div>
      <Header />
      <div className="wrap">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column">
            <div
              className="h3"
              style={{
                width: "349px",
                height: "56px",
                padding: "15px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              PRODUCTS
            </div>
          </div>
        </div>
        <div class="row">
          <div className="container">
            <div className="search_wrap search_wrap_6">
              <div className="search_box">
                <input
                  type="text"
                  className="input"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{
                    fontSize: "19px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    color: "red",
                  }}
                />
                <div className="btn" onClick={navigateToFilteredProducts}>
                  <p style={{ paddingTop: "35px", display: "flex" }}>
                    <ion-icon name="search-outline"></ion-icon>
                    <p style={{ paddingLeft: "10px" }}>Search</p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="addbutton"
            onClick={handleButtonClick}
          >
            New Product
          </button>

          <button
            style={{
              width: "72px",
              height: "54px",
              top: "5px",
              left: "1200px",
              padding: "15px 5px",
              borderRadius: "10px",
              border: "1px",
              gap: "10px",
              backgroundColor: "#001eb9",
            }}
          >
            <img
              src="/assets/star.svg"
              alt="SVG star Image"
              onClick={handleFavClick}
            />
          </button>
        </div>
        <div id="table" className="bg-white rounded">
          <div className="table-responsive">
            <table className="table activitites">
              <thead>
                <tr>
                  <th scope="col" className="textHeader">
                    SKU
                  </th>
                  <th scope="col" className="textHeader">
                    IMAGE
                  </th>
                  <th scope="col" className="textHeader">
                    PRODUCT NAME
                  </th>
                  <th scope="col" className="textHeader">
                    QUANTITY
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td style={{ paddingTop: "40px" }}>{product.sku}</td>

                    <td style={{ paddingTop: "40px" }}>
                      {product.images.length > 0 && (
                        <img
                          src={`http://localhost:5000${product.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt="Product Image"
                        />
                      )}
                    </td>

                    <td style={{ paddingTop: "40px" }}>
                      <div className="h6">{product.name}</div>
                    </td>
                    <td style={{ paddingTop: "40px" }}>{product.quantity}</td>
                    <td style={{ paddingTop: "40px" }}>
                      <img
                        src="/assets/delete-icon.svg"
                        alt="SVG delete Image"
                        onClick={() => handleDelete(product._id)}
                      />
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      <Link to={`/edit-product/${product._id}`}>
                        <img src="/assets/edit-icon.svg" alt="SVG edit Image" />
                      </Link>
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      <img
                        src={
                          isProductFavorited(product._id)
                            ? "/assets/starred.svg"
                            : "/assets/star.svg"
                        }
                        alt="SVG star Image"
                        onClick={() => addToFavorites(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton style={{ borderBottom: "none" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            style={{ width: "50px" }}
            src="/assets/alert.svg"
            alt="SVG alert Image"
          />
          <Modal.Title>ARE YOU SURE ?</Modal.Title>
        </div>

        <Modal.Body style={{ borderBottom: "none" }}>
          You will not be able to undo this action if you proceed!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ color: "black", borderColor: "#001EB9" }}
            onClick={handleCancelDelete}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#001EB9" }}
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainPage;
