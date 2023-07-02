// App.js

import React from "react";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import store from "./store/store";
import MainPage from "./components/MainPage";
import ProductDetailPage from "./components/ProductDetailPage";
import AddProductPage from "./components/AddProductPage";
import EditProductPage from "./components/EditProductPage";
import FavoriteProductsPage from "./components/FavoriteProductsPage";
import FilteredProductPage from "./components/FilteredProductPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/product/:sku" element={<ProductDetailPage />} />
          <Route exact path="/add-product" element={<AddProductPage />} />
          <Route exact path="/edit-product/:id" element={<EditProductPage />} />
          <Route exact path="/favorites" element={<FavoriteProductsPage />} />
          <Route
            exact
            path="/filtered-products"
            element={<FilteredProductPage />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
