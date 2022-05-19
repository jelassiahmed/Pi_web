import React from 'react'

function StoreCard(props) {
    return (
        <>
            <div className="w-full flex items-center justify-center">
                <div className="xl:w-1/4 sm:w-1/2 w-full 2xl:w-1/5 flex flex-col items-center py-16 md:py-12 bg-gradient-to-r from-indigo-700 to-purple-500 rounded-lg">
                    <div className="w-full flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <img src={props.item.profileImage} alt="profile" />
                            <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-center text-white">{props.item.fullName}</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-7">
                        <div className>
                            <p className="text-xs text-gray-300">Products</p>
                            <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50">28</p>
                        </div>
                        <div className="ml-12">
                            <p className="text-xs text-gray-300">Revenue</p>
                            <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50">$2890</p>
                        </div>
                        <div className="ml-12">
                            <p className="text-xs text-gray-300">Average</p>
                            <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50">$169</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-7">
                        <button class="flex flex-row btn text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Store
                        </button>
                        <button class="flex flex-row btn text-white mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Store Management</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StoreCard;
