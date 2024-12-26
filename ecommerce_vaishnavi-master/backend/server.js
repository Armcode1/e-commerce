const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const { dbconnect } = require('./config/database');

const registerRoute = require('./routes/registerRoute');
const reviewRouter = require('./routes/reviewRouter');
const cartHandler = require('./routes/cartHandler');
const addProduct = require('./routes/addProduct');
const productHandler = require('./routes/productHandler');

const PORT = process.env.PORT || 8001;

dbconnect();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", registerRoute);
app.use('/api', reviewRouter);
app.use('/api', cartHandler);
app.use('/api', addProduct);
app.use('/api',productHandler);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running....",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});