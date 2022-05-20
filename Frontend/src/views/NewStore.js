import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function NewStore(props) {
	const { user, isAdmin } = useSelector((state) => state.auth);
	const navigate = useHistory();
	const [image, setImage] = useState("");
	const storeName = useRef();
	const storeDescription = useRef();
	const storeAddress = useRef();
	const storePhone = useRef();
	const storeEmail = useRef();
	const storeWebsite = useRef();
	const storeFacebook = useRef();
	const storeTwitter = useRef();
	const storeInstagram = useRef();

	const [etape1, setEtape1] = useState(true);
	const [etape2, setEtape2] = useState(false);
	const [etape3, setEtape3] = useState(false);
	const [etape4, setEtape4] = useState(false);

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
				setImage(result.secure_url);
			});
	};
	const submitInfo = async () => {
		const payload = {
			fullName: storeName.current.value,
			owner: user._id,
			description: storeDescription.current.value,
			profileImage: image,
			address: storeAddress.current.value,
			phone: storePhone.current.value,
			email: storeEmail.current.value,
			contact: {
				website: storeWebsite.current.value,
				facebook: storeFacebook.current.value,
				instagram: storeInstagram.current.value,
				twitter: storeTwitter.current.value,
			},
		};

		await axios.post(`/store/api/`, payload).then((res) => {
			console.log(res.data);
			navigate.push("/store/" + res.data._id);
		});
	};
	return (
		<>
			<Navbar transparent />
			<main className="profile-page">
				<section className="relative block h-500-px">
					<div className="w-50 justify-items-center"></div>
					<div
						className="absolute top-0 w-full h-full bg-center bg-cover"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
						}}
					>
						<span
							id="blackOverlay"
							className="w-full h-full absolute opacity-50 bg-black"
						></span>
					</div>
					<div
						className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
						style={{ transform: "translateZ(0)" }}
					>
						<svg
							className="absolute bottom-0 overflow-hidden"
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="none"
							version="1.1"
							viewBox="0 0 2560 100"
							x="0"
							y="0"
						>
							<polygon
								className="text-blueGray-200 fill-current"
								points="2560 0 2560 100 0 100"
							></polygon>
						</svg>
					</div>
				</section>

				<section className="relative py-16 bg-blueGray-200">
					<div className="container mx-auto px-4">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
							<div className="px-6">
								<div className="flex flex-wrap justify-center">
									<div className="w-36 h-36 relative m-4 rounded bg-white">
										<img
											alt="..."
											src={image}
											className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-12 lg:-ml-20 max-w-150-px min-w-140-px"
										/>
									</div>
								</div>

								<div className="container mx-auto px-4">
									<div
										style={
											({ display: "flex" },
												{ flexDirection: "column" },
												{ alignContent: "center" },
												{ justifyContent: "center" },
												{ margin: "10px 1px" })
										}
									>
										<div>
											<input
												type="text"
												placeholder="Store Name"
												required
												ref={storeName}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Store Description"
												required
												ref={storeDescription}
											/>
										</div>
										<div>
											<label htmlFor="file_up" className="cursor-pointer ml-1">
												Change Profile Picture
											</label>
											<input
												type="file"
												name="file"
												id="file_up"
												className="hidden"
												onChange={changeAvatar}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Store Address"
												ref={storeAddress}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Store Phone"
												ref={storePhone}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Store Email"
												ref={storeEmail}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Store Website"
												ref={storeWebsite}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Store Facebook"
												ref={storeFacebook}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Store Instagram"
												ref={storeInstagram}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Store Twitter"
												ref={storeTwitter}
											/>
										</div>
										<button style={{ margin: "10px 1px" }} onClick={submitInfo}>
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<div>
				<div className="w-full bg-white p-10">
					<div className="md:flex items-center border-b pb-6 border-gray-200">
						<div className="flex items-center md:mt-0 mt-4">
							<div className="w-8 h-8 bg-indigo-700 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-white">01</p>
							</div>
							<p className="text-base ml-3 font-medium leading-4 text-gray-800">Store Informations</p>
						</div>
						<div className="flex items-center md:mt-0 mt-4 md:ml-12">
							<div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-gray-800">02</p>
							</div>
							<p className="text-base ml-3 font-medium leading-4 text-gray-800">Security Check</p>
						</div>
						<div className="flex items-center md:mt-0 mt-4 md:ml-12">
							<div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-gray-800">03</p>
							</div>
							<p className="text-base ml-3 font-medium leading-4 text-gray-800">Confirm Info</p>
						</div>
						<div className="flex items-center md:mt-0 mt-4 md:ml-12">
							<div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-gray-800">04</p>
							</div>
							<p className="text-base ml-3 font-medium leading-4 text-gray-800">Waiting for reviewing</p>
						</div>
					</div>
					{etape1 && (
						<div className="flex flex-row justify-around">
						<div className="flex flex-col">
							<h1 tabIndex={0} role="heading" aria-label="profile information" className="focus:outline-none text-3xl font-bold text-gray-800 mt-12">
								Store info
							</h1>
							<p role="contentinfo" className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4">
								Fill in the data for profile. It will take a couple of minutes. <br />
								You only need a passport or identity card or driver license.
							</p>
							<div className="mt-8 md:flex items-center">
								<div className="flex flex-col">
									<label className="mb-3 text-sm leading-none text-gray-800">Store name</label>
									<input type="text" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								</div>
								<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
									<label className="mb-3 text-sm leading-none text-gray-800">Category</label>
									<select className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200">
										<option>Food</option>
										<option>Drink</option>
										<option>Snack</option>
										<option>Others</option>
									</select>

								</div>
							</div>
							<div className="mt-12 md:flex items-center">
								<div className="flex flex-col">
									<label className="mb-3 text-sm leading-none text-gray-800">Email Address</label>
									<input type="email"  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								</div>
								<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
									<label className="mb-3 text-sm leading-none text-gray-800">Phone number</label>
									<input type="number"  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								</div>
							</div>
							<div className="mt-12 md:flex items-center">
								<div className="flex flex-col">
									<label className="mb-3 text-sm leading-none text-gray-800">Store description</label>
									<textarea className="w-64 h-40 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								</div>
								<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
									<input type="text" placeholder="Facebook"  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
									<input type="text" placeholder="Instagram" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
									<input type="text" placeholder="Twitter" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
									<input type="text" placeholder="Website" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
								</div>
							</div>
						</div>

						<div className="flex flex-col">
							<div className="mt-8 md:flex items-center">
								<div className="flex flex-col">
								<div className="avatar">
										<div className="w-24 rounded">
											<img src="https://api.lorem.space/image/face?hash=92048" />
										</div>
									</div>
								</div>
								<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
								<div className="flex flex-col">
									<label className="mb-3 text-sm leading-none text-gray-800">ProfileImage</label>
									<input type="file" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"/>
								</div>
								</div>
							</div>

							<div className="mt-8 md:flex items-center">
								<div className="flex flex-col">
								<div className="avatar">
										<div className="w-100">
											<img src="https://api.lorem.space/image/car?w=400&h=225" />
										</div>
									</div>
								</div>
							</div>
							<div className="mt-8 md:flex items-center justify-center">
								<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
								<div className="flex flex-col">
									<label className="mb-3 text-sm leading-none text-gray-800">Cover Image</label>
									<input type="file" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"/>
								</div>
								</div>
							</div>
						</div>
					</div> 
					)}
					<div className="mt-8 flex justify-center">
						<div className="py-4 flex items-center">
							<div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
								<input type="checkbox" tabIndex={0} aria-label="I agree with the terms of service" defaultChecked className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
								<div className="check-icon hidden bg-blue-500 text-white rounded-sm">
									<svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M5 12l5 5l10 -10" />
									</svg>
								</div>
							</div>
							<p className="text-sm leading-none ml-2">
								I agree with the <span className="text-indigo-700">terms of service</span>
							</p>
						</div>
					</div>
					<div className="flex justify-center">
					<button role="button" aria-label="Next step" className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
						<span className="text-sm font-medium text-center text-gray-800 capitalize">Next Step</span>
						<svg className="mt-1 ml-3" width={12} height={8} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z" fill="#242731" />
						</svg>
					</button>
					</div>
				</div>
				<style dangerouslySetInnerHTML={{ __html: "\n          .checkbox:checked + .check-icon {\n              display: flex;\n          }\n      " }} />
			</div>
		</>
	);
}
