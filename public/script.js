const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const classifyButton = document.getElementById("classify-button");

submitButton.disabled = true;
classifyButton.disabled=true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
classifyButton.addEventListener("click", classifyText);

function verifyTextLength(e) {
 // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called 'textarea'
  const textarea = e.target;

  // Verify the TextArea value.
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    // Enable the button when text area has value.
    submitButton.disabled = false;
    classifyButton.disabled = false;
  } else {
    // Disable the button when text area is empty.
    submitButton.disabled = true;
  }
}

function submitData(e) {

 // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Send the text to the server using fetch API

 // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
    });
}

async function classifyText(e) {
  classifyButton.classList.add("submit-button--loading");
  const textToClassify = textArea.value;

  try {
    const response = await fetch('/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "text_to_classify": textToClassify }),
    });

    const results = await response.json();

    displayEmotionClassification(results);

    // Stop the spinning loading animation
    classifyButton.classList.remove("submit-button--loading");
  } catch (error) {
    console.error('Error classifying text:', error);
    // Display an error message on the webpage
    displayErrorMessage('An error occurred while classifying the text.');
    classifyButton.classList.remove("submit-button--loading");
  }
}

function displayEmotionClassification(results) {
  // Clear any previous results
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  // Loop through the results and create HTML elements to display them
  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.textContent = `${result.label}: ${(result.score * 100).toFixed(2)}%`;
    resultsContainer.appendChild(resultElement);
  });
}

function displayErrorMessage(message) {
  const errorContainer = document.getElementById('error');
  errorContainer.textContent = message;
}