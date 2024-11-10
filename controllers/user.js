const User = require("../models/Users");

const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("username _id");
        if (users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const viewUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user: user.username, pantry: user.pantry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { viewAllUsers, viewUserId };
