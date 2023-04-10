"use strict";
import AWS from "aws-sdk";
import { Responses, headers } from "../utils/apiResponses.js";
import { ProductStockAdapter } from "../utils/productStockAdapter.js";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async () => {
  try {
    const products = await docClient.scan({ TableName: "products" }).promise();
    const stocks = await docClient.scan({ TableName: "stocks" }).promise();

    const productsWithStocks = ProductStockAdapter.mapProductWithStock(
      products.Items,
      stocks.Items
    );
    console.log("productsWithStocks", productsWithStocks);

    return Responses._200(productsWithStocks);
  } catch (err) {
    return Responses._500();
  }
};
