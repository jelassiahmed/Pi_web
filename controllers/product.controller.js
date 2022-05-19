const mongoose = require("mongoose");
const { Products, Categories, Comments } = require("./../models/product.model");
const Store = require("./../models/store.model");

// C: Create
module.exports.addProduct = async function (req, res) {
	try {
		const product = new Products(req.body);
		product
			.save()
			.then((product) => {
				console.log(product);
				res.json(product);
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
		res.json(product);
	} catch (err) {
		res.json(err);
	}
};

module.exports.getProductByCategorie = async function (req, res) {
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
		const offset = limit * (page - 1);
		console.log(
			name,
			category,
			store,
			priceMin,
			priceMax,
			limit,
			page,
			quantity,
			offset
		);
		const query = Products.find()
			.where("visibility")
			.equals(true)
			.where("name")
			.regex(new RegExp(name, "i"))
			.where("price")
			.gte(priceMin)
			.lte(priceMax)
			.where("quantity")
			.gte(quantity);
		if (store) query.where("store").equals(store);
		if (category) query.where("category").equals(category);
		query
			.populate("store", "_id name profileImage fullName")
			.populate("category", "_id name");
		if (limit > 0) query.limit(limit).skip(offset);
		const products = await query.select(
			"-comments -visibility -createdAt -updatedAt"
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
		let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(product);
	} catch (err) {
		res.json(err);
	}
};

module.exports.rateProduct = async function (req, res) {
	try {
		let product = await Product.findByIdAndUpdate(req.params.id, {
			rating: req.body.rating,
		});
		res.json(product);
	} catch (err) {
		res.json(err);
	}
};

module.exports.commentProduct = async function (req, res) {
	try {
		let product = await Product.findByIdAndUpdate(req.params.id, {
			comments: req.body.comments,
		});
		res.json(product);
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
		res.json(product);
	} catch (err) {
		res.json(err);
	}
};
