// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (params) => { 
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
      console.log('Fetched products:', response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Banner />
      <Categories />
      <BestSelling />
      <Products allProducts={products} />
      <Footer/>
    </div>
  );
};

export default Home;
