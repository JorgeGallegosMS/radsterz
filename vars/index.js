require("dotenv/config");

const vars = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  databaseURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET_KEY,
  cloudName: process.env.CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_SECRET_KEY,
  stripeTestSecretKey: process.env.STRIPE_TEST_SECRET_KEY,
  stripeCheckoutUrl: process.env.STRIPE_CHECKOUT_URL,
};

module.exports = vars;
