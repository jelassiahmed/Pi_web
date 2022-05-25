


const cartReducer = (cart = [], action) => {

    if (action.type === "ADD_TO_CART") {
        let temp = cart.filter((item) => item.id === action.payload.id);
        if (temp < 1) {
            localStorage.setItem('cartItems', JSON.stringify(temp));
            return [...cart, action.payload] 
        }
        else { 
            localStorage.setItem('cartItems', JSON.stringify(cart));
            return cart
         }
    }

    if (action.type === "REMOVE_FROM_CART") {
        let temp = cart.filter((item) => item.id !== action.payload.id);
        localStorage.setItem('cartItems', JSON.stringify(temp));
        return temp;
    }

    if (action.type === "INCREASE_QTY") {
        let tempcart = cart.map((item) => {
            if (item.id === action.payload.id) {
                return { ...item, amount: item.amount + 1 };
            }
            return item;
        });
        return tempcart;
    }

    if (action.type === "DECREASE_QTY") {
        let tempcart = cart.map((item) => {
            if (item.id === action.payload.id) {
                return { ...item, amount: item.amount - 1 };
            }
            return item;
        });
        return tempcart;
    }
    return cart;
}
export default cartReducer;