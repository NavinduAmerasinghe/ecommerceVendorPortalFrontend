import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header/header";

const ProductDetailPage = () => {
  const { sku } = useParams();
  console.log(sku);

  // Render the product details
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
              PRODUCT Details PAGE
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
                  style={{
                    fontSize: "19px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    color: "red",
                  }}
                />
                <div className="btn">
                  <p style={{ paddingTop: "35px", display: "flex" }}>
                    <ion-icon name="search-outline"></ion-icon>
                    <p style={{ paddingLeft: "10px" }}>Search</p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button type="button" className="addbutton">
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
            <img src="/assets/star.svg" alt="SVG star Image" />
          </button>
        </div>

        <h2>SKU: {sku}</h2>
        {/* Display other product details */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
