const User = require("../models/Users");

const addFoodToPantry = async (req, res) => {
    try {
        //accessing username from decoded passed from isSignedIn middleware
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        // getting food item name from request body
        const item = { name: req.body.name };
        // pushing food item name into pantry array
        user.pantry.push(item);
        await user.save();

        res.status(200).json({
            status: "Successful",
            msg: `Item added to ${user.username}'s pantry `,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const viewFoodInPantry = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const pantryItem = user.pantry;

        res.status(200).json({ pantry: pantryItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFoodInPantry = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const foodId = req.params.foodId; // getting food id from request params
        const foodIndex = user.pantry.findIndex((food) => food._id == foodId); // finding index of food item in pantry array
        if (foodIndex === -1) {
            return res.status(404).json({ error: "Food not found" });
        }
        user.pantry.splice(foodIndex, 1); // removing food item from pantry array
        await user.save();
        const updatedPantry = user.pantry;

        res.status(200).json({
            msg: "Food item deleted",
            pantry: updatedPantry,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFoodInPantry = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const foodId = req.params.foodId;
        const food = user.pantry.id(foodId);
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }
        food.set(req.body);
        await user.save();

        res.status(200).json({ msg: "Food item updated", pantry: user.pantry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addFoodToPantry, viewFoodInPantry, deleteFoodInPantry, updateFoodInPantry };
