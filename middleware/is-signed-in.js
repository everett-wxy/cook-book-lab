// const isSignedIn = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     try {
//         const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ error: "not authorised" });
//     }
// };

// module.exports = isSignedIn;

const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).json({ error: "missing authorization" });
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
            req.user = decoded;
            console.log(decoded);
            next();
        } catch (error) {
            console.error("Verification error ", error.message);
            return res.status(401).json(`not authorised, ${error.message}`);
        }
    } else {
        return res.status(403).send({ status: "error", msg: "missing token" });
    }
};

module.exports = isSignedIn;
