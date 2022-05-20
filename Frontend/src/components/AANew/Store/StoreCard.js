import React from 'react'
import { Link } from 'react-router-dom';

function StoreCard(props) {
    return (
        <>
            <div className="container mx-auto w-5/6 md:w-2/3 h-full">
                {/* Code block starts */}
                <div className="bg-white dark:bg-gray-800 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 sm:px-10 shadow rounded-t">
                    <div className="flex items-center mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0">
                        <div className="relative w-12 h-12 rounded">
                            <img className="w-full h-full object-cover inset-0 absolute rounded" src={props.item.profileImage} alt="avatar" />
                        </div>
                        <div className="ml-2">
                            <h2 className="text-gray-800 dark:text-gray-100 text-sm font-bold">{props.item.fullName}</h2>
                            <p className="font-normal text-xs text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-700">View Profile</p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <Link to={`/store/${props.item._id}`}>
                            <button className="flex flex-row font-normal bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-indigo-600 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                                Edit Store</button>
                        </Link>
                        <button className="flex flex-row ml-2 sm:ml-3 font-normal focus:outline-none bg-indigo-700 dark:hover:bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 dark:bg-indigo-600 rounded text-white px-6 py-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                            Store Management</button>
                    </div>
                </div>
                {/* Code block ends */}
            </div>
        </>
    );
}

export default StoreCard;
