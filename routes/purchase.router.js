const router = require("express").Router();
const purchaseController = require("../controllers/purchase.controller");

router.get("/:id", purchaseController.getPurchaseById);
router.get("/store/:id", purchaseController.getPurchasesByStore);
router.get("/user/:id", purchaseController.getPurchasesByUser);
router.get("/product/:id", purchaseController.getPurchasesByProduct);

router.post("/", purchaseController.addPurchase);

router.patch("/:id", purchaseController.updatePurchase);

router.delete("/:id", purchaseController.deletePurchase);

module.exports = router;
