const fetch = require('node-fetch');
require('dotenv').config();


exports.handler = async ({ queryStringParameters: { id } }) => {
  try {
    
    const response = await fetch(`https://www.gutenberg.org/files/${id}/${id}-0.txt`);
    const data = await response.text();
    const json = JSON.stringify({ data });
    
    return { 
      statusCode: 200, 
      body: json
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
