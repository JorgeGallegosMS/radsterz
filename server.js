const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { port } = require("./vars");

helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["self"],
    scriptSrc: ["self"],
    styleSrc: ["self"],
    fontSrc: ["self"],
    imageSrc: ["self", "https://res.cloudinary.com"],
  },
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      imgSrc: ["self", "https://res.cloudinary.com"],
    },
  })
);

// Database connection
require("./db/radsterzDB");

// Routes
const routes = require("./routes");

app.use("/api/items", routes.itemRoutes);
app.use("/api/users", routes.userRoutes);
app.use("/api/stripe", routes.stripeRoutes);

app.get("*", (req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () =>
  console.log(`Running node in development mode at http://localhost:${port}`)
);
