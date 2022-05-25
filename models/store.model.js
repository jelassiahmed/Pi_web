const Purchases = require("../models/purchase.model");
const Products = require("../models/product.model");
const mongoose = require("mongoose");

const store = new mongoose.Schema(
	{
		fullName: { type: String, required: true, unique: true, dropDups: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		profileImage: { type: String, default: "" },
		coverImage: { type: String, default: "defaultCoverPic.png" },
		description: { type: String, default: "No description" },
		address: { type: String, default: "No address" },
		phone: { type: String, default: "No phone" },
		email: { type: String, default: "No email" },
		localisation: { type: String, default: "37.280236, 9.873783" },
		contact: {
			website: { type: String, default: "No website" },
			facebook: { type: String, default: "No facebook" },
			instagram: { type: String, default: "No instagram" },
			twitter: { type: String, default: "No twitter" },
		},
		verified: { type: Boolean, default: false },
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		stats: {
			productSales: { type: Number, default: 0 },
			productViews: { type: Number, default: 0 },
		},
	},
	{ timestamps: true }
);

store.virtual("averageRating").get(function () {
	Products.find({ store: this._id }).then((products) => {
		let total = 0;
		products.forEach((product) => {
			total += product.rating;
		});
		return total / products.length;
	});
});

store.virtual("totalSales").get(function () {
	const purchases = await Purchases.aggregate(
		[
			{
				$lookup: {
					from: "products",
					localField: "items.product",
					foreignField: "_id",
					as: "product",
				},
			},
			{
				$match: {
					"product.store": this._id,
				},
			},
			{
				$group: {
					_id: null,
					total: { $sum: "$items.quantity" },
				},
			},
		]
	);
	return purchases[0].total;
});

const Store = mongoose.model("Store", store);
module.exports = Store;
