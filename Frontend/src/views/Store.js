import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import defaultImageCover from '../assets/img/defaultImageCover.png'




export default function Store() {
	const { id } = useParams();
	const navigate = useHistory();
	const [StoreInfo, setStoreInfo] = useState([]);
	const { user, isAdmin } = useSelector((state) => state.auth);

	//store
	const [imageCover, setImageCover] = useState();
	const [imageProfile, setImageProfile] = useState();
	const [storeName, setstoreName] = useState("");
	const [storeDescription, setstoreDescription] = useState("");
	const [storeAddress, setstoreAddress] = useState("");
	const [storePhone, setstorePhone] = useState("");
	const [storeEmail, setstoreEmail] = useState("");
	const [storeWebsite, setstoreWebsite] = useState("");
	const [storeFacebook, setstoreFacebook] = useState("");
	const [storeTwitter, setstoreTwitter] = useState("");
	const [storeInstagram, setstoreInstagram] = useState("");
	const [creationDate, setCreationDate] = useState("");

	const changeAvatar = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "qysdlxzm");

		axios
			.post("https://api.cloudinary.com/v1_1/du8mkgw6r/image/upload", formData)
			.then((response) => {
				console.log(response);
				const result = response.data;
				setImageProfile(result.secure_url);
			});
	};

	useEffect(() => {
		axios.get(`/store/api/${id}`).then((res) => {
			if (res.data == null) {
				console.log("No store found");
				return;
			}
			res.data.createdAt = res.data.createdAt.slice(0, 10);
			setStoreInfo(res.data);
			if (res.data.profileImage) {
				setImageProfile(res.data.profileImage);
				setImageCover(res.data.coverImage);
				setstoreName(res.data.fullName);
				setstoreDescription(res.data.description);
				setstoreAddress(res.data.address);
				setstorePhone(res.data.phone);
				setstoreEmail(res.data.email);
				setCreationDate(res.data.createdAt);
				setstoreWebsite(res.data.contact.website);
				setstoreFacebook(res.data.contact.facebook);
				setstoreInstagram(res.data.contact.instagram);
				setstoreTwitter(res.data.contact.twitter);
			}
		});
		// get all products here
	}, [id]);

	const startChat = () => {
		const owner = StoreInfo.owner;
		const idUser = user._id;
		axios
			.post("http://localhost:5000/chat", { owner, idUser })
			.then((res) => {
				console.log(res);
				navigate.push(`/chats/${res.data.newChat._id}`);
			})
			.catch((err) => {
				console.log(err);
				navigate.push(`/chats/${err.response.data.id}`);
			});
	};

	const updateStore = () => {
		const data = {
			profileImage: imageProfile,
			coverImage: imageCover,
			fullName: storeName,
			description: storeDescription,
			address: storeAddress,
			phone: storePhone,
			email: storeEmail,
			contact: {
				website: storeWebsite,
				facebook: storeFacebook,
				instagram: storeInstagram,
				twitter: storeTwitter,
			},
		};
		axios.patch(`/store/api/${id}`, data).then((res) => {
			console.log(res);
			navigate.push("/user-stores");
		});
	}

	const deleteStore = () => {
		axios.delete(`/store/api/${id}`).then((res) => {
			console.log(res);
			navigate.push("/user-stores");
		});
	}

	return (
		<>
			<div className="bg-white dark:bg-gray-800">
				<div className="mx-auto bg-white dark:bg-gray-800 rounded">
					<div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
						<div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center justify-center">
							<p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Store Informations</p>
							<div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
									<path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
								</svg>
							</div>
						</div>
						<div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center justify-center">
						Created at : {creationDate}
						</div>
						<div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center justify-center mt-4">
								<button onClick={deleteStore} className="bg-red-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" type="submit">
									Delete Store
								</button>
							</div>
					</div>
					<div className="flex justify-center mx-auto">
						<div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
							<div className="rounded relative mt-8 h-48">
								<img src={imageCover ? imageCover : defaultImageCover} alt className="w-full h-full object-cover rounded absolute shadow" />
								<div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
								<div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
									<div className="flex justify-center items-center">
										<p className="text-xs text-gray-100">Change Cover Photo</p>
										<input type="file" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
									</div>
									<div className="ml-2 text-gray-100">
										<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" />
											<path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
											<path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
											<line x1={16} y1={5} x2={19} y2={8} />
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* edit part */}
				<div className="flex flex-row justify-around">
					<div className="flex flex-col">
						<div className="mt-8 md:flex items-center">
							<div className="flex flex-col">
								<label className="mb-3 text-sm leading-none text-gray-800">Store name</label>
								<input defaultValue={storeName} onChange={(e) => setstoreName(e.target.value)} type="text" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
							</div>
							<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
								<label className="mb-3 text-sm leading-none text-gray-800">Category</label>
								<select className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200">
									<option selected>Select Store Category</option>
									<option>Food</option>
									<option>Drink</option>
									<option>Snack</option>
									<option>Others</option>
								</select>

							</div>
						</div>
						<div className="mt-12 md:flex items-center">
							<div className="flex flex-col">
								<label className="mb-3 text-sm leading-none text-gray-800">Store Email</label>
								<input defaultValue={storeEmail} type="email" onChange={(e) => setstoreEmail(e.target.value)} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
							</div>
							<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
								<label className="mb-3 text-sm leading-none text-gray-800">Phone number</label>
								<input defaultValue={storePhone} onChange={(e) => setstorePhone(e.target.value)} type="number" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
							</div>
						</div>
						<div className="mt-12 md:flex items-center">
							<div className="flex flex-col">
								<label className="mb-3 text-sm leading-none text-gray-800">Store description</label>
								<textarea defaultValue={storeDescription} onChange={(e) => setstoreDescription(e.target.value)} className="w-64 h-40 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
							</div>
							<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
								<input defaultValue={storeFacebook} type="text" onChange={(e) => setstoreFacebook(e.target.value)} placeholder="Facebook" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								<input defaultValue={storeInstagram} type="text" onChange={(e) => setstoreInstagram(e.target.value)} placeholder="Instagram" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								<input defaultValue={storeTwitter} type="text" onChange={(e) => setstoreTwitter(e.target.value)} placeholder="Twitter" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								<input defaultValue={storeWebsite} type="text" onChange={(e) => setstoreWebsite(e.target.value)} placeholder="Website" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
							</div>
						</div>
					</div>

					<div className="flex flex-col">
						<div className="mt-12 md:flex items-center">
							<div className="flex flex-col">
								<label className="mb-3 text-sm leading-none text-gray-800">Store Address</label>
								<input defaultValue={storeAddress} onChange={(e) => setstoreAddress(e.target.value)} type="text" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
							</div>
							<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
								<label className="mb-3 text-sm leading-none text-gray-800">Postal Code</label>
								<input defaultValue="8050" type="number" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
							</div>
						</div>
						<div className="mt-8 md:flex items-center">
							<div className="flex flex-col">
								<div className="avatar">
									<div className="w-24 rounded">
										<img src={imageProfile} />
									</div>
								</div>
							</div>
							<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
								<div className="flex flex-col">
									<label className="mb-3 text-sm leading-none text-gray-800">Profile Image</label>
									<input onChange={changeAvatar} name="file" type="file" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								</div>
							</div>
						</div>
						<div>
							
						</div>
						<div className="mt-40 md:flex items-center justify-center">
							<Link to='/user-stores'>
								<button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">Cancel</button>
							</Link>
							<div className="flex flex-row">
								<button onClick={updateStore} className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" type="submit">
									Save
								</button>
							</div>
						</div>
					</div>
				</div>




			</div>
		</>
	);
}
