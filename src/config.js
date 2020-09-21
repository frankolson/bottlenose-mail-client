const dev = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.bottlenosemail-dev.com",
  },
};

const prod = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.bottlenosemail.com",
  },
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,
};
