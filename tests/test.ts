import dotenv from "dotenv";
dotenv.config({
  path: ".envi.staging"
});

console.log(process.env.USERNAME);
console.log(process.env.PASSWORD);
