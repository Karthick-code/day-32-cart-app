// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setItems } from './slices/cartSlice';
import CartPage from './pages/CartPage';
import data from './data/products.json'; // Import your JSON data here

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setItems(data[0])); // Set the products in Redux store
  }, [dispatch]);

  return (
    <div className="App">
      <CartPage />
    </div>
  );
};

export default App;
