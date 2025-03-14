const admin = require("firebase-admin");

// Middleware to verify Firebase token
exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        req.user = decodedToken; // Attach Firebase user data to request
        next();
    } catch (error) {
        console.error("Firebase Token Verification Error:", error.message);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
    }
};
