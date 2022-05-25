const mongoose = require("mongoose");
const Products = mongoose.model("Products");
const Stores = mongoose.model("Stores");
const Users = mongoose.model("Users");

const purchase = new mongooses.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
		status: {
			type: String,
			enum: [
				"Pending",
				"Approved",
				"Rejected",
				"Cancelled",
				"Delivered",
				"Returned",
				"Deleted",
			],
			default: "Pending",
		},
		checkout: {
			payment: { type: String, default: "Cash on Delivery" },
			address: { type: String, default: "" },
			city: { type: String, default: "" },
			state: { type: String, default: "" },
			zip: { type: String, default: "" },
			country: { type: String, default: "" },
			phone: { type: String, default: "" },
			email: { type: String, default: "" },
			date: { type: Date, default: Date.now },
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Products",
				},
				quantity: {
					type: Number,
					default: 1,
				},
				price: {
					type: Number,
					default: 0,
				},
			},
		],
	},
	{ timestamps: true }
);

purchase.virtual("totalPrice").get(function () {
	if (this.items.length === 0) return 0;
	this.items.reduce((price, sum) => {
		sum += price.price;
	}, 0);
	return sum;
});

module.exports = mongoose.model("Purchases", purchase);
