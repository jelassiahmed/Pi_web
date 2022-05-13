import Navbar from 'components/AANew/NavBar/NavBar'
import React from 'react'
import ProductOverviews2 from 'components/AANew/Products/ProductOverviews/ProductOverviews_2';
import ProductOverviews1 from 'components/AANew/Products/ProductOverviews/ProductOverviews_1';
import Grid1 from 'components/AANew/Products/ProductGrids/ProductGrids_1';
import About from 'components/AANew/AboutUs/About';
export default function ProductsPage() {
  return (
    <>
      <Navbar/>
      <About/>
      <ProductOverviews2 />
      <ProductOverviews1 />
      <Grid1/>
    </>
  )
}
