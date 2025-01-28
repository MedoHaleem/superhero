const config = {
  port: process.env.PORT || 5000,
  testPort: process.env.TEST_PORT || 5001,
  environment: process.env.NODE_ENV || "development",
};

export default config;
