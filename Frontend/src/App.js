import React, { useEffect,useState } from "react";
import {
	BrowserRouter,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchLogin,
	fetchUser,
	dispatchGetUser,
} from "./redux/actions/authAction";

import axios from "axios";
import { Redirect, Route } from "react-router";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import ActivationEmail from "./views/auth/ActiviationEmail";
import Profile from "./views/Profile";
import ResetPassword from "./views/auth/ResetPassword";
import EditUser from "./views/EditUser";
import SendComplaint from "./views/complaint/SendComplaint";
import MyComplaints from "./views/complaint/MyComplaints";
import Store from "./views/Store";
import MyStores from "./views/MyStores";
import SendMessage from "./views/messages/SendMessage";
import Contact from "./views/contactUs/Contact";
import Translate from "./components/Translate/Translate";
import HomePage from "./views/HomePage";
import Chat from "views/Chat";
import IdentityVerif from "./views/IdentityVerif";
import PrivacySettings from "./views/PrivacySettings";
import AboutUs from "./views/AboutUs";
import NewStore from "./views/NewStore";
import ProductsPage from "./views/Products/ProductsPage";
import ProductDetails from "./views/Products/ProductDetails";
import Navbar from "components/AANew/NavBar/NavBar";
import ProductCheckout from "components/AANew/ProductCheckout/ProductCheckout";
import PaymentSucess from "components/AANew/ProductCheckout/PaymentSucess";
import PaymentError from "components/AANew/ProductCheckout/PaymentError";
import NotFound404 from "components/AANew/404NotFound/404NotFound";

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);
	const { isAdmin } = auth;

	useEffect(() => {
		const firstLogin = localStorage.getItem("firstLogin");
		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post("/user/refresh_token", null);
				dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
			};
			getToken();
		}
	}, [auth.isLogged, dispatch]);

	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(dispatchLogin());

				return fetchUser(token).then((res) => {
					dispatch(dispatchGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	const { isLogged } = auth;
	// Cart 
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
      if (cart.indexOf(item) !== -1) return;
      setCart([...cart, item]);
  }

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].amount += d;

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);

  };
	return (
		<>
		<Navbar/>
		<Router>
			<BrowserRouter>
				<Switch>
					{/* add routes with layouts */}
					<Route path="/admin" component={isAdmin ? Admin : HomePage} />
					<Route path="/auth" component={isLogged ? HomePage : Auth} />
					{/* add routes without layouts */}
					<Route path="/edit_user/:id" component={EditUser} exact />
					<Route path="/complaint" exact component={SendComplaint} />
					<Route path="/AboutUs" exact component={AboutUs} />
					<Route path="/message" exact component={SendMessage} />
					<Route path="/Contact" exact component={Contact} />
					<Route path="/PrivacySettings" exact component={PrivacySettings} />
					<Route path="/mycomplaints" exact component={MyComplaints} />
					<Route path="/IdentityVerif/:id" exact component={IdentityVerif} />
					<Route path="/translate" exact component={Translate} />
					<Route path="/edit_user/:id" component={EditUser} exact />
					<Route path="/user/reset/:token" exact component={ResetPassword} />
					<Route
						path="/user/activate/:activation_token"
						exact
						component={ActivationEmail}
					/>
					<Route path="/store/:id" exact component={Store} />
					<Route path="/chats/:id?" exact component={isLogged ? Chat : Auth} />
					<Route path="/user-stores/:id?" exact component={MyStores} />
					<Route path="/create-store" exact component={NewStore} />
					<Route path="/profile" exact component={isLogged ? Profile : Auth} />
					<Route path="/" exact component={HomePage} />
					
					{/* Products Routes */}
					{/* <Route path="/ProductsPage" render={(props)=><ProductDetails {...props} addToCart={addToCart}  />}/> */}
					<Route path="/ProductsPage"  component={ProductsPage} />
					<Route path="/ProductDetails/:id" exact component={ProductDetails} />
					<Route path="/ProductCheckout" exact component={ProductCheckout} />					
					<Route path="/PaymentSucess" exact component={PaymentSucess} />					
					<Route path="/PaymentError" exact component={PaymentError} />					

					{/* 404 Not Found */}
					<Route path="/NotFound404" exact component={NotFound404} />
					{/* My stores */}
					{/* add redirect for first page */}
					<Redirect from="*" to="/NotFound404" />
				</Switch>
			</BrowserRouter>
		</Router>
		</>
	);
}

export default App;
