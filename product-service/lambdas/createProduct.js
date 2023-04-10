import AWS from "aws-sdk";
import { v4 } from "uuid";
import { Responses } from "../utils/apiResponses.js";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  console.log("event body", JSON.parse(event.body));
  try {
    const { title, description, price, count } = JSON.parse(event.body);

    if (!title || !description || !price || !count) {
      return Responses._400({
        message:
          "Provided data is invalid. Missing one of the properties: title, description, count, price",
      });
    }

    const productBody = { id: v4(), title, description, price };
    const stockBody = { product_id: productBody.id, count };

    await docClient.put({ TableName: "products", Item: productBody }).promise();
    await docClient.put({ TableName: "stocks", Item: stockBody }).promise();

    return Responses._201({ ...productBody, ...stockBody });
  } catch (err) {
    return Responses._500();
  }
};
