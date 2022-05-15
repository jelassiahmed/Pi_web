import React, { useContext, useState, useEffect } from 'react';


const ProductContext = React.createContext()

export function useProduct (){
    return useContext(ProductContext)
}


export function ProductProvider ({ children })  {

    const [cart, setCart] = useState([]);
    const [qty, setQty] = useState(1);

    const addToCart = (item) => {
        if (cart.indexOf(item) !== -1) return;
        item.amount = 1;
        setCart([...cart, item]);
    }

    const handleChange = (item, d) => {
        const ind = cart.indexOf(item);
        const arr = cart;
        arr[ind].amount += d;
        if (arr[ind].amount === 0) arr[ind].amount = 1;
        setCart([...arr]);

            return (
                <ProductContext.Provider
                    value={addToCart}
                >
                    {children}
                </ProductContext.Provider>
            );

    };
}
