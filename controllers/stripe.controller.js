const { stripeTestSecretKey } = require("../vars");
const stripe = require("stripe")(stripeTestSecretKey);
const { stripeCheckoutUrl } = require("../vars");

const stripeRoutes = {
  checkout: async (req, res) => {
    try {
      const { url } = await stripe.checkout.sessions.create({
        line_items: req.body,
        payment_method_types: ["card"],
        mode: "payment",
        payment_intent_data: {
          receipt_email: "jorgegallegos403@gmail.com",
        },
        success_url: `${stripeCheckoutUrl}/payment/success`,
        cancel_url: `${stripeCheckoutUrl}/cart`,
      });
      res.json({ url });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = stripeRoutes;
