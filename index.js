const express = require("express");
const pool = require("./config/db");
const app = express();
const port = 3000;

app.use(express.json());

const paymentRoutes = require("./routes/paymentRoutes");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/teknotik/payment", paymentRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(pool.connect);
});
