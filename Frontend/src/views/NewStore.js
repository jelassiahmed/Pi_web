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
			<Footer />
		</>
	);
}
