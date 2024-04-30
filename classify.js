const axios = require('axios');
// This is the function where the call to the API is made. 

async function classifyText(text) {

  // INSERT CODE SNIPPET FROM POSTMAN BELOW
  
  let data = JSON.stringify({ "inputs": text });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+ process.env['ACCESS_TOKEN']
    },
    data : data
  };


    try {
      const response = await axios.request(config);
      return response.data;
    }
    catch (error) {
      console.log(error);
    }

}

// Allows for summarizeText() to be called outside of this file

module.exports = classifyText;