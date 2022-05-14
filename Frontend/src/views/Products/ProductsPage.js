import React, { useState } from "react";
import Navbar from 'components/AANew/NavBar/NavBar'

import Grid1 from 'components/AANew/Products/ProductGrids/ProductGrids_1';

export default function ProductsPage({addToCart}) {

  return (
    <>
      {/* <Navbar cart={cart} setCart={setCart} handleChange={handleChange} size={cart.length} /> */}
      <Grid1 addToCart={addToCart} />
    </>
  )
}
