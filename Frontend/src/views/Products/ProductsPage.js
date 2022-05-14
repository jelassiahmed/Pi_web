import React, { useState } from "react";
import Navbar from 'components/AANew/NavBar/NavBar'

import Grid1 from 'components/AANew/Products/ProductGrids/ProductGrids_1';

export default function ProductsPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
      if (cart.indexOf(item) !== -1) return;
      setCart([...cart, item]);
  }

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].amount += d;

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
  };

  return (
    <>
      <Navbar cart={cart} setCart={setCart} handleChange={handleChange} size={cart.length} />
      <Grid1 addToCart={addToCart} />
    </>
  )
}
