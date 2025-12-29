export const baseUrl = "https://www.saucedemo.com";
export const inventoryUrl = baseUrl + "/inventory.html";

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
