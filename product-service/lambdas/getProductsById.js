"use strict";
import AWS from "aws-sdk";
import { Responses } from "../utils/apiResponses.js";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  console.log("event pathParameters", event.pathParameters);
  try {
    if (!event.pathParameters || !event.pathParameters.productId) {
      return Responses._400({ message: "Missing product id from the path" });
    }

    const productId = event.pathParameters.productId;
    const product = await docClient
      .get({
        TableName: "products",
        Key: {
          id: productId,
        },
      })
      .promise();
    const stock = await docClient
      .get({
        TableName: "stocks",
        Key: { product_id: productId },
      })
      .promise();

    if (!product.Item) {
      return Responses._400({ message: "Product not found" });
    }

    return Responses._200({
      ...product.Item,
      count: stock ? stock.Item.count : null,
    });
  } catch (err) {
    return Responses._500();
  }
};
