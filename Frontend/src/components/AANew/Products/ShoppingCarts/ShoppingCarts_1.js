import  React,{ Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import {useHistory, Link } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import getStripe from 'api/getStripe';



export default function ShoppingCarts1() {

  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState(0);
  //redux
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

 

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };


  
  

//   const goToCheckout = () => {
    // localStorage.removeItem("cartItems");
//     window.location.href = "/ProductCheckout";
//     localStorage.setItem("cartItems", JSON.stringify(cart));
// }
  const handleCheckout = async() => {
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify(cart));
    console.log('cart==',cart);
    const stripe = await getStripe();
    const response = await fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    if(response.statusCode === 500) return;
    
    const body = await response.json();
    console.log('data==',body);

    window.location.href = body.url
  }

  useEffect(() => {
    handlePrice();
  })
  return (
    <>
      <div className="flex items-center justify-center py-8">
        <div className="ml-4 flow-root lg:ml-6">
          <a href="#" className="group -m-2 p-2 flex items-center">
            <ShoppingBagIcon
              className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
              onClick={() => setOpen(!open)}
            />
            <span className="ml-2 text-sm font-medium text-ring-pink-700 group-hover:text-gray-800">{cart.length}</span>
            <span className="sr-only">items in cart, view bag</span>
          </a>
        </div>
      </div>
      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900"> Shopping cart </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cart.map((product) => (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.img}
                                        alt={product.img}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href='#'> {product.name} </a>
                                          </h3>
                                          <p className="ml-4">{product.title}</p>
                                        </div>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        {/* <p className="text-gray-500">Qty {product.amount}</p> */}
                                        <div>
                                          <button
                                            onClick={() => dispatch({ type: "INCREASE_QTY", payload: product })}>+</button>
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
                                        <div className="flex flex-col">
                                          <p className="text-base font-black leading-none text-gray-800">${product.price}</p>
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product })}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${price}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                          <div className="mt-6">
                            {/* <button
                              onClick={() => {goToCheckout()}}
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </button>
                             */}
                             <button onClick={() => handleCheckout()} className=" bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-dark">Checkout</button>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or{' '}
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>)}
    </>
  )
}
