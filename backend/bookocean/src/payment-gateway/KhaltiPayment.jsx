import axios from "axios";
import khaltiConfig from "./khaltiConfig";
import PaymentScreen from "./PaymentScreen";


const key = khaltiConfig.key
const url = khaltiConfig.url;

const KhaltiPayment = async (id,totalAmount,product_name) => {

    const payload = {
      return_url: `http://localhost:5173/#/order/${id}`,
      website_url: "http://localhost:5173/",
      amount: totalAmount * 100, 
    //   purchase_order_id: id, 
      purchase_order_id: 2, 
    //   purchase_order_name: product_name,
      purchase_order_name: "my_order",
      customer_info: {
        "name": 'user_name',
        "email": "user_name@gmail.com",
        "phone":9840320008,
        "address": "Address 3 Main Street"
    },
  };
    
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Key ${key}`,
        },
    };

    try {
        const {response} = await axios.post(url, payload, config);
        
        console.log(response)

    } catch (error) {
        console.error(error);
    }

};

export default KhaltiPayment;


// Properly Handled Error which is comming while requesting the server