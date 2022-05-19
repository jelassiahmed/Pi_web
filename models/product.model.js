const mongoose = require("mongoose");

const category = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, default: "No description" },
	image: { type: String, default: "defaultCategoriePic.png" },
	children: [{ type: mongoose.Schema.Types.ObjectId, ref: "categorie" }],
});

const comment = new mongoose.Schema(
	{
		text: { type: String, default: "" },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		feedback: {
			likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
			dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		},
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
	},
	{
		timestamps: true,
	}
);

const product = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: Number,
		category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
		status: {
			type: String,
			enum: ["Hand Made", "NEW", "BARELY USED"],
			default: "NEW",
		},
		description: { type: String, required: true },
		keywords: [String],
		images: [String],
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
		},
		rating: { type: Number, default: 0 },
		comments: [comment],
		quantity: { type: Number, default: 1 },
		visibility: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const Products = mongoose.model("Products", product);
const Categories = mongoose.model("Categories", category);

module.exports = { Products, Categories };
