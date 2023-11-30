// // Define the URL for the API Gateway that triggers your Lambda function
// let url = 'https://<api-id>.execute-api.<region>.amazonaws.com/<stage>/<resource>';

// // Define the data you want to send to the Lambda function
// let data = {key1: 'value1', key2: 'value2'};

// // Use the fetch function to make a HTTP request to the API Gateway URL
// fetch(url, {
//   method: 'POST', // Specify the HTTP method (POST in this case)
//   body: JSON.stringify(data), // Convert the data object to a JSON string
//   headers: {
//     'Content-Type': 'application/json' // Set the Content-Type header to indicate we're sending JSON data
//   }
// }).then(response => {
//   // This function is called when the HTTP request completes
//   // It checks if the request was successful
//   if (response.ok) {
//     // If the request was successful, parse the response data as JSON
//     return response.json();
//   } else {
//     // If the request failed, throw an error
//     throw new Error('Error: ' + response.statusText);
//   }
// }).then(responseData => {
//   // This function is called when the response data has been parsed as JSON
//   // It handles the response data (you would replace this with your own logic)
//   console.log(responseData);
// }).catch(error => {
//   // This function is called if an error occurs at any point in the process
//   // It logs the error to the console (you would replace this with your own error handling logic)
//   console.error('Error:', error);
// });
