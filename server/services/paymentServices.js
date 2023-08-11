const Razorpay = require("razorpay");
const crypto = require('crypto');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

let order_id = '';

const checkout = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: "order_rcptid_10",
    };

    const order = await instance.orders.create(options);
    console.log(order);
    order_id = order.id;
    return res.status(200).json({ data: order });
  } catch (error) {
    return res.status(400).json({ message: "error in checkout api" });
  }
};

const paymentVerifation = async (req, res) => {
  
  const { razorpay_payment_id, razorpay_signature } = req.body;
    
  const load = order_id + "|" + razorpay_payment_id ;
  generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
  .update(load.toString())
  .digest('hex');

  if (generated_signature == razorpay_signature) {
    console.log(`signature matched! : ${generated_signature}, ${razorpay_signature} `)
    return res
      .status(200)
      .json({ message: "payment verification successful"});
  }
};

const getKey = async (req, res) => {
  return res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};

module.exports = {
  checkout,
  paymentVerifation,
  getKey,
};
