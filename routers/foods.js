const express = require("express");
const router = express.Router();
const { addFoodToPantry, viewFoodInPantry, deleteFoodInPantry, updateFoodInPantry } = require("../controllers/foods");

router.post("/", addFoodToPantry);
router.get("/", viewFoodInPantry);
router.delete("/:foodId", deleteFoodInPantry);
router.put("/:foodId", updateFoodInPantry);

module.exports = router;
