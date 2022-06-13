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
		// rating: { type: Number, default: 0 },
		ratings: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				rating: { type: Number, default: 0, min: 0, max: 5 },
			},
		],
		comments: [comment],
		quantity: { type: Number, default: 1 },
		visibility: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

product.virtual("averageRating").get(function () {
	if (this.ratings.length === 0) return 0;
	this.ratings.reduce((rating, sum) => {
		sum += rating.rating;
	}, 0);
	return sum / this.ratings.length;
});

product.virtual("ratingCount").get(function () {
	return this.ratings.length;
});

product.virtual("purchaseCount").get(function () {
	Purchase.find({ items: { $elemMatch: { product: this._id } } }).then(
		(purchases) => {
			return purchases.length;
		}
	);
});

const Products = mongoose.model("Products", product);
const Categories = mongoose.model("Categories", category);

module.exports = { Products, Categories };
