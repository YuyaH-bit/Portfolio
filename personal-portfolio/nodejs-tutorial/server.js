const express = require("express");
const app = express();
const PORT = 8000;
const user = require("./routes/user");

app.use(express.json("."));
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(PORT, () => {
  console.log("サーバー");
});