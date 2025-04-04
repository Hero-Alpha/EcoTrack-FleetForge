const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError.js");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 4001;

// -------------------------------------------------------------------------------------
// Database Connection
connectDB();

// -------------------------------------------------------------------------------------
// Middleware Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "asset")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// -------------------------------------------------------------------------------------
// Session & Flash Messages
app.use(
  session({
    secret: "thisIsASecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.deleted = req.flash("deleted");
  res.locals.edited = req.flash("edited");
  next();
});

// -------------------------------------------------------------------------------------
// Import Routes
const companyRouter = require("./routes/companyRoutes");
const driverRouter = require("./routes/driverRoutes");
const vehicleRouter = require("./routes/vehicleRoutes");
const carbonRouter = require("./routes/carbonRoutes");

// -------------------------------------------------------------------------------------
// Use Routes
app.use("/", companyRouter);
app.use("/drivers", driverRouter);
app.use("/vehicles", vehicleRouter);
app.use("/", carbonRouter);

// -------------------------------------------------------------------------------------
// Render Static Pages
const staticRoutes = [
  { path: "/homepage", view: "listings/homepage" },
  { path: "/help", view: "listings/help-support" },
  { path: "/userHome", view: "listings/userHome" },
  { path: "/addVehicle", view: "listings/addVehicle" },
  { path: "/addDriver", view: "listings/addDeliveryPartner" },
  { path: "/orders", view: "listings/orders" },
  { path: "/customer-eng", view: "listings/customer-eng" },
  { path: "/signin", view: "listings/companySignup" },
  { path: "/feature1", view: "listings/feature1" },
  { path: "/feature2", view: "listings/feature2" },
  { path: "/feature4", view: "listings/feature4" },
];

// -------------------------------------------------------------------------------------
staticRoutes.forEach(({ path, view }) => {
  app.get(path, (req, res) => res.render(view));
});

// -------------------------------------------------------------------------------------
// Handle 404 Errors
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// -------------------------------------------------------------------------------------
// Custom Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.render("listings/error.ejs", { statusCode, message });
});

// -------------------------------------------------------------------------------------
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// -------------------------------------------------------------------------------------
