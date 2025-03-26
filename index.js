const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require('./db');


// ----------------------------------------------------------------------------------------------------------------

// const connectDB = require("./db");
const { postRequest } = require("./services/apiService");
// require("dotenv").config();

// ----------------------------------------------------------------------------------------------------------------
// REQUEST HANDLING ROUTERS
const companyRouter = require("./routes/companyRoutes");
const driverRouter = require("./routes/driverRoutes");
const vehicleRouter = require("./routes/vehicleRoutes");

const app = express();

// ----------------------------------------------------------------------------------------------------------------
// SET UP EJS VIEW ENGINE
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

// ----------------------------------------------------------------------------------------------------------------
// CONNECT TO MONGODB
connectDB();

// main()
//     .then(()=>{
//         console.log("Database connected");
//     })
//     .catch((err)=> console.log(err));

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/ecotrack");
// }

// ----------------------------------------------------------------------------------------------------------------
// MIDDLEWARE TO PARSE JSON REQUESTS
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "asset")));
app.use(express.json());

const PORT = process.env.PORT || 4001;

// ---------------------------------------------------------------------
app.use(
  session({
    secret: "thisIsASecretKey", 
    resave: false,
    saveUninitialized: true,
  })
);


app.use(flash());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.deleted = req.flash("deleted");
  res.locals.edited = req.flash("edited");
  next();
});

// ----------------------------------------------------------------------------------------------------------------
// GLOBAL DELIVERY OPTIONS
const deliveryOptions = [
  {
    id: 'ecoexpress',
    name: 'EcoExpress',
    time: '2-3 days',
    rating: '4.5',
    price: '₹3.99',
    co2Savings: '2.5',
    ecoFriendly: true,
    weight: 5, 
    distance: 50, 
    tripCount: 1 
  },
  {
    id: 'fasttrack',
    name: 'FastTrack Logistics',
    time: '2-3 days',
    rating: '3.7',
    price: '₹4.99',
    co2Savings: '5.8',
    ecoFriendly: false,
    weight: 12, 
    distance: 47, 
    tripCount: 1 
  },
  {
    id: 'greenmile',
    name: 'GreenMile Delivery',
    time: '3-4 days',
    rating: '4.3',
    price: '₹6.99',
    co2Savings: '3.1',
    ecoFriendly: true,
    weight: 5, 
    distance: 30,  
    tripCount: 2
  }
]


// ----------------------------------------------------------------------------------------------------------------
// CALCULATE CARBON EMISSIONS USING ULIP API
const calculateCarbonEmissions = async (delivery) => {
  const { weight, distance, tripCount, name } = delivery;

  const payload = {
    distance: String(distance),
    weight: String(weight),
    tripCount: String(tripCount),
  };

  try {
    // CALL THE /CARBON/01 ENDPOINT
    const response = await postRequest('/CARBON/01', payload);

    // Log the full response to inspect it
    console.log('Response from API:', response.response);

    if (response && response.response && response.response[0] && response.response[0].response) {
      const carbonEmissionFactor = response.response[0].response["Carbon Emission Factor"];

      if (carbonEmissionFactor) {
        // Update CO2 savings in the delivery option
        delivery.co2Savings = `${carbonEmissionFactor}`;
        console.log(`${name} emits ${carbonEmissionFactor} of CO2.`);
      } else {
        console.log(`No carbon emission data available for ${name}.`);
      }
    } else {
      console.log(`Invalid response structure for ${name}`);
    }
  } catch (error) {
    console.error(`Error fetching carbon emissions for ${name}:`, error.message);
  }
}

// ----------------------------------------------------------------------------------------------------------------
// CALCULATE EMISSIONS FOR ALL DELIVERY OPTIONS
const calculateEmissionsForAllDeliveries = async () => {
  console.log("Calculating carbon emissions for delivery options...");
  for (let option of deliveryOptions) {
    await calculateCarbonEmissions(option);  
  }
}

// ----------------------------------------------------------------------------------------------------------------
// PAGE / ROUTER RENDERING

// RENDER CHECKOUT PAGE WITH DELIVERY OPTIONS
app.get('/checkout', async (req, res) => {
  await calculateEmissionsForAllDeliveries();
  res.render('listings/checkout', { deliveryOptions });
});

// HOMEPAGE ROUTE
app.get("/homepage", (req, res) => {
  res.render("listings/homepage");
});

// HELP & SUPPORT ROUTE
app.get("/help", (req, res) => {
  res.render("listings/help-support");
});

// --------------------------------------------------------------------------

// USER HOME PAGE ROUTE (AFTER SIGN IN BUTTON PRESSED)
app.get("/userHome", (req, res) => {
  res.render("listings/userHome");
});

// ADDING VEHICLE ROUTE
app.get("/addVehicle", (req, res) => {
  res.render("listings/addVehicle");
});

// ADD DRIVER ROUTE
app.get("/addDriver", (req, res) => {
  res.render("listings/addDeliveryPartner");
});

// USER ORDERS ROUTE
app.get("/orders",(req,res) => {
  res.render("listings/orders");
});

// CUSTOMER ENGAGEMENT
app.get("/customer-eng",(req,res) => {
  res.render("listings/customer-eng");
});


// --------------------------------------------------------------------------

// COMPANY ROUTE
app.get("/signin",(req,res)=>{
  res.render("listings/companySignup");
});

app.use("/signup",companyRouter);


// --------------------------------------------------------------------------

// FEATURE 1(CARBON TRACKER)
app.get("/feature1",(req,res)=>{
  res.render("listings/feature1");
});

// FEATURE 2(SUSTAINABLE SHIPPING)
app.get("/feature2",(req,res)=>{
  res.render("listings/feature2");
});

// FEATURE 4(SUPPLIER INTEGRATION)
app.get("/feature4",(req,res)=>{
  res.render("listings/feature4");
});


// --------------------------------------------------------------------------

// General error responder
app.all("*",(req,res,next)=>{
  next(new ExpressError(404, "Page Not Found!"));
});

// --------------------------------------------------------------------------

// Custom error handler
app.use((err, req, res, next)=>{
  let { statusCode=500,message="Something Went Wrong!" } = err;
  res.render("listings/error.ejs",{statusCode,message});
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});