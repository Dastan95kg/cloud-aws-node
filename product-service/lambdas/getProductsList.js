"use strict";
import { products } from "../products.js";

export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
