import axios from "axios";
import dotenv from "dotenv";
import Trip_details from "../DB Models/Trip_details.js";
import Trips from "../DB Models/Trips.js";
import tourists from "../DB Models/Tourists_Acc.js";
dotenv.config();

const PAYMOB_URL = "https://accept.paymob.com/api";

async function authenticate() { 

    try {
        const url = ` https://accept.paymob.com/api/auth/tokens`;
        const headers = {
          "Content-Type": "application/json",
        };
        const data = {
          api_key: process.env.API_TOKEN,
          username: process.env.PAY_USERNAME,
          password: process.env.PAY_PASSWORD,
        };
        const response = await axios.post(url, data, { headers });
        const accessToken = response.data.token;
        return accessToken;
      } catch (error) {
        console.log("Error authenticating:");
      }
}



async function card_pay( amount_cents,items,billing_data) {
  // Authentication Request -- step 1 in the docs

  const accessToken = await authenticate();
  // Order Registration API -- step 2 in the docs
  const orderUrl = `${PAYMOB_URL}/ecommerce/orders`;
  const headers = {
    "Content-Type": "application/json",
  };
  const orderData = {
    auth_token: accessToken,
    delivery_needed: "false",
    amount_cents ,
    currency: "EGP",
    items,
    payment_methods: [
      12,
      "card",
      process.env.CARD_integrationID
    ],
  };
  const order = await axios.post(orderUrl, orderData,  headers );
  const orderId = order.data.id;


  // Payment Key Request  -- step 3 in the docs
  const paymentKeyUrl = `${PAYMOB_URL}/acceptance/payment_keys`;

  const paymentKeyData = {
    auth_token: accessToken,
    amount_cents,
    expiration: 3600,
    order_id: orderId,
    billing_data,
    currency: "EGP",
    integration_id: process.env.CARD_integrationID, 
  };
  const paymentKey = await axios.post(paymentKeyUrl, paymentKeyData, headers);
  return paymentKey.data.token;
}



export const checkout = async (req, res, next) => {
            // Get the order_cart, billing_data, amount_cents from the request body
            const {name , price } = req.body;
            const trip = await Trip_details.findOne({name}).populate('trip_id').populate('destination_1').populate('destination_2').populate('destination_3').populate('destination_4').populate('destination_5').populate('destination_6').lean()
            const user = await tourists.findOne({_id : req.id }).lean()            
            const items = [
              {
                name: trip.name,
                amount_cents:price,
                description: trip.description,
                quantity: "1"
              }
            ]
           const billing_data = {
              apartment : 'NA',
              email: user.username,
              floor : "NA",
              first_name: user.name,
              street: "NA", 
              building: "NA", 
              phone_number: "+86(8)9135210487", 
              shipping_method: "NA", 
              postal_code: "NA", 
              city: "NA", 
              country: user.country,
              last_name: "NA", 
              state: "NA"
            }
            authenticate()
            // get the payment token for this order
            const token = await card_pay(price,items,billing_data);
        
            // create the payment link
            const link1 = `https://accept.paymob.com/api/acceptance/iframes/840690?payment_token=${token}`;
            const link2 = `https://accept.paymob.com/api/acceptance/iframes/840691?payment_token=${token}`;
            
            


res.render('Trip/payment' , {link1 , link2})
        };