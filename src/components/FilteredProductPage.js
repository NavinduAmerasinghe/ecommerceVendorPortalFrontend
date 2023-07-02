import React, { useState } from "react";
import Header from "./Header/header";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FilteredProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = JSON.parse(localStorage.getItem("filteredProducts"));
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const navigate = useNavigate();

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
                    //styleName: primary-text/med;
                    fontSize: "19px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0em",
                    textAlign: "left",
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
        <Typography
          style={{
            fontFamily: "Satoshi",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "32px",
            letterSpacing: "0.08em",
            textAlign: "left",
            color: "#162427",
          }}
        >
          {filteredProducts.length} results found for
        </Typography>
        <Typography
          style={{
            fontFamily: "Satoshi",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "32px",
            letterSpacing: "0.08em",
            textAlign: "left",
            color: "#162427",
          }}
        >
          {searchTerm}
        </Typography>
        <div id="table" className="bg-white rounded">
          <div className="table-responsive">
            <div className="table activitites">
              <div>
                {filteredProducts.map((product) => (
                  <div key={product.sku}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        marginTop: "20px",
                        fontWeight: 500,
                        lineHeight: "19px",
                        letterSpacing: "0em",
                        textAlign: "left",
                        color: "#001EB9",
                      }}
                    >
                      {product.sku}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "19px",
                          fontWeight: 700,
                          lineHeight: "26px",
                          letterSpacing: "0em",
                          textAlign: "left",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <span
                        style={{ fontSize: "24px", marginLeft: "auto" }}
                        onClick={() => navigate(`/product/${product.sku}`)}
                      >
                        <img src="/assets/arrow.svg" alt="SVG arrow Image" />
                      </span>
                    </div>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "19px",
                        letterSpacing: "0em",
                        textAlign: "left",
                      }}
                    >
                      {product.description}
                    </Typography>
                    <hr style={{ borderTop: "1px solid #000000" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredProductsPage;
