// This is the function where the call to the API is made. Returns the summarized text as a string.

async function classifyText(text) {

  // INSERT CODE SNIPPET FROM POSTMAN BELOW
  const axios = require('axios');
  let data = '{\r\n  "inputs":Amelia, a curious astronomer, spotted a peculiar comet through her telescope. It emitted a mesmerizing glow and seemed to change course. Determined to investigate, she built a spaceship. On her journey, she encountered cosmic wonders, yet the comet remained elusive. Finally, at the edge of the universe, she understood its secret: the comet was a celestial guide, leading her to discover the boundless wonders within herself. Grateful for the voyage, Amelia returned, sharing her newfound wisdom with the world, inspiring others to explore both the cosmos and the depths of their souls.\r\n}';

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer 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'
    },
    data : data
  };

  async function makeRequest() {
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    }
    catch (error) {
      console.log(error);
    }
  }

  makeRequest();

}

// Allows for summarizeText() to be called outside of this file

module.exports = classifyText;