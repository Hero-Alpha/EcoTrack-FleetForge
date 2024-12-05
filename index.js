const express = require("express");
const connectDB = require("./db");
const path = require("path");
const { postRequest } = require("./services/apiService");
require("dotenv").config();

const app = express();

// SET UP EJS VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// CONNECT TO MONGODB
connectDB();

// MIDDLEWARE TO PARSE JSON REQUESTS
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "asset")));
app.use(express.json());

const PORT = process.env.PORT || 3001;

// GLOBAL DELIVERY OPTIONS
const deliveryOptions = [
  {
    id: 'ecoexpress',
    name: 'EcoExpress',
    time: '2-3 days',
    rating: '4.5',
    price: '₹5.99',
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

// RENDER CHECKOUT PAGE WITH DELIVERY OPTIONS
app.get('/checkout', async (req, res) => {
  // Update the delivery options with calculated CO2 savings
  await calculateEmissionsForAllDeliveries();

  res.render('checkout', { deliveryOptions });
});

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

// CALCULATE EMISSIONS FOR ALL DELIVERY OPTIONS
const calculateEmissionsForAllDeliveries = async () => {
  console.log("Calculating carbon emissions for delivery options...");
  for (let option of deliveryOptions) {
    await calculateCarbonEmissions(option);  
  }
}

// HOMEPAGE ROUTE
app.get("/homepage", (req, res) => {
  res.render("homepage");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});