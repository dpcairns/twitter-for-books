const fetch = require('node-fetch');
const cheerio = require('cheerio');

require('dotenv').config();


exports.handler = async (event, context) => {
  try {
    const response = await fetch('https://www.gutenberg.org/browse/scores/top');
    const responseText = await response.text();

    const $ = cheerio.load(responseText);

    const data = $('ol > li')
      .toArray()
      .map(li => $(li).find('a'))
      .filter(a => a.attr('href').split('/')[1] === 'ebooks')
      .map(a => ({
        title: a.text(),
        id: a.attr('href').split('/')[2]
      }));


    const jsonIds = JSON.stringify({ data });
    
    return { 
      statusCode: 200, 
      body: jsonIds
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
