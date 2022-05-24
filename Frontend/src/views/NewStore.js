import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import defaultImageCover from '../assets/img/defaultImageCover.png'
import defaultImageProfile from '../assets/img/defaultImageProfile.png'
import baazarlogo from '../assets/img/baazar_logo.jpg'

import IdentityVerif from './IdentityVerif'
import { Link } from "react-router-dom";

export default function NewStore(props) {
	const { user, isAdmin } = useSelector((state) => state.auth);
	const navigate = useHistory();


	const [imageCover, setImageCover] = useState(defaultImageCover);
	const [imageProfile, setImageProfile] = useState(defaultImageProfile);
	const [storeName, setstoreName] = useState("");
	const [storeDescription, setstoreDescription] = useState("");
	const [storeAddress, setstoreAddress] = useState("");
	const [storePhone, setstorePhone] = useState("");
	const [storeEmail, setstoreEmail] = useState("");
	const [storeWebsite, setstoreWebsite] = useState("");
	const [storeFacebook, setstoreFacebook] = useState("");
	const [storeTwitter, setstoreTwitter] = useState("");
	const [storeInstagram, setstoreInstagram] = useState("");




	const [etape1, setEtape1] = useState(true);
	const [etape2, setEtape2] = useState(false);
	const [etape3, setEtape3] = useState(false);
	const [etape4, setEtape4] = useState(false);
	const [terms, setTerms] = useState(false);
	const [backtostore, setBacktostore] = useState(false);

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
	const switchEtape = (e) => {
		switch (e) {
			case 1:
				setEtape1(true);
				setEtape2(false);
				setEtape3(false);
				setEtape4(false);
				break;
			case 2:
				setEtape1(false);
				setEtape2(true);
				setEtape3(false);
				setEtape4(false);
				break;
			case 3:
				setEtape1(false);
				setEtape2(false);
				setEtape3(true);
				setEtape4(false);
				break;
			case 4:
				setEtape1(false);
				setEtape2(false);
				setEtape3(false);
				setEtape4(true);
				break;
			default:
				break;
		}
	}
	const submitInfo = async () => {
		const payload = {
			fullName: storeName,
			owner: user._id,
			description: storeDescription,
			profileImage: imageProfile,
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

		await axios.post(`/store/api/`, payload).then((res) => {
			console.log(res.data);
			// navigate.push("/store/" + res.data._id);
			setBacktostore(true);
		});
	};
	return (
		<>
			<div>
				<div className="w-full bg-white p-10 mb-4">
					<div className="md:flex items-center border-b pb-6 border-gray-200">
						<div className="flex items-center md:mt-0 mt-4">
							{etape1 ? <div className="w-8 h-8 bg-indigo-700 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-white">01</p>
							</div> : <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-gray-800">01</p>
							</div>}
							<p className="text-base ml-3 font-medium leading-4 text-gray-800">Store Informations</p>
						</div>
						<div className="flex items-center md:mt-0 mt-4 md:ml-12">
							{etape2 ? <div className="w-8 h-8 bg-indigo-700 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-white">02</p>
							</div> : <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-gray-800">02</p>
							</div>}
							<p className="text-base ml-3 font-medium leading-4 text-gray-800">Security Check</p>
						</div>
						<div className="flex items-center md:mt-0 mt-4 md:ml-12">
							{etape3 ? <div className="w-8 h-8 bg-indigo-700 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-white">03</p>
							</div> : <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-gray-800">03</p>
							</div>}
							<p className="text-base ml-3 font-medium leading-4 text-gray-800">Confirm Terms and Conditions</p>
						</div>
						<div className="flex items-center md:mt-0 mt-4 md:ml-12">
							{etape4 ? <div className="w-8 h-8 bg-indigo-700 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-white">04</p>
							</div> : <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
								<p className="text-base font-medium leading-none text-gray-800">04</p>
							</div>}
							<p className="text-base ml-3 font-medium leading-4 text-gray-800">Submit & Waiting for reviewing</p>
						</div>
					</div>
					{etape1 && (
						<>
							<div className="flex flex-row justify-around">
								<div className="flex flex-col">
									<h1 tabIndex={0} role="heading" aria-label="profile information" className="focus:outline-none text-3xl font-bold text-gray-800 mt-12">
										Store info
									</h1>
									<p role="contentinfo" className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4">
										Fill in the data for store. It will take a couple of minutes. <br />
										You only need a passport or identity card or driver license.
									</p>
									<div className="mt-8 md:flex items-center">
										<div className="flex flex-col">
											<label className="mb-3 text-sm leading-none text-gray-800">Store name</label>
											<input onChange={(e)=> setstoreName(e.target.value)} type="text" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
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
											<input type="email" onChange={(e)=> setstoreEmail(e.target.value)} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
										</div>
										<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
											<label className="mb-3 text-sm leading-none text-gray-800">Phone number</label>
											<input onChange={(e)=> setstorePhone(e.target.value)} type="number" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
										</div>
									</div>
									<div className="mt-12 md:flex items-center">
										<div className="flex flex-col">
											<label className="mb-3 text-sm leading-none text-gray-800">Store description</label>
											<textarea onChange={(e)=> setstoreDescription(e.target.value)} className="w-64 h-40 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
										</div>
										<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
											<input type="text" onChange={(e)=> setstoreFacebook(e.target.value)} placeholder="Facebook" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
											<input type="text" onChange={(e)=> setstoreInstagram(e.target.value)} placeholder="Instagram" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
											<input type="text" onChange={(e)=> setstoreTwitter(e.target.value)} placeholder="Twitter" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
											<input type="text" onChange={(e)=> setstoreWebsite(e.target.value)} placeholder="Website" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
										</div>
									</div>
								</div>

								<div className="flex flex-col">
									<div className="mt-12 md:flex items-center">
										<div className="flex flex-col">
											<label className="mb-3 text-sm leading-none text-gray-800">Store Address</label>
											<input onChange={(e)=> setstoreAddress(e.target.value)} type="text" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
										</div>
										<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
											<label className="mb-3 text-sm leading-none text-gray-800">Postal Code</label>
											<input type="number" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
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

									<div className="mt-8 md:flex items-center justify-center">
										<div className="flex flex-col">
											<div className="avatar">
												<div style={{ width: '300px', height: '250px' }}>
													<img src={imageCover} />
												</div>
											</div>
										</div>
									</div>
									<div className="mt-8 md:flex items-center justify-center">
										<div className="flex flex-col md:ml-12 md:mt-0 mt-8">
											<div className="flex flex-col">
												<label className="mb-3 text-sm leading-none text-gray-800">Cover Image</label>
												<input type="file" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div className="flex justify-center">
								<Link to='/user-stores'>
									<button role="button" aria-label="Next step" className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-2 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
										<span className="text-sm font-medium text-center text-gray-800 capitalize">Cancel</span>
									</button>
								</Link>
								<button onClick={() => switchEtape(2)} role="button" aria-label="Next step" className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-2 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
									<span className="text-sm font-medium text-center text-gray-800 capitalize">Next Step</span>
									<svg className="mt-1 ml-3" width={12} height={8} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z" fill="#242731" />
									</svg>
								</button>
							</div>
						</>

					)}
					{etape2 && (
						<>
							<div className="mt-10">
								<IdentityVerif switchEtape={switchEtape} />
							</div>
						</>

					)}
					{etape3 && (
						<>
							<div>
								<div className="flex flex-col items-center justify-center mt-10">
									<h1 className="lg:text-5xl md:text-4xl text-2xl font-bold leading-10 text-gray-800"> Terms and Conditions</h1>
									<p className="text-base leading-normal text-center text-gray-600 mt-4 xl:w-1/2 w-10/12">We just got featured in the following magazines and it has been the most incredible journey.
										<br></br>We work with the best fashion magazines across the world</p>
									<p className="text-base leading-normal text-center text-gray-600 mt-4 xl:w-1/2 w-10/12"><strong>Last updated: May 20, 2022</strong></p>
									<p className="text-base mb-3 leading-normal text-center text-gray-600 mt-4 xl:w-1/2 w-10/12"><strong>Please read these terms and conditions carefully before using Our Service.</strong></p>
								</div>
								<h1>Interpretation and Definitions</h1>
								<h2>Interpretation</h2>
								<p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
								<h2>Definitions</h2>
								<p>For the purposes of these Terms and Conditions:</p>
								<ul>
									<li>
										<p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
									</li>
									<li>
										<p><strong>Country</strong> refers to:  Tunisia</p>
									</li>
									<li>
										<p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to bazaartn.</p>
									</li>
									<li>
										<p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
									</li>
									<li>
										<p><strong>Service</strong> refers to the Website.</p>
									</li>
									<li>
										<p><strong>Terms and Conditions</strong> (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the <a href="https://www.termsfeed.com/terms-conditions-generator/" target="_blank">Terms and Conditions Generator</a>.</p>
									</li>
									<li>
										<p><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>
									</li>
									<li>
										<p><strong>Website</strong> refers to bazaartn, accessible from <a href="baazartn.com" rel="external nofollow noopener" target="_blank">baazartn.com</a></p>
									</li>
									<li>
										<p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
									</li>
								</ul>
								<h1>Acknowledgment</h1>
								<p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
								<p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
								<p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
								<p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
								<p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>
								<h1>Links to Other Websites</h1>
								<p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
								<p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
								<p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
								<h1>Termination</h1>
								<p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
								<p>Upon termination, Your right to use the Service will cease immediately.</p>
								<h1>Limitation of Liability</h1>
								<p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
								<p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
								<p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>
								<h1>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h1>
								<p>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
								<p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
								<p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
								<h1>Governing Law</h1>
								<p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
								<h1>Disputes Resolution</h1>
								<p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
								<h1>For European Union (EU) Users</h1>
								<p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.</p>
								<h1>United States Legal Compliance</h1>
								<p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
								<h1>Severability and Waiver</h1>
								<h2>Severability</h2>
								<p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
								<h2>Waiver</h2>
								<p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
								<h1>Translation Interpretation</h1>
								<p>These Terms and Conditions may have been translated if We have made them available to You on our Service.
									You agree that the original English text shall prevail in the case of a dispute.</p>
								<h1>Changes to These Terms and Conditions</h1>
								<p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
								<p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
								<h1>Contact Us</h1>
								<p>If you have any questions about these Terms and Conditions, You can contact us:</p>
								<ul>
									<li>
										<p><strong>By email: baazartn@gmail.com</strong></p>
									</li>
									<li>
										<p><strong>By visiting this page on our website: <a href="bazaar.tn" rel="external nofollow noopener" target="_blank">bazaar.tn</a></strong></p>
									</li>
								</ul>
							</div>
							<div className="mt-8 flex justify-center">
								<div className="py-4 flex items-center">
									<div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
										<input type="checkbox" onChange={() => setTerms(!terms)} tabIndex={0} aria-label="I agree with the terms of service" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
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
								<button onClick={() => switchEtape(2)} role="button" aria-label="Next step" className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-2 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
									</svg>
									<span className="text-sm font-medium text-center text-gray-800 capitalize">Previous Step</span>

								</button>
								{terms && (
									<button onClick={() => switchEtape(4)} role="button" aria-label="Next step" className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-2 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
										<span className="text-sm font-medium text-center text-gray-800 capitalize">Next Step</span>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</button>
								)}
							</div>
						</>
					)}
					{etape4 && (
						<>
							<div className="bg-gray-800">
								<div id="modal" className='flex container mx-auto justify-center items-center px-4 md:px-10 py-20'>
									<div className="bg-white px-3 md:px-4 py-12 flex flex-col justify-center items-center">
										<div role="img">
										<img src={baazarlogo} alt="logo_baazar" width={74} height={44} />
										</div>
										{backtostore ?
											<>
												<h1 className="mt-8 md:mt-12 text-3xl lg:text-4xl font-semibold leading-10 text-center text-gray-800 text-center md:w-9/12 lg:w-7/12">Welcome to the coveted family of bazaar!</h1>
												<p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12">After reviewing your data. <br></br>A confirmation email will be sended to your account, {user.email}.</p>
												<div className="mt-12 md:mt-14 w-full flex justify-center">
												<Link to='/user-stores'>
													<button className="w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white">
														Back to my stores
													</button>
													</Link>
												</div>
											</>
											:
											<>
												<h1 className="mt-8 md:mt-12 text-3xl lg:text-4xl font-semibold leading-10 text-center text-gray-800 text-center md:w-9/12 lg:w-7/12">Just click on create and join our baazar team</h1>
												<p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12">A simple click will change your life to the moon <br></br>🌑🌒🌓🌔🌕</p>
												<div className="mt-12 md:mt-14 w-full flex justify-center">
													<Link to='/user-stores'>
														<button className="flex flex-row w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white">
															<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
																<path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
															</svg>
															&nbsp;&nbsp; Cancel

														</button>
													</Link>
													<button onClick={submitInfo} className="flex flex-row w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white">
														&nbsp;&nbsp; Create My Store
														<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
															<path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
													</button>

												</div>
											</>
										}
									</div>
								</div>
							</div>
						</>
					)}

				</div>
				<style dangerouslySetInnerHTML={{ __html: "\n          .checkbox:checked + .check-icon {\n              display: flex;\n          }\n      " }} />
			</div>
		</>
	);
}
