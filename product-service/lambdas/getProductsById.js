"use strict";
import { products } from "../products.js";
import { Responses } from "../utils/apiResponses.js";

export const handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.productId) {
    return Responses._400({ message: "Missing product id from the path" });
  }

  const productId = event.pathParameters.productId;
  let foundProduct;

  if (productId) {
    foundProduct = products.find(
      (product) => product.productId === Number(productId)
    );
  }

  if (!foundProduct) {
    return Responses._400({ message: "Product not found" });
  }

  return Responses._200(foundProduct);
};
