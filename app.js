const express = require("express");
const cors = require("cors");
const supplierRouter = require("./supplier");
const port = "3100";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/supplier", supplierRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Supplier Service! 😁");
});

app.listen(port, () => {
  console.log("Server Connected on PORT: " + port + "/");
});
