const admin = require("firebase-admin");

exports.registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const user = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        return res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await admin.auth().getUserByEmail(email);

        // Generate a Firebase token for the frontend
        const token = await admin.auth().createCustomToken(user.uid);

        return res.status(200).json({ success: true, token, user });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Login failed: " + error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = req.user; // Retrieved from `authMiddleware.js`
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
