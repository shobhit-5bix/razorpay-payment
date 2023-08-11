import React, { useState } from "react";
import axios from "axios";

const Home = () => {

  const [amount, setAmount] = useState("");

  const checkoutHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4001/payment/checkout", {amount});
    //   console.log(response.data.data);


      const {data:{key}} = await axios.get("http://localhost:4001/payment/get-key");
    //   console.log(key);
  
      var options = {
          key: key, 
          amount: response.data.data.amount,
          currency: "INR",
          name: "Hitsho corp",
          description: "buying product",
          image:
            "https://zeevector.com/wp-content/uploads/Versace-Symbol-PNG@zeevector.com_.png",
      
          order_id: response.data.data.id,
          callback_url: "http://localhost:4001/payment/payment-verify",
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        var razor = new window.Razorpay(options);
        razor.open();


    } catch (error) {
      console.error("Error sending amount:", error);
    }
  };


  return (
    <div>
      <form onSubmit={checkoutHandler}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <button type="submit">Send Amount</button>
      </form>
    </div>
  );

};

export default Home;
