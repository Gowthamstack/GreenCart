import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast";
import Footer from "./Component/Footer";
import Login from "./Component/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./Component/Seller/SellerLogin";
import { useAppContext } from "./Context/AppContext"
import SellerLayout from "./pages/seller/SellerLayout"
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from "./Component/Loading";


const App = () => {
  const isSellerPath=useLocation().pathname.includes("seller");
  const {showUserLogin,isSeller}=useAppContext();
  
  console.log(isSeller);
  

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
       {isSellerPath? null: <Navbar/>}
       {showUserLogin?<Login/>:null}
        <Toaster/>
    
      <div className={`relative z-0 ${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/products" element={<AllProducts/>}></Route>
            <Route path="/products/:category" element={<ProductCategory/>}></Route>
            <Route path="/products/:category/:id" element={<ProductDetails/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/add-address" element={<AddAddress/>}></Route>
            <Route path="/my-orders" element={<MyOrders/>}></Route>
            <Route path="/loader" element={<Loading/>}/>
            <Route path="/seller" element={isSeller?<SellerLayout/>:<SellerLogin/>}>
              <Route index element={isSeller?<AddProduct/>:null}/>
              <Route path="product-list" element={isSeller?<ProductList/>:null}/>
              <Route path="orders" element={isSeller?<Orders/>:null}/>
            </Route>
          </Routes>
        </div>
        {!isSellerPath && <Footer/>}
    </div>
  );
};

export default App;
