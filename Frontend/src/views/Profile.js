import React, { useState } from "react";
import { isLength, isMatch } from "components/utils/validation/Validation"
import { showSuccessMsg, showErrMsg } from "components/utils/notification/Notification"
import { useSelector } from "react-redux";
import axios from "axios";


const initialState = {
	name: '',
	password: '',
	address: '',
	cf_password: '',
	err: '',
	success: ''
}

export default function Profile() {
	const auth = useSelector(state => state.auth)
	const token = useSelector(state => state.token)
	const users = useSelector(state => state.users)


	const { user } = auth
	const [data, setData] = useState(initialState)
	const { name, password, address, cf_password, err, success } = data
	const [avatar, setAvatar] = useState(false)
	const [loading, setLoading] = useState(false)
	const changeAvatar = async (e) => {
		e.preventDefault()
		try {
			const file = e.target.files[0]

			if (!file) return setData({ ...data, err: "No files were uploaded.", success: '' })

			if (file.size > 1024 * 1024)
				return setData({ ...data, err: "Size too large.", success: '' })

			if (file.type !== 'image/jpeg' && file.type !== 'image/png')
				return setData({ ...data, err: "File format is incorrect.", success: '' })

			let formData = new FormData()
			formData.append('file', file)

			setLoading(true)
			const res = await axios.post('/api/upload_avatar', formData, {
				headers: { 'content-type': 'multipart/form-data', Authorization: token }
			})

			setLoading(false)
			setAvatar(res.data.url)

		} catch (err) {
			setData({ ...data, err: err.response.data.msg, success: '' })
		}
	}
	const handleChange = e => {
		const { name, value } = e.target
		setData({ ...data, [name]: value, err: '', success: '' })
	}
	const updateInfo = () => {
		try {
			axios.patch('/user/update', {
				name: name ? name : user.name,
				address: address ? address : user.address,
				avatar: avatar ? avatar : user.avatar
			}, {
				headers: { Authorization: token }
			})

			setData({ ...data, err: '', success: "Updated Success!" })

		} catch (err) {
			setData({ ...data, err: err.response.data.msg, success: '' })
		}
	}

	const updatePassword = () => {
		if (isLength(password))
			return setData({ ...data, err: "Password must be at least 6 characters.", success: '' })

		if (!isMatch(password, cf_password))
			return setData({ ...data, err: "Password did not match.", success: '' })

		try {
			axios.post('/user/reset', { password }, {
				headers: { Authorization: token }
			})

			setData({ ...data, err: '', success: "Updated Success!" })
		} catch (err) {
			setData({ ...data, err: err.response.data.msg, success: '' })
		}
	}

	const handleUpdate = () => {
		if (name || avatar || address) updateInfo()
		if (password) updatePassword()
	}
	return (
		<>
			<div>
			<div className="flex flex-col items-center justify-center mt-10 mb-10">
				<h1 className="lg:text-5xl md:text-4xl text-2xl font-bold leading-10 text-gray-800">My Profile</h1>
				<p className="text-base leading-normal text-center text-gray-600 mt-4 xl:w-1/2 w-10/12">Complete your profile data. <br></br>Any fake data will deactivate immediatly your account</p>
			</div>
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0 ml-8">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Profile & cover picture</h3>
							<p className="mt-1 text-sm text-gray-600">
								This information will be displayed publicly so be careful what you share.
							</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form action="#" method="POST">
							<div className="shadow sm:rounded-md sm:overflow-hidden">
								<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
									{/* <div className="grid grid-cols-3 gap-6">
										<div className="col-span-3 sm:col-span-2">
											<label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
												Website
											</label>
											<div className="mt-1 flex rounded-md shadow-sm">
												<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
													http://
												</span>
												<input
													type="text"
													name="company-website"
													id="company-website"
													className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
													placeholder="www.example.com"
												/>
											</div>
										</div>
									</div> */}

									{/* <div>
										<label htmlFor="about" className="block text-sm font-medium text-gray-700">
											About
										</label>
										<div className="mt-1">
											<textarea
												id="about"
												name="about"
												rows={3}
												className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
												placeholder="you@example.com"
												defaultValue={''}
											/>
										</div>
										<p className="mt-2 text-sm text-gray-500">
											Brief description for your profile. URLs are hyperlinked.
										</p>
									</div> */}

									<div>
										<label className="block text-sm font-medium text-gray-700">Photo</label>
										<div className="mt-1 flex items-center">
											<div class="avatar">
												<div class="w-24 rounded-full">
													<img
														alt='user_picture'
														src={avatar ? avatar : user.avatar}
													/>
												</div>
											</div>
											<span
												className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
												<i className="fas fa-camera" />
												<label htmlFor="file_up" className="cursor-pointer ml-1">Change</label>
												<input type="file" name="file" id="file_up" className="hidden" onChange={changeAvatar} />
											</span>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700">Cover photo</label>
										<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
											<div className="space-y-1 text-center">
												<svg
													className="mx-auto h-12 w-12 text-gray-400"
													stroke="currentColor"
													fill="none"
													viewBox="0 0 48 48"
													aria-hidden="true"
												>
													<path
														d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
														strokeWidth={2}
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<div className="flex text-sm text-gray-600">
													<label
														htmlFor="file-upload"
														className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
													>
														<span>Upload a file</span>
														<input id="file-upload" name="file-upload" type="file" className="sr-only" />
													</label>
													<p className="pl-1">or drag and drop</p>
												</div>
												<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-5">
					<div className="border-t border-gray-200" />
				</div>
			</div>

			<div className="mt-10 sm:mt-0">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0 ml-8">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
							<p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form action="#" method="POST">
							<div className="shadow overflow-hidden sm:rounded-md">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
												Full name
											</label>
											<input
												type="text"
												name="name" id="name" defaultValue={user.name}
												onChange={handleChange}
												autoComplete="given-name"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										{/* <div className="col-span-6 sm:col-span-3">
											<label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
												Last name
											</label>
											<input
												type="text"
												name="last-name"
												id="last-name"
												autoComplete="family-name"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}

										<div className="col-span-6 sm:col-span-4">
											<label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
												Email address
											</label>
											<input
												type="email" name="email" id="email" defaultValue={user.email}
												autoComplete="email"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												disabled />
										</div>

										{/* <div className="col-span-6 sm:col-span-3">
											<label htmlFor="country" className="block text-sm font-medium text-gray-700">
												Country
											</label>
											<select
												id="country"
												name="country"
												autoComplete="country-name"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											>
												<option>United States</option>
												<option>Canada</option>
												<option>Mexico</option>
											</select>
										</div> */}

										<div className="col-span-6">
											<label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
												Street address
											</label>
											<input
												onChange={handleChange}
												type="text" name="address" id="address" defaultValue={user.address}
												autoComplete="street-address"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										{/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label htmlFor="city" className="block text-sm font-medium text-gray-700">
												City
											</label>
											<input
												type="text"
												name="city"
												id="city"
												autoComplete="address-level2"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}

										{/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label htmlFor="region" className="block text-sm font-medium text-gray-700">
												State / Province
											</label>
											<input
												type="text"
												name="region"
												id="region"
												autoComplete="address-level1"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
												ZIP / Postal code
											</label>
											<input
												type="text"
												name="postal-code"
												id="postal-code"
												autoComplete="postal-code"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-5">
					<div className="border-t border-gray-200" />
				</div>
			</div>

			<div className="mt-10 sm:mt-0">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1 ml-8">
						<div className="px-4 sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Security & Password</h3>
							<p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form action="#" method="POST">
							<div className="shadow overflow-hidden sm:rounded-md">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
												Password
											</label>
											<input
												value={password}
												type="password" name="password" id="password"
												onChange={handleChange}
												autoComplete="given-name"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
												Confirm password
											</label>
											<input
												value={cf_password}
												type="password" name="cf_password" id="cf_password"
												autoComplete="family-name"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
									<div>
										<em style={{ color: "crimson" }}>
											* If you update your password here, you will not be able
											to login quickly using google and facebook.
										</em>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-5">
					<div className="border-t border-gray-200" />
				</div>
			</div>

			<div className="mt-10 sm:mt-0">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0 ml-8">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
							<p className="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<div className="shadow overflow-hidden sm:rounded-md">
							<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
								<fieldset>
									<legend className="sr-only">By Email</legend>
									<div className="text-base font-medium text-gray-900" aria-hidden="true">
										By Email
									</div>
									<div className="mt-4 space-y-4">
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													id="comments"
													name="comments"
													type="checkbox"
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label htmlFor="comments" className="font-medium text-gray-700">
													Comments
												</label>
												<p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
											</div>
										</div>
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													id="candidates"
													name="candidates"
													type="checkbox"
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label htmlFor="candidates" className="font-medium text-gray-700">
													Candidates
												</label>
												<p className="text-gray-500">Get notified when a candidate applies for a job.</p>
											</div>
										</div>
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													id="offers"
													name="offers"
													type="checkbox"
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label htmlFor="offers" className="font-medium text-gray-700">
													Offers
												</label>
												<p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
											</div>
										</div>
									</div>
								</fieldset>
								<fieldset>
									<legend className="contents text-base font-medium text-gray-900">Push Notifications</legend>
									<p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
									<div className="mt-4 space-y-4">
										<div className="flex items-center">
											<input
												id="push-everything"
												name="push-notifications"
												type="radio"
												className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
											/>
											<label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
												Everything
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="push-email"
												name="push-notifications"
												type="radio"
												className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
											/>
											<label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
												Same as email
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="push-nothing"
												name="push-notifications"
												type="radio"
												className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
											/>
											<label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
												No push notifications
											</label>
										</div>
									</div>
								</fieldset>
							</div>
							<div>
										{err && showErrMsg(err)}
										{success && showSuccessMsg(success)}
										{loading && <h3>Loading.....</h3>}
									</div>
							<div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
								<button
									disabled={loading} onClick={handleUpdate}
									className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
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
