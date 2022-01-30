import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {

const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const location = useLocation()
const [loadingQuantity, setLoadingQuantity] = useState()
useEffect(() => {
  const getProducts = async() =>{
    
    try {
      const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` :
       "http://localhost:5000/api/products")
      console.log(res.data);
       setProducts(res.data)
       if(location.pathname !== "/products"){
        setLoadingQuantity(8)
      }
      else{
        setLoadingQuantity(res.data.length)
      }
    } catch (error) {
      
    }

  }
getProducts()

}, [cat])

useEffect(() => {

  cat &&
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
         {return item[key.toLowerCase()].includes(value.toLowerCase());
        }
        )
      )
    );
}, [products, cat, filters]);

useEffect(() =>{
if(sort === "newest"){
  setFilteredProducts(prev=>(
    [...prev].sort((a, b) => (a.createdAt - b.createdAt))
  ))
  console.log(filteredProducts);
}
else if(sort === "asc"){
  setFilteredProducts(prev=>(
    [...prev].sort((a, b) => (a.price - b.price))
  ))
  console.log(filteredProducts);

}else{
  setFilteredProducts(prev=>(
    [...prev].sort((a, b) => (b.price - a.price)) 
  ))
  console.log(filteredProducts);

}
},[
  sort
])

  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))  : products.slice(0,loadingQuantity).map((item) => (
        <Product item={item} key={item.id} />
      )) }
    </Container>
  );
};

export default Products;