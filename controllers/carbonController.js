const { postRequest } = require("../services/apiService");

// Delivery options
const deliveryOptions = [
  {
    id: "ecoexpress",
    name: "EcoExpress",
    time: "2-3 days",
    rating: "4.5",
    price: "₹3.99",
    co2Savings: "2.5",
    ecoFriendly: true,
    weight: 5,
    distance: 50,
    tripCount: 1,
  },
  {
    id: "fasttrack",
    name: "FastTrack Logistics",
    time: "2-3 days",
    rating: "3.7",
    price: "₹4.99",
    co2Savings: "5.8",
    ecoFriendly: false,
    weight: 12,
    distance: 47,
    tripCount: 1,
  },
  {
    id: "greenmile",
    name: "GreenMile Delivery",
    time: "3-4 days",
    rating: "4.3",
    price: "₹6.99",
    co2Savings: "3.1",
    ecoFriendly: true,
    weight: 5,
    distance: 30,
    tripCount: 2,
  },
];

// Function to calculate carbon emissions for a delivery option
const calculateCarbonEmissions = async (delivery) => {
  const { weight, distance, tripCount, name } = delivery;
  const payload = { distance: String(distance), weight: String(weight), tripCount: String(tripCount) };

  try {
    const response = await postRequest("/CARBON/01", payload);
    console.log("Response from API:", response.response);

    if (response?.response?.[0]?.response) {
      const carbonEmissionFactor = response.response[0].response["Carbon Emission Factor"];
      if (carbonEmissionFactor) {
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
};

// Function to calculate emissions for all delivery options
const calculateEmissionsForAllDeliveries = async () => {
  console.log("Calculating carbon emissions for delivery options...");
  for (let option of deliveryOptions) {
    await calculateCarbonEmissions(option);
  }
};

// Controller for rendering the checkout page
exports.renderCheckout = async (req, res) => {
  await calculateEmissionsForAllDeliveries();
  res.render("listings/checkout", { deliveryOptions });
};
