const Purchase = require("../models/purchase.model");
const Product = require("../models/product.model");
const Store = require("../models/store.model");
const User = require("../models/user.model");

// C: Create
module.exports.addPurchase = async function (req, res) {
	try {
		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		const purchase = new Purchase(req.body);

		purchase.user = user._id;

		purchase
			.save()
			.then((purchase) => {
				console.log(purchase);
				res.json(purchase);
			})
			.catch((err) => {
				res.json(err);
			});
	} catch (err) {
		res.json(err);
	}
};

// R: Read
module.exports.getPurchaseById = async function (req, res) {
	try {
		const purchase = await Purchase.findById(req.params.id);
		res.json(purchase);
	} catch (err) {
		res.json(err);
	}
};

module.exports.getPurchasesByStore = async function (req, res) {
	try {
		const purchases = await Purchase.find({ items: { store: req.params.id } });
		res.json(purchases);
	} catch (err) {
		res.json(err);
	}
};

module.exports.getPurchasesByUser = async function (req, res) {
	try {
		const purchases = await Purchase.find({ user: req.params.id });
		res.json(purchases);
	} catch (err) {
		res.json(err);
	}
};

module.exports.getPurchasesByProduct = async function (req, res) {
	try {
		let purchases = await Purchase.find({ items: { product: req.params.id } });
		res.json(purchases);
	} catch (err) {
		res.json(err);
	}
};

module.exports.getAllPurchases = async function (req, res) {
	try {
		let purchases = await Purchase.find();
		res.json(purchases);
	} catch (err) {
		res.json(err);
	}
};

// U: Update
module.exports.updatePurchase = async function (req, res) {
	try {
		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		const purchase = await Purchase.findBy(req.params.id);
		if (purchase.user != user._id) {
			res.json("You are not authorized to update this purchase");
		}
		purchase = Object.assign(purchase, req.body);
		res.json(purchase);
	} catch (err) {
		res.json(err);
	}
};

module.exports.updateSatusPurchase = async function (req, res) {
	try {
		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		const purchase = await Purchase.findBy(req.params.id);
		if (purchase.user != user._id) {
			res.json("You are not authorized to update this purchase");
		}
		purchase.status = req.body.status;
		purchase.save();
		res.json(purchase);
	} catch (err) {
		res.json(err);
	}
};

// D: Delete
// Should not delete purchases, but rather set the status to "deleted"
module.exports.deletePurchase = async function (req, res) {
	try {
		const user = jwt.decode(
			req.header("Authorization"),
			process.env.ACCESS_TOKEN_SECRET
		);

		let purchase = await Purchase.findById(req.params.id);
		if (purchase.user != user._id) {
			res.json("You are not authorized to update this purchase");
		}
		purchase.status = "Deleted";
		res.json(purchase);
	} catch (err) {
		res.json(err);
	}
};
