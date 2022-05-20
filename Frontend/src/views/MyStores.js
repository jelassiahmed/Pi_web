import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import * as api from '../api/Api';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StoreCard from "components/AANew/Store/StoreCard";

export default function Store() {
	const { user, isAdmin } = useSelector((state) => state.auth);
	let { id } = useParams(user._id);
	const [StoreInfo, setStoreInfo] = useState([]);
	const [name, setName] = useState("");

	const getStoresByUser = () => {
		api.getStoreByUser(user._id)
			.then(response => {
				const result = response.data;
				const { stores, userName } = result;
				setStoreInfo(stores);
				setName(userName);
				console.log(StoreInfo);

			}).catch(err => { console.log(err) })
	}

	useEffect(() => {
		getStoresByUser();
	}, [id, user]);

	return (
		<>
			<div className="flex flex-col items-center justify-center mt-10">
				<h1 className="lg:text-5xl md:text-4xl text-2xl font-bold leading-10 text-gray-800">{name} Store</h1>
				<p className="text-base leading-normal text-center text-gray-600 mt-4 xl:w-1/2 w-10/12">We just got featured in the following magazines and it has been the most incredible journey. We work with the best fashion magazines across the world</p>
			</div>
			<div className="flex flex-col mt-10">
				{StoreInfo.map((el) => {
					return (
						<StoreCard item={el} name={name} />
					);
				})}
				{StoreInfo.length < 2 ? (
					<div className="flex justify-center mt-10">
						<Link to="/create-store">
							<button className="flex flex-row ml-2 sm:ml-3 font-normal focus:outline-none bg-indigo-700 dark:hover:bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 dark:bg-indigo-600 rounded text-white px-6 py-2 text-sm">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
								</svg>
								&nbsp;&nbsp; Add New Store</button>
						</Link>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
}
