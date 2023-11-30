const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000;
const URL = process.env.URL_SHEETS;

app.use(bodyParser.json());

app.use(cors());
// Endpoint to handle the POST request
app.post('/sheets', async (req, res) => {
  try {
    // Assuming req.body contains the formData object
    const formData = req.body;

    // Call the function that encapsulates the Axios POST request
    const response = await makePostRequest(formData);

    // Send the response from the Axios call back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to make the Axios POST request
async function makePostRequest(formData) {

    console.log(formData.Name);
    console.log(formData.Email);
    console.log(formData.Tel);

  return axios.post(URL,
  {
    "Name": formData.Name,
    "Email": formData.Email,
    "Tel": formData.Tel,
  }
  
  );
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
