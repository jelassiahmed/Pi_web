import React, { useEffect } from 'react'
import ProductOverviews2 from 'components/AANew/Products/ProductOverviews/ProductOverviews_2';
import Navbar from 'components/AANew/NavBar/NavBar'
import list from '../../components/AANew/Products/ProductGrids/data';
import { useParams } from 'react-router';

export default function ProductDetails({ addToCart }) {
    const { id } = useParams();
    const product = list.find(item => item.id.toPrecision() === id);

    useEffect(() => {},[id]);
    return (
        <>
            <ProductOverviews2 addToCart={addToCart} product={product} />
        </>
    )
}
