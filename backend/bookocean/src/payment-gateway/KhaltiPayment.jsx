import axios from "axios";
import khaltiConfig from "./khaltiConfig";
import PaymentScreen from "./PaymentScreen";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const key = khaltiConfig.key
const url = khaltiConfig.url;

// function KhaltiPayment() {
const KhaltiPayment = async (id,totalAmount,product_name) => {

  // const navigate = useNavigate();
  const dispatch = useDispatch();


  const payload = {
      return_url: `http://localhost:5173/#/order/${id}`,
      website_url: "http://localhost:5173/",
      // amount: totalAmount * 100, 
      amount: 100 * 100, 
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
        const {data} = axios.post(url, payload, config);
        console.log(data)
        // const pidx = data.pidx; // payment_id
        // console.log(pidx);
        // navigate("/my")

        // navigate(`/${id}/payment/${pidx}`)

    } catch (error) {
        console.error(error);

        <div>
          <h2>Error Occured</h2>
        </div>
    }

};

export default KhaltiPayment;


// Properly Handled Error which is comming while requesting the server