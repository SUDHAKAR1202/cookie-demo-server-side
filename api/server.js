const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser);
app.use(express.json());

//Route to set a cookie
app.get("/set-cookie", (req, res) => {
    res.cookie("userToken", "12345ABC", { httpOnly: true });
    res.status(200).json({ message: "Cookie set successfully!"});
});

// Route to retrieve a cookie
app.get("/get-cookie", (req, res) => {
    const userToken = req.cookies.userToken;
    if(userToken) {
        res.status(200).json({ token: userToken });

    } else {
        res.status(404).json({ message: "Cookie not found!"});
    }
})

// Route to send JSON with different status codes
app.get("/status/:code", (req, res) => {
    const code = parseInt(req.params.code);
    const messages = {
        200: "OK",
        201: "Created",
        400: "Bad Request",
        404: "Not Found",
        500: "Internal Server Error"
    };
    const message = messages[code] || "Unknown Status Code";
    res.status(code).json({ status: code, message });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})