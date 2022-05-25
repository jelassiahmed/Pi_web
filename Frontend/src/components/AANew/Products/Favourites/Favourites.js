import React from "react";

export default function Favourites() {
    return (
        <div className=" py-12">
            {/* Desktop Responsive Start */}
            <div className="hidden sm:flex flex-col justify-start items-start">
                <div className="pl-4 lg:px-10 2xl:px-20 flex flex-row justify-center items-end space-x-4">
                    <h1 className="text-4xl font-semibold leading-9 text-gray-800">Favourites</h1>
                    <p className="text-base leading-4 text-gray-600 pb-1">(12 Items)</p>
                </div>
                <table className="w-full mt-16 whitespace-nowrap">
                    <thead aria-label="table heading" className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200 border-b ">
                        <tr>
                            <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">YOUR PRODUCT</th>
                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">DESCRIPTION</th>
                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">PRICE</th>
                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">MORE OPTIONS</th>
                            <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10" />
                        </tr>
                    </thead>
                    <tbody className="w-full text-left">
                        <tr className="border-gray-200 border-b  ">
                            <th>
                                <img className="my-10 pl-4 lg:pl-10 2xl:pl-20" src="https://i.ibb.co/44vJTd4/imani-bahati-Lx-Vx-PA1-LOVM-unsplash-3.png" alt="shoe" />
                            </th>
                            <th className="mt-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <p className=" text-base leading-4 text-gray-800">Jet black sportsmen shoes</p>
                            </th>
                            <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                                <p className>$90</p>
                            </th>
                            <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none  text-gray-800 focus:outline-none focus:underline">
                                    View details
                                </a>
                            </th>
                            <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800">
                                    <p>Remove Item</p>
                                </button>
                            </th>
                        </tr>
                        <tr className="border-gray-200 border-b">
                            <th>
                                <img className="my-10 pl-4 lg:pl-10 2xl:pl-20" src="https://i.ibb.co/D40htNc/daniel-storek-JM-q-KEd1-GMI-unsplash-1.png" alt="shoes" />
                            </th>
                            <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <p className="text-base leading-4 text-gray-800">Jet black sportsmen shoes</p>
                            </th>
                            <th className="mt-10  pl-6 lg:pl-20 2xl:pl-52">
                                <p className>$90</p>
                            </th>
                            <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none  text-gray-800 focus:outline-none focus:underline">
                                    View details
                                </a>
                            </th>
                            <th className="mt-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800">
                                    <p>Remove Item</p>
                                </button>
                            </th>
                        </tr>
                        <tr className="border-gray-200 border-b">
                            <th>
                                <img className="my-10 pl-4 lg:pl-10 2xl:pl-20" src="https://i.ibb.co/WsPGLM9/charles-deluvio-1-nx1-QR5d-TE-unsplash-1.png" alt="glasses" />
                            </th>
                            <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <p className="text-base leading-4 text-gray-800">Jet black sportsmen shoes</p>
                            </th>
                            <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                                <p className>$90</p>
                            </th>
                            <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none  text-gray-800 focus:outline-none focus:underline">
                                    View details
                                </a>
                            </th>
                            <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800">
                                    <p>Remove Item</p>
                                </button>
                            </th>
                        </tr>
                        <tr className="border-gray-200 border-b">
                            <th>
                                <img className="my-10 pl-4 lg:pl-10 2xl:pl-20" src="https://i.ibb.co/k9YJ0q2/rocknwool-8-Lsy75-Lq-GVc-unsplash-1.png" alt="girl" />
                            </th>
                            <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <p className="text-base leading-4 text-gray-800">Jet black sportsmen shoes</p>
                            </th>
                            <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                                <p className>$90</p>
                            </th>
                            <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none  text-gray-800 focus:outline-none focus:underline">
                                    View detail
                                </a>
                            </th>
                            <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800">
                                    <p>Remove Item</p>
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Desktop Responsive End */}
            {/* Mobile Responsive Start */}
            <div className=" flex justify-center items-center">
                <div className="sm:hidden flex flex-col justify-start items-start ">
                    <div className="px-4 lg:px-10 2xl:px-20 flex flex-row justify-start items-end space-x-4">
                        <p className="text-4xl font-semibold leading-9 text-gray-800">Favourites</p>
                        <p className="text-base leading-4 text-gray-600 pb-1">(12 Items)</p>
                    </div>
                    <div className="border-gray-200 border-b pb-10">
                        <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                            <div>
                                <img src="https://i.ibb.co/bHgJDpd/imani-bahati-Lx-Vx-PA1-LOVM-unsplash-2.png" alt="shoe" />
                            </div>
                        </div>
                        <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                            <div>
                                <p className="w-36 text-base leading-6 text-gray-800">Jet black sportsmen shoes</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold leading-4 text-gray-800">$90</p>
                            </div>
                        </div>
                        <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                            <div>
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none focus:outline-none focus:underline  text-gray-800">
                                    {" "}
                                    View details
                                </a>
                            </div>
                            <div>
                                <button className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800">
                                    <p>Remove Item</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-gray-200 border-b pb-10">
                        <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                            <div>
                                <img src="https://i.ibb.co/6y62DnT/daniel-storek-JM-q-KEd1-GMI-unsplash-1-1.png" alt="shoes" />
                            </div>
                        </div>
                        <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                            <div>
                                <p className="w-36 text-base leading-6 text-gray-800">Jet black sportsmen shoes</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold leading-4 text-gray-800">$90</p>
                            </div>
                        </div>
                        <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                            <div>
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none focus:outline-none focus:underline  text-gray-800">
                                    {" "}
                                    View details
                                </a>
                            </div>
                            <div>
                                <button className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800">
                                    <p>Remove Item</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-gray-200 border-b pb-10">
                        <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                            <div>
                                <img src="https://i.ibb.co/LR5LyDw/charles-deluvio-1-nx1-QR5d-TE-unsplash-1-1.png" alt="glasses" />
                            </div>
                        </div>
                        <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                            <div>
                                <p className="w-36 text-base leading-6 text-gray-800">Jet black sportsmen shoes</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold leading-4 text-gray-800">$90</p>
                            </div>
                        </div>
                        <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                            <div>
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none focus:outline-none focus:underline  text-gray-800">
                                    {" "}
                                    View details
                                </a>
                            </div>
                            <div>
                                <button className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800">
                                    <p>Remove Item</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-gray-200 border-b pb-10">
                        <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                            <div>
                                <img src="https://i.ibb.co/XzvpLZz/rocknwool-8-Lsy75-Lq-GVc-unsplash-1-4.png" alt="girl" />
                            </div>
                        </div>
                        <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                            <div>
                                <p className="w-36 text-base leading-6 text-gray-800">Jet black sportsmen shoes</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold leading-4 text-gray-800">$90</p>
                            </div>
                        </div>
                        <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                            <div>
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none focus:outline-none focus:underline  text-gray-800">
                                    {" "}
                                    View details
                                </a>
                            </div>
                            <div>
                                <button className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800">
                                    <p>Remove Item</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Responsive End */}
        </div>
    );
}
