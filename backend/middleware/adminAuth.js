import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Access denied" });
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
                next();
            }
            else {
                return res.json({ success: false, message: "Access denied" });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default adminAuth;