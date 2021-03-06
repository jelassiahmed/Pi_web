import { useEffect, useState } from 'react'
//redux
import { useSelector, useDispatch } from "react-redux";
export default function ProductCheckout() {
    const [price, setPrice] = useState(0);
    //redux
//   const cart = useSelector((state) => state.cartReducer);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };


  useEffect(() => {
      setCart(JSON.parse(localStorage.getItem("cartItems")));
      console.log(cart);
  },[])
  
  useEffect(() => {
    handlePrice();
  })
  const ProductDisplay = () => (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
        </div>
      </div>
      <form action="/create-checkout-session" method="POST">
        <button type="submit">
          Checkout
        </button>
      </form>
    </section>
  );
  
return (
        <>
             <section>
                <h1 className="sr-only">Checkout</h1>
                <div className="relative mx-auto max-w-screen-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="py-12 bg-gray-50 md:py-24">
                            <div className="max-w-lg px-4 mx-auto lg:px-8">
                                <div className="flex items-center">
                                    <span className="w-10 h-10 bg-blue-900 rounded-full"></span>

                                    <h2 className="ml-4 font-medium">User Name</h2>
                                </div>

                                <div className="mt-8">
                                    <p className="text-2xl font-medium tracking-tight">${price}</p>
                                    <p className="mt-1 text-sm text-gray-500">For the purchase of</p>
                                </div>

                                <div className="mt-12">
                                    <div className="flow-root">
                                        <ul className="-my-4 divide-y divide-gray-200">
                                            {cart.map((product) => (
                                                <li key={product.id} className="flex items-center justify-between py-4">
                                                    <div className="flex items-start">
                                                        <img
                                                            className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                                                            alt={product.img}
                                                            src={product.img}
                                                        />

                                                        <div className="ml-4">
                                                            <p className="text-sm">{product.title}</p>

                                                            <dl className="mt-1 space-y-1 text-xs text-gray-500">
                                                                <div>
                                                            <dt className="inline">Color:</dt>
                                                            <dd className="inline">Blue</dd>
                                                        </div>

                                                        <div>
                                                            <dt className="inline">Size:</dt>
                                                            <dd className="inline">UK 10</dd>
                                                        </div> 
                                                                <div>
                                                                    <button onClick={() => dispatch({ type: "INCREASE_QTY", payload: product })}>+</button>
                                                                    <button class="w-12 py-3 text-xs text-center border-gray-200 rounded no-spinners">{product.amount}</button>
                                                                    <button
                                                                    onClick={() => 
                                                                        {
                                                                          if (product.amount > 1) {
                                                                            dispatch({ type: "DECREASE_QTY", payload: product })
                                                                          } else {
                                                                            dispatch({ type: "REMOVE_FROM_CART", payload: product })
                                                                          }
                                                                        }
                                                                      }>-</button>
                                                                </div>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                    <p class="text-sm text-accent-focus">
                                                            ${product.price}
                                                            <small class="text-gray-500"></small>
                                                        </p>
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product })}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-12 bg-white md:py-24">
                            <div className="max-w-lg px-4 mx-auto lg:px-8">
                                <form className="grid grid-cols-6 gap-4">
                                    <div className="col-span-3">
                                        <label className="block mb-1 text-sm text-gray-600" for="first_name">
                                            First Name
                                        </label>

                                        <input
                                            className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                                            type="text"
                                            id="frst_name"
                                        />
                                    </div>

                                    <div className="col-span-3">
                                        <label className="block mb-1 text-sm text-gray-600" for="last_name">
                                            Last Name
                                        </label>

                                        <input
                                            className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                                            type="text"
                                            id="last_name"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label className="block mb-1 text-sm text-gray-600" for="email">
                                            Email
                                        </label>

                                        <input
                                            className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                                            type="email"
                                            id="email"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label className="block mb-1 text-sm text-gray-600" for="phone">
                                            Phone
                                        </label>

                                        <input
                                            className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                                            type="tel"
                                            id="phone"
                                        />
                                    </div>

                                    <fieldset className="col-span-6">
                                        <legend className="block mb-1 text-sm text-gray-600">
                                            Card Details
                                        </legend>

                                        <div className="-space-y-px bg-white rounded-lg shadow-sm">
                                            <div>
                                                <label className="sr-only" for="card-number">Card Number</label>

                                                <input
                                                    className="border-gray-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                                                    type="text"
                                                    name="card-number"
                                                    id="card-number"
                                                    placeholder="Card number"
                                                />
                                            </div>

                                            <div className="flex -space-x-px">
                                                <div className="flex-1">
                                                    <label className="sr-only" for="card-expiration-date">
                                                        Expiration Date
                                                    </label>

                                                    <input
                                                        className="border-gray-200 relative rounded-bl-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                                                        type="text"
                                                        name="card-expiration-date"
                                                        id="card-expiration-date"
                                                        placeholder="MM / YY"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <label className="sr-only" for="card-cvc">CVC</label>

                                                    <input
                                                        className="border-gray-200 relative rounded-br-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                                                        type="text"
                                                        name="card-cvc"
                                                        id="card-cvc"
                                                        placeholder="CVC"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset className="col-span-6">
                                        <legend className="block mb-1 text-sm text-gray-600">
                                            Billing Address
                                        </legend>

                                        <div className="-space-y-px bg-white rounded-lg shadow-sm">
                                            <div>
                                                <label className="sr-only" for="country">Country</label>

                                                <select
                                                    className="border-gray-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5"
                                                    id="country"
                                                    name="country"
                                                    autocomplete="country-name"
                                                >
                                                    <option>England</option>
                                                    <option>Wales</option>
                                                    <option>Scotland</option>
                                                    <option>France</option>
                                                    <option>Belgium</option>
                                                    <option>Japan</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="sr-only" for="postal-code">
                                                    ZIP/Post Code
                                                </label>

                                                <input
                                                    className="border-gray-200 relative rounded-b-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                                                    type="text"
                                                    name="postal-code"
                                                    id="postal-code"
                                                    autocomplete="postal-code"
                                                    placeholder="ZIP/Post Code"
                                                />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="col-span-6">
                                        <button
                                            className="rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                                            type="submit"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
