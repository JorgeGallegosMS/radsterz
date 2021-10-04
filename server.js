const express = require("express");
const session = require("./middlware/session");
const app = express();
const cors = require("cors");
const { port } = require("./vars");

app.use(cors());
app.use(express.json());

// Database connection
require("./db/radsterzDB");

app.use(session);

app.get("/", (req, res) => {
  res.send("Hello");
});

// Routes
const routes = require("./routes");

app.use("/api/items", routes.itemRoutes);
app.use("/api/users", routes.userRoutes);
app.use("/api/stripe", routes.stripeRoutes);

app.listen(port, () => console.log(`http://localhost:${port}`));
