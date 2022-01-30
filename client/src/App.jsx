import Product from "./Pages/Product";
import "./index.css"
import Home from "./Pages/Home"
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navigate} from "react-router-dom"
import { useSelector } from "react-redux";
import Profile from "./Pages/Profile.jsx";
import Order from "./Pages/Order"


const App = () => {

const user = useSelector(state=>state.user.currentUser);

  return <BrowserRouter>
  <Routes>
    <Route  index element={<Home/>}/>
    <Route path="login"  element={!user ? <Login/> : <Navigate to="/" replace />}/>
    <Route path="register"  element={!user ? <Register/> : <Navigate to="/" replace />}/> 
    <Route path="cart"  element={<Cart/>}/>
    <Route  path="product/:id" element={<Product/>}/>
    <Route  path="products/:category" element={<ProductList/>}/>
    <Route  path="products" element={<ProductList/>}/>
    <Route  path="profile" element={<Profile/>}/>
    <Route  path="order" element={<Order/>}/>


  </Routes>
  </BrowserRouter>;
};

export default App;