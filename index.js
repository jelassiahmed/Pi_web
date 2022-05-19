require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const Complaint = require("./routes/Complaint");
var productsRouter = require("./routes/products");
var ratingsRouter = require("./routes/ratings");
var feedbacksRouter = require("./routes/feedbacks");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {

	cors: { origin: "https://bazaartn.herokuapp.com"},
});
const chatService = require("./services/chat.service");

app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/upload"));
app.use("/products", productsRouter);
app.use("/ratings", ratingsRouter);
app.use("/feedbacks", feedbacksRouter);
app.use("/complaint", Complaint);
app.use("/store/api", require("./routes/store.router"));
app.use("/chat", require("./routes/chat.router"));

//Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
	URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw err;
		console.log("Connected to mongodb");
	}
);
if (process.env.NODE_ENV === "production") {
	app.use(express.static("./Frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
	});
}

io.on("connect", (socket) => {
	socket.on("joinRoom", ({ userId, room }) => {
		if (userId) {
			const user = chatService.userJoin(socket.id, userId, room);
			socket.join(user.room);
			console.log(`${userId} has joined ${user.room}`);
		}
	});

	// Listen for chatMessage
	socket.on("chatMessage", ({ msg, idRoom }) => {
		const user = chatService.getCurrentUser(socket.id);
		console.log(msg);
		const message = {
			content: msg.content,
			image: msg.image,
			sender: user.userId,
			timestamp: Date.now(),
		};
		chatService.saveMessage(user, idRoom, message);
		io.to(user.room).emit("message", message);
	});

	// Runs when client disconnects
	socket.on("leaveRoom", () => {
		console.log("Client has Left");
		chatService.userLeave(socket.id);
	});

	// Runs when client disconnects
	socket.on("disconnect", () => {
		chatService.userLeave(socket.id);
	});
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});

//Stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


// app.use(
// 	cors({
// 	  origin: "http://localhost:3000",
// 	})
//   )
app.post("/create-checkout-session", async (req, res) => {
	if (req.method === 'POST') {
		try {
		  const params = {
			submit_type: 'pay',
			mode: 'payment',
			payment_method_types: ['card'],
			billing_address_collection: 'auto',
			shipping_options: [
			  { shipping_rate: 'shr_1L17EtJ4p2CaDFLZs6M7mFU7' },
			],
			line_items: req.body.map((item) => {
			//   const img = item.image[0].asset._ref;
			//   const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
	
			  return {
				price_data: { 
				  currency: 'usd',
				  product_data: { 
					name: item.title,
					// images: [newImage],
				  },
				  unit_amount: item.price * 100,
				},
				adjustable_quantity: {
				  enabled:true,
				  minimum: 1,
				},
				quantity: item.amount
			  }
			}),
			success_url: `http://localhost:3000/PaymentSucess`,
			cancel_url: `http://localhost:3000/PaymentError`,
		  }
	
		  // Create Checkout Sessions from body params.
		  const session = await stripe.checkout.sessions.create(params);
	
		  res.status(200).json({url : session.url});
		} catch (err) {
		  res.status(err.statusCode || 500).json(err.message);
		}
	  } else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	  }
});