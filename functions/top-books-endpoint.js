const fetch = require('node-fetch');
const cheerio = require('cheerio');

require('dotenv').config();

function mungeHTMLText(text) {
  const $ = cheerio.load(text);

  const data = $('ol > li')
    .toArray()
    .map(li => $(li).find('a'))
    .filter(a => a.attr('href').split('/')[1] === 'ebooks')
    .map(a => ({
      title: a.text(),
      id: a.attr('href').split('/')[2]
    }));

  return data;
}

exports.handler = async () => {
  try {
    const response = await fetch('https://www.gutenberg.org/browse/scores/top');
    const responseText = await response.text();

    const data = mungeHTMLText(responseText);

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
