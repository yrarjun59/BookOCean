import axios from "axios";

const KhaltiPayment = async (id,totalAmount,product_name) => {
    const key = '2d7a2097f38449c281d034f0b54911c5';
    const url = "https://a.khalti.com/api/v2/epayment/initiate/";

    const payload = {
      return_url: `http://localhost:5173/#/order/${id}`,
      website_url: "http://localhost:5173/",
      amount: totalAmount * 100, 
      purchase_order_id: id, 
      purchase_order_name: product_name,
      customer_info: {
        "name": 'user_name',
        "email": "user_name@gmail.com",
        "phone": "9811496763",
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
        const response = await axios.post(url, payload, config);

        console.log("Response  is" , response)

        if (response.status === 200) {
            const data = response.data;
            console.log({data});       

            window.location.href = data.payment_url
        
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error(error);
    }

};

export default KhaltiPayment;
