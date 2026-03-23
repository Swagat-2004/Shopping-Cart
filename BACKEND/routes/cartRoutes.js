console.log("🔥 cartRoutes loaded");

const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity: quantity || 1
    });

    res.status(201).json({
      message: "Product added to cart",
      cartItem
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id }).populate("product");
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= UPDATE CART ITEM =================
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart updated successfully",
      cartItem
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= REMOVE FROM CART =================
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Item removed from cart"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;