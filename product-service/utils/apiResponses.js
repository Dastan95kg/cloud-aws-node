export const Responses = {
  _200: (data) => {
    return { headers, statusCode: 200, body: JSON.stringify(data) };
  },
  _201: (data) => {
    return { headers, statusCode: 201, body: JSON.stringify(data) };
  },
  _400: (data) => {
    return { headers, statusCode: 400, body: JSON.stringify(data.message) };
  },
  _500: () => {
    return { headers, statusCode: 500, body: JSON.stringify("Server error") };
  },
};

export const headers = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};
