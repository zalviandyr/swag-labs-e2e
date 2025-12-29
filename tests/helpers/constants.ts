export const baseUrl = "https://www.saucedemo.com";
export const inventoryUrl = baseUrl + "/inventory.html";
export const cartUrl = baseUrl + "/cart.html";
export const stepOneUrl = baseUrl + "/checkout-step-one.html";
export const stepTwoUrl = baseUrl + "/checkout-step-two.html";
export const completeCheckoutUrl = baseUrl + "/checkout-complete.html";

const userPassword = "secret_sauce";
export const users = {
  standard: {
    username: "standard_user",
    password: userPassword,
  },
  locked_out: {
    username: "locked_out_user",
    password: userPassword,
  },
  problem: {
    username: "problem_user",
    password: userPassword,
  },
  performance_glitch: {
    username: "performance_glitch_user",
    password: userPassword,
  },
  error: {
    username: "error_user",
    password: userPassword,
  },
  visual: {
    username: "visual_user",
    password: userPassword,
  },
};
