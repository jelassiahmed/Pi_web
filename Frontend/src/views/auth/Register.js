import React from "react";
import { useState } from "react";
import { showErrMsg, showSuccessMsg } from "../../components/utils/notification/Notification";
import axios from "axios";
import { isEmpty, isEmail, isLength, isMatch } from '../../components/utils/validation/Validation'
import { useHistory } from "react-router";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { dispatchLogin } from "../../redux/actions/authAction";
import { useDispatch } from 'react-redux'

const initialState = {
  name: '',
  email: '',
  password: '',
  cf_password: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  telephone: '',
  err: '',
  success: ''
}
export default function Register() {
  const [user, setUser] = useState(initialState)
  const [showpass, setShowPass] = useState(false)
  const [showpass2, setShowPass2] = useState(false)
  const [checked, setChecked] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch()
  const { name, email, password, cf_password, address, city, state, zip, country, telephone, err, success } = user
  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('/user/google_login', { tokenId: response.tokenId })

      setUser({ ...user, error: '', success: res.data.msg })
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push('/')
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }
  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response
      const res = await axios.post('/user/facebook_login', { accessToken, userID })

      setUser({ ...user, error: '', success: res.data.msg })
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push('/')
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }

  const handleSubmit = async e => {
    if (isEmpty(name) || isEmpty(password) || isEmpty(address) || isEmpty(city) || isEmpty(state) || isEmpty(zip) || isEmpty(country) || isEmpty(telephone))
      return setUser({ ...user, err: "Please fill in all fields", success: '' })
    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid Email", success: '' })
    if (isLength(password))
      return setUser({ ...user, err: "Password must be at least 6 characters", success: '' })
    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match", success: '' })
    try {
      const res = await axios.post('/user/register', {
        name, email, password, address, city, state, zip, country, telephone
      })
      setUser({ ...user, err: '', success: res.data.msg })
      setTimeout(() => {
        history.push('/auth/login');
      }, 2000);
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }

  }

  return (
    <>
    <div className="mt-4 flex flex-col justify-center items-center">
            <p tabIndex={0} className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
             Create your account
            </p>
            <p tabIndex={0} className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
              Already have  an account?{" "}
              <a href="/auth/login" className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
                {" "}
                Sign in
              </a>
            </p>
          </div>
      <div className="flex items-center justify-center" >
      
        <div className="xl:w-10/12 w-full px-8">
          <div className="xl:px-24">
            <div className="px-5 py-4 bg-gray-100 rounded-lg flex items-center justify-between mt-7">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 9.99999H20C20.2652 9.99999 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 9.99999 4 9.99999H5V8.99999C5 8.08074 5.18106 7.17049 5.53284 6.32121C5.88463 5.47193 6.40024 4.70026 7.05025 4.05025C7.70026 3.40023 8.47194 2.88462 9.32122 2.53284C10.1705 2.18105 11.0807 1.99999 12 1.99999C12.9193 1.99999 13.8295 2.18105 14.6788 2.53284C15.5281 2.88462 16.2997 3.40023 16.9497 4.05025C17.5998 4.70026 18.1154 5.47193 18.4672 6.32121C18.8189 7.17049 19 8.08074 19 8.99999V9.99999ZM17 9.99999V8.99999C17 7.67391 16.4732 6.40214 15.5355 5.46446C14.5979 4.52678 13.3261 3.99999 12 3.99999C10.6739 3.99999 9.40215 4.52678 8.46447 5.46446C7.52678 6.40214 7 7.67391 7 8.99999V9.99999H17ZM11 14V18H13V14H11Z"
                      fill="#4B5563"
                    />
                  </svg>
                </div>

                <p className="text-sm text-gray-800 pl-3">We take privacy issues seriously. You can be sure that your personal data is securely protected.</p>
              </div>
            </div>
            
            <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
              <div className="w-80">
                <div className="flex items-center">
                  <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">Personal Information</h1>
                </div>
                <div className="mt-4">
                {err && showErrMsg(err)}
                </div>
                {/* <p className="mt-4 text-sm leading-5 text-gray-600">Information about the section could go here and a brief description of how this might be used.</p> */}
              </div>
              <div>
                {/* Full Name  */}
                <div className="md:flex items-center lg:ml-24 mt-8">
                  <div className="md:w-full md:ml-12 md:mt-0 mt-4">
                    <label className="text-sm leading-none text-gray-800" id="lastName">Full name</label>
                    <input
                      value={name} name="name" onChange={handleChangeInput}
                      type="name" tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="lastName" placeholder="eg. Jhon Luis" />
                  </div>
                </div>
                {/* Email + Phone */}
                <div className="md:flex items-center lg:ml-24 mt-8">
                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label className="text-sm leading-none text-gray-800" id="lastName">Email</label>
                    <input type="name" value={email} name="email" onChange={handleChangeInput} tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="lastName" placeholder="eg. jhon.inbox@...com" />
                  </div>

                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label className="text-sm leading-none text-gray-800" id="phone" >Phone number</label>
                    <input value={telephone} name="telephone" onChange={handleChangeInput} type="name" tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="phone" placeholder="+216 11 222 333" />
                  </div>
                </div>

                {/* Address + city + zip code */}
                <div className="md:flex items-center lg:ml-24 mt-8">
                  <div className="md:w-96 md:ml-12 md:mt-0 mt-4">
                    <label className="text-sm leading-none text-gray-800" id="lastName">Address</label>
                    <input type="name" value={address} name="address" onChange={handleChangeInput} tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="lastName" placeholder="eg. sidi bou ali street" />
                  </div>

                  <div className="md:w-28 md:ml-12 md:mt-0 mt-4">
                    <label className="text-sm leading-none text-gray-800" id="phone" >Zip/Postal code</label>
                    <input type="name" value={zip} name="zip" onChange={handleChangeInput} tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="phone" placeholder="8050" />
                  </div>
                </div>

                {/* Country + state .city*/}
                <div className="md:flex items-center lg:ml-24 mt-8">
                  <div className="md:w-40 md:ml-12 md:mt-0 mt-4">
                    <label className="text-sm leading-none text-gray-800" id="lastName">City</label>
                    <input value={city} name="city" onChange={handleChangeInput} type="name" tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="lastName" placeholder="eg. Hammamet" />
                  </div>

                  <div className="md:w-40 md:ml-12 md:mt-0 mt-4">
                    <label className="text-sm leading-none text-gray-800" id="lastName">State</label>
                    <input value={state} name="state" onChange={handleChangeInput} type="name" tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="lastName" placeholder="eg. Nabeul" />
                  </div>

                  <div className="md:w-40 md:ml-12 md:mt-0 mt-4">
                    <label className="text-sm leading-none text-gray-800" id="phone" >Country</label>
                    <input value={country} name="country" onChange={handleChangeInput} type="name" tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="phone" placeholder="Tunisia" />
                  </div>
                </div>

              </div>
            </div>
            <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
              <div className="w-80">
                <div className="flex items-center">
                  <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">Security</h1>
                </div>
                {/* <p className="mt-4 text-sm leading-5 text-gray-600">Information about the section could go here and a brief description of how this might be used.</p> */}
              </div>
              <div>
                <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                  <div className="md:w-64">
                    <label className="flex flex-row text-sm leading-none text-gray-800" id="password">
                      Password
                      <div onClick={() => setShowPass(!showpass)} className="ml-4">
                        <div id="show">
                          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                              fill="#71717A"
                            />
                          </svg>
                        </div>
                        <div id="hide" className="hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#27272A" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1={3} y1={3} x2={21} y2={21} />
                            <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                            <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                          </svg>
                        </div>
                      </div>
                    </label>
                    <input value={password} name="password" onChange={handleChangeInput} type={showpass ? "text" : "password"} tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="password" placeholder="Enter your password" />
                  </div>
                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label className="flex flex-row text-sm leading-none text-gray-800" id="securityCode">
                      Confirm password
                      <div onClick={() => setShowPass2(!showpass2)} className="ml-4">
                        <div id="show">
                          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                              fill="#71717A"
                            />
                          </svg>
                        </div>
                        <div id="hide" className="hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#27272A" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1={3} y1={3} x2={21} y2={21} />
                            <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                            <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                          </svg>
                        </div>
                      </div>
                    </label>
                    <input value={cf_password} name="cf_password" onChange={handleChangeInput} type={showpass2 ? "text" : "password"} tabIndex="0" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="securityCode" placeholder="Confirm your password" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-between border-b border-gray-200 pb-16 mb-4">
              <div className="w-full">
                <div className="flex items-center justify-center">
                  <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          onClick={() => setChecked(!checked)}
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          I agree with the{" "}
                          <a
                            href="#pablo"
                            className="text-lightBlue-500"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </h1>
                </div>
              </div>
              <button onClick={()=>handleSubmit()} disabled={checked} className="mt-4 mb-2 bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full ">
              Create my account
            </button>
            {success && showSuccessMsg(success)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
