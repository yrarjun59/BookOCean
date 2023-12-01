import React from 'react'
import "../assets/css/Payment.css";


function PaymentScreen({payment_url,order_id}) {
  return (
    <div className="payment-page-container">
      <h2 class="payment-header">payment Page</h2>
      <div className="iframe-wrapper">
        <iframe
          title="payment Page"
          src="https://test-pay.khalti.com/?pidx=nqJAzpXeY3mDUqBht6LYcL"
          width="100%"
          height="800px"
        ></iframe>
      </div>
    </div>
  );
}

export default PaymentScreen