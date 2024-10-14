const express = require("express");
const morgan = require("morgan");
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
const errorHandling = require("./middlewares/errorHandling");
const dashboardRoutes = require("./routes/dashboardRoute");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging Middleware Morganen
app.use(morgan());

// Middleware Morgan
app.use((req, res, next) => {
  console.log(`incoming request: ${req.method} ${req.url}`);

  next();
});

app.use((req, res, next) => {
  // Logging basic
  req.requestTime = new Date().toISOString();

  next();
});

app.use((req, res, next) => {
  // Logging basic
  req.username = "FSW 2";

  next();
});

// Middleware baca static file
app.use(express.static(`${__dirname}/public`));

// Panggil View Engine

app.set("view engine", "ejs");

// app.get("/dashboard/admin", async (req, res) => {
//   try {
//     res.render("index", {
//       greeting: "Hello FSW 2 dengan data dinamis kalian luar biasa",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// Dashboard routes
app.use("/dashboard/admin", dashboardRoutes);

// Routes API
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// Error Handling Middleware
app.use(errorHandling);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
