const mongoose = require("mongoose");
const { Products, Categories, Comments } = require("./../models/product.model");
const Store = require("./../models/store.model");
const jwt = require("jsonwebtoken");

// C: Create
module.exports.addProduct = async function (req, res) {
	try {
		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		const store = await Store.findOne({
			owner: user,
		});

		if (!store) {
			res.json("You are not allowed to add products");
		}

		const product = new Products(req.body);
		product
			.save()
			.then((product) => {
				console.log(product);
				res.json(product).select("-ratings");
			})
			.catch((err) => {
				res.json(err);
			});
	} catch (err) {
		res.json(err);
	}
};

// R: Read
module.exports.getProductById = async function (req, res) {
	try {
		let product = await Product.findById(req.params.id);
		res.json(product).select("-ratings");
	} catch (err) {
		res.json(err);
	}
};

module.exports.getProductByCategory = async function (req, res) {
	try {
		let products = await Product.find({ categorie: req.params.id });
		res.json(products);
	} catch (err) {
		res.json(err);
	}
};

module.exports.getProductsByStore = async function (req, res) {
	try {
		let products = await Product.find({ store: req.params.id });
		res.json(products);
	} catch (err) {
		res.json(err);
	}
};

module.exports.getAllProducts = async function (req, res) {
	try {
		const name = req.query.name ?? "";
		const priceMin = req.query.priceMin ? parseFloat(req.query.priceMin) : 0;
		const priceMax = req.query.priceMax
			? parseFloat(req.query.priceMax)
			: Number.MAX_SAFE_INTEGER;
		const limit = req.query.limit ? parseFloat(req.query.ratingMin) : 0;
		const page = req.query.page ? parseFloat(req.query.page) : 1;
		const quantity = req.query.quantity ? parseFloat(req.query.quantity) : 1;
		const store = req.query.store;
		const category = req.query.category;
		const ratingMin = req.query.ratingMin ? parseFloat(req.query.ratingMin) : 0;
		const offset = limit * (page - 1);
		const query = Products.find()
			.where("visibility")
			.equals(true)
			.where("name")
			.regex(new RegExp(name, "i"))
			.where("price")
			.gte(priceMin)
			.lte(priceMax)
			.where("quantity")
			.gte(quantity)
			.where("averageRating")
			.gte(ratingMin);
		if (store) query.where("store").equals(store);
		if (category) query.where("category").equals(category);
		query
			.populate("store", "_id name profileImage fullName")
			.populate("category", "_id name");
		if (limit > 0) query.limit(limit).skip(offset);
		const products = await query.select(
			"-comments -visibility -createdAt -updatedAt -ratings"
		);
		const pages = limit
			? Math.floor(products.length / limit) + (products.length % limit)
			: 1;
		res.json({
			products,
			pagination: {
				pages: pages,
				limit: limit,
				next: page >= pages ? 0 : page + 1,
			},
		});
	} catch (err) {
		console.log("Filter Failed");
		console.log(err);
		res.json(err);
	}
};

// U: Update
module.exports.updateProduct = async function (req, res) {
	try {
		let product = await Product.findById(req.params.id);
		product = Object.assign(product, req.body);
		product.save();
		res.json(product).select("-ratings");
	} catch (err) {
		res.json(err);
	}
};

module.exports.rateProduct = async function (req, res) {
	try {
		const product = await Product.findById(req.params.id);

		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		const index = product.ratings.findIndex((rating) => rating.user == user);
		if (index) {
			product.ratings[index].rating = req.body.rating;
		} else {
			product.ratings.push({
				user: user,
				rating: req.body.rating,
			});
		}

		product.save();

		res.json("Rating Updated");
	} catch (err) {
		res.json(err);
	}
};

module.exports.commentProduct = async function (req, res) {
	try {
		const product = await Product.findById(req.params.id);

		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		product.comments.push({
			user: user,
			rating: req.body.rating,
		});

		product.save();

		res.json(product).select("-ratings");
	} catch (err) {
		res.json(err);
	}
};

module.exports.deleteComment = async function (req, res) {
	try {
		const { productId, commentId } = req.params;
		const product = await Product.findById(productId);

		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		const index = product.comments.findIndex(
			(comment) => (comment._id = commentId && comment.user == user)
		);

		if (index) {
			product.comments.splice(index, 1);
		}

		product.save();

		res.json(product).select("-ratings");
	} catch (err) {
		res.json(err);
	}
};

module.exports.likeDeslikeComment = async function (req, res) {
	try {
		const { productId, commentId, like } = req.params;
		const product = await Product.findById(productId);

		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		const index = product.comments.findIndex(
			(comment) => (comment._id = commentId)
		);

		if (index > -1) {
			if (product.comments[index].likes.includes(user)) {
				const indexLike = product.comments[index].likes.findIndex(
					(c) => c.user == user
				);
				product.comments[index].likes.splice(indexLike, 1);
			}

			if (product.comments[index].dislikes.includes(user)) {
				const indexDislike = product.comments[index].dislikes.findIndex(
					(c) => c.user == user
				);
				product.comments[index].dislikes.splice(indexDislike, 1);
			}

			if (like && indexLike == -1) {
				product.comments[index].likes.push(user);
			} else if (!like && indexDislike == -1) {
				product.comments[index].dislikes.push(user);
			}
		}

		product.save();

		res.json(product).select("-ratings");
	} catch (err) {
		res.json(err);
	}
};

// D: Delete
module.exports.deleteProduct = async function (req, res) {
	try {
		let product = await Product.findByIdAndUpdate(req.params.id, {
			visibility: false,
		});
		res.json(product).select("-ratings");
	} catch (err) {
		res.json(err);
	}
};
